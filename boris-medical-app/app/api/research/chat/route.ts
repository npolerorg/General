import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { PRE_OUTPUT_HOOKS, POST_OUTPUT_HOOKS, runHooks, type HookContext } from "../../../../hooks";
import { supabase } from "../../../../lib/supabase";
import { BORIS_PROFILE } from "../../../../lib/research/boris-profile";
import { CANARY } from "../../../../lib/main-app-deps";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT_PATH = "agents/oncology-research-agent.md";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  session_id: string;
  user_id: string;
  messages: ChatMessage[];
  workflow?: HookContext["workflow"];
  user_explicitly_requested_prognosis?: boolean;
  user_explicitly_asked_for_recommendation?: boolean;
}

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as ChatRequest;

  const systemPrompt = await loadSystemPrompt();
  const isFirstTurn = body.messages.filter((m) => m.role === "assistant").length === 0;

  const response = await anthropic.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    system: systemPrompt + (isFirstTurn ? `\n\nThis is the first turn of the session. Begin your response with the canary phrase: "${CANARY}"` : ""),
    messages: body.messages,
  });

  const output = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { text: string }).text)
    .join("\n");

  const ctx: HookContext = {
    session_id: body.session_id,
    user_id: body.user_id,
    workflow: body.workflow ?? "chat",
    input_summary: body.messages[body.messages.length - 1]?.content ?? "",
    user_explicitly_requested_prognosis: body.user_explicitly_requested_prognosis,
    user_explicitly_asked_for_recommendation: body.user_explicitly_asked_for_recommendation,
  };

  const pre = await runHooks(output, ctx, PRE_OUTPUT_HOOKS);
  if (!pre.pass) {
    return NextResponse.json(
      {
        ok: false,
        error: "hooks_failed",
        results: pre.results,
        draft: output,
      },
      { status: 422 },
    );
  }

  ctx.hook_results = pre.results.map((r) => ({
    hook: r.hook,
    ok: r.result.ok,
    code: r.result.ok ? undefined : r.result.code,
  }));
  await runHooks(output, ctx, POST_OUTPUT_HOOKS);

  await supabase.from("messages").insert([
    { session_id: body.session_id, role: "user", content: body.messages[body.messages.length - 1]?.content, created_at: new Date().toISOString() },
    { session_id: body.session_id, role: "assistant", content: output, created_at: new Date().toISOString() },
  ]);

  return NextResponse.json({ ok: true, output });
}

async function loadSystemPrompt(): Promise<string> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const file = path.join(process.cwd(), SYSTEM_PROMPT_PATH);
  const raw = await fs.readFile(file, "utf-8");
  const frontmatterEnd = raw.indexOf("\n---\n", 4);
  const systemPrompt = frontmatterEnd === -1 ? raw : raw.slice(frontmatterEnd + 5);
  return systemPrompt + `\n\n[INJECTED CONTEXT — Boris profile]\n${JSON.stringify(BORIS_PROFILE, null, 2)}`;
}
