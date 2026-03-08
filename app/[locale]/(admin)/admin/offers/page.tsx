import { getTranslations } from 'next-intl/server';
import StatusButton from './StatusButton';
import Link from 'next/link';
import { getBaseUrl } from '@/lib/api-base-url';
import { safeJson } from '@/lib/safe-json';

type Offer = {
  id: string;
  name: string;
  product_type: string;
  quantity: number;
  created_at: string;
  status: string
}

export default async function AdminOffersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  const base = await getBaseUrl();
  const t = await getTranslations({ locale, namespace: 'admin.offersPage' });

  const allRes = await fetch(`${base}/api/offers`, { cache: 'no-store' });
  const allOffers = (allRes.ok ? await safeJson<{ status: string }[]>(allRes) : null) ?? [];
  const newCount = allOffers.filter((o) => o.status === 'new').length;
  const doneCount = allOffers.filter((o) => o.status === 'done').length;

  const listUrl = status === 'new' || status === 'done'
    ? `${base}/api/offers?status=${status}`
    : `${base}/api/offers`;
  const listRes = await fetch(listUrl, { cache: 'no-store' });
  const offers = (listRes.ok ? await safeJson<Offer[]>(listRes) : null) ?? [];

  const activeFilter = status ?? 'all';

  const filterClass = (value: string) =>
    `px-4 py-2 rounded-lg transition ${activeFilter === value
      ? 'bg-blue-400 text-[#0f1a2b] font-semibold'
      : 'bg-white/10 hover:bg-white/20 text-white/90'
    }`;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">{t('title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
          <p className="text-sm text-neutral-400">{t('new')}</p>
          <p className="text-2xl font-bold text-red-400">{newCount}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4">
          <p className="text-sm text-neutral-400">{t('done')}</p>
          <p className="text-2xl font-bold text-green-400">{doneCount}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href={`/${locale}/admin/offers`} className={filterClass('all')}>
          {t('all')}
        </Link>
        <Link href={`/${locale}/admin/offers?status=new`} className={filterClass('new')}>
          {t('new')}
        </Link>
        <Link href={`/${locale}/admin/offers?status=done`} className={filterClass('done')}>
          {t('done')}
        </Link>
      </div>

      <div className="space-y-3">
        {offers?.length === 0 && (
          <p className="text-white/50 py-6">{t('noRecords')}</p>
        )}

        {offers?.map((offer: Offer) => (
          <div
            key={offer.id}
            className="p-4 bg-[#0f1a2b] border border-white/10 rounded-xl flex flex-wrap justify-between items-center gap-4 hover:border-white/20 transition-colors shadow-xl"
          >
            <div>
              <p className="font-semibold">{offer.name}</p>
              <p className="text-sm text-white/70">
                {offer.product_type === 'İletişim formu'
                  ? offer.product_type
                  : `${offer.product_type} • ${offer.quantity}`}
              </p>
              <p className="text-xs text-white/50 mt-1">
                {new Date(offer.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusButton id={offer.id} status={offer.status} />
              <Link
                href={`/${locale}/admin/offers/${offer.id}`}
                className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-2 transition"
              >
                {t('viewDetail')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}