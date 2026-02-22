import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeScript } from '@/components/scripts/theme-script';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SkipLink } from '@/components/layout/skip-link';
import { StructuredData } from '@/components/seo/structured-data';
import { ErrorBoundary } from '@/components/providers/error-boundary';
import { locales, type Locale } from '@/i18n';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', 'arial'],
});

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateSEOMetadata({
    title: 'Umut Ajans - Digital Marketing Agency',
    description: t('metadata.home.description'),
    path: '/',
    locale: locale as Locale,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale with proper type guard
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : null;
  if (!validLocale) {
    notFound();
  }

  // Load messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(inter.className, inter.variable)}>
        <ThemeScript />
        <StructuredData locale={locale as Locale} type="organization" />
        <StructuredData locale={locale as Locale} type="website" />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ErrorBoundary>
              <div className="flex min-h-screen flex-col">
                <SkipLink />
                <Navbar />
                <main className="flex-1" id="main-content" tabIndex={-1}>
                  {children}
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
