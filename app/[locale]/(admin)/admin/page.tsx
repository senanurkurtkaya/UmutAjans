export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import { getBaseUrl } from '@/lib/api-base-url';
import { safeJson } from '@/lib/safe-json';

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const base = await getBaseUrl();
  const t = await getTranslations({ locale, namespace: 'admin' });

  const [servicesRes, portfolioRes, offersRes] = await Promise.all([
    fetch(`${base}/api/services`, { cache: 'no-store' }),
    fetch(`${base}/api/portfolio`, { cache: 'no-store' }),
    fetch(`${base}/api/offers`, { cache: 'no-store' }),
  ]);

  const servicesData = servicesRes.ok ? await safeJson<unknown[]>(servicesRes) : null;
  const portfolioData = portfolioRes.ok ? await safeJson<unknown[]>(portfolioRes) : null;
  const offersData = offersRes.ok ? await safeJson<unknown[]>(offersRes) : null;
  const servicesCount = Array.isArray(servicesData) ? servicesData.length : 0;
  const portfolioCount = Array.isArray(portfolioData) ? portfolioData.length : 0;
  const offersCount = Array.isArray(offersData) ? offersData.length : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboardTitle')}</h1>
        <p className="text-white/70 mt-2">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0f1a2b] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors shadow-xl">
          <p className="text-sm text-white/70">{t('totalServices')}</p>
          <p className="text-3xl font-bold mt-2 text-blue-400">{servicesCount ?? 0}</p>
        </div>
        <div className="bg-[#0f1a2b] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors shadow-xl">
          <p className="text-sm text-white/70">{t('totalPortfolio')}</p>
          <p className="text-3xl font-bold mt-2 text-blue-400">{portfolioCount ?? 0}</p>
        </div>
        <div className="bg-[#0f1a2b] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors shadow-xl">
          <p className="text-sm text-white/70">{t('totalOffers')}</p>
          <p className="text-3xl font-bold mt-2 text-blue-400">{offersCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}