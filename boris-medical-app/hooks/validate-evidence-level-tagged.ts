import type { HookContext, HookResult } from "./types";

const EVIDENCE_TAG = /\[Evidencia:\s*(Alta|Moderada|Baja)\]/iu;

const STUDY_CLAIM_INDICATORS = [
  /\b(fase|phase)\s*(1|2|3|i{1,3})\b/iu,
  /\b(ensayo|estudio|trial)\s+(randomizado|prospectivo|aleatorizado|controlled)\b/iu,
  /\b(N\s*=\s*\d+|n\s*=\s*\d+)\b/u,
  /\bHR\s*=?\s*0?\.\d+/u,
  /\b(ORR|PFS|OS|mOS|mPFS|DCR|DOR)\s*=?\s*\d/u,
  /\bp\s*<\s*0?\.\d/u,
];

const NCT_ID = /\bNCT\d{8}\b/u;
const PMID = /\bPMID:\s*\d+\b/iu;

/**
 * Every claim about a study (trial, phase, N, HR, ORR/PFS/OS, p-value) must
 * carry an evidence level tag [Evidencia: Alta|Moderada|Baja] within the same
 * paragraph or sentence boundary.
 *
 * Heuristic: split into paragraphs. For each paragraph containing study-claim
 * indicators OR NCT/PMID citations, require at least one evidence tag in
 * that paragraph.
 */
export function validateEvidenceLevelTagged(
  output: string,
  _ctx: HookContext,
): HookResult {
  const paragraphs = output.split(/\n{2,}/u);
  const violations: Array<{ paragraph_index: number; excerpt: string }> = [];

  paragraphs.forEach((p, i) => {
    const hasStudyClaim =
      STUDY_CLAIM_INDICATORS.some((rx) => rx.test(p)) || NCT_ID.test(p) || PMID.test(p);
    if (!hasStudyClaim) return;
    if (EVIDENCE_TAG.test(p)) return;

    violations.push({
      paragraph_index: i,
      excerpt: p.slice(0, 140).replace(/\s+/gu, " ").trim() + (p.length > 140 ? "…" : ""),
    });
  });

  if (violations.length === 0) return { ok: true };

  return {
    ok: false,
    code: "EVIDENCE_LEVEL_MISSING",
    message:
      `Found ${violations.length} paragraph(s) with study claims missing [Evidencia: Alta|Moderada|Baja] tag. ` +
      `Add an explicit evidence tag in each.`,
    violations,
  };
}

export default validateEvidenceLevelTagged;
