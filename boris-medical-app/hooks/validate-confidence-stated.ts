import type { HookContext, HookResult } from "./types";

const CONFIDENCE_TAIL = /Confianza:\s*(Alta|Moderada|Baja)\s*[—\-:]?\s*[^\n]{8,}/iu;
const CONFIDENCE_TAIL_EN = /Confidence:\s*(high|moderate|low)\s*[—\-:]?\s*[^\n]{8,}/iu;

/**
 * Every output must end with an explicit confidence statement carrying:
 *  - level (Alta/Moderada/Baja, or English equivalent if response is English)
 *  - one-sentence rationale (≥ 8 chars)
 *
 * The statement must appear within the last 8 non-empty lines of the output.
 */
export function validateConfidenceStated(
  output: string,
  _ctx: HookContext,
): HookResult {
  const lines = output.split(/\n/u).filter((l) => l.trim().length > 0);
  const tail = lines.slice(-8).join("\n");

  if (CONFIDENCE_TAIL.test(tail) || CONFIDENCE_TAIL_EN.test(tail)) {
    return { ok: true };
  }

  return {
    ok: false,
    code: "CONFIDENCE_STATEMENT_MISSING",
    message:
      `Output must end with "Confianza: Alta|Moderada|Baja — [one sentence on why]" (or English "Confidence: high|moderate|low — …"). ` +
      `Not found in the last 8 non-empty lines.`,
  };
}

export default validateConfidenceStated;
