import { getTranslations } from 'next-intl/server';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateMetadataFromTranslations({
    titleKey: 'metadata.terms.title',
    descriptionKey: 'metadata.terms.description',
    path: '/terms',
  });
}

export default async function TermsPage() {
  const t = await getTranslations('terms');

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

          <p className="mt-3 text-sm text-base-content/60">
            Son Güncelleme: 09 Mart 2026
          </p>
        </header>

        <div className="space-y-12">

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm transition hover:border-primary/40">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('servicesTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('servicesText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm transition hover:border-primary/40">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('contentTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('contentText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm transition hover:border-primary/40">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('disclaimerTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('disclaimerText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm transition hover:border-primary/40">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('linksTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('linksText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm transition hover:border-primary/40">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('changesTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('changesText')}
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}