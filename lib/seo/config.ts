/**
 * SEO Configuration
 * Centralized configuration for all SEO-related settings
 */

export const siteConfig = {
  name: 'Umut Ajans',
  description: 'Professional digital marketing agency helping businesses grow and succeed in the digital world.',
  url: 'https://umutajans.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@umutajans',
  twitterSite: '@umutajans',
  locale: 'en_US',
  type: 'website' as const,
} as const;

export const defaultKeywords = [
  'digital marketing',
  'SEO',
  'social media marketing',
  'web design',
  'PPC advertising',
  'content marketing',
  'digital agency',
  'online marketing',
  'brand strategy',
  'web development',
];

/**
 * Get locale-specific Open Graph locale
 */
export function getOgLocale(locale: string): string {
  return locale === 'tr' ? 'tr_TR' : 'en_US';
}

/**
 * Get full URL for a path
 */
export function getAbsoluteUrl(path: string, locale?: string): string {
  const baseUrl = siteConfig.url;
  const localePath = locale ? `/${locale}` : '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${localePath}${cleanPath}`;
}

/**
 * Get canonical URL
 */
export function getCanonicalUrl(path: string, locale: string): string {
  return getAbsoluteUrl(path, locale);
}
