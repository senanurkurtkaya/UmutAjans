'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { FileText, Briefcase, Mail, FileCheck } from 'lucide-react';

const links = [
  { href: '/about', key: 'about' as const, icon: FileText },
  { href: '/services', key: 'services' as const, icon: Briefcase },
  { href: '/contact', key: 'contact' as const, icon: Mail },
  { href: '/offer', key: 'getQuote' as const, icon: FileCheck },
] as const;

export function HomeQuickLinks() {
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');

  return (
    <section
      className="border-b border-base-300/60 bg-gradient-to-r from-base-200/70 to-base-100/90"
      aria-labelledby="quick-links-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 py-3 md:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2
            id="quick-links-heading"
            className="text-sm font-semibold text-base-content/70 shrink-0"
          >
            {tHome('exploreTitle')}
          </h2>
          <nav
            aria-label={tHome('exploreSubtitle')}
            className="flex flex-wrap items-center gap-2"
          >
            {links.map(({ href, key, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-base-100/90 hover:bg-primary hover:text-primary-content text-base-content border border-base-300/80 shadow-sm hover:shadow transition-all duration-200"
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden />
                <span>{tNav(key)}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
