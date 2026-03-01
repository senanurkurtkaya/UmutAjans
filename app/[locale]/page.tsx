import { createSupabaseServerClient } from '@/lib/supabase/server';

import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return generateMetadataFromTranslations({
    titleKey: 'metadata.home.title',
    descriptionKey: 'metadata.home.description',
    path: '/',
  });
}

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  const { data: services } = await (await supabase)
    .from('services')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <>
      <HeroSection />
      <ServicesSection services={services || []} />
      <StatsSection />
      <CTASection />
    </>
  );
}