import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

/**
 * GET /api/
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const project_id = searchParams.get('project_id');

  if (!project_id) {
    return Response.json(
      { success: false, error: 'project_id required' },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('portfolio_images')
    .select('*')
    .eq('project_id', project_id)
    .order('display_order', { ascending: true });

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json(data ?? []);
}
