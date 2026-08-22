import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search') || '';
    const maxCost = searchParams.get('maxCost') ? parseFloat(searchParams.get('maxCost')!) : undefined;
    const cityId = searchParams.get('cityId') || '';

    // If cityId is provided, we can find activities associated with stops in that city or return all matching activities
    const activities = await prisma.activity.findMany({
      where: {
        ...(type ? { type } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } },
              ],
            }
          : {}),
        ...(maxCost !== undefined ? { cost: { lte: maxCost } } : {}),
        ...(cityId ? { stop: { cityId } } : {}),
      },
      include: {
        stop: {
          include: {
            city: true,
          },
        },
      },
      take: 40,
    });

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error searching activities:', error);
    return NextResponse.json({ error: 'Failed to search activities' }, { status: 500 });
  }
}
