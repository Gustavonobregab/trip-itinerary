'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Props {
  onClose: () => void;
  onTripCreated: () => void;
}

export default function CreateTrip({ onClose, onTripCreated }: Props) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) return;

      let imageUrl = '';
      if (imageFile) {
        const filePath = `${session.user.id}/${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase
          .storage
          .from('trip-images')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase
          .storage
          .from('trip-images')
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          start_date: startDate,
          end_date: endDate,
          description,
          photo_url: [imageUrl]
        })
      });

      if (res.ok) {
        onTripCreated();
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create a New Trip</h2>
  
        <div
          className="mb-4 w-full border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:border-gray-400 transition"
          onClick={() => document.getElementById('trip-image-input')?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) setImageFile(file);
          }}
        >
          {imageFile ? (
            <p className="text-sm text-gray-700">{imageFile.name}</p>
          ) : (
            <p className="text-sm text-gray-500">
              Drag & drop an image here or click to select
            </p>
          )}
  
          <input
            id="trip-image-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
  
        <input
          type="text"
          placeholder="Trip Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 w-full border p-2 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mb-2 w-full border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mb-2 w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 w-full border p-2 rounded"
        />
  
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
  
}
