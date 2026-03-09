import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/lib/api-base-url';
import { safeJson } from '@/lib/safe-json';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { ProcessSection } from '@/components/sections/process-section';
import ServicesGrid from '@/components/sections/services-grid';
import { Link } from '@/lib/i18n/navigation';

type ServiceCard = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image_url?: string;
  published: boolean;
  created_at?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return generateMetadataFromTranslations({
    titleKey: 'metadata.whatWeDo.title',
    descriptionKey: 'metadata.whatWeDo.description',
    path: '/what-we-do',
  });
}

export default async function WhatWeDoPage() {
  const t = await getTranslations('whatWeDo');
  const base = await getBaseUrl();

  const serviceCardsRes = await fetch(
    `${base}/api/service-cards?published=true`,
    { cache: 'no-store' }
  );

  const serviceCards =
    (serviceCardsRes.ok
      ? await safeJson<ServiceCard[]>(serviceCardsRes)
      : null) ?? [];

  return (
    <div className="py-20">
      
      <div className="container mx-auto px-6">

        {/* Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('title')}
          </h1>

          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Intro */}
        <div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert text-center mb-16">
          <p>{t('intro')}</p>
        </div>

        {/* Services Grid */}
        <ServicesGrid services={serviceCards} />


      </div>

      
        {/* Process Section */}
        <div className="mt-24">
          <ProcessSection />
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="btn btn-primary rounded-xl"
          >
            {t('viewServices')}
          </Link>
        </div>

    </div>
  );
}