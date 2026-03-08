import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { NextRequest } from 'next/server';

const HERO_BUCKET = process.env.HERO_SLIDES_BUCKET ?? 'media';
const HERO_STORAGE_PATH = 'hero';

function heroImagePublicUrl(path: string): string {
  const base = process.env.SUPABASE_URL ?? '';
  return `${base}/storage/v1/object/public/${HERO_BUCKET}/${path}`;
}

/**
 * GET /api/hero-slides (?active=true for only active)
 */
export async function GET(request: NextRequest) {
  const supabase = createSupabaseAdminClient();
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  let query = supabase
    .from('hero_slides')
    .select('*')
    .order('display_order', { ascending: true });

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

const createHeroSlideSchema = z.object({
  image_url: z.string().min(1, 'Hero görseli gerekli'),
});

/**
 * POST /api/hero-slides - Create slide
 * FormData: title, subtitle, button_text, button_link, order, image (file, zorunlu)
 * Akış: Upload → Public URL oluştur → hero_slides.image_url güncelle
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = String(formData.get('title') ?? '').trim();
  const subtitle = String(formData.get('subtitle') ?? '').trim();
  const button_text = String(formData.get('button_text') ?? '').trim();
  const button_link = (formData.get('button_link') as string)?.trim() || null;
  const order = Number(formData.get('order')) || 0;
  const file = formData.get('image') as File | null;

  const supabase = createSupabaseAdminClient();
  let imageUrl: string | null = null;

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
    if (uploadData?.path) {
      imageUrl = heroImagePublicUrl(uploadData.path);
    } else {
      imageUrl = heroImagePublicUrl(storagePath);
    }
  }

  const validated = createHeroSlideSchema.safeParse({ image_url: imageUrl ?? '' });
  if (!validated.success) {
    return Response.json(
      { success: false, error: validated.error.errors[0]?.message ?? 'Hero görseli gerekli' },
      { status: 400 }
    );
  }

  const { error } = await supabase.from('hero_slides').insert({
    title,
    subtitle,
    button_text,
    button_link,
    display_order: order,
    image_url: validated.data.image_url,
    is_active: true,
  });

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
