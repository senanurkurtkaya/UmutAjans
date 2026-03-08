import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingContact } from '@/components/ui/floating-contact';
import { siteConfig } from '@/lib/seo/config';
import { APP_CONFIG } from '@/lib/constants';

const socialLinks = [
  { icon: 'Facebook', href: APP_CONFIG.social.facebook, label: 'Facebook' },
  { icon: 'Twitter', href: APP_CONFIG.social.twitter, label: 'Twitter' },
  { icon: 'Instagram', href: APP_CONFIG.social.instagram, label: 'Instagram' },
  { icon: 'Linkedin', href: APP_CONFIG.social.linkedin, label: 'LinkedIn' },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const ogImageUrl = siteConfig.ogImage.startsWith('http')
    ? siteConfig.ogImage
    : `${siteConfig.url}${siteConfig.ogImage.startsWith('/') ? '' : '/'}${siteConfig.ogImage}`;
  return {
    openGraph: { images: [{ url: ogImageUrl, width: 1200, height: 630 }] },
  };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      <Navbar siteName={APP_CONFIG.name} logoUrl={undefined} />
      <main className="flex-1">{children}</main>
      <FloatingContact />
      <Footer
        siteName={APP_CONFIG.name}
        siteDescription={APP_CONFIG.description}
        socialLinks={socialLinks.map((l) => ({ ...l }))}
      />
    </div>
  );
}