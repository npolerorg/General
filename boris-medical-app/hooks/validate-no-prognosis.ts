import type { HookContext, HookResult } from "./types";

const PROGNOSIS_INDICATORS = [
  /\b(supervivencia|expectativa de vida|cu[áa]nto le queda|cu[áa]ntos meses|cu[áa]ntos a[ñn]os)\b/iu,
  /\b(mediana de supervivencia|median survival|life expectancy|survival probability)\b/iu,
  /\b(probabilidad de sobrevivir|chance of survival|5-year survival|survival rate)\b/iu,
  /\b(pron[óo]stico)\b/iu,
];

const HEDGE_LANGUAGE = [
  /\b(no podemos|no puedo|no se puede|cannot)\s+(predecir|estimar|saber|know|predict|estimate)\b/iu,
  /\bvar[íi]a (mucho|ampliamente|considerablemente)\b/iu,
  /\bdepende de m[úu]ltiples factores\b/iu,
  /\bconversar con (el|tu) (Dr\.?\s+Samtani|equipo tratante|oncolog[ao])\b/iu,
];

/**
 * Blocks prognosis discussion unless the user explicitly requested it
 * (ctx.user_explicitly_requested_prognosis === true), which is set when
 * the input contains a direct prognosis question from Boris or Noel.
 *
 * Even when bypassed, the output must contain hedge language. If the user
 * asked for prognosis but the output reads as a point estimate, fail it.
 */
export function validateNoProgrosis(output: string, ctx: HookContext): HookResult {
  const triggersFound = PROGNOSIS_INDICATORS.filter((rx) => rx.test(output));
  if (triggersFound.length === 0) return { ok: true };

  if (!ctx.user_explicitly_requested_prognosis) {
    return {
      ok: false,
      code: "PROGNOSIS_NOT_REQUESTED",
      message:
        `Output discusses prognosis but the user did not explicitly request it. ` +
        `Remove prognosis language, or set ctx.user_explicitly_requested_prognosis = true ` +
        `only if Boris or Noel asked directly.`,
    };
  }

  const hasHedge = HEDGE_LANGUAGE.some((rx) => rx.test(output));
  if (!hasHedge) {
    return {
      ok: false,
      code: "PROGNOSIS_NO_HEDGE",
      message:
        `Prognosis discussed but output lacks required hedge language (variability statement + redirect to Dr. Samtani). ` +
        `Add explicit hedging: range framing, "varía ampliamente", "depende de múltiples factores", "conversar con el Dr. Samtani".`,
    };
  }

  return { ok: true };
}

export default validateNoProgrosis;
