'use client';

import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/client-auth';
import AuthGuard from '@/components/AuthGuard';

export default function ProfileClient() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <AuthGuard>
      <main className="py-8">
        <div className="rounded-3xl border border-base-300/70 bg-base-200/70 p-6 shadow-xl shadow-black/20 lg:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold">My Profile</h1>
              <p className="text-base-content/70">Your account details and reading preferences.</p>
            </div>
            <Link href="/profile/update" className="btn btn-primary">
              Update Information
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[240px_1fr]">
            <div className="flex flex-col items-center rounded-2xl bg-base-100 p-6 text-center shadow-inner">
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  <Image
                    src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                    alt={user?.name || 'Profile'}
                    width={112}
                    height={112}
                    className="h-28 w-28 object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 text-lg font-semibold">{user?.name || 'Reader'}</p>
              <p className="text-sm text-base-content/70">{user?.email}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-base-100 p-5 shadow-inner">
                <p className="text-sm text-base-content/60">Full Name</p>
                <p className="mt-1 text-lg font-semibold">{user?.name || 'Not set'}</p>
              </div>
              <div className="rounded-2xl bg-base-100 p-5 shadow-inner">
                <p className="text-sm text-base-content/60">Email Address</p>
                <p className="mt-1 text-lg font-semibold">{user?.email || 'Not set'}</p>
              </div>
              <div className="rounded-2xl bg-base-100 p-5 shadow-inner sm:col-span-2">
                <p className="text-sm text-base-content/60">Profile Photo URL</p>
                <p className="mt-1 break-all text-sm font-medium">{user?.image || 'No photo added yet'}</p>
              </div>
              <div className="rounded-2xl bg-base-100 p-5 shadow-inner sm:col-span-2">
                <p className="text-sm text-base-content/60">Member Since</p>
                <p className="mt-1 text-lg font-semibold">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active member'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
