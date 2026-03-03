import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function OfferDetailPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const supabase = createSupabaseServerClient();

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

      {/* BACK BUTTON */}
      <Link
        href={`/${params.locale}/admin/offers`}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        ← Tekliflere Dön
      </Link>

      <h1 className="text-3xl font-bold">
        Teklif Detayı
      </h1>

      <div className="bg-slate-800 p-8 rounded-xl space-y-6">

        <div>
          <p className="text-sm text-gray-400">Ad Soyad</p>
          <p className="text-lg font-semibold">{offer.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p>{offer.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Telefon</p>
          <p>{offer.phone}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Ürün</p>
          <p>{offer.product_type}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Adet</p>
          <p>{offer.quantity}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Açıklama</p>
          <p className="whitespace-pre-line">
            {offer.description || 'Açıklama girilmemiş.'}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Durum</p>
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              offer.status === 'new'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-green-500/20 text-green-400'
            }`}
          >
            {offer.status === 'new' ? 'New' : 'Done'}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-400">Oluşturulma</p>
          <p>
            {new Date(offer.created_at).toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
}