import Image from 'next/image';
import Link from 'next/link';
import books from '@/data/books';
import BookDetailsClient from '@/components/BookDetailsClient';

export function generateStaticParams() {
  return books.map((book) => ({ id: String(book.id) }));
}

export default function BookDetailsPage({ params }) {
  const book = books.find((item) => item.id === Number(params.id));

  if (!book) {
    return (
      <main className="py-12 text-center">
        <h1 className="text-2xl font-semibold">Book not found</h1>
        <Link href="/books" className="btn btn-primary mt-4">
          Back to Books
        </Link>
      </main>
    );
  }

  return <BookDetailsClient book={book} />;
}
