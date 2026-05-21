/**
 * ClinicalTrials.gov v2 API client.
 * Docs: https://clinicaltrials.gov/data-api/api
 */

const CTGOV_BASE = "https://clinicaltrials.gov/api/v2/studies";

export interface CtGovStudy {
  nct_id: string;
  title: string;
  conditions: string[];
  interventions: string[];
  phase: string;
  status: string;
  enrollment: number | null;
  countries: string[];
  eligibility_criteria_text: string;
  last_update_posted: string;
  url: string;
}

export const WATCH_LIST_NCT: ReadonlyArray<{ nct: string; label: string }> = [
  { nct: "NCT05425940", label: "XL092 + Atezolizumab vs Regorafenib" },
  { nct: "NCT05627635", label: "3B-FOLFOX with BOT/BAL" },
  { nct: "NCT05031975", label: "Temozolomide + Irinotecan, MGMT-silenced" },
  { nct: "NCT05691491", label: "Temozolomide + M1774" },
];

const COUNTRY_PRIORITY = ["Chile", "Argentina", "Brazil", "United States", "France", "Germany", "Spain", "Italy", "United Kingdom", "Israel"];

export async function searchCtGov(params: {
  condition?: string;
  status?: string;
  termFilter?: string;
  countries?: string[];
  maxResults?: number;
}): Promise<CtGovStudy[]> {
  const { condition = "metastatic colorectal cancer", status = "RECRUITING", termFilter, countries, maxResults = 100 } = params;

  const url = new URL(CTGOV_BASE);
  url.searchParams.set("query.cond", condition);
  url.searchParams.set("filter.overallStatus", status);
  if (termFilter) url.searchParams.set("query.term", termFilter);
  if (countries?.length) url.searchParams.set("filter.geo", countries.map((c) => `country:${c}`).join(","));
  url.searchParams.set("pageSize", String(Math.min(maxResults, 1000)));
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`CT.gov v2 failed: ${res.status}`);
  const json = (await res.json()) as { studies?: unknown[] };
  return (json.studies ?? []).map(mapStudy);
}

function mapStudy(s: unknown): CtGovStudy {
  const obj = s as Record<string, Record<string, unknown>>;
  const id = obj.protocolSection?.identificationModule as Record<string, unknown>;
  const status = obj.protocolSection?.statusModule as Record<string, unknown>;
  const design = obj.protocolSection?.designModule as Record<string, unknown>;
  const cond = obj.protocolSection?.conditionsModule as Record<string, unknown>;
  const arms = obj.protocolSection?.armsInterventionsModule as Record<string, unknown>;
  const elig = obj.protocolSection?.eligibilityModule as Record<string, unknown>;
  const contacts = obj.protocolSection?.contactsLocationsModule as Record<string, unknown>;

  const nctId = String(id?.nctId ?? "");
  const locations = Array.isArray(contacts?.locations) ? (contacts.locations as Array<Record<string, unknown>>) : [];

  return {
    nct_id: nctId,
    title: String(id?.briefTitle ?? ""),
    conditions: Array.isArray(cond?.conditions) ? (cond.conditions as string[]) : [],
    interventions: Array.isArray(arms?.interventions)
      ? (arms.interventions as Array<Record<string, string>>).map((i) => `${i.type ?? ""}: ${i.name ?? ""}`)
      : [],
    phase: Array.isArray(design?.phases) ? (design.phases as string[]).join("/") : "",
    status: String(status?.overallStatus ?? ""),
    enrollment: (design?.enrollmentInfo as Record<string, number> | undefined)?.count ?? null,
    countries: [...new Set(locations.map((l) => String(l.country ?? "")).filter(Boolean))],
    eligibility_criteria_text: String(elig?.eligibilityCriteria ?? "").slice(0, 4000),
    last_update_posted: String((status?.lastUpdatePostDateStruct as Record<string, string> | undefined)?.date ?? ""),
    url: `https://clinicaltrials.gov/study/${nctId}`,
  };
}

export async function fetchWatchListUpdates(): Promise<CtGovStudy[]> {
  const all = await Promise.all(
    WATCH_LIST_NCT.map(async ({ nct }) => {
      const url = new URL(`${CTGOV_BASE}/${nct}`);
      url.searchParams.set("format", "json");
      const res = await fetch(url.toString());
      if (!res.ok) return null;
      const json = (await res.json()) as unknown;
      return mapStudy(json);
    }),
  );
  return all.filter((x): x is CtGovStudy => x !== null);
}

/**
 * Daily CT.gov sweep: pulls recruiting mCRC trials, sorts by geographic
 * priority (Chile → LATAM → US/EU → other), filters by Boris biomarkers
 * heuristically (RAS WT, BRAF WT, MSS, MGMT methylated mentions).
 */
export async function runDailyCtGovSweep(): Promise<{
  newTrials: CtGovStudy[];
  watchListUpdates: CtGovStudy[];
}> {
  const [latam, intl, watchList] = await Promise.all([
    searchCtGov({ countries: ["Chile", "Argentina", "Brazil"] }),
    searchCtGov({ countries: ["United States", "France", "Germany", "Spain", "Italy", "United Kingdom", "Israel"] }),
    fetchWatchListUpdates(),
  ]);

  const seen = new Set<string>();
  const combined = [...latam, ...intl].filter((t) => {
    if (seen.has(t.nct_id)) return false;
    seen.add(t.nct_id);
    return true;
  });

  const borisProfileTerms = /\b(RAS\s*wild|BRAF\s*wild|MSS|microsatellite\s*stable|MGMT)\b/iu;
  const matched = combined.filter((t) => borisProfileTerms.test(t.eligibility_criteria_text));

  matched.sort((a, b) => geoRank(a.countries) - geoRank(b.countries));
  return { newTrials: matched, watchListUpdates: watchList };
}

function geoRank(countries: string[]): number {
  const best = countries
    .map((c) => COUNTRY_PRIORITY.indexOf(c))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];
  return best ?? 999;
}
