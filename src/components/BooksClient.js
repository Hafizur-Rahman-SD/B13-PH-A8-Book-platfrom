'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import BookCard from '@/components/BookCard';

const categories = ['All', 'Story', 'Tech', 'Science'];

export default function BooksClient({ books }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [books, query, selectedCategory]);

  return (
    <main className="space-y-6 py-8">
      <div className="rounded-3xl border border-base-300/70 bg-base-200/70 p-6">
        <h1 className="text-3xl font-semibold">All Books</h1>
        <p className="mt-2 text-base-content/70">Search by title and filter by category.</p>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search books by title..."
          className="input input-bordered input-lg mt-4 w-full"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-3xl border border-base-300/70 bg-base-200/70 p-5 lg:sticky lg:top-4">
          <h2 className="text-lg font-semibold">Categories</h2>
          <div className="mt-4 flex flex-row flex-wrap gap-2 lg:flex-col">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-left text-sm transition ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-100 hover:bg-base-300/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} buttonLabel="Details" />)
          ) : (
            <div className="rounded-3xl border border-dashed border-base-300/70 bg-base-200/40 p-8 text-center sm:col-span-2 xl:col-span-3">
              <p className="text-lg font-medium">No books match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                }}
                className="btn btn-sm btn-primary mt-4"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
