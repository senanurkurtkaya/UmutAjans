'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { generateSlug } from '@/lib/utils/slug';

type Category = { id: string; title: string };
type Item = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  short_description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

export default function EditProductMenuItemPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [item, setItem] = useState<Item | null>(null);

  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/product-menu/categories');
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setCategories([]);
          setCategoriesError(
            (data as { error?: string })?.error ??
              'Kategoriler yüklenemedi. SUPABASE_SERVICE_ROLE_KEY kontrol edin.'
          );
          return;
        }
        setCategories(Array.isArray(data) ? (data as Category[]) : []);
        setCategoriesError(null);
      } catch {
        setCategories([]);
        setCategoriesError('Kategoriler yüklenemedi. Ağ veya sunucu hatası.');
      }
    })();

    fetch(`/api/product-menu/items/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setItem(data);
        setCategoryId(String(data.category_id ?? ''));
        setName(String(data.name ?? ''));
        setSlug(String(data.slug ?? ''));
        setShortDescription(String(data.short_description ?? ''));
        setDisplayOrder(Number(data.display_order ?? 0));
        setIsActive(Boolean(data.is_active ?? true));
      })
      .catch(() => setItem(null));
  }, [id]);

  const computedSlug = useMemo(() => generateSlug(name), [name]);
  useEffect(() => {
    setSlug((prev) => (prev ? prev : computedSlug));
  }, [computedSlug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = new FormData();
      form.set('category_id', categoryId);
      form.set('name', name);
      form.set('slug', slug);
      form.set('short_description', shortDescription);
      form.set('display_order', String(displayOrder));
      form.set('is_active', String(isActive));
      if (file) form.set('image', file);

      const res = await fetch(`/api/product-menu/items/${id}`, { method: 'PUT', body: form });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        alert(json.error ?? 'Güncelleme başarısız');
        return;
      }
      router.push('/admin/product-menu');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async () => {
    if (!confirm('Silinsin mi?')) return;
    const res = await fetch(`/api/product-menu/items/${id}`, { method: 'DELETE' });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      alert(json.error ?? 'Silme başarısız');
      return;
    }
    router.push('/admin/product-menu');
  };

  if (!item) return <div className="text-white/80">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Ürünü Düzenle</h1>
        <button className="btn btn-outline btn-sm" onClick={onDelete} type="button">
          Sil
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
        {categoriesError ? (
          <div className="alert alert-error rounded-xl text-sm">
            <span>{categoriesError}</span>
          </div>
        ) : null}

        <select
          className="select select-bordered w-full"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="" disabled>
            Kategori seçin
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          className="input input-bordered w-full"
          placeholder="Ürün adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input input-bordered w-full"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />

        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Kısa açıklama"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text text-white/80">Display order</span>
            </div>
            <input
              type="number"
              className="input input-bordered w-full"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text text-white/80">Aktif</span>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </label>
        </div>

        {item.image_url ? (
          <div className="space-y-2">
            <div className="text-sm text-white/80">Mevcut görsel</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image_url} alt="" className="w-40 h-24 rounded-xl object-cover border border-white/10" />
          </div>
        ) : null}

        <div className="space-y-2">
          <div className="text-sm text-white/80">Görsel yükle</div>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </form>
    </div>
  );
}

