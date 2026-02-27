import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export async function middleware(request: NextRequest) {
  console.log("🔥 MIDDLEWARE HIT:", request.nextUrl.pathname);

  const response = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/');
  const locale = segments[1];

  // 🔐 Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 👤 Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👤 USER:", user?.id);

  // 🚨 Admin route kontrolü
  if (pathname.includes('/admin')) {
    console.log("🚨 ADMIN ROUTE DETECTED");

    if (!user) {
      console.log("❌ NO USER → REDIRECT LOGIN");
      return NextResponse.redirect(
        new URL(`/${locale}/login`, request.url)
      );
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

   console.log("🔑 ROLE RAW:", JSON.stringify(userData?.role));

    if (userData?.role !== 'admin') {
      console.log("❌ NOT ADMIN → REDIRECT HOME");
      return NextResponse.redirect(
        new URL(`/${locale}`, request.url)
      );
    }

    console.log("✅ ADMIN ACCESS GRANTED");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api
     * - _next/static
     * - _next/image
     * - favicon
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};