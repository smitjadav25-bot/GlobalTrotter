import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const tripCreateSchema = z.object({
  name: z.string().min(2, 'Trip name must be at least 2 characters'),
  description: z.string().optional().nullable(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  coverPhotoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional().default(false),
  budgetLimit: z.number().optional().nullable(),
});

function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${base || 'trip'}-${randomSuffix}`;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const trips = await prisma.trip.findMany({
      where: {
        userId: user.id,
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } },
              ],
            }
          : {}),
      },
      include: {
        stops: {
          orderBy: { orderIndex: 'asc' },
          include: {
            city: true,
            activities: true,
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });

    // Compute summary stats for each trip
    const tripsWithSummary = trips.map((trip) => {
      const allActivities = trip.stops.flatMap((s) => s.activities);
      const totalCost = allActivities.reduce((sum, a) => sum + (a.cost || 0), 0);
      const citiesVisited = Array.from(new Set(trip.stops.map((s) => s.city.name)));

      return {
        ...trip,
        stopsCount: trip.stops.length,
        activitiesCount: allActivities.length,
        totalCost,
        citiesVisited,
      };
    });

    return NextResponse.json({ trips: tripsWithSummary });
  } catch (error) {
    console.error('Error listing trips:', error);
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = tripCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { name, description, startDate, endDate, coverPhotoUrl, isPublic, budgetLimit } = validation.data;

    let shareSlug = generateSlug(name);
    // Ensure slug is unique
    let existingSlug = await prisma.trip.findUnique({ where: { shareSlug } });
    while (existingSlug) {
      shareSlug = generateSlug(name);
      existingSlug = await prisma.trip.findUnique({ where: { shareSlug } });
    }

    const trip = await prisma.trip.create({
      data: {
        userId: user.id,
        name,
        description: description || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        coverPhotoUrl:
          coverPhotoUrl ||
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
        isPublic: isPublic ?? false,
        shareSlug,
        budgetLimit: budgetLimit || null,
      },
    });

    return NextResponse.json({ trip }, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 });
  }
}
