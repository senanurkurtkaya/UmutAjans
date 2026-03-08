'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type HeroSlide = {
  id: string;
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  display_order?: number;
  image_url?: string;
};

type Props = {
  editingSlide: HeroSlide | undefined;
  locale: string;
  labels: {
    placeholderTitle: string;
    placeholderSubtitle: string;
    placeholderButton: string;
    placeholderButtonLink: string;
    placeholderOrder: string;
    image: string;
    changeImage: string;
    addSlide: string;
    update: string;
  };
};

export function HeroSlideForm({ editingSlide, labels }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fileInput = form.querySelector('[name="image"]') as HTMLInputElement;
    if (!editingSlide && (!fileInput?.files?.length || fileInput.files[0]?.size === 0)) {
      setError('Hero görseli gerekli');
      return;
    }

    setSubmitting(true);
    const formData = new FormData(form);

    try {
      if (editingSlide) {
        const res = await fetch(`/api/hero-slides/${editingSlide.id}`, {
          method: 'PUT',
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error ?? res.statusText);
        }
      } else {
        const res = await fetch('/api/hero-slides', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error ?? res.statusText);
        }
      }
      router.refresh();
      if (!editingSlide) form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full px-3 py-2.5 rounded-lg bg-[#0f1a2b] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-[#0f1a2b] border border-white/10 rounded-xl shadow-xl"
    >
      <input
        name="title"
        placeholder={labels.placeholderTitle}
        defaultValue={editingSlide?.title ?? ''}
        className={inputClass}
      />

      <textarea
        name="subtitle"
        placeholder={labels.placeholderSubtitle}
        defaultValue={editingSlide?.subtitle ?? ''}
        className={inputClass}
      />

      <input
        name="button_text"
        placeholder={labels.placeholderButton}
        defaultValue={editingSlide?.button_text ?? ''}
        className={inputClass}
      />

      <input
        name="button_link"
        placeholder={labels.placeholderButtonLink}
        defaultValue={editingSlide?.button_link ?? ''}
        className={inputClass}
      />

      <input
        name="order"
        type="number"
        placeholder={labels.placeholderOrder}
        defaultValue={editingSlide?.display_order ?? 0}
        className={inputClass}
      />

      <div>
        <label className="block text-sm text-white/70 mb-1">
          {editingSlide ? labels.changeImage : labels.image}
        </label>
        <input
          name="image"
          type="file"
          accept="image/*"
          required={!editingSlide}
          className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:font-medium file:cursor-pointer"
        />
        {!editingSlide && (
          <p className="mt-1 text-xs text-amber-400">Hero görseli zorunludur</p>
        )}
        {editingSlide?.image_url && (
          <p
            className="mt-1 text-xs text-white/50 truncate max-w-full"
            title={editingSlide.image_url}
          >
            Mevcut: {editingSlide.image_url}
          </p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? '...' : editingSlide ? labels.update : labels.addSlide}
      </button>
    </form>
  );
}
