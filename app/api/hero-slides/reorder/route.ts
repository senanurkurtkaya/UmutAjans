import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { NextRequest } from 'next/server';

/**
 * POST /api/hero-slides/reorder
 * Body: { ids: string[] }
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const ids = body?.ids;

  if (!Array.isArray(ids) || ids.some((id: unknown) => typeof id !== 'string')) {
    return Response.json(
      { success: false, error: 'ids array of strings required' },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  for (let i = 0; i < ids.length; i++) {
    const { error } = await supabase
      .from('hero_slides')
      .update({ display_order: i })
      .eq('id', ids[i]);
    if (error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }

  return Response.json({ success: true });
}
