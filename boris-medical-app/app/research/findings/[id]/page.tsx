import { notFound } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

interface Props {
  params: { id: string };
}

interface FindingRow {
  id: string;
  source_type: string;
  source_id: string;
  title: string;
  url: string;
  pub_date: string;
  raw: Record<string, unknown>;
  score_total: number;
  score_factors: Record<string, number>;
  bucket: string;
  analysis_format_c: string | null;
  created_at: string;
}

export default async function FindingDetail({ params }: Props): Promise<JSX.Element> {
  const { data, error } = await supabase
    .from("research_findings")
    .select("*")
    .eq("id", params.id)
    .maybeSingle<FindingRow>();

  if (error || !data) notFound();

  return (
    <article className="mx-auto max-w-3xl p-6">
      <header className="border-b border-neutral-200 pb-4">
        <p className="text-xs uppercase text-neutral-500">
          {data.source_type} · {data.source_id} · {data.pub_date}
        </p>
        <h1 className="mt-1 text-xl font-semibold">{data.title}</h1>
        <a href={data.url} className="text-sm text-blue-700 hover:underline" target="_blank" rel="noreferrer">
          {data.url}
        </a>
      </header>

      <section className="mt-6">
        <h2 className="text-sm font-semibold uppercase text-neutral-700">Score</h2>
        <p className="font-mono text-sm">
          Total: <strong>{data.score_total.toFixed(2)}</strong> · bucket: {data.bucket}
        </p>
        <ul className="mt-2 text-xs text-neutral-600">
          {Object.entries(data.score_factors ?? {}).map(([k, v]) => (
            <li key={k}>
              {k}: {v.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      {data.analysis_format_c ? (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase text-neutral-700">Análisis</h2>
          <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed">{data.analysis_format_c}</pre>
        </section>
      ) : (
        <section className="mt-6 rounded border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm text-neutral-700">
            Análisis Format C aún no generado. Disparalo desde el chat o con{" "}
            <code>/boris:deep-dive {data.source_id}</code>.
          </p>
        </section>
      )}
    </article>
  );
}
