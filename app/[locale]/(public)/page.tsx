export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';

import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';
import { HeroSlider } from '@/components/sections/hero-slider';
import { CategoryShowcase } from '@/components/sections/category-showcase';
import { HomePortfolioStrip } from '@/components/sections/home-portfolio-strip';
import { ProductSlider } from '@/components/sections/product-slider';
import { LocationSection } from '@/components/sections/location-section';
import type { CategoryItem } from '@/components/sections/category-showcase';

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

  const categories: CategoryItem[] = [
    {
      title: "KUTU ÜRETİMİ",
      image: "/images/categories/Kutu.png",
      link: "/services"
    },
    {
      title: "KARTON ÇANTA",
      image: "/images/categories/KutuCanta.png",
      link: "/services"
    },
    {
      title: "KATALOG / DERGİ",
      image: "/images/categories/Dergi.png",
      link: "/services"
    },
    {
      title: "KARTVİZİT",
      image: "/images/categories/Kartvizit.png",
      link: "/services"
    },
    {
      title: "TABELA",
      image: "/images/categories/Tabela.png",
      link: "/services"
    },
    {
      title: "ISLAK MENDİL",
      image: "/images/categories/islak-mendil.png",
      link: "/services"
    }
  ]
  return (
    <>
      {/* HERO */}
      <HeroSlider slides={slides ?? []} heroContent={heroContent} />

      {/* CATEGORY SHOWCASE */}
      <CategoryShowcase categories={categories} locale={locale as "tr" | "en"} />

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