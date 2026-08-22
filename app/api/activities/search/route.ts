import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search') || '';
    const maxCost = searchParams.get('maxCost') ? parseFloat(searchParams.get('maxCost')!) : undefined;
    const maxDuration = searchParams.get('maxDuration') ? parseInt(searchParams.get('maxDuration')!) : undefined;
    const cityId = searchParams.get('cityId') || '';

    const activities = await prisma.activity.findMany({
      where: {
        ...(type && type !== 'ALL' ? { type } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } },
              ],
            }
          : {}),
        ...(maxCost !== undefined ? { cost: { lte: maxCost } } : {}),
        ...(maxDuration !== undefined ? { durationMinutes: { lte: maxDuration } } : {}),
        ...(cityId
          ? {
              OR: [
                { cityId },
                { stop: { cityId } },
              ],
            }
          : {}),
      },
      include: {
        city: true,
        stop: {
          include: {
            city: true,
          },
        },
      },
      take: 60,
    });

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error searching activities:', error);
    return NextResponse.json({ error: 'Failed to search activities' }, { status: 500 });
  }
}
