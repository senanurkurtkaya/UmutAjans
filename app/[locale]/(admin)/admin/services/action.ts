'use server';

import { revalidatePath } from 'next/cache';
import { getBaseUrl } from '@/lib/api-base-url';

export async function toggleServicePublish(id: string, current: boolean) {
  const base = await getBaseUrl();
  await fetch(`${base}/api/services/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ published: !current }),
  });
  revalidatePath('/admin/services');
}