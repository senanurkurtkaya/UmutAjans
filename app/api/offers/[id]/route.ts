import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

/**
 * GET /api/offers/:id
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return Response.json(
      { success: false, error: error?.message ?? 'Not found' },
      { status: error?.code === 'PGRST116' ? 404 : 500 }
    );
  }

  return Response.json(data);
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
  const status = body?.status;

  if (status !== 'new' && status !== 'done') {
    return Response.json(
      { success: false, error: 'status must be "new" or "done"' },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('offers')
    .update({ status })
    .eq('id', id);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
