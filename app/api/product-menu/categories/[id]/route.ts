import { NextRequest } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const supabase = createSupabaseAdminClient();

  const payload = {
    title: body.title != null ? String(body.title).trim() : undefined,
    slug: body.slug != null ? String(body.slug).trim() : undefined,
    description: body.description != null ? String(body.description) : null,
    display_order: body.display_order != null ? Number(body.display_order) : undefined,
    is_active: body.is_active != null ? Boolean(body.is_active) : undefined,
  };

  const { data, error } = await supabase
    .from('product_menu_categories')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  return Response.json({ success: true, data });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('product_menu_categories').delete().eq('id', id);
  if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  return Response.json({ success: true });
}

