import { getTranslations } from 'next-intl/server';
import { generateMetadataFromTranslations } from '@/lib/seo/metadata';

export async function generateMetadata() {
  return generateMetadataFromTranslations({
    titleKey: 'metadata.privacy.title',
    descriptionKey: 'metadata.privacy.description',
    path: '/privacy',
  });
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

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
              {t('collectedTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed mb-4">
              {t('collectedIntro')}
            </p>
            <ul className="list-none space-y-2 text-base-content/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('collectedItem1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('collectedItem2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('collectedItem3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('collectedItem4')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('collectedItem5')}
              </li>
            </ul>
            <p className="text-base text-base-content/90 leading-relaxed mt-4">
              {t('collectedNote')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('usageTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed mb-4">
              {t('usageIntro')}
            </p>
            <ul className="list-none space-y-2 text-base-content/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('usageItem1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('usageItem2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('usageItem3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
                {t('usageItem4')}
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('cookiesTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('cookiesText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('securityTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('securityText')}
            </p>
          </section>

          <section className="rounded-2xl border border-base-300/60 bg-base-200/50 p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-base-content mb-4 pb-2 border-b border-primary/30">
              {t('thirdPartyTitle')}
            </h2>
            <p className="text-base text-base-content/90 leading-relaxed">
              {t('thirdPartyText')}
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
