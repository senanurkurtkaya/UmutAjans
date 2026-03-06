'use client';

import { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toggleStatus } from './actions';

export default function StatusButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const t = useTranslations('admin.offersPage');
  const tPending = useTranslations('adminAlerts');
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
      {isPending ? tPending('statusPending') : status === 'new' ? t('new') : t('done')}
    </button>
  );
}