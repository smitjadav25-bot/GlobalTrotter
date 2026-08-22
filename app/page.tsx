import React from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Star,
  Globe2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const user = await getCurrentUser();

  const [cities, userTrips, allTripsCount] = await Promise.all([
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
    prisma.trip.count(),
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
      <section className="relative overflow-hidden bg-gradient-to-b from-coral-50/70 via-sand-50/40 to-slate-50 border-b border-slate-200/60 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-coral-200 shadow-xs text-xs font-bold text-coral">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Cloud Local Travel Planner</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Plan Multi-City Adventures{' '}
                <span className="bg-gradient-to-r from-coral via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  Effortlessly
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Organize stops across multiple destinations, schedule custom activities, get live budget breakdowns with charts, and share your dream itinerary with friends.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/trips/new"
                  className="flex items-center gap-2 px-6 py-3.5 bg-coral hover:bg-coral-dark text-white text-base font-bold rounded-2xl shadow-lg shadow-coral/30 hover:shadow-xl hover:shadow-coral/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                  Create Your Trip
                </Link>
                <Link
                  href="/trips"
                  className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-base font-bold rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <MapPin className="w-5 h-5 text-coral" />
                  View Itineraries
                </Link>
              </div>

              {/* Quick stats pills */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="text-2xl font-black text-slate-900">15+</div>
                  <div className="text-xs text-slate-500 font-medium">Curated Cities</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-teal-600">35+</div>
                  <div className="text-xs text-slate-500 font-medium">Experiences</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-coral">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Local & Offline</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Featured Trip Card */}
            <div className="lg:col-span-5">
              {featuredTrip ? (
                <div className="bg-white rounded-3xl p-5 shadow-soft-lg border border-slate-200/80 hover:shadow-2xl transition-all relative group">
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-4 shadow-xs">
                    <img
                      src={featuredTrip.coverPhotoUrl || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80'}
                      alt={featuredTrip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-coral shadow-xs">
                      Featured Itinerary
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{featuredTrip.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {featuredTrip.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                      <MapPin className="w-4 h-4 text-coral" />
                      {featuredTrip.stops.map((s) => s.city.name).join(' → ')}
                    </div>
                    <Link
                      href={`/share/${featuredTrip.shareSlug}`}
                      className="text-coral font-bold flex items-center gap-1 hover:underline"
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
            <h2 className="text-2xl font-black text-slate-900">Your Upcoming Trips</h2>
            <p className="text-xs text-slate-500">Manage and track your active itineraries</p>
          </div>
          <Link
            href="/trips"
            className="text-sm font-bold text-coral hover:text-coral-dark flex items-center gap-1"
          >
            All Trips ({userTrips.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {userTrips.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-coral-50 text-coral flex items-center justify-center">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No trips planned yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Start your journey by creating your first multi-city trip with customizable stops and activities.
              </p>
            </div>
            <Link
              href="/trips/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white text-sm font-semibold rounded-xl shadow-md hover:bg-coral-dark"
            >
              <Plus className="w-4 h-4" /> Plan First Trip
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
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-coral/40 transition-all flex flex-col group"
                >
                  <div className="relative aspect-16/9 overflow-hidden">
                    <img
                      src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      {trip.stops.length} Stops
                    </div>
                    {trip.isPublic && (
                      <div className="absolute top-3 right-3 bg-teal-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        Public
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-1 truncate">{trip.name}</h3>
                    <p className="text-xs text-coral font-semibold mb-3 truncate">
                      {citiesVisited || 'No stops added yet'}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                      </span>
                      <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        ${totalCost.toFixed(0)} est.
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
                      <Link
                        href={`/trips/${trip.id}/builder`}
                        className="text-center py-2 text-xs font-bold text-coral bg-coral-50 hover:bg-coral-100 rounded-xl transition-colors"
                      >
                        Builder
                      </Link>
                      <Link
                        href={`/trips/${trip.id}/view`}
                        className="text-center py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      >
                        Itinerary
                      </Link>
                      <Link
                        href={`/trips/${trip.id}/budget`}
                        className="text-center py-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
                      >
                        Budget
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommended Global Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Explore Top Destinations</h2>
            <p className="text-xs text-slate-500">Popular global hubs with realistic cost index ratings</p>
          </div>
          <Link
            href="/trips/new"
            className="text-sm font-bold text-coral hover:text-coral-dark flex items-center gap-1"
          >
            Plan for these cities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {cities.map((city) => (
            <div
              key={city.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200 group flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {city.popularity}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {city.costIndex}x Cost Index
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-coral transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2">{city.country}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {city.description}
                  </p>
                </div>

                <Link
                  href={`/trips/new?city=${encodeURIComponent(city.name)}`}
                  className="mt-3 text-center py-2 bg-slate-50 hover:bg-coral hover:text-white text-coral text-xs font-bold rounded-xl border border-coral-200 hover:border-coral transition-all"
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
