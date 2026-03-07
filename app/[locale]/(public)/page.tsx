export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';

import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';
import { HeroSlider } from '@/components/sections/hero-slider';
import { CategoryShowcase } from '@/components/sections/category-showcase';
import { HomePortfolioStrip } from '@/components/sections/home-portfolio-strip';
import { ProductSlider } from '@/components/sections/product-slider';
import { LocationSection } from '@/components/sections/location-section';
import type { CategoryItem } from '@/components/sections/category-showcase';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const supabase = await createSupabaseServerClient();

  const { data: slides } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const { data: products } = await supabase
    .from('products')
    .select('id,title,image_url')
    .eq('published', true)
    .order('created_at', { ascending: true });

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
      button_link?: string | null;
    }
    | undefined;

  const categories: CategoryItem[] = [
    {
      title: t('categories.boxProduction'),
      image: "/images/categories/Kutu.png",
      link: "/services"
    },
    {
      title: t('categories.cardboardBag'),
      image: "/images/categories/KutuCanta.png",
      link: "/services"
    },
    {
      title: t('categories.catalogMagazine'),
      image: "/images/categories/Dergi.png",
      link: "/services"
    },
    {
      title: t('categories.businessCard'),
      image: "/images/categories/Kartvizit.png",
      link: "/services"
    },
    {
      title: t('categories.signboard'),
      image: "/images/categories/Tabela.png",
      link: "/services"
    },
    {
      title: t('categories.wetWipe'),
      image: "/images/categories/islak-mendil.png",
      link: "/services"
    }
  ]
  return (
    <>
      <HeroSlider slides={slides ?? []} heroContent={heroContent} />

      <CategoryShowcase categories={categories} />

      <ProductSlider products={products ?? []} />

      <HomePortfolioStrip projects={portfolio ?? []} locale={locale} />

      <LocationSection />
      <CTASection data={sections.cta?.content} />

      <StatsSection data={sections.stats?.content} />

    </>
  );
}