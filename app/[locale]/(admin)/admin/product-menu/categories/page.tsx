'use client';

import { useEffect, useMemo, useState } from 'react';
import { generateSlug } from '@/lib/utils/slug';
import { Link } from '@/lib/i18n/navigation';

type Category = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
};

export default function ProductMenuCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const computedSlug = useMemo(() => generateSlug(title), [title]);
  useEffect(() => setSlug((prev) => (prev ? prev : computedSlug)), [computedSlug]);

  const load = async () => {
    const res = await fetch('/api/product-menu/categories');
    const data = await res.json().catch(() => []);
    setCategories(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/product-menu/categories', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        description: description || null,
        display_order: displayOrder,
        is_active: isActive,
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      alert(json.error ?? 'Kaydetme başarısız');
      return;
    }
    setTitle('');
    setSlug('');
    setDescription('');
    setDisplayOrder(0);
    setIsActive(true);
    await load();
  };

  const update = async (cat: Category, patch: Partial<Category>) => {
    const res = await fetch(`/api/product-menu/categories/${cat.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(patch),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      alert(json.error ?? 'Güncelleme başarısız');
      return;
    }
    await load();
  };

  const edit = async (cat: Category) => {
    const nextTitle = prompt('Kategori başlığı', cat.title);
    if (nextTitle == null) return;
    const nextSlug = prompt('Slug', cat.slug);
    if (nextSlug == null) return;
    const nextDescription = prompt('Açıklama (boş bırakılabilir)', cat.description ?? '') ?? '';
    const nextOrderRaw = prompt('Display order', String(cat.display_order));
    if (nextOrderRaw == null) return;
    const nextOrder = Number(nextOrderRaw);
    if (Number.isNaN(nextOrder)) {
      alert('Display order sayı olmalı');
      return;
    }
    await update(cat, {
      title: nextTitle,
      slug: nextSlug,
      description: nextDescription || null,
      display_order: nextOrder,
    });
  };

  const remove = async (cat: Category) => {
    if (!confirm('Kategori silinsin mi? Altındaki ürünler de silinir.')) return;
    const res = await fetch(`/api/product-menu/categories/${cat.id}`, { method: 'DELETE' });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      alert(json.error ?? 'Silme başarısız');
      return;
    }
    await load();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Ürün Menüsü Kategorileri</h1>
        <Link href="/admin/product-menu" className="btn btn-ghost btn-sm">
          Ürünlere dön
        </Link>
      </div>

      <form onSubmit={create} className="space-y-3 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            className="input input-bordered w-full"
            placeholder="Kategori başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Açıklama (opsiyonel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="number"
            className="input input-bordered w-full"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            placeholder="Display order"
          />
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-white/80">Aktif</span>
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Kategori Ekle
        </button>
      </form>

      <div className="space-y-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-4 bg-[#0f1a2b] border border-white/10 rounded-xl hover:border-white/20 transition-colors shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="font-semibold text-white">{c.title}</div>
                <div className="text-sm text-white/70">{c.slug}</div>
                {c.description ? <div className="text-sm text-white/60 mt-1">{c.description}</div> : null}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-xs btn-outline"
                  type="button"
                  onClick={() => edit(c)}
                >
                  Düzenle
                </button>
                <button
                  className="btn btn-xs btn-outline"
                  type="button"
                  onClick={() => update(c, { is_active: !c.is_active })}
                >
                  {c.is_active ? 'Pasif Yap' : 'Aktif Yap'}
                </button>
                <button className="btn btn-xs btn-outline" type="button" onClick={() => remove(c)}>
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
        {!categories.length ? <div className="text-white/70">Kayıt bulunamadı.</div> : null}
      </div>
    </div>
  );
}

