'use client';

import { useEffect, useState } from 'react';

interface Trip {
  id: string;
  name: string;
  user_id: string;
  category: string;
  booking_ref: string;
  photo_url: string;
  important_notes: string;
  description: string;
}

export default function TripDetails({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      const res = await fetch(`/api/trips/${id}`);
      const data = await res.json();
      setTrip(data);
      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  if (loading || !trip) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <img
          src={trip.photo_url}
          alt={trip.name}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4 mb-4">{trip.name}</h2>

        <div className="datagrid">
          <div className="datagrid-item">
            <div className="datagrid-title">Trip ID</div>
            <div className="datagrid-content">{trip.id}</div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">User Responsable</div>
            <div className="datagrid-content">{trip.user_id}</div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">Category</div>
            <div className="datagrid-content">{trip.category}</div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">Booking Ref.</div>
            <div className="datagrid-content">{trip.booking_ref}</div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">Importnat Notes</div>
            <div className="datagrid-content">{trip.important_notes || '–'}</div>
          </div>
          <div className="datagrid-item col-span-full">
            <div className="datagrid-title">Description</div>
            <div className="datagrid-content">{trip.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
