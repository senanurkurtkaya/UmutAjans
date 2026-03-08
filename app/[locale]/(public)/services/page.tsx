import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/lib/api-base-url';
import { safeJson } from '@/lib/safe-json';
import { ProcessSection } from '@/components/sections/process-section';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { ServicesSection } from '@/components/sections/services-section';

type Service = {
  id: string;
  title: string;
  description: string;
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
    titleKey: 'metadata.services.title',
    descriptionKey: 'metadata.services.description',
    path: '/services',
  });
}

export default async function ServicesPage() {
  const t = await getTranslations('services');
  const base = await getBaseUrl();

  const servicesRes = await fetch(`${base}/api/services?published=true`, { cache: 'no-store' });
  const services =
    (servicesRes.ok ? await safeJson<Service[]>(servicesRes) : null) ?? [];

  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('title')}
          </h1>

          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <ServicesSection services={services} />

      <ProcessSection />
    </div>
  );
}