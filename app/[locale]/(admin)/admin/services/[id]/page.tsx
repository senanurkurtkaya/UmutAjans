'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function EditServicePage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const t = useTranslations('admin.servicesPage');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('FileText');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('id', params.id)
        .single();

      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setIcon(data.icon);
        setPublished(data.published);
      }
    };

    fetchService();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    await supabase
      .from('services')
      .update({
        title,
        description,
        icon,
        published
      })
      .eq('id', params.id);

    router.push(`/${params.locale}/admin/services`);
    router.refresh();
  };

  const handleDelete = async () => {
    await supabase
      .from('services')
      .delete()
      .eq('id', params.id);

    router.push(`/${params.locale}/admin/services`);
    router.refresh();
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

        <div>
          <label className="block mb-2">
            {t('description')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">
            {t('icon')}
          </label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="FileText">Kartvizit / El ilanı / Bloknot</option>
            <option value="BookOpen">Broşür / Katalog / Dergi / Menü</option>
            <option value="Mail">Zarf / Davetiye</option>
            <option value="Folder">Cepli dosya</option>
            <option value="Tag">Etiket / Sticker</option>
            <option value="Barcode">Barkod etiket</option>
            <option value="Image">Poster / Afiş / Rollup</option>
            <option value="Gift">Promosyon ürünleri</option>
            <option value="Award">Plaket</option>
            <option value="Book">Ajanda</option>
            <option value="Layout">Kurumsal kimlik / Masa isimliği</option>
            <option value="Shirt">Tekstil baskı</option>
            <option value="ShoppingBag">Bez çanta</option>
            <option value="Magnet">Magnet baskı</option>
            <option value="Calendar">Takvim</option>
            <option value="Globe">Diğer</option>
          </select>
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