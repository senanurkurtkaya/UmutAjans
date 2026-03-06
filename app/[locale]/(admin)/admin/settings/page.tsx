'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';

const SETTING_KEYS = {
  site_name: '',
  site_description: '',
  site_url: '',
  notification_email: '',
  social_facebook: '',
  social_instagram: '',
  social_twitter: '',
  social_linkedin: '',
  logo_url: '',
  favicon_url: '',
  og_image_url: '',
} as const;

type Settings = Record<keyof typeof SETTING_KEYS, string>;

export default function AdminSettingsPage() {
  const t = useTranslations('admin.settingsPage');
  const tCommon = useTranslations('common');
  const [settings, setSettings] = useState<Settings>({ ...SETTING_KEYS });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('site_settings').select('key, value');
        if (data) {
          const next = { ...SETTING_KEYS };
          data.forEach(({ key, value }) => {
            if (key in next) next[key as keyof Settings] = value ?? '';
          });
          setSettings(next);
        }
      } catch {
        // Table might not exist yet; show form with defaults
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const rows = Object.entries(settings).map(([key, value]) => ({ key, value: value || '' }));
    const { error } = await supabase.from('site_settings').upsert(rows, {
      onConflict: 'key',
    });
    setSaving(false);
    if (error) {
      setMessage({ type: 'error', text: t('error') });
      return;
    }
    setMessage({ type: 'success', text: t('saved') });
  }

  if (loading) {
    return (
      <div className="container py-20">
        <p className="text-neutral-400">{tCommon('loading')}</p>
      </div>
    );
  }

  return (
    <div className="container py-20 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      {message && (
        <p
          className={`mb-6 p-3 rounded ${
            message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">{t('siteSection')}</h2>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('siteName')}</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings((s) => ({ ...s, site_name: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('siteDescription')}</label>
            <textarea
              value={settings.site_description}
              onChange={(e) => setSettings((s) => ({ ...s, site_description: e.target.value }))}
              rows={3}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('siteUrl')}</label>
            <input
              type="url"
              value={settings.site_url}
              onChange={(e) => setSettings((s) => ({ ...s, site_url: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://umutajans.com"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">{t('socialSection')}</h2>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('facebookUrl')}</label>
            <input
              type="url"
              value={settings.social_facebook}
              onChange={(e) => setSettings((s) => ({ ...s, social_facebook: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('instagramUrl')}</label>
            <input
              type="url"
              value={settings.social_instagram}
              onChange={(e) => setSettings((s) => ({ ...s, social_instagram: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('twitterUrl')}</label>
            <input
              type="url"
              value={settings.social_twitter}
              onChange={(e) => setSettings((s) => ({ ...s, social_twitter: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://twitter.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('linkedinUrl')}</label>
            <input
              type="url"
              value={settings.social_linkedin}
              onChange={(e) => setSettings((s) => ({ ...s, social_linkedin: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://linkedin.com/..."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">{t('imagesSection')}</h2>
          <p className="text-xs text-neutral-500">{t('imageHint')}</p>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('logoUrl')}</label>
            <input
              type="url"
              value={settings.logo_url}
              onChange={(e) => setSettings((s) => ({ ...s, logo_url: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://..."
            />
            {settings.logo_url && (
              <div className="mt-2 flex items-center gap-2">
                <img src={settings.logo_url} alt="Logo önizleme" className="h-10 object-contain max-w-[120px] rounded bg-neutral-800" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('faviconUrl')}</label>
            <input
              type="url"
              value={settings.favicon_url}
              onChange={(e) => setSettings((s) => ({ ...s, favicon_url: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://..."
            />
            {settings.favicon_url && (
              <div className="mt-2 flex items-center gap-2">
                <img src={settings.favicon_url} alt="Favicon önizleme" className="h-8 w-8 object-contain rounded bg-neutral-800" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('ogImageUrl')}</label>
            <input
              type="url"
              value={settings.og_image_url}
              onChange={(e) => setSettings((s) => ({ ...s, og_image_url: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="https://..."
            />
            {settings.og_image_url && (
              <div className="mt-2">
                <img src={settings.og_image_url} alt="OG önizleme" className="h-24 w-auto max-w-[200px] object-cover rounded bg-neutral-800" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">{t('notificationsSection')}</h2>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">{t('notificationEmail')}</label>
            <input
              type="email"
              value={settings.notification_email}
              onChange={(e) => setSettings((s) => ({ ...s, notification_email: e.target.value }))}
              className="w-full p-2 rounded bg-neutral-900 border border-neutral-700"
              placeholder="admin@umutajans.com"
            />
            <p className="text-xs text-neutral-500 mt-1">{t('notificationHint')}</p>
          </div>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-neutral-200 disabled:opacity-50"
        >
          {saving ? '...' : t('save')}
        </button>
      </form>
    </div>
  );
}
