'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/lib/i18n/navigation';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { Link } from '@/lib/i18n/navigation';
import { useScroll } from '@/lib/hooks/use-scroll';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

interface NavItem {
  href: string;
  key: string;
  label?: string;
}

const navItems: NavItem[] = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
] as const;

const NAV_ITEMS = navItems;

export const Navbar = React.memo(function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const scrolled = useScroll(10);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = React.useCallback(
    (href: string) => {
      if (href === '/') {
        return pathname === `/${locale}` || pathname === `/${locale}/`;
      }
      return pathname.startsWith(`/${locale}${href}`);
    },
    [pathname, locale]
  );

  const animationProps = React.useMemo(
    () =>
      prefersReducedMotion
        ? {}
        : {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            transition: { type: 'spring', stiffness: 400, damping: 17 },
          },
    [prefersReducedMotion]
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm'
          : 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          aria-label="Home"
        >
          <motion.div className="relative" {...animationProps}>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
              Umut Ajans
            </span>
          </motion.div>
        </Link>

        <nav
          className="hidden md:flex items-center space-x-1"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors rounded-md',
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              <nav
                className="mt-8 flex flex-col space-y-4"
                aria-label="Mobile navigation"
              >
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}

                <div className="pt-6 border-t">
                  <div className="px-4">
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      Language
                    </p>
                    <LanguageSwitcher variant="mobile" />
                  </div>
                </div>
              </nav>
              {/* 🔥 nav doğru şekilde kapandı */}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
});