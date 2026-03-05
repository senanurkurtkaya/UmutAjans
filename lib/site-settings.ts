import { createSupabaseServerClient } from '@/lib/supabase/server';
import { siteConfig } from '@/lib/seo/config';

export type SiteSettings = {
  site_name: string;
  site_description: string;
  site_url: string;
  notification_email: string;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  social_linkedin: string;
  logo_url: string;
  favicon_url: string;
  og_image_url: string;
};

const DEFAULTS: SiteSettings = {
  site_name: siteConfig.name,
  site_description: siteConfig.description,
  site_url: siteConfig.url,
  notification_email: '',
  social_facebook: '',
  social_instagram: '',
  social_twitter: '',
  social_linkedin: '',
  logo_url: '',
  favicon_url: '',
  og_image_url: '',
};

/**
 * Fetches site settings from DB (admin-editable). Use in server components/layout.
 * Falls back to siteConfig when table is missing or empty.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('site_settings').select('key, value');
    if (!data?.length) return DEFAULTS;
    const next = { ...DEFAULTS };
    data.forEach(({ key, value }) => {
      if (key in next) (next as Record<string, string>)[key] = value ?? '';
    });
    return next;
  } catch {
    return DEFAULTS;
  }
}

export function getSocialLinks(settings: SiteSettings): { icon: string; href: string; label: string }[] {
  return [
    { icon: 'Facebook', href: settings.social_facebook || '#', label: 'Facebook' },
    { icon: 'Twitter', href: settings.social_twitter || '#', label: 'Twitter' },
    { icon: 'Instagram', href: settings.social_instagram || '#', label: 'Instagram' },
    { icon: 'Linkedin', href: settings.social_linkedin || '#', label: 'LinkedIn' },
  ];
}
