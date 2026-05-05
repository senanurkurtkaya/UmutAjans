'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/lib/utils/slug';

type Category = { id: string; title: string };

export default function NewProductMenuItemPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

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
  }, []);

  const computedSlug = useMemo(() => generateSlug(name), [name]);
  useEffect(() => {
    // auto-fill only if slug is empty or matches previous computed
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

      const res = await fetch('/api/product-menu/items', { method: 'POST', body: form });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        alert(json.error ?? 'Kaydetme başarısız');
        return;
      }
      router.push('/admin/product-menu');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Yeni Ürün</h1>

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

        <div className="space-y-2">
          <div className="text-sm text-white/80">Görsel</div>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </form>
    </div>
  );
}

