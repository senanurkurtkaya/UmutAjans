'use client';

import { useTransition } from 'react';
import { toggleStatus } from './actions';

export default function StatusButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      toggleStatus(id, status);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`px-3 py-1 rounded text-sm font-medium transition ${
        status === 'new'
          ? 'bg-red-500 text-white'
          : 'bg-green-600 text-white'
      }`}
    >
      {isPending ? '...' : status === 'new' ? 'New' : 'Done'}
    </button>
  );
}