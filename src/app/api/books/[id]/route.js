import { NextResponse } from 'next/server';
import books from '@/data/books';

export async function GET(_request, { params }) {
  const book = books.find((item) => item.id === Number(params.id));

  if (!book) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json(book);
}
