'use client';

import { useEffect, useState } from 'react';

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/navigation';
import { IconArrowLeft, IconCategory, IconGripVertical } from '@tabler/icons-react';

interface Trip {
  id: string;
  name: string;
  user_id: string;
  category: string;
  booking_ref: string;
  photo_url: string;
  important_notes: string;
  description: string;
  itinerary_items?: ItineraryItem[];
}

interface ItineraryItem {
  id: string;
  trip_id: number;
  name: string;
  type: string;
  date: string;
}

interface TripDetailsProps {
  id: string;
}

export default function TripDetails({ id }: TripDetailsProps) {
  const router = useRouter();
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
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-black hover:underline mb-4"
      >
        <IconArrowLeft size={20} />
        Back
      </button>
  
      <img
        src={trip.photo_url}
        alt={trip.name}
        className="max-w-5 h-64 object-cover rounded-lg shadow mb-6"
      />
  
      <h1 className="text-3xl font-bold text-center text-black mb-6">{trip.name}</h1>
  
      <div className="grid sm:grid-cols-2 gap-4 border rounded-lg p-4 bg-white shadow datagrid">
        <div className="datagrid-item">
          <div className="datagrid-title text-sm text-black">Trip ID</div>
          <div className="datagrid-content text-black">{trip.id}</div>
        </div>
  
        <div className="datagrid-item">
          <div className="datagrid-title text-sm text-black">User</div>
          <div className="datagrid-content text-black">{trip.user_id}</div>
        </div>
  
        <div className="datagrid-item">
          <div className="datagrid-title text-sm text-black">Category</div>
          <div className="datagrid-content flex items-center gap-2 text-black">
            <IconCategory className="text-green-600" size={18} />
            <span>{trip.category}</span>
          </div>
        </div>
  
        <div className="datagrid-item">
          <div className="datagrid-title text-sm text-black">Booking Ref</div>
          <div className="datagrid-content text-black">{trip.booking_ref}</div>
        </div>
  
        <div className="datagrid-item sm:col-span-2">
          <div className="datagrid-title text-sm text-black">Important Notes</div>
          <div className="datagrid-content text-black">{trip.important_notes || '–'}</div>
        </div>
  
        <div className="datagrid-item sm:col-span-2">
          <div className="datagrid-title text-sm text-black">Description</div>
          <div className="datagrid-content text-black">{trip.description}</div>
        </div>
      </div>
      
          <div className="w-full mt-10">
          <h2 className="text-xl font-semibold text-black mb-4">Itinerary</h2>

          {trip.itinerary_items?.length ? (
            <div className="space-y-3">
              {trip.itinerary_items.map((item) => (
                <div
                  key={item.id}
                  className="w-full h-20 bg-white rounded-lg shadow px-4 border flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-black text-base font-medium truncate">
                    <IconGripVertical size={18} className="text-gray-400 cursor-move" />
                    {item.name}
                  </div>
                  <div className="flex flex-col items-end justify-center text-right text-neutral-700 text-sm">
                    <span>{item.date}</span>
                    <span>{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-black">No itinerary items found.</p>
          )}
        </div>
    </div>
  );
  
}
