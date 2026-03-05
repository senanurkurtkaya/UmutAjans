'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from '@/lib/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/admin/services');
    router.refresh();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: 'global' });
    window.location.href = `/${locale}/login`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-base-content">
            {t('title')}
          </h1>
          <p className="text-sm text-base-content/70">
            {locale === 'tr'
              ? 'Yönetim paneline erişmek için hesabınızla giriş yapın.'
              : 'Sign in with your account to access the admin panel.'}
          </p>
        </div>

        <div className="card bg-base-100 shadow-lg shadow-base-content/5 border border-base-300/70 rounded-2xl">
          <div className="card-body space-y-6">
            {error && (
              <div className="alert alert-error rounded-xl text-sm">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium">
                    {t('email')}
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium">
                    {t('password')}
                  </span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl mt-2"
              >
                {t('submit')}
              </button>
            </form>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-ghost w-full rounded-xl text-sm mt-2"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}