import { createSupabaseServerClient } from '@/lib/supabase/server';
import StatusButton from './StatusButton';
import Link from 'next/link';

async function toggleStatus(id: string, currentStatus: string) {
  'use server';

  const supabase = createSupabaseServerClient();
  const newStatus = currentStatus === 'new' ? 'done' : 'new';

  await supabase
    .from('offers')
    .update({ status: newStatus })
    .eq('id', id);
}

export default async function AdminOffersPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { status?: string };
}) {
  const supabase = createSupabaseServerClient();

  const { data: allOffers } = await supabase
    .from('offers')
    .select('status');

  const newCount = allOffers?.filter(o => o.status === 'new').length ?? 0;
  const doneCount = allOffers?.filter(o => o.status === 'done').length ?? 0;


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
    `px-4 py-2 border rounded transition ${activeFilter === value
      ? 'bg-white text-black font-semibold'
      : 'hover:bg-white/10'
    }`;

  return (
    <div className="container py-20 space-y-8">
      <h1 className="text-3xl font-bold">
        Teklif Talepleri
      </h1>

      <div className="flex gap-6">
        <div className="bg-red-500/10 border border-red-500 p-4 rounded">
          <p className="text-sm text-gray-400">New</p>
          <p className="text-2xl font-bold text-red-400">
            {newCount}
          </p>
        </div>

        <div className="bg-green-500/10 border border-green-500 p-4 rounded">
          <p className="text-sm text-gray-400">Done</p>
          <p className="text-2xl font-bold text-green-400">
            {doneCount}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href={`/${params.locale}/admin/offers`}
          className={filterClass('all')}
        >
          Tümü
        </Link>

        <Link
          href={`/${params.locale}/admin/offers?status=new`}
          className={filterClass('new')}
        >
          New
        </Link>

        <Link
          href={`/${params.locale}/admin/offers?status=done`}
          className={filterClass('done')}
        >
          Done
        </Link>
      </div>

      <div className="space-y-4">
        {offers?.length === 0 && (
          <p className="text-gray-500">Kayıt bulunamadı.</p>
        )}

        {offers?.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{offer.name}</p>
              <p className="text-sm text-muted-foreground">
                {offer.product_type} • {offer.quantity} adet
              </p>
              <p className="text-xs text-gray-500">
                {new Date(offer.created_at).toLocaleString()}
              </p>
            </div>
            <StatusButton id={offer.id} status={offer.status} />
            <Link
              href={`/${params.locale}/admin/offers/${offer.id}`}
              className="text-blue-500 underline text-sm"
            >
              Detay
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}