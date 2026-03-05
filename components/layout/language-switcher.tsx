'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/lib/i18n/i18n';
import { cn } from '@/lib/utils';
import { useCallback, memo } from 'react';
import { toLocale } from '@/lib/utils/validation';

interface LanguageSwitcherProps {
  variant?: 'default' | 'mobile';
  className?: string;
}

const labels: Record<Locale, string> = { en: 'EN', tr: 'TR' };

export const LanguageSwitcher = memo(function LanguageSwitcher({
  variant = 'default',
  className,
}: LanguageSwitcherProps) {
  const locale = toLocale(useLocale());
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = useCallback((newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  }, [router, pathname]);

  if (variant === 'mobile') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {locales.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            className={cn(
              'flex items-center justify-start gap-2 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
              locale === loc
                ? 'bg-primary text-primary-content'
                : 'bg-base-200 text-base-content hover:bg-base-300'
            )}
          >
            {loc === 'en' ? 'English' : 'Türkçe'}
            {locale === loc && <span className="ml-auto opacity-70">✓</span>}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center rounded-xl bg-base-200/80 p-1 border border-base-300/60',
        className
      )}
      role="group"
      aria-label="Dil seçimi"
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium min-w-[2.25rem] transition-colors',
            locale === loc
              ? 'bg-primary text-primary-content shadow-sm'
              : 'text-base-content/80 hover:text-base-content hover:bg-base-300/50'
          )}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
});
