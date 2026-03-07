export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export default async function HomepageAdminPage({ params }: Props) {
  const supabase = await createSupabaseServerClient();
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });

  const { data: sections, error } = await supabase
    .from('homepage_sections')
    .select('*');

  if (error) {
    console.error('FETCH ERROR:', error);
  }

  const hero = sections?.find(s => s.section_key === 'hero');
  const stats = sections?.find(s => s.section_key === 'stats');
  const cta = sections?.find(s => s.section_key === 'cta');

  /* ================= HERO ================= */
  async function updateHero(formData: FormData) {
    'use server';

    const supabase = createSupabaseAdminClient();

    const { error } = await supabase
      .from('homepage_sections')
      .update({
        content: {
          title: String(formData.get('title') ?? ''),
          subtitle: String(formData.get('subtitle') ?? ''),
          button_text: String(formData.get('button_text') ?? ''),
        },
      })
      .eq('section_key', 'hero');

    if (error) {
      console.error('HERO UPDATE ERROR:', error);
      return;
    }

    revalidatePath(`/${params.locale}`, 'page');
  }

  /* ================= STATS ================= */
  async function updateStats(formData: FormData) {
    'use server';

    const supabase = createSupabaseAdminClient();

    const statsArray = [
      {
        label: String(formData.get('label1') ?? ''),
        value: String(formData.get('value1') ?? ''),
      },
      {
        label: String(formData.get('label2') ?? ''),
        value: String(formData.get('value2') ?? ''),
      },
      {
        label: String(formData.get('label3') ?? ''),
        value: String(formData.get('value3') ?? ''),
      },
      {
        label: String(formData.get('label4') ?? ''),
        value: String(formData.get('value4') ?? ''),
      },
    ];

    const { error } = await supabase
      .from('homepage_sections')
      .update({
        content: { stats: statsArray },
      })
      .eq('section_key', 'stats');

    if (error) {
      console.error('STATS UPDATE ERROR:', error);
      return;
    }

    revalidatePath(`/${params.locale}`, 'page');
  }

  /* ================= CTA ================= */
  async function updateCTA(formData: FormData) {
    'use server';

    const supabase = createSupabaseAdminClient();

    const { error } = await supabase
      .from('homepage_sections')
      .update({
        content: {
          title: String(formData.get('cta_title') ?? ''),
          subtitle: String(formData.get('cta_subtitle') ?? ''),
          button_text: String(formData.get('cta_button') ?? ''),
        },
      })
      .eq('section_key', 'cta');

    if (error) {
      console.error('CTA UPDATE ERROR:', error);
      return;
    }

    revalidatePath(`/${params.locale}`, 'page');
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
        <button type="submit" className="px-4 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          {t('save')}
        </button>
      </form>

      <form action={updateStats} className="space-y-4 p-6 bg-[#0f1a2b] border border-white/10 rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold border-b border-white/10 pb-2">{t('homepageStatsSection')}</h2>
        {stats?.content?.stats?.map((item: any, i: number) => (
          <div key={i} className="flex flex-wrap gap-4">
            <input
              name={`label${i + 1}`}
              defaultValue={item.label ?? ''}
              placeholder={t('label')}
              className={inputClass}
            />
            <input
              name={`value${i + 1}`}
              defaultValue={item.value ?? ''}
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