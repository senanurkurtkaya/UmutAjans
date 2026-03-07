import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Skip Supabase if env looks like placeholder (avoids hanging on invalid URL) */
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('your-project-ref') &&
  supabaseKey !== 'your_publishable_key' &&
  supabaseKey !== 'your_anon_key';

const SUPABASE_TIMEOUT_MS = 3000;

/**
 * Refreshes Supabase auth session and updates cookies.
 * Must run in middleware so Server Components get a valid session.
 * Call this before your app middleware (e.g. next-intl).
 * Times out so dev server never hangs if Supabase is unreachable.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!isSupabaseConfigured) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    const claimsPromise = supabase.auth.getClaims();
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase session timeout')), SUPABASE_TIMEOUT_MS)
    );
    await Promise.race([claimsPromise, timeoutPromise]);
  } catch {
  }

  return response;
}
