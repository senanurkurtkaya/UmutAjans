import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = await createClient();

  const response = await fetch(
    "https://pvvdwlysmlkqzpuebbqm.supabase.co/rest/v1/services",
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    }
  );

  const data = await response.json();

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}