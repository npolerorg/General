import type { Hook, HookContext, HookResult } from "./types";
import validateCitations from "./validate-citations";
import validateEvidenceLevelTagged from "./validate-evidence-level-tagged";
import validateNoTreatmentRecommendation from "./validate-no-treatment-recommendation";
import validateNoProgrosis from "./validate-no-prognosis";
import validateConfidenceStated from "./validate-confidence-stated";
import auditLog from "./audit-log";

export const PRE_OUTPUT_HOOKS: Array<{ name: string; fn: Hook }> = [
  { name: "validate-citations", fn: validateCitations },
  { name: "validate-evidence-level-tagged", fn: validateEvidenceLevelTagged },
  { name: "validate-no-treatment-recommendation", fn: validateNoTreatmentRecommendation },
  { name: "validate-no-prognosis", fn: validateNoProgrosis },
  { name: "validate-confidence-stated", fn: validateConfidenceStated },
];

export const POST_OUTPUT_HOOKS: Array<{ name: string; fn: Hook }> = [
  { name: "audit-log", fn: auditLog },
];

export async function runHooks(
  output: string,
  ctx: HookContext,
  hooks: Array<{ name: string; fn: Hook }>,
): Promise<{ pass: boolean; results: Array<{ hook: string; result: HookResult }> }> {
  const results: Array<{ hook: string; result: HookResult }> = [];
  let pass = true;
  for (const { name, fn } of hooks) {
    const result = await fn(output, ctx);
    results.push({ hook: name, result });
    if (!result.ok) pass = false;
  }
  return { pass, results };
}

export type { HookContext, HookResult, Hook };
