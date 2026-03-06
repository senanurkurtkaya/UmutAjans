import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getProducts() {

  const supabase = await createSupabaseServerClient()

  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at')

  return data ?? []
}