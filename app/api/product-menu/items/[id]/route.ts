import { NextRequest } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

const BUCKET = 'product-menu-images';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('product_menu_items')
    .select('*, category:product_menu_categories(id,title,slug)')
    .eq('id', id)
    .single();

  if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  return Response.json(data);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const contentType = request.headers.get('content-type') ?? '';
  const supabase = createSupabaseAdminClient();

  let payload: Record<string, unknown> = {};

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    const file = form.get('image') as File | null;

    let imageUrl: string | null | undefined = undefined;
    if (file && file.size > 0) {
      const fileName = `${Date.now()}-${String(form.get('slug') ?? 'image').replace(/\s/g, '-')}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (uploadError) {
        return new Response(JSON.stringify({ success: false, error: uploadError.message }), { status: 500 });
      }
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    payload = {
      category_id: String(form.get('category_id') ?? ''),
      name: String(form.get('name') ?? '').trim(),
      slug: String(form.get('slug') ?? '').trim(),
      short_description: form.get('short_description') != null ? String(form.get('short_description')) : null,
      ...(imageUrl !== undefined ? { image_url: imageUrl } : {}),
      display_order: Number(form.get('display_order') ?? 0),
      is_active: String(form.get('is_active') ?? 'true') === 'true',
    };
  } else {
    const body = await request.json().catch(() => ({}));
    payload = {
      category_id: body.category_id != null ? String(body.category_id) : undefined,
      name: body.name != null ? String(body.name).trim() : undefined,
      slug: body.slug != null ? String(body.slug).trim() : undefined,
      short_description: body.short_description != null ? String(body.short_description) : null,
      image_url: body.image_url != null ? String(body.image_url) : undefined,
      display_order: body.display_order != null ? Number(body.display_order) : undefined,
      is_active: body.is_active != null ? Boolean(body.is_active) : undefined,
    };
  }

  const { data, error } = await supabase
    .from('product_menu_items')
    .update(payload)
    .eq('id', id)
    .select('*, category:product_menu_categories(id,title,slug)')
    .single();

  if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  return Response.json({ success: true, data });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('product_menu_items').delete().eq('id', id);
  if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  return Response.json({ success: true });
}

