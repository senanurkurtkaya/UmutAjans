import { createNavigation } from 'next-intl/navigation';
import { locales, type Locale } from '@/lib/i18n/i18n';

export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales });

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (locale === 'en' && cleanPath === '') {
    return '/en';
  }

  return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

export function getPathWithoutLocale(pathname: string): string {
  const localePattern = new RegExp(`^/(${locales.join('|')})(/|$)`);
  return pathname.replace(localePattern, '/') || '/';
}