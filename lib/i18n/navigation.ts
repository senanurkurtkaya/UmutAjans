import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, type Locale } from '@/i18n';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

/**
 * Get localized path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If it's the default locale and path is root, return just the locale
  if (locale === 'en' && cleanPath === '') {
    return '/en';
  }
  
  return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

/**
 * Get path without locale prefix
 */
export function getPathWithoutLocale(pathname: string): string {
  const localePattern = new RegExp(`^/(${locales.join('|')})(/|$)`);
  return pathname.replace(localePattern, '/') || '/';
}
