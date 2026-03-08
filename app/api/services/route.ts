import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Service } from "@/models";
import { NextRequest } from "next/server";

// CRUD
// Create - POST /api/services
// Read - GET /api/services
// Update - PUT /api/services/:id 
// Delete - DELETE /api/services/:id

// GET ALL SERVICES - GET /api/services
export async function GET(request: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    let query = supabase.from('services').select('*').order('created_at', { ascending: false });
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;

    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
    return Response.json(data ?? []);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const serviceValidation = await Service.safeParseAsync(body);

    if (!serviceValidation.success) {
        return new Response(JSON.stringify({ success: false, error: serviceValidation.error.message }), { status: 400 });
    }

    console.log("✅ Validated Service Data:", serviceValidation.data);

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('services').insert(serviceValidation.data);

    if (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}


