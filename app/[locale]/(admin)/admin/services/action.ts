'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleServicePublish(id: string, current: boolean) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from('services')
    .update({ published: !current })
    .eq('id', id);

  revalidatePath('/admin/services');
}