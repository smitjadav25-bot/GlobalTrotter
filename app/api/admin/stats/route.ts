import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const [
      totalUsers,
      totalTrips,
      totalStops,
      totalActivities,
      publicTrips,
      topCities,
      recentUsers,
      allTripsBudget,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.trip.count(),
      prisma.stop.count(),
      prisma.activity.count(),
      prisma.trip.count({ where: { isPublic: true } }),
      prisma.city.findMany({
        orderBy: { popularity: 'desc' },
        take: 5,
        include: { _count: { select: { stops: true, savedBy: true } } },
      }),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          languagePref: true,
          createdAt: true,
          _count: { select: { trips: true } },
        },
      }),
      prisma.trip.aggregate({
        _sum: { budgetLimit: true },
      }),
    ]);

    const topActivities = await prisma.activity.findMany({
      take: 5,
      orderBy: { cost: 'desc' },
      include: {
        city: true,
        stop: { include: { city: true } },
      },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTrips,
        totalStops,
        totalActivities,
        publicTrips,
        privateTrips: totalTrips - publicTrips,
        totalBudgetVolume: allTripsBudget._sum.budgetLimit || 0,
        topCities: topCities.map((c) => ({
          id: c.id,
          name: c.name,
          country: c.country,
          popularity: c.popularity,
          costIndex: c.costIndex,
          stopsCount: c._count.stops,
          savedCount: c._count.savedBy,
        })),
        topActivities: topActivities.map((a) => ({
          id: a.id,
          name: a.name,
          type: a.type,
          cost: a.cost,
          durationMinutes: a.durationMinutes,
          cityName: a.city?.name || a.stop?.city?.name || 'Global',
        })),
        recentUsers,
      },
    });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
