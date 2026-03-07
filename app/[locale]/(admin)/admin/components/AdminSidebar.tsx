'use client';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AdminSidebar() {
  const pathname = usePathname();

  const t = useTranslations('admin');

  const [open, setOpen] = useState(false);

  const linkClass = (path: string, exact = false) =>
    `block px-4 py-3 rounded-lg transition-colors duration-200 ${exact
      ? pathname === path
        ? 'bg-blue-400 text-[#0f1a2b] font-semibold'
        : 'hover:bg-white/10 text-white/90'
      : pathname.startsWith(path)
        ? 'bg-blue-400 text-[#0f1a2b] font-semibold'
        : 'hover:bg-white/10 text-white/90'
    }`;

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-400 text-[#0f1a2b] px-3 py-2.5 rounded-lg shadow-lg hover:bg-blue-300 transition"
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
        className={`fixed md:static top-0 left-0 h-full w-64 flex-shrink-0 bg-[#0f1a2b] border-r border-white/10 py-6 px-4 transform transition-transform duration-300 z-50
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <h2 className="text-lg font-bold mb-6 px-3 tracking-tight text-white">
          {t('panel')}
        </h2>

        <nav className="space-y-1">

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
            {t('serviceCards')}
          </Link>

          <Link href="/admin/portfolio" onClick={handleNavigate} className={linkClass('/admin/portfolio')}>
            {t('portfolio')}
          </Link>

          <Link href="/admin/offers" onClick={handleNavigate} className={linkClass('/admin/offers')}>
            {t('offers')}
          </Link>

        </nav>
      </aside>
    </>
  );
}