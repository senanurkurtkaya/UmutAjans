'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 Click outside detect
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
    router.push(`/${locale}/login`);
  };

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 relative">
      <div className="font-medium">Admin Dashboard</div>

      <div className="relative" ref={dropdownRef}>
        {/* Avatar */}
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-white text-black font-semibold flex items-center justify-center"
        >
          A
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-neutral-900 border border-white/10 rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => {
                setOpen(false);
                router.push(`/${locale}/admin/profile`);
              }}
              className="w-full text-left px-4 py-3 hover:bg-white/10"
            >
              Profil
            </button>

            <button
              onClick={() => {
                setOpen(false);
                router.push(`/${locale}/admin/settings`);
              }}
              className="w-full text-left px-4 py-3 hover:bg-white/10"
            >
              Ayarlar
            </button>

            <div className="border-t border-white/10" />

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </header>
  );
}