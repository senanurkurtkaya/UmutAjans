'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function EditServiceCardPage() {
  const router = useRouter();
  const params = useParams();

  const t = useTranslations('servicesPage');

  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      const res = await fetch(`/api/service-cards/${params.id}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data) {
        setTitle(data.title ?? '');
        setPublished(data.published ?? false);
      }
    };

    fetchCard();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/service-cards/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, published }),
    });
    const result = await res.json();
    if (result.success) {
      router.push(`/${params.locale}/admin/service-cards`);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/service-cards/${params.id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (result.success) {
      router.push(`/${params.locale}/admin/service-cards`);
      router.refresh();
    }
  };

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">
        {t('editTitle')}
      </h1>

      <form onSubmit={handleUpdate} className="space-y-6 max-w-xl">
        <div>
          <label className="block mb-2">
            {t('title')}
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label>
            {t('published')}
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            {t('update')}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded"
          >
            {t('delete')}
          </button>
        </div>
      </form>
    </div>
  );
}

