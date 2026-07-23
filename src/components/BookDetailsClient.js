'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/client-auth';
import AuthGuard from '@/components/AuthGuard';
import toast from 'react-hot-toast';

export default function BookDetailsClient({ book }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleBorrow = () => {
    if (!session) {
      router.push(`/login?redirect=/books/${book.id}`);
      return;
    }
    toast.success(`You borrowed "${book.title}". Enjoy your reading journey!`);
  };

  return (
    <AuthGuard>
      <main className="py-8">
        <div className="grid gap-8 rounded-3xl border border-base-300/70 bg-base-200/70 p-6 shadow-xl shadow-black/20 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <div className="overflow-hidden rounded-2xl border border-base-300/70">
            <Image
              src={book.image_url}
              alt={book.title}
              width={700}
              height={900}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="badge badge-primary badge-outline">{book.category}</p>
            <h1 className="text-3xl font-semibold">{book.title}</h1>
            <p className="text-xl text-base-content/70">by {book.author}</p>
            <p className="text-base leading-7 text-base-content/80">{book.description}</p>
            <div className="rounded-2xl bg-base-100 p-4 text-sm shadow-inner">
              <p className="font-medium">{book.available_quantity} copies left</p>
              <p className="mt-2 text-base-content/70">Reserve this title and start your reading plan today.</p>
            </div>
            <button type="button" onClick={handleBorrow} className="btn btn-primary">
              Borrow This Book
            </button>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
