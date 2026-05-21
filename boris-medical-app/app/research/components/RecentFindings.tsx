import Link from "next/link";
import { supabase } from "../../../lib/supabase";

interface FindingRow {
  id: string;
  source_type: string;
  source_id: string;
  title: string;
  url: string;
  pub_date: string;
  score_total: number;
  bucket: string;
  created_at: string;
}

export default async function RecentFindings(): Promise<JSX.Element> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
  const { data } = await supabase
    .from("research_findings")
    .select("*")
    .gte("created_at", thirtyDaysAgo)
    .gte("score_total", 0.5)
    .order("score_total", { ascending: false })
    .limit(40)
    .returns<FindingRow[]>();

  const items = data ?? [];

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Hallazgos recientes (30 días)</h2>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-600">Sin hallazgos sobre el umbral 0.50.</p>
      ) : (
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-neutral-500">
              <th className="py-2">Título</th>
              <th>Fuente</th>
              <th>Fecha</th>
              <th>Score</th>
              <th>Bucket</th>
            </tr>
          </thead>
          <tbody>
            {items.map((f) => (
              <tr key={f.id} className="border-t border-neutral-100">
                <td className="py-2">
                  <Link href={`/research/findings/${f.id}`} className="text-blue-700 hover:underline">
                    {f.title}
                  </Link>
                </td>
                <td className="text-xs text-neutral-600">
                  {f.source_type.toUpperCase()} {f.source_id}
                </td>
                <td className="text-xs text-neutral-600">{f.pub_date}</td>
                <td className="font-mono text-xs">{f.score_total.toFixed(2)}</td>
                <td className="text-xs">
                  <BucketBadge bucket={f.bucket} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function BucketBadge({ bucket }: { bucket: string }): JSX.Element {
  const cls =
    bucket === "alert"
      ? "bg-amber-100 text-amber-900"
      : bucket === "digest"
        ? "bg-blue-100 text-blue-900"
        : bucket === "queryable"
          ? "bg-neutral-100 text-neutral-900"
          : "bg-neutral-50 text-neutral-600";
  return <span className={`rounded px-1.5 py-0.5 ${cls}`}>{bucket}</span>;
}
