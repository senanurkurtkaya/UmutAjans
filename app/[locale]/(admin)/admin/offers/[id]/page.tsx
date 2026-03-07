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
        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
      >
        ← {t('back')}
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold">{t('detail')}</h1>

      <div className="bg-[#0f1a2b] border border-white/10 p-6 md:p-8 rounded-xl space-y-6 shadow-xl">
        <div>
          <p className="text-sm text-white/70">{t('name')}</p>
          <p className="text-lg font-semibold">{offer.name}</p>
        </div>
        <div>
          <p className="text-sm text-white/70">{t('email')}</p>
          <p>{offer.email}</p>
        </div>
        <div>
          <p className="text-sm text-white/70">{t('phone')}</p>
          <p>{offer.phone}</p>
        </div>
        <div>
          <p className="text-sm text-white/70">{t('product')}</p>
          <p>{offer.product_type}</p>
        </div>

        {offer.product_type !== 'İletişim formu' && (
          <div>
            <p className="text-sm text-white/70">{t('quantity')}</p>
            <p>{offer.quantity}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-white/70">{t('description')}</p>
          <p className="whitespace-pre-line text-white/80">
            {offer.description || t('noDescription')}
          </p>
        </div>
        <div>
          <p className="text-sm text-white/70">{t('status')}</p>
          <span
            className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium ${
              offer.status === 'new'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-green-500/20 text-green-400'
            }`}
          >
            {offer.status === 'new' ? t('new') : t('done')}
          </span>
        </div>
        <div>
          <p className="text-sm text-white/70">{t('created')}</p>
          <p className="text-white/80">{new Date(offer.created_at).toLocaleString()}</p>
        </div>

      </div>
    </div>
  );
}