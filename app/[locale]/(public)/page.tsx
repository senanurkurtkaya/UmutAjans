export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';
import { ServicesSection } from '@/components/sections/services-section';
import { HeroSlider } from '@/components/sections/hero-slider';
import { HomePortfolioStrip } from '@/components/sections/home-portfolio-strip';

type Props = {
  params: { locale: string };
};

export default async function HomePage({ params }: Props) {
  const locale = params.locale;
  const supabase = await createSupabaseServerClient();

  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const { data: portfolio } = await supabase
    .from('portfolio_projects')
    .select('id, title, slug, category, cover_image')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: homepageSections } = await supabase
    .from('homepage_sections')
    .select('*')
    .eq('is_active', true);

  const sections = Object.fromEntries(
    (homepageSections ?? []).map((s) => [s.section_key, s])
  );

  const heroContent = sections.hero?.content as
    | {
        title?: string | null;
        subtitle?: string | null;
        button_text?: string | null;
      }
    | undefined;

  return (
    <>
      <HeroSlider slides={slides ?? []} heroContent={heroContent} />
      <ServicesSection services={services ?? []} />
      <StatsSection data={sections.stats?.content} />
      <HomePortfolioStrip projects={portfolio ?? []} locale={locale} />
      <CTASection data={sections.cta?.content} />
    </>
  );
}