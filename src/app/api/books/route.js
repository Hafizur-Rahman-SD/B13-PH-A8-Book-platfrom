import { NextResponse } from 'next/server';
import books from '@/data/books';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');

  let result = [...books];

  if (category && category !== 'All') {
    result = result.filter((book) => book.category === category);
  }

  if (featured) {
    const count = Number(featured) || 4;
    result = result.slice(0, count);
  }

  return NextResponse.json(result);
}
