import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { PRE_OUTPUT_HOOKS, POST_OUTPUT_HOOKS, runHooks, type HookContext } from "../../../../hooks";

export const runtime = "nodejs";
export const maxDuration = 120;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface AnalyzeRequest {
  session_id: string;
  user_id: string;
  input_kind: "url" | "pdf_text" | "email_body" | "paste";
  content: string;
  document_type_hint?: "paper" | "preprint" | "abstract" | "regulatory" | "press_release" | "vendor_marketing" | "news";
}

const ANALYZE_SYSTEM = `You are the document-analysis sub-workflow of the oncology-research-agent.

Task:
1. Identify the document type (peer-reviewed paper, preprint, conference abstract, regulatory document, press release, vendor marketing, news).
2. If it is vendor marketing, return ONLY the literal string "DELEGATE: vendor-due-diligence" and stop.
3. Otherwise, produce a Format C analysis in Spanish (see CLAUDE.md). Required sections:
   RESUMEN EJECUTIVO / DATOS / INTERPRETACIÓN / APLICABILIDAD A BORIS / LO QUE NO SABEMOS / PREGUNTAS PARA SAMTANI / FUENTES / Confianza.
4. Every drug or trial claim must carry a PMID, NCT, DOI, conference abstract ID, or regulatory reference.
5. Every study claim must carry [Evidencia: Alta|Moderada|Baja].
6. End with "Confianza: Alta|Moderada|Baja — [one sentence on why]".
`;

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as AnalyzeRequest;

  const userTurn = [
    `Document kind: ${body.input_kind}`,
    body.document_type_hint ? `Hinted type: ${body.document_type_hint}` : "",
    "",
    "Content:",
    body.content.slice(0, 50_000),
  ]
    .filter(Boolean)
    .join("\n");

  const response = await anthropic.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 8192,
    system: ANALYZE_SYSTEM,
    messages: [{ role: "user", content: userTurn }],
  });

  const output = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { text: string }).text)
    .join("\n");

  if (output.trim().startsWith("DELEGATE: vendor-due-diligence")) {
    return NextResponse.json({ ok: true, delegate: "vendor-due-diligence" });
  }

  const ctx: HookContext = {
    session_id: body.session_id,
    user_id: body.user_id,
    workflow: "doc_analysis",
    input_summary: body.content.slice(0, 500),
  };

  const pre = await runHooks(output, ctx, PRE_OUTPUT_HOOKS);
  if (!pre.pass) {
    return NextResponse.json({ ok: false, error: "hooks_failed", results: pre.results, draft: output }, { status: 422 });
  }
  ctx.hook_results = pre.results.map((r) => ({ hook: r.hook, ok: r.result.ok }));
  await runHooks(output, ctx, POST_OUTPUT_HOOKS);

  return NextResponse.json({ ok: true, output });
}
