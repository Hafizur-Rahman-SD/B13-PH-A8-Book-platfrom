import BooksClient from '@/components/BooksClient';
import books from '@/data/books';

async function getBooks() {
  const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/books`, { next: { revalidate: 60 } });
    if (!response.ok) return books;
    return response.json();
  } catch {
    return books;
  }
}

export default async function AllBooksPage() {
  const allBooks = await getBooks();
  return <BooksClient books={allBooks} />;
}
