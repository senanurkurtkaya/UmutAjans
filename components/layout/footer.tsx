'use client';

import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useMemo } from 'react';
import React from 'react';

const iconMap = {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} as const;

type SocialLink = {
  icon: string;
  href: string;
  label: string;
};

type FooterProps = {
  siteName?: string;
  siteDescription?: string;
  socialLinks?: SocialLink[];
};

const FOOTER_LINKS = {
  company: [
    { href: '/about', key: 'links.about' },
    { href: '/services', key: 'links.services' },
    { href: '/contact', key: 'links.contact' },
  ],
  legal: [
    { href: '/privacy', key: 'links.privacy' },
    { href: '/terms', key: 'links.terms' },
    { href: '/cookies', key: 'links.cookies' },
  ],
} as const;

export const Footer = React.memo(function Footer({
  siteName = 'Umut Ajans',
  siteDescription,
  socialLinks: propSocialLinks,
}: FooterProps) {
  const t = useTranslations('footer');
  const footerLinks = useMemo(() => FOOTER_LINKS, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const description = siteDescription ?? t('description');
  const socialLinks = propSocialLinks ?? [
    { icon: 'Facebook', href: '#', label: 'Facebook' },
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Instagram', href: '#', label: 'Instagram' },
    { icon: 'Linkedin', href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="footer footer-center p-10 bg-base-200/90 text-base-content border-t border-base-300/80" role="contentinfo">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto w-full">
        <div className="text-left md:col-span-1">
          <span className="footer-title text-primary font-bold text-lg">{siteName}</span>
          <p className="text-sm opacity-80 max-w-xs">{description}</p>
        </div>
        <nav aria-label="Company links">
          <h4 className="footer-title text-base font-semibold">{t('company')}</h4>
          <ul className="grid gap-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link link-hover text-sm">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Legal links">
          <h4 className="footer-title text-base font-semibold">{t('legal')}</h4>
          <ul className="grid gap-2">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link link-hover text-sm">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h4 className="footer-title text-base font-semibold">{t('followUs')}</h4>
          <nav aria-label="Social media links" className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap] ?? Facebook;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="btn btn-ghost btn-circle btn-sm"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="border-t border-base-300 pt-6 mt-6 w-full max-w-6xl mx-auto">
        <p className="text-sm opacity-80">
          &copy; {currentYear} {siteName}. {t('rights')}
        </p>
      </div>
    </footer>
  );
});
