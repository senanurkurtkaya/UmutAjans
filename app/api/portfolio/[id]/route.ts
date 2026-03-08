import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

// GET BY ID - GET /api/portfolio/:id
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("portfolio_projects").select("*").eq("id", id).single();
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: error.code === "PGRST116" ? 404 : 500 });
    }
    return Response.json(data);
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const contentType = request.headers.get("content-type") ?? "";
    let payload: Record<string, unknown> = {};
    let coverImage: string | undefined;

    if (contentType.includes("application/json")) {
        const body = await request.json();
        payload = {
            title: body.title,
            description: body.description,
            client: body.client,
            year: body.year,
            category: body.category,
            cover_image: body.cover_image,
        };
    } else if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        payload = {
            title: formData.get("title"),
            description: formData.get("description"),
            client: formData.get("client"),
            year: formData.get("year"),
            category: formData.get("category"),
            cover_image: formData.get("cover_image"),
        };
        const file = formData.get("image") as File | null;
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
    }

    const supabase = createSupabaseAdminClient();
    const updateData: Record<string, unknown> = {};
    if (payload.title !== undefined) updateData.title = payload.title;
    if (payload.description !== undefined) updateData.description = payload.description;
    if (payload.client !== undefined) updateData.client = payload.client;
    if (payload.year !== undefined) updateData.year = payload.year;
    if (payload.category !== undefined) updateData.category = payload.category;
    if (coverImage !== undefined) updateData.cover_image = coverImage;
    else if (payload.cover_image !== undefined && payload.cover_image !== null) updateData.cover_image = payload.cover_image;

    const { error } = await supabase.from("portfolio_projects").update(updateData).eq("id", id);
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

// DELETE BY ID - DELETE /api/portfolio/:id
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
