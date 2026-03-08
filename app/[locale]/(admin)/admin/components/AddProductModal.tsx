'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function AddProductModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const t = useTranslations('admin');

  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const result = await res.json();

    if (!result.success) {
      setError(result.error ?? 'Failed to save');
      setSaving(false);
      return;
    }

    setSaving(false);
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-[420px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{t('addProduct')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <label className="block mb-2 text-sm text-gray-300">{t('placeholderTitle')}</label>
        <input
          className="w-full p-2 rounded bg-slate-900 border border-slate-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn: Kartvizit Baskı"
        />

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-800 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}