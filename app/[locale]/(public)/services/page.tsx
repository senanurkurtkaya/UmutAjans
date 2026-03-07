import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { ProcessSection } from '@/components/sections/process-section';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import ServicesGrid from '@/components/sections/services-grid';
import { ServicesSection } from '@/components/sections/services-section';

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
  const supabase = await createClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const { data: serviceCards } = await supabase
    .from('service_cards')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

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

      <ServicesGrid services={serviceCards ?? []} />

      <ServicesSection services={services ?? []} />

      <ProcessSection />

    </div>
  );
}