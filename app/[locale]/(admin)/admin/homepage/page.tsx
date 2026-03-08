export const dynamic = 'force-dynamic';

import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/lib/api-base-url';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomepageAdminPage({ params }: Props) {
  const { locale } = await params;
  const base = await getBaseUrl();
  const t = await getTranslations({ locale, namespace: 'admin' });

  const sectionsRes = await fetch(`${base}/api/homepage-sections`, { cache: 'no-store' });
  const sectionsList = (sectionsRes.ok ? await sectionsRes.json().catch(() => null) : null) ?? [];
  const sections = Array.isArray(sectionsList) ? sectionsList : [];
  const hero = sections.find((s: { section_key: string }) => s.section_key === 'hero');
  const stats = sections.find((s: { section_key: string }) => s.section_key === 'stats');
  const cta = sections.find((s: { section_key: string }) => s.section_key === 'cta');

  async function updateHero(formData: FormData) {
    'use server';
    const apiBase = await getBaseUrl();
    const content = {
      title: String(formData.get('title') ?? ''),
      subtitle: String(formData.get('subtitle') ?? ''),
      button_text: String(formData.get('button_text') ?? ''),
      button_link: (formData.get('button_link') as string) || undefined,
    };
    await fetch(`${apiBase}/api/homepage-sections`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_key: 'hero', content }),
    });
    revalidatePath(`/${locale}`, 'page');
    revalidatePath(`/${locale}/admin/homepage`, 'page');
  }

  async function updateStats(formData: FormData) {
    'use server';
    const apiBase = await getBaseUrl();
    const statsArray = [
      { label: String(formData.get('label1') ?? ''), value: String(formData.get('value1') ?? '') },
      { label: String(formData.get('label2') ?? ''), value: String(formData.get('value2') ?? '') },
      { label: String(formData.get('label3') ?? ''), value: String(formData.get('value3') ?? '') },
      { label: String(formData.get('label4') ?? ''), value: String(formData.get('value4') ?? '') },
    ];
    await fetch(`${apiBase}/api/homepage-sections`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_key: 'stats', content: { stats: statsArray } }),
    });
    revalidatePath(`/${locale}`, 'page');
    revalidatePath(`/${locale}/admin/homepage`, 'page');
  }

  async function updateCTA(formData: FormData) {
    'use server';
    const apiBase = await getBaseUrl();
    const content = {
      title: String(formData.get('cta_title') ?? ''),
      subtitle: String(formData.get('cta_subtitle') ?? ''),
      button_text: String(formData.get('cta_button') ?? ''),
    };
    await fetch(`${apiBase}/api/homepage-sections`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_key: 'cta', content }),
    });
    revalidatePath(`/${locale}`, 'page');
    revalidatePath(`/${locale}/admin/homepage`, 'page');
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-lg bg-[#0f1a2b] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition';

  return (
    <div className="max-w-4xl space-y-12">
      <h1 className="text-2xl md:text-3xl font-bold">{t('homepageTitle')}</h1>

      <form action={updateHero} className="space-y-4 p-6 bg-[#0f1a2b] border border-white/10 rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold border-b border-white/10 pb-2">{t('homepageHeroSection')}</h2>
        <input
          name="title"
          defaultValue={hero?.content?.title ?? ''}
          placeholder={t('placeholderTitle')}
          className={inputClass}
        />
        <textarea
          name="subtitle"
          defaultValue={hero?.content?.subtitle ?? ''}
          placeholder={t('placeholderSubtitle')}
          className={inputClass}
        />
        <input
          name="button_text"
          defaultValue={hero?.content?.button_text ?? ''}
          placeholder={t('placeholderButton')}
          className={inputClass}
        />
        <input
          name="button_link"
          defaultValue={hero?.content?.button_link ?? ''}
          placeholder={t('placeholderButtonLink')}
          className={inputClass}
        />
        <button type="submit" className="px-4 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          {t('save')}
        </button>
      </form>

      <form action={updateStats} className="space-y-4 p-6 bg-[#0f1a2b] border border-white/10 rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold border-b border-white/10 pb-2">{t('homepageStatsSection')}</h2>
        {(() => {
          const list = Array.isArray(stats?.content?.stats) ? stats.content.stats.slice(0, 4) : [];
          while (list.length < 4) list.push({ label: '', value: '' });
          return list;
        })().map((item: { label?: string; value?: string }, i: number) => (
          <div key={i} className="flex flex-wrap gap-4">
            <input
              name={`label${i + 1}`}
              defaultValue={item?.label ?? ''}
              placeholder={t('label')}
              className={inputClass}
            />
            <input
              name={`value${i + 1}`}
              defaultValue={item?.value ?? ''}
              placeholder={t('value')}
              className={inputClass}
            />
          </div>
        ))}
        <button type="submit" className="px-4 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          {t('save')}
        </button>
      </form>

      <form action={updateCTA} className="space-y-4 p-6 bg-[#0f1a2b] border border-white/10 rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold border-b border-white/10 pb-2">{t('homepageCtaSection')}</h2>
        <input
          name="cta_title"
          defaultValue={cta?.content?.title ?? ''}
          placeholder={t('placeholderTitle')}
          className={inputClass}
        />
        <textarea
          name="cta_subtitle"
          defaultValue={cta?.content?.subtitle ?? ''}
          placeholder={t('placeholderSubtitle')}
          className={inputClass}
        />
        <input
          name="cta_button"
          defaultValue={cta?.content?.button_text ?? ''}
          placeholder={t('placeholderButton')}
          className={inputClass}
        />

        <button type="submit" className="px-4 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          {t('save')}
        </button>
      </form>
    </div>
  );
}