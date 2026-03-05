'use client';

import { useFormStatus } from 'react-dom';

export default function PublishToggle({
  published,
}: {
  published: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-3 py-1 rounded text-sm font-medium transition ${
        published
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-red-600 hover:bg-red-700'
      } ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {pending
        ? 'Updating...'
        : published
        ? 'Published'
        : 'Draft'}
    </button>
  );
}