import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ saved: [] });
    }

    const saved = await prisma.savedDestination.findMany({
      where: { userId: user.id },
      include: { city: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ saved });
  } catch (error: any) {
    console.error('Error fetching saved destinations:', error);
    return NextResponse.json({ error: 'Failed to fetch saved destinations' }, { status: 500 });
  }
}

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
  } catch (error: any) {
    console.error('Error toggling saved destination:', error);
    return NextResponse.json({ error: 'Failed to update saved destination' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
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

    await prisma.savedDestination.deleteMany({
      where: {
        userId: user.id,
        cityId,
      },
    });

    return NextResponse.json({ message: 'Removed from saved destinations' });
  } catch (error: any) {
    console.error('Error removing saved destination:', error);
    return NextResponse.json({ error: 'Failed to remove saved destination' }, { status: 500 });
  }
}
