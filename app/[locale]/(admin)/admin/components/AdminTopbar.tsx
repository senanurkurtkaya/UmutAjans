'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('admin.topbar');

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    router.push('/login');
  };

  const switchLocale = (newLocale: string) => {
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    window.location.href = `/${newLocale}${path === '/' ? '' : path}`;
  };

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 relative">
      <div className="font-medium">{t('dashboard')}</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => switchLocale('tr')}
            className={`px-2 py-1 text-sm rounded ${locale === 'tr'
                ? 'bg-white text-black'
                : 'bg-white/10 hover:bg-white/20'
              }`}
          >
            TR
          </button>

          <button
            onClick={() => switchLocale('en')}
            className={`px-2 py-1 text-sm rounded ${locale === 'en'
                ? 'bg-white text-black'
                : 'bg-white/10 hover:bg-white/20'
              }`}
          >
            EN
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-white text-black font-semibold flex items-center justify-center"
          >
            A
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-neutral-900 border border-white/10 rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => { setOpen(false); router.push('/admin/profile'); }}
                className="w-full text-left px-4 py-3 hover:bg-white/10"
              >
                {t('profile')}
              </button>
              <button
                onClick={() => { setOpen(false); router.push('/admin/settings'); }}
                className="w-full text-left px-4 py-3 hover:bg-white/10"
              >
                {t('settings')}
              </button>
              <div className="border-t border-white/10" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}