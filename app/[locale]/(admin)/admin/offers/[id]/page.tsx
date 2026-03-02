import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function OfferDetailPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const supabase = createSupabaseServerClient();

  const { data: offer } = await supabase
    .from('offers')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!offer) return notFound();

  return (
    <div className="container py-20 space-y-8">
      <h1 className="text-3xl font-bold">Teklif Detayı</h1>

      <div className="border rounded-lg p-6 space-y-4">
        <p><strong>Ad Soyad:</strong> {offer.name}</p>
        <p><strong>Email:</strong> {offer.email}</p>
        <p><strong>Telefon:</strong> {offer.phone}</p>
        <p><strong>Ürün:</strong> {offer.product_type}</p>
        <p><strong>Adet:</strong> {offer.quantity}</p>
        <p><strong>Ölçü:</strong> {offer.size}</p>
       <div className="bg-white/5 border p-4 rounded">
  <p className="text-sm text-gray-400 mb-2">Açıklama</p>
  <p className="whitespace-pre-line">
    {offer.description || "Açıklama girilmemiş."}
  </p>
</div>
        <p><strong>Status:</strong> {offer.status}</p>
        <p className="text-xs text-gray-500">
          {new Date(offer.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}