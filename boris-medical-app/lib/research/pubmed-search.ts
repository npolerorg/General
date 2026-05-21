/**
 * PubMed E-utilities client tuned for Boris's daily search set.
 * Docs: https://www.ncbi.nlm.nih.gov/books/NBK25500/
 */

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

export interface PubMedHit {
  pmid: string;
  title: string;
  abstract: string;
  authors: string[];
  journal: string;
  pub_date: string; // ISO yyyy-mm-dd
  doi?: string;
  url: string;
  raw_query: string;
}

export const DAILY_QUERIES: ReadonlyArray<{ id: string; query: string }> = [
  {
    id: "mss-mcrc",
    query: `"metastatic colorectal cancer" AND ("MSS" OR "microsatellite stable") AND ("treatment" OR "therapy" OR "trial")`,
  },
  { id: "mgmt-crc", query: `"MGMT" AND ("colorectal" OR "rectal") AND ("temozolomide" OR "methylation")` },
  { id: "egfr-rechallenge", query: `"anti-EGFR" AND ("rechallenge" OR "retreatment") AND "colorectal"` },
  {
    id: "ctdna-guidance",
    query: `"ctDNA" AND ("colorectal" OR "rectal") AND ("monitoring" OR "guidance" OR "rechallenge")`,
  },
  { id: "oligomets-sbrt", query: `"oligometastatic" AND "colorectal" AND ("SBRT" OR "stereotactic")` },
  {
    id: "late-line-drugs",
    query: `("fruquintinib" OR "TAS-102" OR "trifluridine" OR "regorafenib") AND "colorectal"`,
  },
  { id: "botbal-battman", query: `("botensilimab" OR "balstilimab" OR "BATTMAN") AND "colorectal"` },
  {
    id: "left-sided-ras-wt",
    query: `"left-sided" AND "colorectal" AND ("RAS wild-type" OR "EGFR")`,
  },
];

export async function searchPubMed(
  query: string,
  opts: { sinceDate?: string; maxResults?: number; apiKey?: string } = {},
): Promise<PubMedHit[]> {
  const { sinceDate, maxResults = 50, apiKey = process.env.PUBMED_API_KEY } = opts;

  const dateFilter = sinceDate
    ? ` AND ("${sinceDate}"[Date - Publication] : "3000"[Date - Publication])`
    : "";

  const esearchUrl = new URL(`${EUTILS_BASE}/esearch.fcgi`);
  esearchUrl.searchParams.set("db", "pubmed");
  esearchUrl.searchParams.set("term", query + dateFilter);
  esearchUrl.searchParams.set("retmode", "json");
  esearchUrl.searchParams.set("retmax", String(maxResults));
  esearchUrl.searchParams.set("sort", "date");
  if (apiKey) esearchUrl.searchParams.set("api_key", apiKey);

  const idsRes = await fetch(esearchUrl.toString());
  if (!idsRes.ok) throw new Error(`PubMed esearch failed: ${idsRes.status}`);
  const idsJson = (await idsRes.json()) as { esearchresult?: { idlist?: string[] } };
  const ids = idsJson.esearchresult?.idlist ?? [];
  if (ids.length === 0) return [];

  const efetchUrl = new URL(`${EUTILS_BASE}/efetch.fcgi`);
  efetchUrl.searchParams.set("db", "pubmed");
  efetchUrl.searchParams.set("id", ids.join(","));
  efetchUrl.searchParams.set("retmode", "xml");
  if (apiKey) efetchUrl.searchParams.set("api_key", apiKey);

  const xmlRes = await fetch(efetchUrl.toString());
  if (!xmlRes.ok) throw new Error(`PubMed efetch failed: ${xmlRes.status}`);
  const xml = await xmlRes.text();

  return parsePubMedXml(xml, query);
}

function parsePubMedXml(xml: string, rawQuery: string): PubMedHit[] {
  const articles = xml.split(/<PubmedArticle[> ]/u).slice(1);
  return articles.map((chunk) => {
    const pmid = textBetween(chunk, "<PMID[^>]*>", "</PMID>");
    const title = stripTags(textBetween(chunk, "<ArticleTitle[^>]*>", "</ArticleTitle>"));
    const abstract = stripTags(
      [...chunk.matchAll(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/gu)].map((m) => m[1]).join(" "),
    );
    const journal = stripTags(textBetween(chunk, "<Title>", "</Title>"));
    const year = textBetween(chunk, "<PubDate>[\\s\\S]*?<Year>", "</Year>");
    const month = textBetween(chunk, "<PubDate>[\\s\\S]*?<Month>", "</Month>") || "01";
    const day = textBetween(chunk, "<PubDate>[\\s\\S]*?<Day>", "</Day>") || "01";
    const authors = [
      ...chunk.matchAll(/<Author[^>]*>[\s\S]*?<LastName>([^<]+)<\/LastName>[\s\S]*?<ForeName>([^<]+)<\/ForeName>/gu),
    ].map((m) => `${m[2]} ${m[1]}`);
    const doi = textBetween(chunk, '<ArticleId IdType="doi">', "</ArticleId>");

    return {
      pmid,
      title,
      abstract,
      authors,
      journal,
      pub_date: `${year}-${pad2(month)}-${pad2(day)}`,
      doi: doi || undefined,
      url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      raw_query: rawQuery,
    };
  });
}

function textBetween(s: string, startPattern: string, endPattern: string): string {
  const rx = new RegExp(`${startPattern}([\\s\\S]*?)${endPattern}`, "u");
  const m = s.match(rx);
  return m ? m[1].trim() : "";
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/gu, "").replace(/\s+/gu, " ").trim();
}

function pad2(s: string): string {
  const monthMap: Record<string, string> = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
  };
  if (monthMap[s]) return monthMap[s];
  return s.padStart(2, "0");
}

/**
 * Run all daily queries against PubMed for the last `lookbackHours` and
 * return deduplicated hits.
 */
export async function runDailyPubMedSweep(lookbackHours = 24): Promise<PubMedHit[]> {
  const since = new Date(Date.now() - lookbackHours * 3600 * 1000);
  const sinceDate = `${since.getFullYear()}/${pad2(String(since.getMonth() + 1))}/${pad2(String(since.getDate()))}`;

  const allHits = await Promise.all(DAILY_QUERIES.map((q) => searchPubMed(q.query, { sinceDate })));
  const dedup = new Map<string, PubMedHit>();
  for (const list of allHits) for (const hit of list) if (!dedup.has(hit.pmid)) dedup.set(hit.pmid, hit);
  return [...dedup.values()];
}
