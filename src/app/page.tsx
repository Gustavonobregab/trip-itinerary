'use client';

import TripsPage from './main-trips/page';
import '@tabler/core/dist/css/tabler.min.css';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Navbar /> 
      <Hero />
      <TripsPage />
    </>
  );
}
