'use server';

import { getBaseUrl } from '@/lib/api-base-url';

export async function submitOffer(
  _prevState: unknown,
  formData: FormData
) {
  const base = await getBaseUrl();
  const body = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    product_type: formData.get('product_type'),
    quantity: Number(formData.get('quantity')) || 0,
    size: formData.get('size'),
    description: formData.get('description'),
    locale: formData.get('locale'),
  };

  const res = await fetch(`${base}/api/offers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return { success: false, error: (err as { error?: string }).error ?? 'Failed to submit' };
  }
  return { success: true };
}