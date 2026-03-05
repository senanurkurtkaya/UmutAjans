import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { getSiteSettings, getSocialLinks } from '@/lib/site-settings';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    icons: settings.favicon_url ? { icon: settings.favicon_url } : undefined,
    openGraph: settings.og_image_url
      ? { images: [{ url: settings.og_image_url, width: 1200, height: 630 }] }
      : undefined,
  };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const socialLinks = getSocialLinks(settings);

  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      <Navbar siteName={settings.site_name} logoUrl={settings.logo_url || undefined} />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={settings.site_name}
        siteDescription={settings.site_description}
        socialLinks={socialLinks}
      />
    </div>
  );
}