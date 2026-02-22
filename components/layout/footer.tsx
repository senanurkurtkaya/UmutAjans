'use client';

import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useMemo } from 'react';
import React from 'react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
] as const;

const FOOTER_LINKS = {
  company: [
    { href: '/about', key: 'links.about' },
    { href: '/services', key: 'links.services' },
    { href: '/contact', key: 'links.contact' },
  ],
  legal: [
    { href: '/privacy', key: 'links.privacy' },
    { href: '/terms', key: 'links.terms' },
  ],
} as const;

export const Footer = React.memo(function Footer() {
  const t = useTranslations('footer');

  const footerLinks = useMemo(() => FOOTER_LINKS, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t bg-background" role="contentinfo">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Umut Ajans</h3>
            <p className="text-sm text-muted-foreground">
              {t('description')}
            </p>
          </div>

          <nav aria-label="Company links">
            <h4 className="text-sm font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h4 className="text-sm font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t('followUs')}</h4>
            <nav aria-label="Social media links">
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Umut Ajans. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
});
