import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const country = searchParams.get('country') || '';
    const maxCostIndex = searchParams.get('maxCostIndex') ? parseFloat(searchParams.get('maxCostIndex')!) : undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;

    const cities = await prisma.city.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { country: { contains: search } },
                { description: { contains: search } },
              ],
            }
          : {}),
        ...(country ? { country: { contains: country } } : {}),
        ...(maxCostIndex !== undefined ? { costIndex: { lte: maxCostIndex } } : {}),
      },
      orderBy: [
        { popularity: 'desc' },
        { name: 'asc' },
      ],
      take: limit,
    });

    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}
