import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { StatsSection } from '@/components/sections/stats-section';
import { CTASection } from '@/components/sections/cta-section';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { toLocale } from '@/lib/utils/validation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMetadataFromTranslations({
    titleKey: 'metadata.home.title',
    descriptionKey: 'metadata.home.description',
    path: '/',
    locale: toLocale(locale),
  });
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
