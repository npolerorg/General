import type { HookContext, HookResult } from "./types";
import { supabase } from "../lib/supabase";

interface AuditEntry {
  ts: string;
  session_id: string;
  agent: string;
  workflow: "daily_digest" | "doc_analysis" | "deep_dive" | "chat" | "vendor_dd" | "other";
  user_id: string | null;
  input_summary: string;
  output_summary: string;
  output_length: number;
  citations_count: number;
  hook_results: Array<{ hook: string; ok: boolean; code?: string }>;
  external_calls: Array<{ source: string; query: string; result_count: number }>;
  relevance_score?: number;
  finding_ids?: string[];
}

/**
 * Append-only audit trail. Records every agent invocation: what was asked,
 * what was searched, what was produced, which hooks passed/failed, and what
 * findings landed in research_findings.
 *
 * Stored in audit_log table. Never deleted, never updated. Used for:
 *  - reproducing past analyses
 *  - investigating drift in agent behavior
 *  - compliance evidence on the citation/evidence-level/no-recommendation rules
 */
export async function auditLog(
  output: string,
  ctx: HookContext,
): Promise<HookResult> {
  const citationsCount =
    (output.match(/\bPMID:\s*\d+\b/giu)?.length ?? 0) +
    (output.match(/\bNCT\d{8}\b/gu)?.length ?? 0) +
    (output.match(/\bdoi:\s*10\.\d{4,}/giu)?.length ?? 0);

  const entry: AuditEntry = {
    ts: new Date().toISOString(),
    session_id: ctx.session_id,
    agent: "oncology-research-agent",
    workflow: ctx.workflow ?? "other",
    user_id: ctx.user_id ?? null,
    input_summary: (ctx.input_summary ?? "").slice(0, 500),
    output_summary: output.slice(0, 500),
    output_length: output.length,
    citations_count: citationsCount,
    hook_results: ctx.hook_results ?? [],
    external_calls: ctx.external_calls ?? [],
    relevance_score: ctx.relevance_score,
    finding_ids: ctx.finding_ids,
  };

  const { error } = await supabase.from("audit_log").insert(entry);
  if (error) {
    return {
      ok: false,
      code: "AUDIT_LOG_WRITE_FAILED",
      message: `Failed to write audit_log entry: ${error.message}`,
    };
  }
  return { ok: true };
}

export default auditLog;
