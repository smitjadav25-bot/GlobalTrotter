import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { shareSlug: string } }
) {
  try {
    const { shareSlug } = params;

    const trip = await prisma.trip.findUnique({
      where: { shareSlug },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
        stops: {
          orderBy: { orderIndex: 'asc' },
          include: {
            city: true,
            activities: {
              orderBy: [
                { scheduledDate: 'asc' },
                { scheduledTime: 'asc' },
                { createdAt: 'asc' },
              ],
            },
          },
        },
        photos: true,
      },
    });

    if (!trip) {
      return NextResponse.json({ error: 'Public trip not found' }, { status: 404 });
    }

    if (!trip.isPublic) {
      return NextResponse.json({ error: 'This trip is private and not shared publicly' }, { status: 403 });
    }

    const allActivities = trip.stops.flatMap((s) => s.activities);
    const totalCost = allActivities.reduce((sum, a) => sum + (a.cost || 0), 0);

    return NextResponse.json({
      trip: {
        ...trip,
        totalCost,
        stopsCount: trip.stops.length,
        activitiesCount: allActivities.length,
      },
    });
  } catch (error) {
    console.error('Error fetching public trip:', error);
    return NextResponse.json({ error: 'Failed to fetch public trip' }, { status: 500 });
  }
}
