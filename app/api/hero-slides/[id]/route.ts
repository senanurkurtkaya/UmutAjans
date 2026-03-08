import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { NextRequest } from 'next/server';

const HERO_BUCKET = process.env.HERO_SLIDES_BUCKET ?? 'media';
const HERO_STORAGE_PATH = 'hero';

function heroImagePublicUrl(path: string): string {
  const base = process.env.SUPABASE_URL ?? '';
  return `${base}/storage/v1/object/public/${HERO_BUCKET}/${path}`;
}

/**
 * GET /api/hero-slides/:id
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from('hero_slides')
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
 * PUT /api/hero-slides/:id - Full update
 * FormData: title, subtitle, button_text, button_link, order, image (file)
 * Akış: Upload → Public URL oluştur → hero_slides.image_url güncelle (yeni görsel varsa)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();
  const title = String(formData.get('title') ?? '').trim();
  const subtitle = String(formData.get('subtitle') ?? '').trim();
  const button_text = String(formData.get('button_text') ?? '').trim();
  const button_link = (formData.get('button_link') as string)?.trim() || null;
  const order = Number(formData.get('order')) || 0;
  const file = formData.get('image') as File | null;

  const supabase = createSupabaseAdminClient();
  const payload: Record<string, unknown> = {
    title,
    subtitle,
    button_text,
    button_link,
    display_order: order,
  };

  const hasFile = file && typeof file === 'object' && 'size' in file && file.size > 0;
  if (hasFile) {
    const fileName = `${Date.now()}-${(file.name || 'image').replace(/\s/g, '-')}`;
    const storagePath = `${HERO_STORAGE_PATH}/${fileName}`;
    const { data: uploadData, error: upErr } = await supabase.storage
      .from(HERO_BUCKET)
      .upload(storagePath, file, { upsert: true });

    if (upErr) {
      return Response.json(
        { success: false, error: `Görsel yüklenemedi: ${upErr.message}` },
        { status: 500 }
      );
    }
    payload.image_url = uploadData?.path
      ? heroImagePublicUrl(uploadData.path)
      : heroImagePublicUrl(storagePath);
  }

  const { error } = await supabase.from('hero_slides').update(payload).eq('id', id);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}

/**
 * PATCH /api/hero-slides/:id - Toggle is_active
 * Body: { is_active: boolean }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const is_active = body?.is_active;

  if (typeof is_active !== 'boolean') {
    return Response.json(
      { success: false, error: 'is_active boolean required' },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from('hero_slides').update({ is_active }).eq('id', id);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}

/**
 * DELETE /api/hero-slides/:id
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from('hero_slides').delete().eq('id', id);

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
