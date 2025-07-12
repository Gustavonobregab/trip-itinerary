'use client';

import { useState, useEffect } from "react";
import TripDetails from "./TripDetails";

interface Trip {
    id: string;
    name: string;
    photo_url: string;
    description: string;
  }
  

export default function TripList() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
    const limit = 6;

    
    const fetchTrips = async (currentPage: number) => {
        setLoading(true);
        try {
        const res = await fetch(`/api/trips?page=${currentPage}&limit=${limit}`);
        const result = await res.json();

    
        if (res.ok) {
          setTrips((prev) => {
            const existingIds = new Set(prev.map((t) => t.id));
            const uniqueNewTrips = (result.data as Trip[]).filter((t) => !existingIds.has(t.id));
            return [...prev, ...uniqueNewTrips];
          });
          setHasMore(result.data.length === limit);
        } else {
          console.error(result.error);
        }
    } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setLoading(false);
      }
      };

    
      useEffect(() => {
        fetchTrips(page);
      }, [page]);

  if (loading && trips.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

    
  return (
        <div className="w-full px-3 sm:px-6 py-10 pb-20 box-border">
       <div className="w-full px-3 sm:px-6 py-10 pb-20 box-border">
        <div
          className="grid gap-6"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="relative h-[30rem] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedTripId(trip.id)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${trip.photo_url || ''})` }}
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <h3 className="text-white text-2xl font-bold">{trip.name}</h3>
                <p className="mt-2 text-white text-sm">
                  {trip.description.length > 15
                    ? `${trip.description.slice(0, 45)}...`
                    : trip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

  {selectedTripId && (
    <TripDetails id={selectedTripId} onClose={() => setSelectedTripId(null)} />
  )}
</div>

            {selectedTripId && (
              <TripDetails id={selectedTripId} onClose={() => setSelectedTripId(null)} />
              )}     
    </div>
  );
  
}