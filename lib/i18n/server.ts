import { getTranslations, getLocale } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/i18n';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { toLocale } from '@/lib/utils/validation';

/**
 * Get translations in server components
 * @param namespace - Optional translation namespace
 * @returns Translation function
 */
export async function getServerTranslations(namespace?: string) {
  return getTranslations(namespace);
}

/**
 * Get current locale in server components with proper type safety
 * @returns Current locale as Locale type
 */
export async function getServerLocale(): Promise<Locale> {
  const locale = await getLocale();
  return toLocale(locale);
}

/**
 * Generate metadata with translations (legacy - use generateMetadataFromTranslations directly)
 * @deprecated Use generateMetadataFromTranslations from @/lib/seo/metadata instead
 */
export async function generateMetadata(
  titleKey: string,
  descriptionKey: string,
  path?: string
) {
  return generateMetadataFromTranslations({
    titleKey,
    descriptionKey,
    path: path || '/',
  });
}
