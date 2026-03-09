import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { NextRequest } from 'next/server';

/**
 * GET /api/service-cards/:id
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from('service_cards')
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

/**
 * PUT /api/service-cards/:id
 * Body: { title: string; published?: boolean }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: { title?: string; published?: boolean };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const title = (body.title ?? '').trim();
  const { published } = body;

  if (!title) {
    return Response.json(
      { success: false, error: 'Title is required' },
      { status: 400 }
    );
  }

  const updateData: Record<string, unknown> = { title };
  if (typeof published === 'boolean') {
    updateData.published = published;
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('service_cards')
    .update(updateData)
    .eq('id', id);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}

/**
 * DELETE /api/service-cards/:id
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from('service_cards')
    .delete()
    .eq('id', id);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}

