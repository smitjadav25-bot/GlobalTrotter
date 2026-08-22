import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const activityUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  type: z.string().optional(),
  cost: z.number().min(0).optional(),
  durationMinutes: z.number().min(1).optional(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  scheduledDate: z.string().optional().nullable(),
  scheduledTime: z.string().optional().nullable(),
});

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
    const activity = await prisma.activity.findUnique({
      where: { id },
      include: {
        stop: {
          include: { trip: true },
        },
      },
    });

    if (!activity) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    if (activity.stop && activity.stop.trip.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    const body = await request.json();
    const validation = activityUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data: any = {};
    if (validation.data.name !== undefined) data.name = validation.data.name;
    if (validation.data.type !== undefined) data.type = validation.data.type;
    if (validation.data.cost !== undefined) data.cost = validation.data.cost;
    if (validation.data.durationMinutes !== undefined) data.durationMinutes = validation.data.durationMinutes;
    if (validation.data.description !== undefined) data.description = validation.data.description;
    if (validation.data.imageUrl !== undefined) data.imageUrl = validation.data.imageUrl;
    if (validation.data.scheduledDate !== undefined) {
      data.scheduledDate = validation.data.scheduledDate ? new Date(validation.data.scheduledDate) : null;
    }
    if (validation.data.scheduledTime !== undefined) data.scheduledTime = validation.data.scheduledTime;

    const updated = await prisma.activity.update({
      where: { id },
      data,
    });

    return NextResponse.json({ activity: updated });
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
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
    const activity = await prisma.activity.findUnique({
      where: { id },
      include: {
        stop: {
          include: { trip: true },
        },
      },
    });

    if (!activity) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    if (activity.stop && activity.stop.trip.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    await prisma.activity.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
  }
}
