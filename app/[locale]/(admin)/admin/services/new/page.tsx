'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const ICON_OPTIONS = ['FileText', 'BookOpen', 'Mail', 'Folder', 'Tag', 'Barcode', 'Image', 'Gift', 'Award', 'Book', 'Layout', 'Shirt', 'ShoppingBag', 'Magnet', 'Calendar', 'Globe'] as const;

export default function NewServicePage() {
  const t = useTranslations('servicesPage');
  const tAlerts = useTranslations('adminAlerts');
  const tIcons = useTranslations('adminIconOptions');
  const tAdmin = useTranslations('admin');
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('FileText');
  const [published, setPublished] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('services').insert({
      title,
      description,
      icon,
      published,
    });

    if (!error) {
      router.push('../services');
      router.refresh();
    } else {
      console.error(error);
    }
  };

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">
        {tAlerts('createNewService')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

        <div>
          <label className="block mb-2">{t('title')}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">{t('description')}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded h-32"
          />
        </div>

        <div>
          <label className="block mb-2">{t('icon')}</label>

          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border rounded h-10 text-base-content"
          >
            {ICON_OPTIONS.map((key) => (
              <option key={key} value={key}>{tIcons(key)}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label>{t('published')}</label>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded"
        >
          {tAdmin('save')}
        </button>

      </form>
    </div>
  );
}