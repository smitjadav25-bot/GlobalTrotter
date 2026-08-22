import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

function generateCopySlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 35);
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${base || 'copied-trip'}-${randomSuffix}`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Please log in to clone this trip' }, { status: 401 });
    }

    const { id } = params;
    const sourceTrip = await prisma.trip.findUnique({
      where: { id },
      include: {
        stops: {
          orderBy: { orderIndex: 'asc' },
          include: { activities: true },
        },
      },
    });

    if (!sourceTrip) {
      return NextResponse.json({ error: 'Source trip not found' }, { status: 404 });
    }

    if (!sourceTrip.isPublic && sourceTrip.userId !== user.id) {
      return NextResponse.json({ error: 'Cannot clone a private trip you do not own' }, { status: 403 });
    }

    const newShareSlug = generateCopySlug(`${sourceTrip.name} (Copy)`);

    // Create cloned trip
    const clonedTrip = await prisma.trip.create({
      data: {
        userId: user.id,
        name: `${sourceTrip.name} (Copy)`,
        description: sourceTrip.description,
        startDate: sourceTrip.startDate,
        endDate: sourceTrip.endDate,
        coverPhotoUrl: sourceTrip.coverPhotoUrl,
        isPublic: false,
        shareSlug: newShareSlug,
        budgetLimit: sourceTrip.budgetLimit,
      },
    });

    // Clone stops and activities
    for (const stop of sourceTrip.stops) {
      const clonedStop = await prisma.stop.create({
        data: {
          tripId: clonedTrip.id,
          cityId: stop.cityId,
          arrivalDate: stop.arrivalDate,
          departureDate: stop.departureDate,
          orderIndex: stop.orderIndex,
        },
      });

      if (stop.activities.length > 0) {
        await prisma.activity.createMany({
          data: stop.activities.map((act) => ({
            stopId: clonedStop.id,
            name: act.name,
            type: act.type,
            cost: act.cost,
            durationMinutes: act.durationMinutes,
            description: act.description,
            imageUrl: act.imageUrl,
            scheduledDate: act.scheduledDate,
            scheduledTime: act.scheduledTime,
          })),
        });
      }
    }

    return NextResponse.json(
      { message: 'Trip successfully copied to your account', trip: clonedTrip },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error copying trip:', error);
    return NextResponse.json({ error: 'Failed to copy trip' }, { status: 500 });
  }
}
