'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function submitOffer(
  prevState: any,
  formData: FormData
) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from('offer').insert([
    {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      product_type: formData.get('product_type'),
      quantity: Number(formData.get('quantity')),
      size: formData.get('size'),
      description: formData.get('description'),
      status: 'new'
    }
  ]);

  if (error) {
    console.log('INSERT ERROR:', error);
    return { success: false };
  }

  return { success: true };
}