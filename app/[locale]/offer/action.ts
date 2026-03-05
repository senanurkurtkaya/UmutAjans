'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function submitOffer(
  _prevState: unknown,
  formData: FormData
) {
  const supabase = createSupabaseServerClient();

  const locale = formData.get('locale');

  const { error } = await supabase.from('offers').insert([
    {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      product_type: formData.get('product_type'),
      quantity: Number(formData.get('quantity')),
      size: formData.get('size'),
      description: formData.get('description'),
      status: 'new',
      locale: locale
    }
  ]);

  if (error) {
    console.log('INSERT ERROR:', error);
    return { success: false };
  }

  return { success: true };
}