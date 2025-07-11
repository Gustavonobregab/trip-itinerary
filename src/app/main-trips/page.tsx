'use client';

import { Button } from '@tabler/core';

export default function TripsPage() {
  return (
    <section className="container mx-auto px-8 py-10 lg:py-28">
      <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
        Plan your intripnerary.
      </h1>
      <p className="mt-2 max-w-xl text-base text-gray-600">
        From routes to timing, make every part of your journey simple, smooth, and beautifully planned.
        </p>
      <div className="mt-10">
        {/* <TripList /> */}
      </div>
    </section>
  );
}
