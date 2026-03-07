import { getTranslations } from 'next-intl/server';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateMetadataFromTranslations({
    titleKey: 'metadata.cookies.title',
    descriptionKey: 'metadata.cookies.description',
    path: '/cookies',
  });
}

export default async function CookiesPage() {
  const t = await getTranslations('cookies');

  return (
    <div className="container max-w-4xl py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <article className="font-normal not-italic text-base-content">
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-base-content">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-base-content/80 leading-relaxed max-w-2xl">
            {t('intro')}
          </p>
        </header>

        <div className="space-y-10">
          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('whatTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('whatText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('typesTitle')}
            </h2>
            <ul className="list-none space-y-4 text-base-content/90 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="font-semibold text-base-content">{t('typesEssential')}</strong>{' '}
                  {t('typesEssentialDesc')}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="font-semibold text-base-content">{t('typesAnalytics')}</strong>{' '}
                  {t('typesAnalyticsDesc')}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                <span>
                  <strong className="font-semibold text-base-content">{t('typesFunctional')}</strong>{' '}
                  {t('typesFunctionalDesc')}
                </span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('manageTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('manageText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('contactTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('contactText')}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
