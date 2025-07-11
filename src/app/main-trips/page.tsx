'use client';

import TripList from '@/components/TripList';

export default function TripsPage() {
  return (
    <section className="px-4 py-10 lg:py-20">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
          Plan your inTripnerary.
        </h1>
        <p className="mt-2 max-w-xl text-lg text-gray-600">
          From routes to timing, make every part of your journey simple, smooth, and beautifully planned.
        </p>
      </div>

      <div className="mt-10 max-w-screen-xl mx-auto">
        <TripList />
      </div>
    </section>
  );
}
