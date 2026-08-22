import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fullProfile = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        trips: {
          orderBy: { startDate: 'desc' },
          include: { stops: { include: { city: true } } },
        },
        savedDestinations: {
          include: { city: true },
          orderBy: { createdAt: 'desc' },
        },
        photos: {
          orderBy: { createdAt: 'desc' },
          take: 12,
        },
      },
    });

    return NextResponse.json({ profile: fullProfile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, avatarUrl, email } = body;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;
    if (email !== undefined && email.includes('@')) data.email = email;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data,
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
