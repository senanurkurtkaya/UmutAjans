'use server';

import { revalidatePath } from 'next/cache';
import { getBaseUrl } from '@/lib/api-base-url';

export async function toggleStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'new' ? 'done' : 'new';
  const base = await getBaseUrl();
  await fetch(`${base}/api/offers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });
  revalidatePath('/admin/offers');
}