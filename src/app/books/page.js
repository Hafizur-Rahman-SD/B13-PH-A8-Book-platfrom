import BooksClient from '@/components/BooksClient';
import books from '@/data/books';
import { getAppBaseUrl } from '@/lib/app-url';

async function getBooks() {
  const baseUrl = getAppBaseUrl();

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
