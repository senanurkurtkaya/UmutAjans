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

  const pageTitles: [string, string][] = [
    ['/admin/service-cards', 'Service Cards'],
    ['/admin/services', 'Services'],
    ['/admin/portfolio', 'Portfolio'],
    ['/admin/offers', 'Offers'],
    ['/admin/homepage', 'Homepage'],
    ['/admin/hero', 'Hero'],
    ['/admin/products', 'Products'],
    ['/admin', t('dashboard')],
  ];
  const currentTitle = pageTitles.find(([path]) =>
    path === '/admin' ? pathname === path : pathname.startsWith(path)
  )?.[1] ?? t('dashboard');

  return (
    <header className="h-14 flex-shrink-0 border-b border-white/10 flex items-center justify-between px-4 md:px-6 relative bg-[#0f1a2b]/90 backdrop-blur-sm">
      <div className="font-medium text-white truncate">{currentTitle}</div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => switchLocale('tr')}
            className={`px-2.5 py-1.5 text-sm rounded-lg transition ${locale === 'tr'
                ? 'bg-blue-400 text-[#0f1a2b] font-medium'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
              }`}
          >
            TR
          </button>

          <button
            onClick={() => switchLocale('en')}
            className={`px-2.5 py-1.5 text-sm rounded-lg transition ${locale === 'en'
                ? 'bg-blue-400 text-[#0f1a2b] font-medium'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
              }`}
          >
            EN
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full bg-blue-400 text-[#0f1a2b] font-semibold flex items-center justify-center hover:bg-blue-300 transition"
            aria-expanded={open}
            aria-haspopup="true"
          >
            A
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-[#0f1a2b] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1">
              <button
                onClick={() => { setOpen(false); router.push('/admin/profile'); }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition"
              >
                {t('profile')}
              </button>
              <div className="border-t border-white/10 my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition"
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