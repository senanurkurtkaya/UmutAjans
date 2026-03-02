'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function toggleStatus(id: string, currentStatus: string) {
  const supabase = createSupabaseServerClient();

  const newStatus = currentStatus === 'new' ? 'done' : 'new';

  await supabase
    .from('offers')
    .update({ status: newStatus })
    .eq('id', id);
}