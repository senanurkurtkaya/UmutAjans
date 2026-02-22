import { getTranslations } from 'next-intl/server';
import { ServicesSection } from '@/components/sections/services-section';
import { ProcessSection } from '@/components/sections/process-section';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { toLocale } from '@/lib/utils/validation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMetadataFromTranslations({
    titleKey: 'metadata.services.title',
    descriptionKey: 'metadata.services.description',
    path: '/services',
    locale: toLocale(locale),
  });
}

export default async function ServicesPage() {
  const t = await getTranslations('services');

  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <ServicesSection />
      <ProcessSection />
    </div>
  );
}
