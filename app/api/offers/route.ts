import { createSupabaseServerClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const OfferCreateSchema = z.object({
  name: z.union([z.string(), z.null()]),
  phone: z.union([z.string(), z.null()]),
  email: z.union([z.string(), z.null()]),
  product_type: z.union([z.string(), z.null()]),
  quantity: z.number(),
  size: z.union([z.string(), z.null()]),
  description: z.union([z.string(), z.null()]),
  locale: z.union([z.string(), z.null()]),
});


export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let query = supabase
    .from('offers')
    .select('*')
    .order('created_at', { ascending: false });

  if (status === 'new' || status === 'done') {
    query = query.eq('status', status);
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

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = OfferCreateSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { success: false, error: parsed.error.message },
      { status: 400 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('offers').insert({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    product_type: parsed.data.product_type,
    quantity: parsed.data.quantity,
    size: parsed.data.size,
    description: parsed.data.description,
    locale: parsed.data.locale,
    status: 'new',
  });

  if (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
