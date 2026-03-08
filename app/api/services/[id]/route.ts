import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Service } from "@/models";
import { NextRequest } from "next/server";

// GET By ID - GET /api/services/:id
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("services").select("*").eq("id", id).single();
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: error.code === "PGRST116" ? 404 : 500 });
    }
    return Response.json(data);
}

// UPDATE By ID - PUT /api/services/:id
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const serviceValidation = await Service.safeParseAsync(body);
    if (!serviceValidation.success) {
        return new Response(JSON.stringify({ success: false, error: serviceValidation.error.message }), { status: 400 });
    }
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("services").update(serviceValidation.data).eq("id", id);
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

// PATCH - partial update (e.g. published only)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
    const { published } = body as { published?: boolean };
    if (typeof published !== 'boolean') {
        return new Response(JSON.stringify({ success: false, error: 'published boolean required' }), { status: 400 });
    }
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("services").update({ published }).eq("id", id);
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

// DELETE By ID - DELETE /api/services/:id
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}