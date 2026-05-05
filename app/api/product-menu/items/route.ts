import { NextRequest } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

const BUCKET = 'product-menu-images';

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('product_menu_items')
      .select('*, category:product_menu_categories(id,title,slug)')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }
    return Response.json(data ?? []);
  } catch (e) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          e instanceof Error
            ? e.message
            : 'Supabase admin client oluşturulamadı. SUPABASE_SERVICE_ROLE_KEY var mı?',
      }),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';
  const supabase = createSupabaseAdminClient();

  let payload: Record<string, unknown> = {};

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    const file = form.get('image') as File | null;

    let imageUrl: string | null = null;
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
      image_url: imageUrl,
      display_order: Number(form.get('display_order') ?? 0),
      is_active: String(form.get('is_active') ?? 'true') === 'true',
    };
  } else {
    const body = await request.json().catch(() => ({}));
    payload = {
      category_id: String(body.category_id ?? ''),
      name: String(body.name ?? '').trim(),
      slug: String(body.slug ?? '').trim(),
      short_description: body.short_description != null ? String(body.short_description) : null,
      image_url: body.image_url != null ? String(body.image_url) : null,
      display_order: Number(body.display_order ?? 0),
      is_active: Boolean(body.is_active ?? true),
    };
  }

  if (!payload.category_id || !payload.name || !payload.slug) {
    return new Response(JSON.stringify({ success: false, error: 'category_id, name, slug are required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('product_menu_items')
    .insert(payload)
    .select('*, category:product_menu_categories(id,title,slug)')
    .single();

  if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  return Response.json({ success: true, data });
}

