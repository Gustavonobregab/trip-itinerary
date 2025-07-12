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
          setTrips((prev) => [...prev, ...result.data]);
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
            className="card w-full max-w-[460px] min-h-[320px] shadow-md overflow-hidden flex flex-col"
            onClick={() => setSelectedTripId(trip.id)}
            >
            <div
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${trip.photo_url || ''})`  }}
            />
            <div className="card-body">
              <h3 className="card-title">{trip.name}</h3>
              <p className="text-secondary">{trip.description}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
            <div className="mt-10 text-center">
              {loading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Load more trips
                </button>
              )}
            </div>
          )}
            {selectedTripId && (
              <TripDetails id={selectedTripId} onClose={() => setSelectedTripId(null)} />
              )}     
    </div>
  );
  
}