import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

const activityCreateSchema = z.object({
  name: z.string().min(2, 'Activity name is required'),
  type: z.string().optional().default('OTHER'),
  cost: z.number().min(0, 'Cost must be positive').default(0),
  durationMinutes: z.number().min(1, 'Duration must be at least 1 minute').default(60),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  scheduledDate: z.string().optional().nullable(),
  scheduledTime: z.string().optional().nullable(),
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

    const { id: stopId } = params;
    const stop = await prisma.stop.findUnique({
      where: { id: stopId },
      include: { trip: true },
    });

    if (!stop) {
      return NextResponse.json({ error: 'Stop not found' }, { status: 404 });
    }

    if (stop.trip.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    const body = await request.json();
    const validation = activityCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const {
      name,
      type,
      cost,
      durationMinutes,
      description,
      imageUrl,
      scheduledDate,
      scheduledTime,
    } = validation.data;

    const activity = await prisma.activity.create({
      data: {
        stopId,
        name,
        type: type || 'OTHER',
        cost: cost ?? 0.0,
        durationMinutes: durationMinutes ?? 60,
        description: description || null,
        imageUrl: imageUrl || null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : stop.arrivalDate,
        scheduledTime: scheduledTime || '10:00',
      },
    });

    return NextResponse.json({ activity }, { status: 201 });
  } catch (error) {
    console.error('Error adding activity:', error);
    return NextResponse.json({ error: 'Failed to add activity' }, { status: 500 });
  }
}
