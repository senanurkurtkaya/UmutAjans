'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitOffer } from './action';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white p-3 rounded-lg"
    >
      {pending ? 'Gönderiliyor...' : 'Teklif Gönder'}
    </button>
  );
}

export default function OfferPage() {
  const [state, formAction] = useFormState(submitOffer, null);

  return (
    <div className="container max-w-2xl py-20">
      <h1 className="text-3xl font-bold mb-8">Teklif Al</h1>

      <form action={formAction} className="space-y-6">
        <input
          name="name"
          placeholder="Ad Soyad"
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Telefon"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="product_type"
          className="w-full border p-3 rounded-lg"
        >
          <option value="Broşür">Broşür</option>
          <option value="Kartvizit">Kartvizit</option>
          <option value="Afiş">Afiş</option>
          <option value="Diğer">Diğer</option>
        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Adet"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="size"
          placeholder="Ölçü (örn: 10x15 cm)"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Açıklama"
          className="w-full border p-3 rounded-lg"
        />

        <SubmitButton />

        {/* DEBUG */}
        <pre className="bg-gray-100 p-2 text-xs">
          {JSON.stringify(state)}
        </pre>

        {state?.success && (
          <p className="text-green-600 text-center mt-4">
            Teklif başarıyla gönderildi 🎉
          </p>
        )}
      </form>
    </div>
  );
}