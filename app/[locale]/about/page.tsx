import { getTranslations } from 'next-intl/server';
import { TeamSection } from '@/components/sections/team-section';
import { ValuesSection } from '@/components/sections/values-section';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';
import { toLocale } from '@/lib/utils/validation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMetadataFromTranslations({
    titleKey: 'metadata.about.title',
    descriptionKey: 'metadata.about.description',
    path: '/about',
    locale: toLocale(locale),
  });
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>{t('description1')}</p>
            <p>{t('description2')}</p>
          </div>
        </div>
      </div>

      <ValuesSection />
      <TeamSection />
    </div>
  );
}
