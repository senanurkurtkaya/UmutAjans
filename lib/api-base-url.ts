import { headers } from 'next/headers';

/**
 * Returns the absolute base URL for the current request (e.g. https://example.com).
 * Use this for server-side fetch() to API routes; Node fetch requires absolute URLs.
 * Prefers request host so it works in dev (localhost) and production without NEXT_PUBLIC_APP_URL.
 */
export async function getBaseUrl(): Promise<string> {
  try {
    const h = await headers();
    const host = h.get('host') || h.get('x-forwarded-host');
    const proto = h.get('x-forwarded-proto') || (process.env.NODE_ENV === 'development' ? 'http' : 'https');
    if (host) {
      return `${proto}://${host}`;
    }
  } catch {
    // headers() can throw in some edge contexts
  }
  const fromEnv =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || '';
  if (fromEnv) return fromEnv;
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://umutajans.com';
}
