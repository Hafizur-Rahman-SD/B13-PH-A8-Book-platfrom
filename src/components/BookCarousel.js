'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function BookCarousel({ books }) {
  return (
    <div className="rounded-3xl border border-base-300/70 bg-base-200/60 p-6">
      <h3 className="mb-4 text-xl font-semibold">New Arrivals</h3>
      <Swiper modules={[Autoplay]} autoplay={{ delay: 2200 }} loop spaceBetween={20} slidesPerView={1}>
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="rounded-2xl bg-base-100 p-4 shadow-md">
              <p className="text-sm font-medium text-primary">{book.category}</p>
              <h4 className="mt-2 text-lg font-semibold">{book.title}</h4>
              <p className="mt-1 text-sm text-base-content/70">{book.author}</p>
              <p className="mt-3 text-sm text-base-content/70">{book.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
