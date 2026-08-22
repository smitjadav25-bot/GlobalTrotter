import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

const tripUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional().nullable(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  coverPhotoUrl: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  budgetLimit: z.number().optional().nullable(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    const { id } = params;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, avatarUrl: true },
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
        photos: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    // Access control: allow if owner or if public
    const isOwner = user?.id === trip.userId;
    if (!isOwner && !trip.isPublic) {
      return NextResponse.json({ error: 'Unauthorized to view this trip' }, { status: 403 });
    }

    return NextResponse.json({ trip, isOwner });
  } catch (error) {
    console.error('Error fetching trip:', error);
    return NextResponse.json({ error: 'Failed to fetch trip' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const existing = await prisma.trip.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    if (existing.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    const body = await request.json();
    const validation = tripUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data: any = {};
    if (validation.data.name !== undefined) data.name = validation.data.name;
    if (validation.data.description !== undefined) data.description = validation.data.description;
    if (validation.data.startDate !== undefined) data.startDate = new Date(validation.data.startDate);
    if (validation.data.endDate !== undefined) data.endDate = new Date(validation.data.endDate);
    if (validation.data.coverPhotoUrl !== undefined) data.coverPhotoUrl = validation.data.coverPhotoUrl;
    if (validation.data.isPublic !== undefined) data.isPublic = validation.data.isPublic;
    if (validation.data.budgetLimit !== undefined) data.budgetLimit = validation.data.budgetLimit;

    const updated = await prisma.trip.update({
      where: { id },
      data,
      include: {
        stops: {
          orderBy: { orderIndex: 'asc' },
          include: { city: true, activities: true },
        },
      },
    });

    return NextResponse.json({ trip: updated });
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json({ error: 'Failed to update trip' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const existing = await prisma.trip.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    if (existing.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    // Cascade delete stops and activities
    const stops = await prisma.stop.findMany({ where: { tripId: id } });
    const stopIds = stops.map((s) => s.id);

    await prisma.activity.deleteMany({
      where: { stopId: { in: stopIds } },
    });

    await prisma.stop.deleteMany({
      where: { tripId: id },
    });

    await prisma.trip.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json({ error: 'Failed to delete trip' }, { status: 500 });
  }
}
