'use client';

import { useState } from 'react';
import { Link } from '@/lib/i18n/navigation';

type Item = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  category?: { title: string } | null;
};

export function ProductMenuItemsTable({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);

  const remove = async (id: string) => {
    if (!confirm('Ürün silinsin mi?')) return;
    const res = await fetch(`/api/product-menu/items/${id}`, { method: 'DELETE' });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      alert(json.error ?? 'Silme başarısız');
      return;
    }
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0f1a2b] shadow-xl">
      <table className="table">
        <thead>
          <tr className="text-white/80">
            <th>Görsel</th>
            <th>Ad</th>
            <th>Slug</th>
            <th>Kategori</th>
            <th>Aktif</th>
            <th>Sıra</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="hover:bg-white/5">
              <td>
                {it.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10" />
                )}
              </td>
              <td className="font-medium text-white">{it.name}</td>
              <td className="text-white/70">{it.slug}</td>
              <td className="text-white/70">{it.category?.title ?? '-'}</td>
              <td>
                <span className={it.is_active ? 'badge badge-success' : 'badge badge-ghost'}>
                  {it.is_active ? 'Aktif' : 'Pasif'}
                </span>
              </td>
              <td className="text-white/70">{it.display_order}</td>
              <td className="text-right flex justify-end gap-2">
                <Link href={`/admin/product-menu/${it.id}/edit`} className="btn btn-xs btn-outline">
                  Düzenle
                </Link>
                <button className="btn btn-xs btn-outline" type="button" onClick={() => remove(it.id)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
          {!items.length ? (
            <tr>
              <td colSpan={7} className="text-white/70">
                Kayıt bulunamadı.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

