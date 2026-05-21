import Link from "next/link";
import { supabase } from "../../../lib/supabase";

interface AlertRow {
  id: string;
  finding_id: string | null;
  source_type: string;
  source_id: string;
  title: string;
  url: string;
  score: number;
  acknowledged: boolean;
  created_at: string;
}

export default async function ActiveAlerts(): Promise<JSX.Element> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const { data } = await supabase
    .from("alerts")
    .select("*")
    .eq("acknowledged", false)
    .gte("created_at", sevenDaysAgo)
    .order("score", { ascending: false })
    .returns<AlertRow[]>();

  const items = data ?? [];

  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-6">
      <h2 className="text-lg font-semibold text-amber-900">
        Alertas activas ({items.length})
      </h2>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-amber-800">Sin alertas pendientes en los últimos 7 días.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((a) => (
            <li key={a.id} className="border-l-2 border-amber-400 pl-3">
              <Link
                href={a.finding_id ? `/research/findings/${a.finding_id}` : a.url}
                className="text-sm font-medium text-amber-900 hover:underline"
              >
                {a.title}
              </Link>
              <p className="text-xs text-amber-700">
                {a.source_type.toUpperCase()} {a.source_id} · relevancia {a.score.toFixed(2)} ·{" "}
                {new Date(a.created_at).toLocaleDateString("es-CL")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
