import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  const { data, error } = await supabase
    .from("watch_list")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, items: data });
}

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as {
    kind: "nct" | "drug" | "author" | "institution" | "topic";
    value: string;
    weight?: number;
    note?: string;
  };
  const { data, error } = await supabase
    .from("watch_list")
    .insert({ ...body, created_at: new Date().toISOString() })
    .select("*")
    .single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}

export async function DELETE(req: Request): Promise<Response> {
  const { id } = (await req.json()) as { id: string };
  const { error } = await supabase.from("watch_list").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
