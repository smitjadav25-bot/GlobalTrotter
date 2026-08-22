import React from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Calendar,
  Plus,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const user = await getCurrentUser();

  const [cities, userTrips] = await Promise.all([
    prisma.city.findMany({
      orderBy: [{ popularity: 'desc' }, { name: 'asc' }],
      take: 8,
    }),
    user
      ? prisma.trip.findMany({
          where: { userId: user.id },
          orderBy: { startDate: 'asc' },
          include: {
            stops: {
              include: { city: true, activities: true },
              orderBy: { orderIndex: 'asc' },
            },
          },
          take: 4,
        })
      : [],
  ]);

  const featuredTrip = await prisma.trip.findFirst({
    where: { isPublic: true },
    include: {
      stops: {
        include: { city: true, activities: true },
        orderBy: { orderIndex: 'asc' },
      },
      user: true,
    },
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream border-b border-light-cream pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-charcoal text-off-white shadow-inset-btn text-xs font-normal">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Cloud Local Travel Planner</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-charcoal tracking-[-1.5px] leading-[1.08]">
                Plan Multi-City Adventures Effortlessly
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed font-normal">
                Organize stops across multiple destinations, schedule custom activities, get live budget breakdowns with charts, and share your dream itinerary with friends.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/trips/new"
                  className="flex items-center gap-2 px-5 py-2.5 bg-charcoal text-off-white text-sm font-normal rounded shadow-inset-btn active:opacity-80 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  Create Your Trip
                </Link>
                <Link
                  href="/trips"
                  className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-charcoal text-sm font-normal rounded border border-charcoal-40 hover:bg-charcoal-4 transition-colors"
                >
                  <MapPin className="w-4 h-4 opacity-70" />
                  View Itineraries
                </Link>
              </div>

              {/* Quick stats pills */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-light-cream max-w-lg">
                <div>
                  <div className="text-2xl font-semibold text-charcoal">18+</div>
                  <div className="text-xs text-muted font-normal">Curated Indian Cities</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-charcoal">50+</div>
                  <div className="text-xs text-muted font-normal">Authentic Experiences</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-charcoal">100%</div>
                  <div className="text-xs text-muted font-normal">Local & Offline</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Featured Trip Card */}
            <div className="lg:col-span-5">
              {featuredTrip ? (
                <div className="bg-cream rounded-card p-5 border border-light-cream relative">
                  <div className="relative aspect-[16/10] rounded overflow-hidden mb-4 border border-light-cream">
                    <img
                      src={featuredTrip.coverPhotoUrl || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80'}
                      alt={featuredTrip.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-charcoal text-off-white px-2.5 py-0.5 rounded text-[10px] font-normal shadow-inset-btn">
                      Featured Itinerary
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-charcoal mb-1">{featuredTrip.name}</h3>
                  <p className="text-xs text-muted font-normal line-clamp-2 mb-4">
                    {featuredTrip.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-light-cream text-xs">
                    <div className="flex items-center gap-1.5 text-muted font-normal">
                      <MapPin className="w-3.5 h-3.5 opacity-70" />
                      {featuredTrip.stops.map((s) => s.city.name).join(' → ')}
                    </div>
                    <Link
                      href={`/share/${featuredTrip.shareSlug}`}
                      className="text-charcoal font-semibold flex items-center gap-1 underline"
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* User's Upcoming Trips Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">Your Upcoming Trips</h2>
            <p className="text-xs text-muted font-normal">Manage and track your active itineraries</p>
          </div>
          <Link
            href="/trips"
            className="text-xs font-semibold text-charcoal hover:underline flex items-center gap-1"
          >
            All Trips ({userTrips.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {userTrips.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-card bg-cream border border-light-cream space-y-3">
            <div className="w-12 h-12 mx-auto rounded bg-charcoal text-off-white flex items-center justify-center shadow-inset-btn">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-charcoal">No trips planned yet</h3>
              <p className="text-xs text-muted max-w-sm mx-auto mt-0.5">
                Start your journey by creating your first multi-city trip with customizable stops and activities.
              </p>
            </div>
            <Link
              href="/trips/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-off-white text-xs font-normal rounded shadow-inset-btn active:opacity-80"
            >
              <Plus className="w-3.5 h-3.5" /> Plan First Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTrips.map((trip) => {
              const allActivities = trip.stops.flatMap((s) => s.activities);
              const totalCost = allActivities.reduce((sum, a) => sum + (a.cost || 0), 0);
              const citiesVisited = trip.stops.map((s) => s.city.name).join(' → ');

              return (
                <div
                  key={trip.id}
                  className="bg-cream rounded-card overflow-hidden border border-light-cream flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-light-cream">
                      <img
                        src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                        alt={trip.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-cream border border-light-cream text-charcoal text-[10px] font-normal px-2 py-0.5 rounded">
                        {trip.stops.length} Stops
                      </div>
                      {trip.isPublic && (
                        <div className="absolute top-2.5 right-2.5 bg-charcoal text-off-white text-[10px] font-normal px-2 py-0.5 rounded shadow-inset-btn">
                          Public
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-base font-semibold text-charcoal mb-0.5 truncate">{trip.name}</h3>
                      <p className="text-xs text-muted font-normal mb-3 truncate">
                        {citiesVisited || 'No stops added yet'}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted font-normal mb-3 pt-2 border-t border-light-cream">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 opacity-70" />
                          {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </span>
                        <span className="font-semibold text-charcoal">
                          ${totalCost.toFixed(0)} est.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-4 pt-0 border-t border-light-cream mt-2">
                    <Link
                      href={`/trips/${trip.id}/builder`}
                      className="text-center py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
                    >
                      Builder
                    </Link>
                    <Link
                      href={`/trips/${trip.id}/view`}
                      className="text-center py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
                    >
                      Itinerary
                    </Link>
                    <Link
                      href={`/trips/${trip.id}/budget`}
                      className="text-center py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
                    >
                      Budget
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommended India Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight">Explore Top Destinations in India</h2>
            <p className="text-xs text-muted font-normal">Curated hubs across North, South, West, East, and Himalayan India</p>
          </div>
          <Link
            href="/trips/new"
            className="text-xs font-semibold text-charcoal hover:underline flex items-center gap-1"
          >
            Plan for these cities <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <div
              key={city.id}
              className="bg-cream rounded-card overflow-hidden border border-light-cream flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden border-b border-light-cream">
                  <img
                    src={city.imageUrl}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-cream border border-light-cream text-charcoal text-[10px] font-normal px-2 py-0.5 rounded flex items-center gap-1">
                    <Star className="w-3 h-3 fill-charcoal text-charcoal opacity-70" />
                    {city.popularity}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-charcoal text-off-white text-[10px] font-normal px-2 py-0.5 rounded shadow-inset-btn">
                    {city.costIndex}x Cost Index
                  </div>
                </div>

                <div className="p-3.5">
                  <h3 className="font-semibold text-sm text-charcoal">
                    {city.name}
                  </h3>
                  <p className="text-xs text-muted mb-1.5">{city.country}</p>
                  <p className="text-[11px] text-muted line-clamp-2 leading-relaxed font-normal">
                    {city.description}
                  </p>
                </div>
              </div>

              <div className="p-3.5 pt-0">
                <Link
                  href={`/trips/new?city=${encodeURIComponent(city.name)}`}
                  className="block text-center py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
                >
                  Plan Trip Here
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
