/**
 * Structured Data (JSON-LD) for SEO
 */

import { siteConfig } from './config';
import { type Locale } from '@/i18n';

export interface OrganizationSchema {
  '@context'?: string;
  '@type'?: string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface WebSiteSchema {
  '@context'?: string;
  '@type'?: string;
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface BreadcrumbSchema {
  '@context'?: string;
  '@type'?: string;
  items?: Array<{
    name: string;
    url: string;
  }>;
  itemListElement?: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate Organization JSON-LD
 */
export function generateOrganizationSchema(
  locale: Locale,
  overrides?: Partial<OrganizationSchema>
): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    description: siteConfig.description,
    ...overrides,
  };
}

/**
 * Generate WebSite JSON-LD
 */
export function generateWebSiteSchema(
  locale: Locale,
  overrides?: Partial<WebSiteSchema>
): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    ...overrides,
  };
}

/**
 * Generate BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate LocalBusiness JSON-LD
 */
export function generateLocalBusinessSchema(
  locale: Locale,
  businessData: {
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    telephone?: string;
    priceRange?: string;
    openingHours?: string[];
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    '@id': `${siteConfig.url}/${locale}`,
    url: `${siteConfig.url}/${locale}`,
    telephone: businessData.telephone,
    priceRange: businessData.priceRange,
    address: {
      '@type': 'PostalAddress',
      ...businessData.address,
    },
    openingHoursSpecification: businessData.openingHours?.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours,
    })),
  };
}
