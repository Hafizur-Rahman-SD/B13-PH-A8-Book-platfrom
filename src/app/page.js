import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import BookCarousel from '@/components/BookCarousel';
import books from '@/data/books';

async function getFeaturedBooks() {
  const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/books?featured=4`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return books.slice(0, 4);
    }

    return response.json();
  } catch {
    return books.slice(0, 4);
  }
}

export default async function HomePage() {
  const featured = await getFeaturedBooks();

  return (
    <main className="space-y-12 py-8">
      <section className="grid gap-8 rounded-3xl border border-base-300/70 bg-gradient-to-br from-base-200/80 to-base-300/40 p-6 shadow-xl shadow-black/20 md:grid-cols-[1.15fr_0.85fr] md:p-10">
        <div className="space-y-5">
          <span className="badge badge-primary badge-outline">Digital Library Experience</span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Find Your Next Read</h1>
          <p className="max-w-xl text-lg text-base-content/70">
            Discover curated stories, tech guides, and science reads with a smooth borrowing flow designed for modern readers.
          </p>
          <Link href="/books" className="btn btn-primary btn-lg">
            Browse Now
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-base-300/70">
          <Image
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80"
            alt="Books and reading"
            width={800}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium">
        <marquee behavior="scroll" direction="left">
          New Arrivals: The Midnight Library | Special Discount on Memberships | Fresh Tech Picks Every Week | Cosmos is
          back in stock |
        </marquee>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Books</h2>
          <Link href="/books" className="text-sm text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-base-300/70 bg-base-200/60 p-6 lg:col-span-1">
          <h3 className="text-xl font-semibold">Why readers love BookBloom</h3>
          <ul className="mt-4 space-y-3 text-sm text-base-content/75">
            <li>Responsive browsing for mobile, tablet, and desktop</li>
            <li>Curated collections for Story, Tech, and Science lovers</li>
            <li>Secure accounts powered by BetterAuth and MongoDB</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-base-300/70 bg-base-200/60 p-6 lg:col-span-1">
          <h3 className="text-xl font-semibold">How borrowing works</h3>
          <ol className="mt-4 space-y-3 text-sm text-base-content/75">
            <li>1. Browse the catalog and pick a title</li>
            <li>2. Sign in to unlock book details</li>
            <li>3. Borrow instantly with one click</li>
          </ol>
        </div>
        <div className="lg:col-span-1">
          <BookCarousel books={books.slice(6, 12)} />
        </div>
      </section>

      <section className="rounded-3xl border border-base-300/70 bg-base-200/60 p-8 text-center">
        <h3 className="text-2xl font-semibold">Join thousands of happy readers</h3>
        <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
          Create a free account to borrow books, manage your profile, and keep track of your favorite genres.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="/books" className="btn btn-outline">
            Explore Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
