import { supabase } from "../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data[0] ?? null);
}

export async function POST(request) {
  const { content } = await request.json();

  const { data, error } = await supabase
    .from("messages")
    .insert([{ content }])
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { status: 201 });
}
