import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function OfferDetailPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const supabase = createSupabaseServerClient();
  const t = await getTranslations({ locale: params.locale, namespace: 'admin.offersPage' });

  const { data: offer, error } = await supabase
    .from('offers')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!offer || error) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href={`/${params.locale}/admin/offers`}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        ← {t('back')}
      </Link>

      <h1 className="text-3xl font-bold">{t('detail')}</h1>

      <div className="bg-slate-800 p-8 rounded-xl space-y-6">
        <div>
          <p className="text-sm text-gray-400">{t('name')}</p>
          <p className="text-lg font-semibold">{offer.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('email')}</p>
          <p>{offer.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('phone')}</p>
          <p>{offer.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('product')}</p>
          <p>{offer.product_type}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">{t('quantity')}</p>
          <p>{offer.quantity}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">{t('description')}</p>
          <p className="whitespace-pre-line">
            {offer.description || t('noDescription')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('status')}</p>
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              offer.status === 'new'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-green-500/20 text-green-400'
            }`}
          >
            {offer.status === 'new' ? t('new') : t('done')}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-400">{t('created')}</p>
          <p>{new Date(offer.created_at).toLocaleString()}</p>
        </div>

      </div>
    </div>
  );
}