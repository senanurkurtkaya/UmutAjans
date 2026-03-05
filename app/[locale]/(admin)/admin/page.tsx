export const dynamic = 'force-dynamic';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';

export default async function AdminDashboard({
  params,
}: {
  params: { locale: string };
}) {
  const supabase = await createSupabaseServerClient();
  const t = await getTranslations({ locale: params.locale, namespace: 'admin' });

  const { count: servicesCount } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true });

  const { count: portfolioCount } = await supabase
    .from('portfolio')
    .select('*', { count: 'exact', head: true });

  const { count: offersCount } = await supabase
    .from('offers')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboardTitle')}</h1>
        <p className="text-neutral-400 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <p className="text-sm text-neutral-400">{t('totalServices')}</p>
          <p className="text-3xl font-bold mt-2">{servicesCount ?? 0}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <p className="text-sm text-neutral-400">{t('totalPortfolio')}</p>
          <p className="text-3xl font-bold mt-2">{portfolioCount ?? 0}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <p className="text-sm text-neutral-400">{t('totalOffers')}</p>
          <p className="text-3xl font-bold mt-2">{offersCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}