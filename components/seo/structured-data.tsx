import { type Locale } from '@/i18n';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  type OrganizationSchema,
  type WebSiteSchema,
} from '@/lib/seo/structured-data';

interface StructuredDataProps {
  locale: Locale;
  type: 'organization' | 'website' | 'breadcrumb';
  organizationOverrides?: Partial<OrganizationSchema>;
  websiteOverrides?: Partial<WebSiteSchema>;
  breadcrumbItems?: Array<{ name: string; url: string }>;
}

export function StructuredData({
  locale,
  type,
  organizationOverrides,
  websiteOverrides,
  breadcrumbItems,
}: StructuredDataProps) {
  let schema: object;

  switch (type) {
    case 'organization':
      schema = generateOrganizationSchema(locale, organizationOverrides);
      break;
    case 'website':
      schema = generateWebSiteSchema(locale, websiteOverrides);
      break;
    case 'breadcrumb':
      if (!breadcrumbItems) {
        return null;
      }
      schema = generateBreadcrumbSchema(breadcrumbItems);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
