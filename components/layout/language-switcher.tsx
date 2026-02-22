'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';
import { useCallback, memo } from 'react';
import { toLocale } from '@/lib/utils/validation';

interface LanguageSwitcherProps {
  variant?: 'default' | 'mobile';
  className?: string;
}

export const LanguageSwitcher = memo(function LanguageSwitcher({
  variant = 'default',
  className,
}: LanguageSwitcherProps) {
  const locale = toLocale(useLocale());
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = useCallback((newLocale: Locale) => {
    // Use next-intl's router which handles locale switching automatically
    router.replace(pathname, { locale: newLocale });
  }, [router, pathname]);

  if (variant === 'mobile') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {locales.map((loc) => (
          <Button
            key={loc}
            variant={locale === loc ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchLocale(loc)}
            className="w-full justify-start"
          >
            <Globe className="mr-2 h-4 w-4" />
            {loc === 'en' ? 'English' : 'Türkçe'}
            {locale === loc && (
              <span className="ml-auto text-xs opacity-70">✓</span>
            )}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      {locales.map((loc) => (
        <Button
          key={loc}
          variant={locale === loc ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLocale(loc)}
          className="text-xs h-8 px-2 min-w-[2.5rem]"
        >
          {loc.toUpperCase()}
        </Button>
      ))}
    </div>
  );
});
