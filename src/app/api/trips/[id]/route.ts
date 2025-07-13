import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { data, error } = await supabase
    .from('trips')
    .select(`
      *,
      itinerary_items (
        id,
        name,
        type,
        date,
        trip_id,
        position,
        location
      )
    `)
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || 'Trip not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
