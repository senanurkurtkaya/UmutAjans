export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';

import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';
import { HeroSlider } from '@/components/sections/hero-slider';
import { HomePortfolioStrip } from '@/components/sections/home-portfolio-strip';
import { ProductSlider } from '@/components/sections/product-slider';
import { LocationSection } from '@/components/sections/location-section';

type Props = {
  params: { locale: string };
};

export default async function HomePage({ params }: Props) {
  const locale = params.locale;

  const supabase = await createSupabaseServerClient();

  /* HERO SLIDER */
  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  /* PRODUCTS (SONSUZ KAYAN SLIDER) */
  const { data: products } = await supabase
    .from('products')
    .select('id,title,image_url')
    .eq('published', true)
    .order('created_at', { ascending: true });

  /* PORTFOLIO */
  const { data: portfolio } = await supabase
    .from('portfolio_projects')
    .select('id, title, slug, category, cover_image')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6);

  /* HOMEPAGE SECTIONS */
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
      {/* HERO */}
      <HeroSlider slides={slides ?? []} heroContent={heroContent} />

      {/* ÜRÜNLER - ADMIN PANELDEN EKLENİR */}
      <ProductSlider products={products ?? []} />


      {/* PORTFOLIO */}
      <HomePortfolioStrip projects={portfolio ?? []} locale={locale} />

      {/* LOCATION */}
      <LocationSection />
      {/* CTA */}
      <CTASection data={sections.cta?.content} />


      {/* STATS */}
      <StatsSection data={sections.stats?.content} />

    </>
  );
}