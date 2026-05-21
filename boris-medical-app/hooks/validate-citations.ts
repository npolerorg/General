import type { HookContext, HookResult } from "./types";

const DRUG_OR_TRIAL_INDICATORS = [
  /\b(fruquintinib|regorafenib|bevacizumab|cetuximab|panitumumab|trifluridine|tipiracil|TAS-?102|temozolomide|botensilimab|balstilimab|pembrolizumab|nivolumab|encorafenib|tucatinib|trastuzumab|atezolizumab|XL092|M1774|tuvusertib)\b/iu,
  /\b(MAYA|CHRONOS|BATTMAN|RAPIDO|CITRIC|PARERE|FIRE-?3|TRIBE|CAIRO|FRESCO|RECOURSE|SUNLIGHT|FOLFOX|FOLFIRI|FOLFIRINOX)\b/u,
];

const CITATION_PATTERNS = [
  /\bPMID:\s*\d+\b/iu,
  /\bNCT\d{8}\b/u,
  /\bdoi:\s*10\.\d{4,}/iu,
  /\bdoi\.org\/10\.\d{4,}/iu,
  /\b(ASCO|ESMO|AACR|ASH)\s+\d{4}\s+abstract\s+[A-Z]?\d+\b/iu,
  /\bFDA\s+(approval|NDA|BLA|label)\b/iu,
  /\bEMA\s+(SmPC|CHMP)\b/u,
  /\bEudraCT\s*\d{4}-\d{6}-\d{2}\b/iu,
  /\bISRCTN\d+\b/iu,
];

/**
 * Every paragraph that names a drug, regimen, or named trial must carry
 * at least one primary-source citation (PMID, NCT, DOI, conference abstract
 * ID, FDA/EMA reference, EudraCT, or ISRCTN).
 *
 * Soft list of generic clinical context terms (e.g. "FOLFIRI + Cetuximab"
 * appearing in Boris's treatment history) is allowed without citation if
 * the paragraph is purely describing Boris's history rather than making a
 * claim about the drug. Heuristic: skip paragraphs containing "Boris" AND
 * no comparative claim language.
 */
const COMPARATIVE_CLAIM = /\b(superior|inferior|mejor que|peor que|HR|hazard ratio|p\s*<|p\s*=|mOS|mPFS|ORR|DCR|reduce|aumenta|prolonga|extend|reduces|improves)\b/iu;

export function validateCitations(output: string, _ctx: HookContext): HookResult {
  const paragraphs = output.split(/\n{2,}/u);
  const violations: Array<{ paragraph_index: number; excerpt: string; missing_for: string }> = [];

  paragraphs.forEach((p, i) => {
    const drugHit = DRUG_OR_TRIAL_INDICATORS.flatMap((rx) => {
      const m = p.match(rx);
      return m ? [m[0]] : [];
    });
    if (drugHit.length === 0) return;

    const isBorisHistory = /\bBoris\b/u.test(p) && !COMPARATIVE_CLAIM.test(p);
    if (isBorisHistory) return;

    const hasCitation = CITATION_PATTERNS.some((rx) => rx.test(p));
    if (hasCitation) return;

    violations.push({
      paragraph_index: i,
      excerpt: p.slice(0, 140).replace(/\s+/gu, " ").trim() + (p.length > 140 ? "…" : ""),
      missing_for: drugHit.join(", "),
    });
  });

  if (violations.length === 0) return { ok: true };

  return {
    ok: false,
    code: "CITATION_MISSING",
    message:
      `Found ${violations.length} paragraph(s) naming a drug, regimen, or trial without a primary-source citation ` +
      `(PMID / NCT / DOI / conference abstract / FDA / EMA / EudraCT / ISRCTN).`,
    violations,
  };
}

export default validateCitations;
