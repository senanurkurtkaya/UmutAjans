import { NextRequest } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('product_menu_categories')
      .select('*')
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
  const body = await request.json().catch(() => ({}));
  const supabase = createSupabaseAdminClient();

  const payload = {
    title: String(body.title ?? '').trim(),
    slug: String(body.slug ?? '').trim(),
    description: body.description != null ? String(body.description) : null,
    display_order: Number(body.display_order ?? 0),
    is_active: Boolean(body.is_active ?? true),
  };

  if (!payload.title || !payload.slug) {
    return new Response(JSON.stringify({ success: false, error: 'title and slug are required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('product_menu_categories')
    .insert(payload)
    .select('*')
    .single();

  if (error) return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  return Response.json({ success: true, data });
}

