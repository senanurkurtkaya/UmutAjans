'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {

  const supabase = await createSupabaseServerClient()

  const title = formData.get('title') as string
  const image_url = formData.get('image_url') as string

  await supabase
    .from('products')
    .insert([
      {
        title,
        image_url,
        is_active: true
      }
    ])

  revalidatePath('/')
}