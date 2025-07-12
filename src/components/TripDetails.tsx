'use client';

import { useEffect, useState } from 'react';

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/navigation';
import { IconArrowLeft, IconCategory, IconGripVertical } from '@tabler/icons-react';
import { supabase } from '@/lib/supabaseClient';
import { Modal } from '@tabler/core';
import { ItineraryList } from './ItineraryList';
import AddItineraryModal from './AddItineraryModal';

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
  position?: number;
}

interface TripDetailsProps {
  id: string;
}


export default function TripDetails({ id }: TripDetailsProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshTrip = async () => {
    const res = await fetch(`/api/trips/${id}`);
    const data = await res.json();
    setTrip(data);
  };

  useEffect(() => {
    refreshTrip().then(() => setLoading(false));
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
        className="mx-auto max-w-full w-full max-h-100 object-cover rounded-lg shadow mb-6"
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

        <div className="flex justify-end mt-6">
          <button onClick={() => setShowModal(true)} className="btn btn-dark">
            + Add Itinerary
          </button>
        </div>

        <div className="w-full mt-8">
          <ItineraryList trip={trip} />
        </div>

        {showModal && (
          <AddItineraryModal
            tripId={trip.id}
            onClose={() => setShowModal(false)}
            onSuccess={refreshTrip}
          />
        )}
        </div>
          );
        }
