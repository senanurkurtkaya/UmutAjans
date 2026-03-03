import { createSupabaseServerClient } from '@/lib/supabase/server';
import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';
import { ServicesSection } from '@/components/sections/services-section';

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const supabase = await createSupabaseServerClient();

  // 🔥 HOMEPAGE SECTIONS
  const { data: homepageSections } = await supabase
    .from('homepage_sections')
    .select('*');

  console.log('RENDER HOMEPAGE:', homepageSections);

  const hero = homepageSections?.find(
    (s) => s.section_key === 'hero'
  );

  const stats = homepageSections?.find(
    (s) => s.section_key === 'stats'
  );

  const cta = homepageSections?.find(
    (s) => s.section_key === 'cta'
  );

  // 🔥 SERVICES
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('published', true);

  console.log('RENDER SERVICES:', services);

  return (
    <>
      <HeroSection data={hero?.content} />
      <ServicesSection services={services ?? []} />
      <StatsSection data={stats?.content} />
      <CTASection data={cta?.content} />
    </>
  );
}