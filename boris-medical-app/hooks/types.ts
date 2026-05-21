export interface HookContext {
  session_id: string;
  user_id?: string | null;
  workflow?: "daily_digest" | "doc_analysis" | "deep_dive" | "chat" | "vendor_dd" | "other";
  input_summary?: string;
  user_explicitly_requested_prognosis?: boolean;
  user_explicitly_asked_for_recommendation?: boolean;
  hook_results?: Array<{ hook: string; ok: boolean; code?: string }>;
  external_calls?: Array<{ source: string; query: string; result_count: number }>;
  relevance_score?: number;
  finding_ids?: string[];
}

export type HookResult =
  | { ok: true }
  | {
      ok: false;
      code: string;
      message: string;
      violations?: unknown;
    };

export type Hook = (output: string, ctx: HookContext) => HookResult | Promise<HookResult>;
