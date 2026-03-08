import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = createSupabaseAdminClient();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    let query = supabase.from("service_cards").select("*").order("created_at", { ascending: false });
    if (publishedOnly) query = query.eq("published", true);
    const { data, error } = await query;
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return Response.json(data ?? []);
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const file = formData.get("image") as File | null;

    if (!title) {
        return new Response(JSON.stringify({ success: false, error: "Title is required" }), { status: 400 });
    }
    if (!file || file.size === 0) {
        return new Response(JSON.stringify({ success: false, error: "Image is required" }), { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from("service-images").upload(fileName, file, { upsert: true });
    if (uploadError) {
        return new Response(JSON.stringify({ success: false, error: uploadError.message }), { status: 500 });
    }
    const { data: urlData } = supabase.storage.from("service-images").getPublicUrl(fileName);
    const imageUrl = urlData.publicUrl;

    const { error } = await supabase.from("service_cards").insert({
        title,
        image_url: imageUrl,
        published: true,
    });

    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
