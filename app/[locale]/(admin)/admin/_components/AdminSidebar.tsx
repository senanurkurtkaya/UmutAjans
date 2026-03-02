'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const [open, setOpen] = useState(false);

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-lg transition ${
      pathname.startsWith(path)
        ? 'bg-white text-black font-semibold'
        : 'hover:bg-white/10'
    }`;

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-black px-3 py-2 rounded"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-neutral-950 border-r border-white/10 p-6 space-y-4 transform transition-transform z-50
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          <Link
            href={`/${locale}/admin`}
            className={linkClass(`/${locale}/admin`)}
          >
            Dashboard
          </Link>

          <Link
            href={`/${locale}/admin/offers`}
            className={linkClass(`/${locale}/admin/offers`)}
          >
            Teklifler
          </Link>

          <Link
            href={`/${locale}/admin/services`}
            className={linkClass(`/${locale}/admin/services`)}
          >
            Hizmetler
          </Link>

          <Link
            href={`/${locale}/admin/content`}
            className={linkClass(`/${locale}/admin/content`)}
          >
            İçerik
          </Link>

          <Link
            href={`/${locale}/admin/settings`}
            className={linkClass(`/${locale}/admin/settings`)}
          >
            Ayarlar
          </Link>
        </nav>
      </aside>
    </>
  );
}