import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { type AbstractIntlMessages } from 'next-intl';

export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Type for messages
export type Messages = AbstractIntlMessages;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default as Messages,
    // Optional: Set timezone and date formatting
    timeZone: locale === 'tr' ? 'Europe/Istanbul' : 'America/New_York',
  };
});
