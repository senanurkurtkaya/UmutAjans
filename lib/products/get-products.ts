import { getBaseUrl } from '@/lib/api-base-url';
import { safeJson } from '@/lib/safe-json';

export async function getProducts() {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/products?published=true`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await safeJson<unknown[]>(res);
  return Array.isArray(data) ? data : [];
}
