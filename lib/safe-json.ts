/**
 * Safely parse JSON from a fetch Response.
 * Returns null if response is not ok, not JSON, or parse fails. Never throws.
 */
export async function safeJson<T = unknown>(res: Response): Promise<T | null> {
  try {
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return null;
    }
    const text = await res.text();
    if (!text || text.trim().length === 0) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
