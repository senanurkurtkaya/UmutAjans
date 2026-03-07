'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/lib/i18n/navigation';
import { Menu, X, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { Link } from '@/lib/i18n/navigation';
import { useScroll } from '@/lib/hooks/use-scroll';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/contact', key: 'contact' },
] as const;

type NavbarProps = {
  siteName?: string;
  logoUrl?: string;
};

export const Navbar = React.memo(function Navbar({ siteName = 'Umut Ajans', logoUrl }: NavbarProps) {
  const drawerRef = React.useRef<HTMLInputElement>(null);
  const scrolled = useScroll(10);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();

  const closeDrawer = React.useCallback(() => {
    if (drawerRef.current) drawerRef.current.checked = false;
  }, []);

  React.useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  const isActive = React.useCallback(
    (href: string) => {
      if (href === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
      return pathname.startsWith(`/${locale}${href}`);
    },
    [pathname, locale]
  );

  const animationProps = React.useMemo(
    () =>
      prefersReducedMotion
        ? {}
        : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, transition: { type: 'spring', stiffness: 400, damping: 17 } },
    [prefersReducedMotion]
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b border-base-300/80',
        scrolled ? 'bg-base-100/90 shadow-lg shadow-base-content/5 backdrop-blur-xl' : 'bg-base-100/80 backdrop-blur-sm'
      )}
    >
      <div className="navbar container mx-auto max-w-7xl gap-4 px-4 min-h-14">
        <div className="navbar-start">
          <label
            htmlFor="nav-drawer"
            className="btn btn-ghost btn-circle lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </label>
          <div className="drawer drawer-end lg:hidden">
            <input ref={drawerRef} id="nav-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side z-50">
              <label htmlFor="nav-drawer" className="drawer-overlay" aria-label="Close menu" />
              <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-l border-base-300">
                <li className="flex justify-end mb-4">
                  <label htmlFor="nav-drawer" className="btn btn-ghost btn-circle">
                    <X className="h-5 w-5" />
                  </label>
                </li>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeDrawer}
                      className={cn(
                        'rounded-lg',
                        isActive(item.href) ? 'active bg-primary text-primary-content' : ''
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/offer" onClick={closeDrawer} className="btn btn-primary w-full rounded-lg">
                    {t('getQuote')}
                  </Link>
                </li>
                <li>
                  <Link href="/login" onClick={closeDrawer} className="rounded-xl flex items-center gap-2">
                    <LogIn className="w-4 h-4 shrink-0" aria-hidden />
                    {t('login')}
                  </Link>
                </li>
                <li className="menu-title pt-4 mt-4 border-t border-base-300">
                  <LanguageSwitcher variant="mobile" />
                </li>
              </ul>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            {logoUrl ? (
              <motion.div {...animationProps} className="relative h-9 md:h-10 w-auto max-w-[180px]">
                <img src={logoUrl} alt={siteName} className="h-full w-auto object-contain object-left" />
              </motion.div>
            ) : (
              <motion.span
                className="text-xl md:text-2xl font-bold text-primary"
                {...animationProps}
              >
                {siteName}
              </motion.span>
            )}
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-xl font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary text-primary-content shadow-sm'
                      : 'hover:bg-base-200/80 text-base-content'
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2 sm:gap-3 flex-nowrap items-center">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/offer" className="btn btn-primary btn-sm rounded-xl shrink-0 shadow-sm hover:shadow gap-1.5">
            {t('getQuote')}
          </Link>
          <Link href="/login" className="btn btn-outline btn-sm rounded-xl shrink-0 gap-1.5 border-base-300" aria-label={t('login')}>
            <LogIn className="w-4 h-4 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{t('login')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
});
