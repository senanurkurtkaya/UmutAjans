'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryFallbackProps {
  onRetry: () => void;
}

const FALLBACK_TEXT = {
  title: 'Bir şeyler yanlış gitti',
  description: 'Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.',
  retry: 'Sayfayı yenile',
};

export function ErrorBoundaryFallback({ onRetry }: ErrorBoundaryFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <h1 className="text-2xl font-bold">{FALLBACK_TEXT.title}</h1>
        <p className="text-muted-foreground">{FALLBACK_TEXT.description}</p>
        <Button onClick={onRetry}>{FALLBACK_TEXT.retry}</Button>
      </div>
    </div>
  );
}
