"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  ts: string;
}

export default function ResearchChat(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(): Promise<void> {
    const trimmed = input.trim();
    if (!trimmed || busy) return;

    const userMsg: Message = { role: "user", content: trimmed, ts: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/research/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId(),
          user_id: "current",
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const json = (await res.json()) as { ok: boolean; output?: string; error?: string; draft?: string };
      if (!json.ok) {
        setError(`Hooks bloquearon el output: ${json.error}`);
        if (json.draft) {
          setMessages((m) => [...m, { role: "assistant", content: `[DRAFT BLOQUEADO]\n\n${json.draft}`, ts: new Date().toISOString() }]);
        }
      } else if (json.output) {
        setMessages((m) => [...m, { role: "assistant", content: json.output ?? "", ts: new Date().toISOString() }]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-200 bg-white">
      <header className="border-b border-neutral-200 p-4">
        <h2 className="text-sm font-semibold">Chat con el agente</h2>
        <p className="text-xs text-neutral-500">Investigación clínica · español</p>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-xs text-neutral-500">
            Pegá una URL, subí un PDF, o preguntá. Ejemplos: <em>¿qué hay nuevo sobre rechallenge anti-EGFR
            guiado por ctDNA?</em>
          </p>
        ) : null}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-full whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                m.role === "user" ? "bg-blue-50 text-blue-900" : "bg-neutral-50 text-neutral-900"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {busy ? <p className="text-xs text-neutral-500">pensando…</p> : null}
        {error ? <p className="text-xs text-red-700">{error}</p> : null}
        <div ref={endRef} />
      </div>
      <footer className="border-t border-neutral-200 p-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void send();
            }}
            placeholder="Preguntá o pegá una URL…"
            className="flex-1 rounded border border-neutral-300 px-2 py-1 text-sm"
            rows={2}
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={busy}
            className="rounded bg-neutral-900 px-3 py-1 text-sm text-white disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
        <p className="mt-1 text-[10px] text-neutral-500">⌘/Ctrl + Enter para enviar</p>
      </footer>
    </div>
  );
}

function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const k = "boris.research.session";
  let id = window.sessionStorage.getItem(k);
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(k, id);
  }
  return id;
}
