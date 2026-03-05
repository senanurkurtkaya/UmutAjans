export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'tr' }
  ];
}

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import '../globals.css';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeScript } from '@/components/scripts/theme-script';
import { DocumentLang } from '@/components/scripts/document-lang';
import { SkipLink } from '@/components/layout/skip-link';
import { StructuredData } from '@/components/seo/structured-data';
import { ErrorBoundary } from '@/components/providers/error-boundary';

import { locales, type Locale } from '@/lib/i18n/i18n';
import { generateSEOMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

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
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <>
      <DocumentLang locale={locale} />
      <ThemeScript />

      <StructuredData locale={locale as Locale} type="organization" />
      <StructuredData locale={locale as Locale} type="website" />

      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>
          <ErrorBoundary>
            <div className="flex min-h-screen flex-col">
              <SkipLink />
              {children}
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}