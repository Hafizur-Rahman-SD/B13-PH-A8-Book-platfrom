'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/client-auth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', image: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.image || undefined,
    });

    if (error) {
      toast.error(error.message || 'Registration failed');
      setLoading(false);
      return;
    }

    toast.success('Account created! Please login now.');
    router.push('/login');
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center py-8">
      <div className="w-full max-w-md rounded-3xl border border-base-300/70 bg-base-200/70 p-8 shadow-xl shadow-black/20">
        <h1 className="text-3xl font-semibold">Register</h1>
        <p className="mt-2 text-base-content/70">Create your BookBloom account.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="form-control w-full">
            <span className="label-text mb-1">Name</span>
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Your full name"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1">Photo URL</span>
            <input
              value={form.image}
              onChange={(event) => setForm({ ...form, image: event.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Create a password"
              className="input input-bordered w-full"
              required
            />
          </label>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div className="divider text-xs">OR</div>

        <button type="button" onClick={handleGoogleRegister} className="btn btn-outline w-full gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.273 36 24 36c-5.514 0-10-4.486-10-10s4.486-10 10-10c2.511 0 4.817.926 6.548 2.475l6.548-6.548C34.046 8.053 29.268 6 24 6 12.955 6 4 14.955 4 26s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c2.511 0 4.817.926 6.548 2.475l6.548-6.548C34.046 8.053 29.268 6 24 6 16.318 6 9.656 10.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 46c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 37.091 26.715 38 24 38c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 41.556 16.227 46 24 46z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 26c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          Continue with Google
        </button>

        <div className="mt-4 text-center text-sm text-base-content/70">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
