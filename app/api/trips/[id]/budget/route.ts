import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays, eachDayOfInterval, format } from 'date-fns';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    const { id } = params;

    const trip = await prisma.trip.findUnique({
      where: { id },
      include: {
        stops: {
          orderBy: { orderIndex: 'asc' },
          include: {
            city: true,
            activities: true,
          },
        },
      },
    });

    if (!trip) {
      return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    }

    // Access check: allow if owner or public
    const isOwner = user?.id === trip.userId;
    if (!isOwner && !trip.isPublic) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const allActivities = trip.stops.flatMap((s) => s.activities);
    const totalCost = allActivities.reduce((sum, a) => sum + (a.cost || 0), 0);

    // Calculate total days
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const daysDiff = Math.max(1, differenceInDays(end, start) + 1);
    const averageCostPerDay = parseFloat((totalCost / daysDiff).toFixed(2));

    // Category breakdown
    const categoryMap: Record<string, { total: number; count: number }> = {
      SIGHTSEEING: { total: 0, count: 0 },
      FOOD: { total: 0, count: 0 },
      ADVENTURE: { total: 0, count: 0 },
      RELAXATION: { total: 0, count: 0 },
      OTHER: { total: 0, count: 0 },
    };

    allActivities.forEach((act) => {
      const type = act.type || 'OTHER';
      if (!categoryMap[type]) {
        categoryMap[type] = { total: 0, count: 0 };
      }
      categoryMap[type].total += act.cost || 0;
      categoryMap[type].count += 1;
    });

    const byCategory = Object.entries(categoryMap).map(([category, val]) => ({
      category,
      total: parseFloat(val.total.toFixed(2)),
      percentage: totalCost > 0 ? parseFloat(((val.total / totalCost) * 100).toFixed(1)) : 0,
      count: val.count,
    }));

    // City breakdown
    const cityMap: Record<string, { country: string; total: number; count: number }> = {};
    trip.stops.forEach((stop) => {
      const cityName = stop.city.name;
      const stopActivitiesCost = stop.activities.reduce((sum, a) => sum + (a.cost || 0), 0);
      if (!cityMap[cityName]) {
        cityMap[cityName] = { country: stop.city.country, total: 0, count: 0 };
      }
      cityMap[cityName].total += stopActivitiesCost;
      cityMap[cityName].count += 1;
    });

    const byCity = Object.entries(cityMap).map(([cityName, val]) => ({
      cityName,
      country: val.country,
      total: parseFloat(val.total.toFixed(2)),
      stopsCount: val.count,
    }));

    // Day-by-day breakdown
    const daysInterval = eachDayOfInterval({ start, end });
    const byDay = daysInterval.map((day, idx) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayActivities = allActivities.filter((act) => {
        if (!act.scheduledDate) return false;
        return format(new Date(act.scheduledDate), 'yyyy-MM-dd') === dateStr;
      });

      const dayTotal = dayActivities.reduce((sum, a) => sum + (a.cost || 0), 0);

      return {
        date: dateStr,
        dayNumber: idx + 1,
        total: parseFloat(dayTotal.toFixed(2)),
        activities: dayActivities.map((a) => ({
          name: a.name,
          cost: a.cost,
          type: a.type,
        })),
      };
    });

    const isOverBudget = trip.budgetLimit ? totalCost > trip.budgetLimit : false;

    return NextResponse.json({
      budget: {
        tripId: trip.id,
        tripName: trip.name,
        totalCost: parseFloat(totalCost.toFixed(2)),
        budgetLimit: trip.budgetLimit,
        isOverBudget,
        totalDays: daysDiff,
        averageCostPerDay,
        byCategory,
        byDay,
        byCity,
      },
    });
  } catch (error) {
    console.error('Error computing budget breakdown:', error);
    return NextResponse.json({ error: 'Failed to compute budget breakdown' }, { status: 500 });
  }
}
