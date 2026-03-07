import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { siteConfig, getOgLocale, getCanonicalUrl, defaultKeywords } from './config';
import { type Locale } from '@/lib/i18n/i18n';
import { toLocale } from '@/lib/utils/validation';

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Generate comprehensive metadata for SEO
 */
export async function generateSEOMetadata({
  title,
  description,
  path,
  locale,
  keywords = defaultKeywords,
  image,
  noindex = false,
  nofollow = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: SEOProps): Promise<Metadata> {
  const ogLocale = getOgLocale(locale);
  const canonicalUrl = getCanonicalUrl(path, locale);
  const ogImage = image || `${siteConfig.url}${siteConfig.ogImage}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl(path, 'en'),
        'tr': getCanonicalUrl(path, 'tr'),
        'x-default': getCanonicalUrl(path, 'en'),
      },
    },

    openGraph: {
      type,
      locale: ogLocale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterSite,
      creator: siteConfig.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },

    // Robots
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    category: 'Digital Marketing',
    classification: 'Business',
  };
}

/**
 * Generate metadata from translation keys
 */
export async function generateMetadataFromTranslations({
  titleKey,
  descriptionKey,
  path,
  keywords,
  image,
  noindex,
  nofollow,
  type,
  publishedTime,
  modifiedTime,
  author,
}: Omit<SEOProps, 'title' | 'description' | 'locale'> & {
  titleKey: string;
  descriptionKey: string;
}): Promise<Metadata> {
  const locale = toLocale(await getLocale());
  const t = await getTranslations();

  return generateSEOMetadata({
    title: t(titleKey),
    description: t(descriptionKey),
    path,
    locale,
    keywords,
    image,
    noindex,
    nofollow,
    type,
    publishedTime,
    modifiedTime,
    author,
  });
}
