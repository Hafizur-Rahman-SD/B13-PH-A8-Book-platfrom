import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ book, buttonLabel = 'View Details' }) {
  return (
    <div className="card h-full border border-base-300/70 bg-base-100 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-xl">
      <figure className="h-56 overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          width={500}
          height={300}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="badge badge-outline badge-primary">{book.category}</div>
        <h3 className="card-title text-lg">{book.title}</h3>
        <p className="text-sm text-base-content/70">{book.author}</p>
        <p className="line-clamp-3 text-sm text-base-content/70">{book.description}</p>
        <div className="card-actions mt-3 justify-between">
          <span className="text-sm text-primary">{book.available_quantity} copies</span>
          <Link href={`/books/${book.id}`} className="btn btn-sm btn-primary">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
