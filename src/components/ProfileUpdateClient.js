'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/client-auth';
import AuthGuard from '@/components/AuthGuard';
import toast from 'react-hot-toast';

export default function ProfileUpdateClient() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setImage(user.image || '');
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({ name, image });

    if (error) {
      toast.error(error.message || 'Update failed');
      setLoading(false);
      return;
    }

    toast.success('Profile updated successfully');
    router.push('/profile');
    router.refresh();
    setLoading(false);
  };

  return (
    <AuthGuard>
      <main className="flex min-h-[70vh] items-center justify-center py-8">
        <div className="w-full max-w-lg rounded-3xl border border-base-300/70 bg-base-200/70 p-8 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-semibold">Update Information</h1>
          <p className="mt-2 text-base-content/70">Keep your profile fresh and up to date.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="form-control w-full">
              <span className="label-text mb-1">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text mb-1">Image URL</span>
              <input
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
              />
            </label>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Update Information'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => router.push('/profile')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </AuthGuard>
  );
}
