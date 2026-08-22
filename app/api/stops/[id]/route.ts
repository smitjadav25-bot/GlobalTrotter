import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

const stopUpdateSchema = z.object({
  arrivalDate: z.string().optional(),
  departureDate: z.string().optional(),
  orderIndex: z.number().optional(),
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
    const stop = await prisma.stop.findUnique({
      where: { id },
      include: { trip: true },
    });

    if (!stop) {
      return NextResponse.json({ error: 'Stop not found' }, { status: 404 });
    }

    if (stop.trip.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    const body = await request.json();

    // Check if this is a batch reorder payload: { reorderedStopIds: string[] }
    if (body.reorderedStopIds && Array.isArray(body.reorderedStopIds)) {
      const updates = body.reorderedStopIds.map((stopId: string, index: number) =>
        prisma.stop.update({
          where: { id: stopId },
          data: { orderIndex: index },
        })
      );
      await prisma.$transaction(updates);

      const updatedStops = await prisma.stop.findMany({
        where: { tripId: stop.tripId },
        orderBy: { orderIndex: 'asc' },
        include: { city: true, activities: true },
      });

      return NextResponse.json({ stops: updatedStops });
    }

    const validation = stopUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data: any = {};
    if (validation.data.arrivalDate) data.arrivalDate = new Date(validation.data.arrivalDate);
    if (validation.data.departureDate) data.departureDate = new Date(validation.data.departureDate);
    if (validation.data.orderIndex !== undefined) data.orderIndex = validation.data.orderIndex;

    const updated = await prisma.stop.update({
      where: { id },
      data,
      include: { city: true, activities: true },
    });

    return NextResponse.json({ stop: updated });
  } catch (error) {
    console.error('Error updating stop:', error);
    return NextResponse.json({ error: 'Failed to update stop' }, { status: 500 });
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
    const stop = await prisma.stop.findUnique({
      where: { id },
      include: { trip: true },
    });

    if (!stop) {
      return NextResponse.json({ error: 'Stop not found' }, { status: 404 });
    }

    if (stop.trip.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden: You do not own this trip' }, { status: 403 });
    }

    // Delete activities for this stop
    await prisma.activity.deleteMany({
      where: { stopId: id },
    });

    // Delete stop
    await prisma.stop.delete({
      where: { id },
    });

    // Reindex remaining stops for trip
    const remainingStops = await prisma.stop.findMany({
      where: { tripId: stop.tripId },
      orderBy: { orderIndex: 'asc' },
    });

    const updates = remainingStops.map((s, index) =>
      prisma.stop.update({
        where: { id: s.id },
        data: { orderIndex: index },
      })
    );
    if (updates.length > 0) {
      await prisma.$transaction(updates);
    }

    return NextResponse.json({ message: 'Stop deleted successfully' });
  } catch (error) {
    console.error('Error deleting stop:', error);
    return NextResponse.json({ error: 'Failed to delete stop' }, { status: 500 });
  }
}
