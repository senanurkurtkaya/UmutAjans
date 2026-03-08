import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

// GET ALL PRODUCTS - GET /api/products 
export async function GET(request: NextRequest) {
    const supabase = createSupabaseAdminClient();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";
    let query = supabase.from("products").select("*").order("created_at", { ascending: false });
    if (publishedOnly) query = query.eq("published", true);
    const { data, error } = await query;
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return Response.json(data ?? []);
}

// CREATE PRODUCT - POST /api/products
export async function POST(request: NextRequest) {
    const contentType = request.headers.get("content-type") ?? "";
    let title = "";
    let description = "";
    let imageUrl: string | null = null;

    if (contentType.includes("application/json")) {
        const body = await request.json();
        title = String(body.title ?? "").trim();
        if (!title) {
            return new Response(JSON.stringify({ success: false, error: "Title is required" }), { status: 400 });
        }
        if (body.image_url != null) imageUrl = String(body.image_url);
    } else if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        title = String(formData.get("title") ?? "").trim();
        description = String(formData.get("description") ?? "");
        const file = formData.get("image") as File | null;
        if (file && file.size > 0) {
            const supabase = createSupabaseAdminClient();
            const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
            const { error: uploadError } = await supabase.storage.from("products").upload(fileName, file, { cacheControl: "3600", upsert: false });
            if (uploadError) {
                return new Response(JSON.stringify({ success: false, error: uploadError.message }), { status: 500 });
            }
            const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
        }
    } else {
        return new Response(JSON.stringify({ success: false, error: "Content-Type must be application/json or multipart/form-data" }), { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("products").insert({
        title,
        description: description || "",
        image_url: imageUrl ?? "",
        published: true,
    });

    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
