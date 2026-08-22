import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

const stopCreateSchema = z.object({
  cityId: z.string().min(1, 'City ID is required'),
  arrivalDate: z.string().min(1, 'Arrival date is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  orderIndex: z.number().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: tripId } = params;
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { stops: true },
    });

    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    if (trip.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    const body = await request.json();
    const validation = stopCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { cityId, arrivalDate, departureDate, orderIndex } = validation.data;

    // Verify city exists
    const city = await prisma.city.findUnique({ where: { id: cityId } });
    if (!city) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    const nextOrderIndex =
      orderIndex !== undefined
        ? orderIndex
        : trip.stops.length > 0
        ? Math.max(...trip.stops.map((s) => s.orderIndex)) + 1
        : 0;

    const stop = await prisma.stop.create({
      data: {
        tripId,
        cityId,
        arrivalDate: new Date(arrivalDate),
        departureDate: new Date(departureDate),
        orderIndex: nextOrderIndex,
      },
      include: {
        city: true,
        activities: true,
      },
    });

    return NextResponse.json({ stop }, { status: 201 });
  } catch (error) {
    console.error('Error adding stop:', error);
    return NextResponse.json({ error: 'Failed to add stop' }, { status: 500 });
  }
}
