/**
 * Type contracts for things the main Boris Medical App must provide.
 * This file is documentation-as-code: when the main app is built, these
 * interfaces specify the exact surface this research-agent package depends on.
 */

export interface VerifiedNumber {
  key: string;
  value: number | string;
  unit?: string;
  as_of: string; // ISO date
  source: string; // bank statement, PMS export, lab report, etc.
  confidence: "verified" | "stated" | "estimated" | "speculative";
}

export interface MolecularProfile {
  patient_id: string;
  panel_source: string;
  validated_date: string;
  markers: Record<string, unknown>;
}

export interface ConsultPrepDigest {
  finding_id: string;
  consult_date: string;
  block_text: string;
}

/**
 * Expected MCP tools (server: `boris-medical`).
 * The main app must register these and wire them to its Supabase backend.
 */
export interface BorisMedicalMCPTools {
  get_verified_number(key: string): Promise<VerifiedNumber>;
  get_molecular_profile(): Promise<MolecularProfile>;
  search_pubmed_for_boris(query: string, sinceDate?: string): Promise<unknown>;
  search_clinical_trials_for_boris(filters: Record<string, unknown>): Promise<unknown>;
  score_relevance(finding: unknown): Promise<unknown>;
  fetch_document(url: string): Promise<string>;
  generate_consult_prep(finding_id: string): Promise<ConsultPrepDigest>;
}

/**
 * Expected sibling subagents.
 */
export interface BorisSubagents {
  "consult-prep-writer": { invoke: (finding_id: string) => Promise<ConsultPrepDigest> };
  "vendor-due-diligence": { invoke: (vendor_input: { url?: string; email_body?: string; pdf_text?: string }) => Promise<string> };
}

/**
 * Expected skills bundled with the main app.
 */
export const REQUIRED_SKILLS = ["mcrc-knowledge-base", "research-relevance-scoring", "vendor-due-diligence"] as const;

/**
 * Expected Supabase tables (DDL lives in the main app's migrations directory).
 */
export const REQUIRED_TABLES = [
  "molecular_profile",
  "verified_numbers",
  "labs",
  "imaging_studies",
  "treatment_history",
  "watch_list",
  "research_findings",
  "conversations",
  "messages",
  "alerts",
  "audit_log",
] as const;

/**
 * Canary phrase. The agent emits this in the first response of each session
 * to confirm CLAUDE.md hierarchy loaded.
 */
export const CANARY = "Listo, Boris — todo cargado." as const;
