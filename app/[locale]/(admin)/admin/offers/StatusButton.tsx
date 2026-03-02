'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleStatus } from './actions';

export default function StatusButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await toggleStatus(id, status);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`px-3 py-1 rounded text-white transition ${
        status === 'new'
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-600 hover:bg-green-700'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending
        ? 'Güncelleniyor...'
        : status === 'new'
        ? 'New'
        : 'Done'}
    </button>
  );
}