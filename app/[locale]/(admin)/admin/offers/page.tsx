import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import StatusButton from './StatusButton';
import Link from 'next/link';

export default async function AdminOffersPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { status?: string };
}) {
  const supabase = createSupabaseServerClient();
  const t = await getTranslations({ locale: params.locale, namespace: 'admin.offersPage' });

  const { data: allOffers } = await supabase
    .from('offers')
    .select('status');

  const newCount =
    allOffers?.filter(o => o.status === 'new').length ?? 0;

  const doneCount =
    allOffers?.filter(o => o.status === 'done').length ?? 0;

  let query = supabase
    .from('offers')
    .select('*')
    .order('created_at', { ascending: false });

  if (searchParams?.status === 'new') {
    query = query.eq('status', 'new');
  }

  if (searchParams?.status === 'done') {
    query = query.eq('status', 'done');
  }

  const { data: offers } = await query;

  const activeFilter = searchParams?.status ?? 'all';

  const filterClass = (value: string) =>
    `px-4 py-2 border rounded transition ${
      activeFilter === value
        ? 'bg-white text-black font-semibold'
        : 'hover:bg-white/10'
    }`;

  return (
    <div className="container py-20 space-y-8">
      <h1 className="text-3xl font-bold">{t('title')}</h1>

      <div className="flex gap-6">
        <div className="bg-red-500/10 border border-red-500 p-4 rounded">
          <p className="text-sm text-gray-400">{t('new')}</p>
          <p className="text-2xl font-bold text-red-400">{newCount}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500 p-4 rounded">
          <p className="text-sm text-gray-400">{t('done')}</p>
          <p className="text-2xl font-bold text-green-400">{doneCount}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href={`/${params.locale}/admin/offers`} className={filterClass('all')}>
          {t('all')}
        </Link>
        <Link href={`/${params.locale}/admin/offers?status=new`} className={filterClass('new')}>
          {t('new')}
        </Link>
        <Link href={`/${params.locale}/admin/offers?status=done`} className={filterClass('done')}>
          {t('done')}
        </Link>
      </div>

      <div className="space-y-4">
        {offers?.length === 0 && (
          <p className="text-gray-500">{t('noRecords')}</p>
        )}

        {offers?.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{offer.name}</p>
              <p className="text-sm text-gray-400">
                {offer.product_type} • {offer.quantity}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(offer.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StatusButton id={offer.id} status={offer.status} />
              <Link
                href={`/${params.locale}/admin/offers/${offer.id}`}
                className="text-blue-500 underline text-sm"
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