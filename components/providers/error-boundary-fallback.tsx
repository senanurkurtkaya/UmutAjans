'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ErrorBoundaryFallbackProps {
  onRetry: () => void;
}

export function ErrorBoundaryFallback({ onRetry }: ErrorBoundaryFallbackProps) {
  const t = useTranslations('common');

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <h1 className="text-2xl font-bold">{t('somethingWentWrong')}</h1>
        <p className="text-muted-foreground">
          {t('somethingWentWrongDescription')}
        </p>
        <Button onClick={onRetry}>
          {t('refreshPage')}
        </Button>
      </div>
    </div>
  );
}
