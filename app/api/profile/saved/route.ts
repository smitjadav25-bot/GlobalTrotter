import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { cityId } = body;

    if (!cityId) {
      return NextResponse.json({ error: 'City ID is required' }, { status: 400 });
    }

    const existing = await prisma.savedDestination.findUnique({
      where: {
        userId_cityId: {
          userId: user.id,
          cityId,
        },
      },
    });

    if (existing) {
      // Toggle off
      await prisma.savedDestination.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ saved: false, message: 'Removed from saved destinations' });
    } else {
      // Toggle on
      await prisma.savedDestination.create({
        data: {
          userId: user.id,
          cityId,
        },
      });
      return NextResponse.json({ saved: true, message: 'Added to saved destinations' });
    }
  } catch (error) {
    console.error('Error toggling saved destination:', error);
    return NextResponse.json({ error: 'Failed to update saved destination' }, { status: 500 });
  }
}
