import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = createSupabaseAdminClient();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const publishedOnly = searchParams.get("published") === "true";

    if (slug) {
        const { data, error } = await supabase.from("portfolio_projects").select("*").eq("slug", slug).single();
        if (error || !data) {
            return new Response(JSON.stringify({ success: false, error: error?.message }), { status: 404 });
        }
        return Response.json(data);
    }

    let query = supabase.from("portfolio_projects").select("*").order("created_at", { ascending: false });
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
    const slug = String(formData.get("slug") ?? "").trim();
    const description = String(formData.get("description") ?? "");
    const client = String(formData.get("client") ?? "");
    const year = String(formData.get("year") ?? "");
    const category = String(formData.get("category") ?? "");
    const file = formData.get("image") as File | null;

    let coverImage = "";
    if (file && file.size > 0) {
        const supabase = createSupabaseAdminClient();
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
        const { error: uploadError } = await supabase.storage.from("portfolio").upload(fileName, file);
        if (uploadError) {
            return new Response(JSON.stringify({ success: false, error: uploadError.message }), { status: 500 });
        }
        const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(fileName);
        coverImage = urlData.publicUrl;
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("portfolio_projects").insert({
        title,
        slug,
        description,
        client,
        year,
        category,
        cover_image: coverImage,
        published: true,
    });

    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
