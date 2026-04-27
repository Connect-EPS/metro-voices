import { supabase } from "../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("id", { ascending: false })
    .limit(100);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  const random = data[Math.floor(Math.random() * data.length)];
  return Response.json(random ?? null);
}

export async function POST(request) {
  try {
    const { content } = await request.json();
    const response = await fetch(
      "https://uufeykasmamlfsrzmurj.supabase.co/functions/v1/ai-filter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_JWT}`,
        },
        body: JSON.stringify({ content }),
      }
    );
    const result = await response.json();
    return Response.json(result, { status: response.status });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
