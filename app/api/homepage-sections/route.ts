import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createSupabaseAdminClient();
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  let query = supabase.from('homepage_sections').select('*');
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  const { data, error } = await query;

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json(data ?? []);
}

export async function PATCH(request: NextRequest) {
  let body: { section_key?: string; content?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: 'Geçersiz JSON' },
      { status: 400 }
    );
  }

  const section_key = body?.section_key;
  const content = body?.content;

  if (typeof section_key !== 'string' || content == null || typeof content !== 'object') {
    return Response.json(
      { success: false, error: 'section_key (string) ve content (object) gerekli' },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('homepage_sections')
    .update({ content })
    .eq('section_key', section_key);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
