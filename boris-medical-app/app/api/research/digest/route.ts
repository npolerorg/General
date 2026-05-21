import { NextResponse } from "next/server";
import { buildDailyDigest } from "../../../../lib/research/digest-builder";
import { supabase } from "../../../../lib/supabase";

/**
 * Cron endpoint. Hit by Vercel cron at `0 11 * * *` UTC = 07:00 America/Santiago.
 *
 * Authentication: requires `Authorization: Bearer ${CRON_SECRET}`. Vercel
 * automatically attaches this for cron-triggered requests.
 */
export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(req: Request): Promise<Response> {
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const now = new Date();
  const { body, findings, alerts } = await buildDailyDigest(now);

  await supabase.from("research_digests").insert({
    digest_date: now.toISOString().slice(0, 10),
    body,
    finding_count: findings.length,
    alert_count: alerts.length,
  });

  if (alerts.length > 0) {
    await supabase.from("alerts").insert(
      alerts.map((a) => ({
        finding_id: a.id ?? null,
        source_type: a.source_type,
        source_id: a.source_id,
        title: a.title,
        url: a.url,
        score: a.score.total,
        acknowledged: false,
        created_at: a.created_at,
      })),
    );
  }

  return NextResponse.json({
    ok: true,
    digest_date: now.toISOString().slice(0, 10),
    finding_count: findings.length,
    alert_count: alerts.length,
  });
}
