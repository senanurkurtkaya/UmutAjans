'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function NewServicePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('seo');
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
        Create New Service
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div>
          <label className="block mb-2">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Icon</label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="seo">SEO</option>
            <option value="social">Social</option>
            <option value="ppc">PPC</option>
            <option value="content">Content</option>
            <option value="analytics">Analytics</option>
            <option value="web">Web</option>
            <option value="globe">Globe</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label>Published</label>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}