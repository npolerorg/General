/**
 * Relevance scoring algorithm — 5 factors, weighted, 0.00-1.00 output.
 *
 * Thresholds:
 *   ≥ 0.85 → immediate alert (Format A)
 *   0.70–0.85 → next daily digest (Format B)
 *   0.50–0.70 → stored, queryable
 *   < 0.50 → stored without prominence
 */

import { BORIS_PROFILE } from "./boris-profile";

export interface ScorableFinding {
  source: "pubmed" | "ctgov" | "fda" | "ema" | "anvisa" | "isp" | "anmat" | "press" | "conference" | "news";
  pub_date: string; // ISO yyyy-mm-dd
  text: string; // title + abstract + any structured fields concatenated
  countries?: string[];
  phase?: "preclinical" | "1" | "2" | "3" | "4" | "guideline" | "regulatory" | "other";
}

export interface RelevanceScore {
  total: number; // 0.00–1.00
  factors: {
    molecular: number;
    clinical: number;
    evidence: number;
    geography: number;
    recency: number;
  };
  bucket: "alert" | "digest" | "queryable" | "background";
}

const WEIGHTS = {
  molecular: 0.35,
  clinical: 0.25,
  evidence: 0.20,
  geography: 0.10,
  recency: 0.10,
} as const;

const MOLECULAR_TERMS = [
  { rx: /\b(MSS|microsatellite\s*stable|MSI[\s-]*low|pMMR)\b/iu, weight: 1.0 },
  { rx: /\b(MGMT)\b/iu, weight: 1.0 },
  { rx: /\b(RAS\s*wild|KRAS\s*wild|NRAS\s*wild)\b/iu, weight: 0.9 },
  { rx: /\b(BRAF\s*wild)\b/iu, weight: 0.7 },
  { rx: /\b(HER2[\s-]*negative|HER2[\s-]*low)\b/iu, weight: 0.5 },
  { rx: /\b(left[\s-]*sided)\b/iu, weight: 0.6 },
];

const MOLECULAR_DISQUALIFIERS = [
  /\b(MSI[\s-]*high|dMMR)\b/iu,
  /\b(KRAS\s*G12C\s*mutant|KRAS\s*mutant\s+CRC)\b/iu,
  /\b(BRAF\s*V600E)\b/iu,
  /\b(HER2[\s-]*positive|HER2[\s-]*amplified)\b/iu,
];

const CLINICAL_TERMS = [
  { rx: /\b(post[\s-]*cetuximab|EGFR\s*rechallenge|anti[\s-]*EGFR\s+(rechallenge|retreatment))\b/iu, weight: 1.0 },
  { rx: /\b(oligometastatic|oligoprogression|SBRT|stereotactic)\b/iu, weight: 0.9 },
  { rx: /\b(later[\s-]*line|third[\s-]*line|fourth[\s-]*line|refractory)\b/iu, weight: 0.8 },
  { rx: /\b(ECOG\s*[01])\b/iu, weight: 0.5 },
  { rx: /\b(ctDNA|liquid\s+biopsy)\b/iu, weight: 0.7 },
];

const CLINICAL_DISQUALIFIERS = [
  /\b(first[\s-]*line|frontline|treatment[\s-]*na[ïi]ve|adjuvant\s+only)\b/iu,
  /\bECOG\s*[34]\b/iu,
];

function scoreMolecular(text: string): number {
  if (MOLECULAR_DISQUALIFIERS.some((rx) => rx.test(text))) {
    const positiveHits = MOLECULAR_TERMS.filter((t) => t.rx.test(text));
    return positiveHits.length === 0 ? 0.0 : 0.15;
  }
  const hits = MOLECULAR_TERMS.filter((t) => t.rx.test(text)).map((t) => t.weight);
  if (hits.length === 0) return 0.0;
  const top = hits.sort((a, b) => b - a).slice(0, 3);
  const avg = top.reduce((a, b) => a + b, 0) / top.length;
  return Math.min(1.0, avg + Math.min(0.15, (hits.length - 1) * 0.05));
}

function scoreClinical(text: string): number {
  if (CLINICAL_DISQUALIFIERS.some((rx) => rx.test(text))) return 0.05;
  const hits = CLINICAL_TERMS.filter((t) => t.rx.test(text)).map((t) => t.weight);
  if (hits.length === 0) return 0.1;
  const top = hits.sort((a, b) => b - a).slice(0, 2);
  return Math.min(1.0, top.reduce((a, b) => a + b, 0) / top.length);
}

function scoreEvidence(f: ScorableFinding): number {
  switch (f.phase) {
    case "3":
    case "guideline":
    case "regulatory":
      return 1.0;
    case "2":
      return 0.7;
    case "1":
      return 0.4;
    case "preclinical":
      return 0.1;
    default:
      return inferEvidenceFromText(f.text);
  }
}

function inferEvidenceFromText(text: string): number {
  if (/\b(phase\s*3|fase\s*3|fase\s*III|FDA approval|EMA approval|guideline|NCCN|ESMO\s+guideline)\b/iu.test(text)) return 1.0;
  if (/\b(phase\s*2|fase\s*2|fase\s*II|prospective)\b/iu.test(text)) return 0.7;
  if (/\b(phase\s*1|fase\s*1|fase\s*I|first[\s-]*in[\s-]*human)\b/iu.test(text)) return 0.4;
  if (/\b(preclinical|in\s+vitro|in\s+vivo|murine|xenograft)\b/iu.test(text)) return 0.1;
  return 0.5;
}

function scoreGeography(countries?: string[]): number {
  if (!countries || countries.length === 0) return 0.6;
  if (countries.includes("Chile")) return 1.0;
  if (countries.some((c) => ["Argentina", "Brazil", "Mexico", "Colombia", "Peru"].includes(c))) return 0.85;
  if (countries.some((c) => ["United States", "Israel", "France", "Germany", "Spain", "Italy", "United Kingdom"].includes(c))) return 0.7;
  return 0.5;
}

function scoreRecency(pubDate: string): number {
  const days = (Date.now() - new Date(pubDate).getTime()) / (24 * 3600 * 1000);
  if (days <= 7) return 1.0;
  if (days <= 30) return 0.85;
  if (days <= 90) return 0.7;
  if (days <= 365) return 0.4;
  return 0.1;
}

export function scoreRelevance(f: ScorableFinding): RelevanceScore {
  const molecular = scoreMolecular(f.text);
  const clinical = scoreClinical(f.text);
  const evidence = scoreEvidence(f);
  const geography = scoreGeography(f.countries);
  const recency = scoreRecency(f.pub_date);

  const total =
    molecular * WEIGHTS.molecular +
    clinical * WEIGHTS.clinical +
    evidence * WEIGHTS.evidence +
    geography * WEIGHTS.geography +
    recency * WEIGHTS.recency;

  const bucket: RelevanceScore["bucket"] =
    total >= 0.85 ? "alert" : total >= 0.70 ? "digest" : total >= 0.50 ? "queryable" : "background";

  return {
    total: Math.round(total * 100) / 100,
    factors: { molecular, clinical, evidence, geography, recency },
    bucket,
  };
}

// Re-export profile reference for downstream code that wants to display
// which Boris features drove a high score.
export { BORIS_PROFILE };
