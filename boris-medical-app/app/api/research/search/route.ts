import { NextResponse } from "next/server";
import { searchPubMed } from "../../../../lib/research/pubmed-search";
import { searchCtGov } from "../../../../lib/research/ctgov-search";
import { scoreRelevance } from "../../../../lib/research/relevance-scoring";

export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
  const { query, since_date } = (await req.json()) as { query: string; since_date?: string };

  const [pubmed, ctgov] = await Promise.all([
    searchPubMed(query, { sinceDate: since_date, maxResults: 30 }),
    searchCtGov({ termFilter: query, maxResults: 30 }),
  ]);

  const scored = [
    ...pubmed.map((h) => ({
      kind: "pubmed" as const,
      pmid: h.pmid,
      title: h.title,
      url: h.url,
      pub_date: h.pub_date,
      score: scoreRelevance({ source: "pubmed", pub_date: h.pub_date, text: `${h.title}\n${h.abstract}` }),
    })),
    ...ctgov.map((s) => ({
      kind: "ctgov" as const,
      nct_id: s.nct_id,
      title: s.title,
      url: s.url,
      pub_date: s.last_update_posted,
      score: scoreRelevance({
        source: "ctgov",
        pub_date: s.last_update_posted || new Date().toISOString().slice(0, 10),
        text: `${s.title}\n${s.eligibility_criteria_text}`,
        countries: s.countries,
      }),
    })),
  ].sort((a, b) => b.score.total - a.score.total);

  return NextResponse.json({ ok: true, results: scored });
}
