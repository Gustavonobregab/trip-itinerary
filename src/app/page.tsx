'use client';

import TripsPage from './main-trips/page';
import '@tabler/core/dist/css/tabler.min.css';
import '@/app/globals.css';

export default function Home() {
  return (
    <section className="px-4 py-10 lg:py-28">
      <div className="max-w-screen-2xl mx-auto text-center px-4">
        <h1 className="text-[24vw] sm:text-[8vw] font-extrabold text-black leading-tight">
          Plan your inTripnerary
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600">
          From routes to timing, make every part of your journey simple, smooth, and beautifully planned.
        </p>
      </div>
      <TripsPage />
    </section>
  );
}
