'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push(`/${locale}/admin/services`);
    router.refresh();
  };

// 🚪 LOGOUT (Final Version)
const handleLogout = async () => {
  await supabase.auth.signOut({ scope: 'global' });

  // Full reload (middleware garanti çalışır)
  window.location.href = `/${locale}/login`;
};
  return (
    <div className="container py-20 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}