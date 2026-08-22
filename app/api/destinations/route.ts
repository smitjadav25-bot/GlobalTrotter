import { NextResponse } from 'next/server';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const query = searchParams.get('q');

  if (id) {
    const destination = SAMPLE_DESTINATIONS.find((d) => d.id.toLowerCase() === id.toLowerCase());
    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    return NextResponse.json({ destination });
  }

  if (query) {
    const filtered = SAMPLE_DESTINATIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()) ||
        d.tagline.toLowerCase().includes(query.toLowerCase())
    );
    return NextResponse.json({ destinations: filtered, count: filtered.length });
  }

  return NextResponse.json({ destinations: SAMPLE_DESTINATIONS, count: SAMPLE_DESTINATIONS.length });
}
