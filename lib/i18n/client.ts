'use client';

import { useTranslations, useLocale } from 'next-intl';
import { type Locale } from '@/i18n';

/**
 * Get translations in client components
 */
export function useClientTranslations(namespace?: string) {
  return useTranslations(namespace);
}

/**
 * Get current locale in client components
 */
export function useClientLocale(): Locale {
  return useLocale() as Locale;
}
