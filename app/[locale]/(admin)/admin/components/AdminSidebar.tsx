'use client';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AdminSidebar() {
  const pathname = usePathname();

  const t = useTranslations('admin');

  const [open, setOpen] = useState(false);

  const linkClass = (path: string, exact = false) =>
    `block px-4 py-3 rounded-lg transition ${exact
      ? pathname === path
        ? 'bg-white text-black font-semibold'
        : 'hover:bg-white/10'
      : pathname.startsWith(path)
        ? 'bg-white text-black font-semibold'
        : 'hover:bg-white/10'
    }`;

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-black px-3 py-2 rounded shadow-lg"
        aria-label="Menu"
      >
        ☰
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          aria-hidden
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-neutral-950 border-r border-white/10 p-6 space-y-4 transform transition-transform duration-300 z-50
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 tracking-wide">
          {t('panel')}
        </h2>

        <nav className="space-y-2">

          <Link href="/admin" className={linkClass('/admin', true)}>
            {t('dashboard')}
          </Link>

          <Link href="/admin/hero" onClick={handleNavigate} className={linkClass('/admin/hero')}>
            {t('hero')}
          </Link>

          <Link href="/admin/homepage" onClick={handleNavigate} className={linkClass('/admin/homepage')}>
            {t('homepage')}
          </Link>

          <Link href="/admin/services" onClick={handleNavigate} className={linkClass('/admin/services')}>
            {t('services')}
          </Link>

          <Link href="/admin/service-cards" onClick={handleNavigate} className={linkClass('/admin/service-cards')}>
            Service Cards
          </Link>

          <Link href="/admin/portfolio" onClick={handleNavigate} className={linkClass('/admin/portfolio')}>
            {t('portfolio')}
          </Link>

          <Link href="/admin/offers" onClick={handleNavigate} className={linkClass('/admin/offers')}>
            {t('offers')}
          </Link>

          <Link href="/admin/settings" onClick={handleNavigate} className={linkClass('/admin/settings')}>
            {t('settings')}
          </Link>

        </nav>
      </aside>
    </>
  );
}