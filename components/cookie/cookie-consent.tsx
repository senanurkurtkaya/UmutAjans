'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'cookie-consent';
const CONSENT_ACCEPTED = 'accepted';
const CONSENT_REJECTED = 'rejected';

export function CookieConsent() {
  const locale = useLocale();
  const t = useTranslations('cookieConsent');
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored !== CONSENT_ACCEPTED && stored !== CONSENT_REJECTED) {
      setShowPopup(true);
    }
  }, [mounted]);

  const saveAndClose = (value: typeof CONSENT_ACCEPTED | typeof CONSENT_REJECTED) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CONSENT_KEY, value);
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 z-[9999] w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-border bg-background p-4 shadow-lg sm:bottom-6 sm:p-5"
      role="dialog"
      aria-label="Cookie consent"
    >
      <p className="mb-4 text-sm text-muted-foreground sm:text-base">
        {locale === 'tr' ? (
          <>
            Deneyiminizi geliştirmek ve analiz yapmak için çerezler kullanıyoruz. Analitik ve
            pazarlama çerezlerini kabul edebilir veya reddedebilirsiniz. Detaylı bilgi için{' '}
            <Link href="/privacy" className="underline">
              gizlilik politikası
            </Link>{' '}
            göz atabilirsiniz.
          </>
        ) : (
          <>
            We use cookies to improve your experience and for analytics. You can accept or reject
            analytics and marketing cookies. For more details, please see our{' '}
            <Link href="/privacy" className="underline">
              privacy policy
            </Link>
            .
          </>
        )}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => saveAndClose(CONSENT_REJECTED)}
        >
          {t('reject')}
        </Button>
        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => saveAndClose(CONSENT_ACCEPTED)}
        >
          {t('accept')}
        </Button>
      </div>
    </div>
  );
}
