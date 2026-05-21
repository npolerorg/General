import { supabase } from "../../../lib/supabase";

interface WatchItem {
  id: string;
  kind: "nct" | "drug" | "author" | "institution" | "topic";
  value: string;
  weight: number | null;
  note: string | null;
  created_at: string;
}

export default async function WatchList(): Promise<JSX.Element> {
  const { data } = await supabase
    .from("watch_list")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<WatchItem[]>();

  const items = data ?? [];
  const grouped: Record<string, WatchItem[]> = {};
  for (const it of items) (grouped[it.kind] ||= []).push(it);

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Watch list</h2>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-600">
          Sin items. Agregar con <code>/boris:watchlist add [NCT|drug|author]</code>.
        </p>
      ) : (
        <div className="mt-3 space-y-4">
          {Object.entries(grouped).map(([kind, list]) => (
            <div key={kind}>
              <h3 className="text-xs uppercase text-neutral-500">{kindLabel(kind)}</h3>
              <ul className="mt-1 space-y-1">
                {list.map((it) => (
                  <li key={it.id} className="flex items-center justify-between text-sm">
                    <span>
                      <code className="text-blue-700">{it.value}</code>
                      {it.note ? <span className="ml-2 text-neutral-600">{it.note}</span> : null}
                    </span>
                    {it.weight !== null ? (
                      <span className="text-xs text-neutral-500">peso ×{it.weight}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function kindLabel(k: string): string {
  switch (k) {
    case "nct": return "Ensayos clínicos";
    case "drug": return "Drogas";
    case "author": return "Autores / grupos";
    case "institution": return "Instituciones";
    case "topic": return "Tópicos";
    default: return k;
  }
}
