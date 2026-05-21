import { supabase } from "../../../lib/supabase";

interface DigestRow {
  id: string;
  digest_date: string;
  body: string;
  finding_count: number;
  alert_count: number;
}

export default async function DailyDigest(): Promise<JSX.Element> {
  const { data, error } = await supabase
    .from("research_digests")
    .select("*")
    .order("digest_date", { ascending: false })
    .limit(1)
    .maybeSingle<DigestRow>();

  if (error) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-900">Error al cargar digesto</h2>
        <p className="text-sm text-red-700">{error.message}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Digesto de hoy</h2>
        <p className="mt-2 text-sm text-neutral-600">
          Aún no hay digesto generado. La búsqueda programada corre a las 07:00 hora Chile.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <header className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Digesto · {data.digest_date}</h2>
        <span className="text-xs text-neutral-500">
          {data.alert_count} alerta{data.alert_count === 1 ? "" : "s"} · {data.finding_count} hallazgo
          {data.finding_count === 1 ? "" : "s"}
        </span>
      </header>
      <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-900">{data.body}</pre>
    </section>
  );
}
