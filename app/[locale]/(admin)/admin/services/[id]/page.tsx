'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';

export default function EditServicePage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('seo');
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
        published,
      })
      .eq('id', params.id);

    router.push('/en/admin/services');
    router.refresh();
  };

  const handleDelete = async () => {
    await supabase
      .from('services')
      .delete()
      .eq('id', params.id);

    router.push('/en/admin/services');
    router.refresh();
  };

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">
        Edit Service
      </h1>

      <form onSubmit={handleUpdate} className="space-y-6 max-w-xl">
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

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}