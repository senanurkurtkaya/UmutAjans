import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Geçersiz istek' },
      { status: 400 }
    );
  }

  const email = String(body?.email ?? '').trim();
  const password = String(body?.password ?? '');

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: 'Email ve şifre gerekli' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 401 }
    );
  }

  return response;
}
