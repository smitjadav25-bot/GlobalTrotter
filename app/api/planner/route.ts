import { NextResponse } from 'next/server';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destination, startDate, durationDays = 7, travelers = 2, budgetTier = 'Moderate', style = 'luxury' } = body;

    const matchedDest = SAMPLE_DESTINATIONS.find((d) => d.name.toLowerCase().includes((destination || 'bali').toLowerCase())) || SAMPLE_DESTINATIONS[0];

    const days = Array.from({ length: durationDays }).map((_, idx) => {
      const dNum = idx + 1;
      const isRainy = idx === 2;

      return {
        dayNumber: dNum,
        date: `2026-10-${15 + idx}`,
        title: `Day ${dNum}: ${dNum === 1 ? 'Arrival & Heritage Exploration' : dNum === 2 ? 'Highland Sunrise & Nature Discovery' : dNum === 3 ? 'Cultural Art & Culinary Immersion' : 'Coastal Relaxation & Secret Spots'}`,
        weather: {
          temp: matchedDest.weather.temp,
          condition: isRainy ? 'Rain' : 'Sunny',
          rainAlert: isRainy,
          indoorAlternative: isRainy ? 'Artisanal Cooking Academy & Museum Gallery' : undefined
        },
        slots: [
          {
            id: `api-slot-${dNum}-1`,
            period: 'Morning',
            time: '09:00 AM',
            activityName: matchedDest.placesToVisit[idx % matchedDest.placesToVisit.length]?.name || 'City Highlights Tour',
            category: 'Culture',
            durationMinutes: 120,
            travelTimeToNext: '15 min drive',
            cost: matchedDest.placesToVisit[idx % matchedDest.placesToVisit.length]?.ticketPrice || 10,
            imageUrl: matchedDest.placesToVisit[idx % matchedDest.placesToVisit.length]?.imageUrl || matchedDest.heroImage,
            foodSuggestion: 'Local organic breakfast & coffee'
          },
          {
            id: `api-slot-${dNum}-2`,
            period: 'Afternoon',
            time: '02:00 PM',
            activityName: matchedDest.activities[idx % matchedDest.activities.length]?.name || 'Guided Nature Excursion',
            category: 'Adventure',
            durationMinutes: 150,
            travelTimeToNext: '20 min transfer',
            cost: matchedDest.activities[idx % matchedDest.activities.length]?.cost || 45,
            imageUrl: matchedDest.activities[idx % matchedDest.activities.length]?.imageUrl || matchedDest.heroImage,
            foodSuggestion: matchedDest.food[idx % matchedDest.food.length]?.name || 'Authentic Regional Delicacy'
          },
          {
            id: `api-slot-${dNum}-3`,
            period: 'Evening',
            time: '06:30 PM',
            activityName: `${matchedDest.name} Sunset Dining Experience`,
            category: 'Relaxation',
            durationMinutes: 120,
            travelTimeToNext: 'Back to stay',
            cost: 35,
            imageUrl: matchedDest.gallery[0] || matchedDest.heroImage,
            foodSuggestion: `Chef table tasting at ${matchedDest.food[0]?.restaurant || 'Seaside Bistro'}`
          }
        ]
      };
    });

    const generatedPlan = {
      id: `trip-ai-${Date.now()}`,
      destination: matchedDest.name,
      country: matchedDest.country,
      startDate: startDate || '2026-10-15',
      durationDays,
      travelers,
      totalBudget: budgetTier === 'Budget' ? 1200 : budgetTier === 'Luxury' ? 5000 : 2400,
      preferenceMatch: 98,
      tripScore: 97,
      days
    };

    return NextResponse.json({ success: true, plan: generatedPlan });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'AI Generation error' }, { status: 500 });
  }
}
