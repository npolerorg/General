import type { HookContext, HookResult } from "./types";

const FORBIDDEN_PATTERNS: Array<{ pattern: RegExp; example: string }> = [
  { pattern: /\bdeber[íi]as\s+(tomar|usar|empezar|probar|considerar)\b/iu, example: "deberías tomar" },
  { pattern: /\bte\s+recomiendo\b/iu, example: "te recomiendo" },
  { pattern: /\bla\s+mejor\s+opci[óo]n\s+es\b/iu, example: "la mejor opción es" },
  { pattern: /\btendr[íi]as?\s+que\s+(tomar|usar|empezar|probar)\b/iu, example: "tendrías que tomar" },
  { pattern: /\bmi\s+recomendaci[óo]n\s+es\b/iu, example: "mi recomendación es" },
  { pattern: /\brecomiendo\s+(tomar|usar|empezar|iniciar|probar|considerar)\b/iu, example: "recomiendo tomar" },
  { pattern: /\byou\s+should\s+(take|use|start|try|consider)\b/i, example: "you should take" },
  { pattern: /\bi\s+recommend\b/i, example: "I recommend" },
  { pattern: /\bthe\s+best\s+option\s+is\b/i, example: "the best option is" },
  { pattern: /\bmy\s+recommendation\s+is\b/i, example: "my recommendation is" },
];

const ACCEPTABLE_REFRAMES = [
  "esto podría conversarse con el Dr. Samtani",
  "este es un dato para discutir en el próximo control",
  "queda como pregunta para el equipo tratante",
  "esto se puede plantear en la próxima consulta",
];

/**
 * Blocks any output that directly recommends a treatment decision.
 * The agent surfaces, analyzes, ranks. The decision belongs to Dr. Samtani
 * and the Las Condes tumor board.
 *
 * Bypass: ctx.user_explicitly_asked_for_recommendation === true. This is
 * never set automatically; it requires Boris or Noel to have explicitly
 * waived the rule for a single turn.
 */
export function validateNoTreatmentRecommendation(
  output: string,
  ctx: HookContext,
): HookResult {
  if (ctx.user_explicitly_asked_for_recommendation === true) {
    return { ok: true };
  }

  const hits = FORBIDDEN_PATTERNS.filter(({ pattern }) => pattern.test(output));
  if (hits.length === 0) return { ok: true };

  return {
    ok: false,
    code: "TREATMENT_RECOMMENDATION_FORBIDDEN",
    message:
      `Output contained recommendation language: ${hits.map((h) => `"${h.example}"`).join(", ")}. ` +
      `Reframe as one of: ${ACCEPTABLE_REFRAMES.map((r) => `"${r}"`).join(" / ")}.`,
    violations: hits.map((h) => h.example),
  };
}

export default validateNoTreatmentRecommendation;
