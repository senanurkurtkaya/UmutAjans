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
      className={`px-3 py-1.5 rounded-lg text-sm font-medium text-white transition disabled:opacity-50 ${
        published
          ? 'bg-green-600/90 hover:bg-green-600'
          : 'bg-red-600/90 hover:bg-red-600'
      }`}
    >
      {pending
        ? 'Updating...'
        : published
        ? 'Published'
        : 'Draft'}
    </button>
  );
}