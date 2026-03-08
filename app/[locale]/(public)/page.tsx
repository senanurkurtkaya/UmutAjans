export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/lib/api-base-url';
import { safeJson } from '@/lib/safe-json';

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

  let slides: unknown[] = [];
  let products: unknown[] = [];
  let portfolio: unknown[] = [];
  let homepageSections: unknown[] = [];

  try {
    const base = await getBaseUrl();
    const [slidesRes, productsRes, portfolioRes, sectionsRes] = await Promise.all([
      fetch(`${base}/api/hero-slides?active=true`, { cache: 'no-store' }),
      fetch(`${base}/api/products?published=true`, { cache: 'no-store' }),
      fetch(`${base}/api/portfolio?published=true`, { cache: 'no-store' }),
      fetch(`${base}/api/homepage-sections?active=true`, { cache: 'no-store' }),
    ]);

    slides = (slidesRes.ok ? await safeJson<unknown[]>(slidesRes) : null) ?? [];
    products = (productsRes.ok ? await safeJson<unknown[]>(productsRes) : null) ?? [];
    const portfolioRaw = portfolioRes.ok ? await safeJson<unknown[]>(portfolioRes) : null;
    portfolio = Array.isArray(portfolioRaw) ? portfolioRaw.slice(0, 6) : [];
    homepageSections = (sectionsRes.ok ? await safeJson<unknown[]>(sectionsRes) : null) ?? [];
  } catch {
    // Base URL, fetch or parse failed; render with empty data to avoid 500
  }

  type SectionItem = { section_key: string; content?: unknown };
  const sections = Object.fromEntries(
    (homepageSections ?? []).map((s: unknown) => {
      const sec = s as SectionItem;
      return [sec.section_key, sec] as [string, SectionItem];
    })
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
      <HeroSlider slides={(slides ?? []) as { id: string; title: string; subtitle: string; image_url: string; button_text?: string | null; button_link?: string | null; display_order: number }[]} heroContent={heroContent} />

      <CategoryShowcase categories={categories} viewAllLabel={t('viewAll')} />

      <ProductSlider products={((products ?? []) as { id: string; title: string; image_url?: string }[]).map((p) => ({ id: p.id, title: p.title, image_url: p.image_url ?? '' }))} />

      <HomePortfolioStrip projects={((portfolio ?? []) as { id: string; title: string; slug: string; category?: string | null; cover_image?: string | null }[]).map((p) => ({ ...p, category: p.category ?? null, cover_image: p.cover_image ?? null }))} locale={locale} />

      <LocationSection />
      <CTASection data={sections.cta?.content as { title?: string; subtitle?: string; button_text?: string } | undefined} />

      <StatsSection data={sections.stats?.content as { stats?: { label: string; value: string }[] } | undefined} />

    </>
  );
}