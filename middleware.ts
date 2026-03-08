import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { locales, defaultLocale } from './lib/i18n/i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export async function middleware(request: NextRequest) {
  console.log("🔥 MIDDLEWARE HIT:", request.nextUrl.pathname);

  let response = await intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/');

  const locale = segments[1] || defaultLocale;

  const rewriteHeader = response.headers.get('x-middleware-rewrite');
  if (rewriteHeader) {
    const rewrittenPath = new URL(rewriteHeader, request.url).pathname;
    if (rewrittenPath === '/' && (pathname === '/en' || pathname === '/tr')) {
      const rewritten = NextResponse.rewrite(new URL(pathname, request.url));
      response.headers.forEach((v, k) => rewritten.headers.set(k, v));
      response = rewritten;
    }
  }

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👤 USER:", user?.id);

  if (segments[2] === 'admin') {
    console.log("🚨 ADMIN ROUTE DETECTED");

    if (!user) {
      console.log("❌ NO USER → REDIRECT LOGIN");
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || userData?.role !== 'admin') {
      console.log("❌ NOT ADMIN → REDIRECT HOME");
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    console.log("✅ ADMIN ACCESS GRANTED");
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|\\.well-known).*)',
  ],
};