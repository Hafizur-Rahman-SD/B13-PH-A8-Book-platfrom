'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/client-auth';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        toast.error(error.message || 'Login failed. Check email and password.');
        setLoading(false);
        return;
      }

      toast.success('Welcome back!');
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error('Could not reach the server. Restart npm run dev and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: redirectTo,
      });
    } catch {
      toast.error('Google login needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local');
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-3xl border border-base-300/70 bg-base-200/70 p-8 shadow-xl shadow-black/20">
        <h1 className="text-3xl font-semibold">Login</h1>
        <p className="mt-2 text-base-content/70">Welcome back to BookBloom.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              className="input input-bordered w-full"
              required
            />
          </label>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="divider text-xs">OR</div>

        <button type="button" onClick={handleGoogleLogin} className="btn btn-outline w-full gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.273 36 24 36c-5.514 0-10-4.486-10-10s4.486-10 10-10c2.511 0 4.817.926 6.548 2.475l6.548-6.548C34.046 8.053 29.268 6 24 6 12.955 6 4 14.955 4 26s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c2.511 0 4.817.926 6.548 2.475l6.548-6.548C34.046 8.053 29.268 6 24 6 16.318 6 9.656 10.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 46c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 37.091 26.715 38 24 38c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 41.556 16.227 46 24 46z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 26c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          Continue with Google
        </button>

        <div className="mt-4 text-center text-sm text-base-content/70">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-primary">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
