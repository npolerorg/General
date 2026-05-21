/**
 * Format A / B / C templates. Spanish by default.
 * These are emitted by the agent and consumed by the UI and notification layer.
 */

export interface FormatAInput {
  title_es: string;
  source: string; // "PMID: 12345678" | "NCT05425940" | "DOI: 10.1056/…"
  evidence_level: "Alta" | "Moderada" | "Baja";
  why_matters_es: string; // 2-3 sentences
  suggested_action_es: string;
  confidence: "Alta" | "Moderada" | "Baja";
  confidence_reason_es: string;
}

export interface FormatBInput {
  title_es: string;
  authors_journal: string;
  pmid_or_doi: string;
  url: string;
  design: string;
  primary_finding_es: string;
  applicability_es: string;
  evidence_level: "Alta" | "Moderada" | "Baja";
  confidence: "Alta" | "Moderada" | "Baja";
  confidence_reason_es: string;
}

export interface FormatCInput {
  topic_or_title_es: string;
  executive_summary_es: string;
  data_block: string;
  interpretation_es: string;
  applicability_es: string;
  unknowns_es: string;
  questions_for_samtani_es: string[];
  sources: Array<{ label: string; identifier: string; url: string }>;
  confidence: "Alta" | "Moderada" | "Baja";
  confidence_reason_es: string;
}

export function renderFormatA(x: FormatAInput): string {
  return [
    `[ALERTA — relevancia alta]`,
    ``,
    x.title_es,
    `Fuente: ${x.source}`,
    `Nivel de evidencia: ${x.evidence_level}`,
    `Por qué importa: ${x.why_matters_es}`,
    ``,
    `Sugerencia: ${x.suggested_action_es}`,
    ``,
    `Confianza: ${x.confidence} — ${x.confidence_reason_es}`,
  ].join("\n");
}

export function renderFormatB(x: FormatBInput): string {
  return [
    `TÍTULO: ${x.title_es}`,
    `Autores y revista: ${x.authors_journal}`,
    `PMID/DOI: ${x.pmid_or_doi} (${x.url})`,
    `Diseño: ${x.design}`,
    `Hallazgo principal: ${x.primary_finding_es}`,
    `Aplicabilidad a Boris: ${x.applicability_es}`,
    `Nivel de evidencia: ${x.evidence_level}`,
    `Confianza: ${x.confidence} — ${x.confidence_reason_es}`,
  ].join("\n");
}

export function renderFormatC(x: FormatCInput): string {
  const sources = x.sources.map((s) => `- ${s.label} — ${s.identifier} (${s.url})`).join("\n");
  const questions = x.questions_for_samtani_es.map((q, i) => `${i + 1}. ${q}`).join("\n");
  return [
    `ANÁLISIS — ${x.topic_or_title_es}`,
    ``,
    `RESUMEN EJECUTIVO`,
    x.executive_summary_es,
    ``,
    `DATOS`,
    x.data_block,
    ``,
    `INTERPRETACIÓN`,
    x.interpretation_es,
    ``,
    `APLICABILIDAD A BORIS`,
    x.applicability_es,
    ``,
    `LO QUE NO SABEMOS`,
    x.unknowns_es,
    ``,
    `PREGUNTAS PARA SAMTANI`,
    questions,
    ``,
    `FUENTES`,
    sources,
    ``,
    `Confianza: ${x.confidence} — ${x.confidence_reason_es}`,
  ].join("\n");
}

const SPANISH_WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const SPANISH_MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function spanishDate(d: Date): string {
  const wd = SPANISH_WEEKDAYS[d.getDay()];
  const day = d.getDate();
  const mo = SPANISH_MONTHS[d.getMonth()];
  const yr = d.getFullYear();
  return `${wd.charAt(0).toUpperCase() + wd.slice(1)} ${day} de ${mo} de ${yr}`;
}

export function emptyDigestBody(timestampIso: string): string {
  return `Hoy no hubo hallazgos relevantes nuevos en el universo monitoreado. Última búsqueda completada: ${timestampIso}. Próxima búsqueda: mañana 07:00 hora Chile.`;
}
