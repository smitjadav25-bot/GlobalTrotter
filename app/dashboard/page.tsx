'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Compass,
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Globe2,
  Clock,
  Heart,
  PieChart,
  Building2,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Trip, City } from '@/lib/types';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedCityIds, setSavedCityIds] = useState<Set<string>>(new Set());

  const userName = session?.user?.name || 'Traveler';

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [tripsRes, citiesRes, savedRes] = await Promise.all([
          fetch('/api/trips'),
          fetch('/api/cities?limit=6'),
          fetch('/api/profile/saved'),
        ]);

        const tripsData = await tripsRes.json();
        const citiesData = await citiesRes.json();
        const savedData = await savedRes.json();

        if (tripsData.trips) setTrips(tripsData.trips);
        if (citiesData.cities) setCities(citiesData.cities);
        if (savedData.saved) {
          setSavedCityIds(new Set(savedData.saved.map((s: any) => s.cityId)));
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleSaveCity = async (cityId: string) => {
    try {
      const isSaved = savedCityIds.has(cityId);
      const res = await fetch('/api/profile/saved', {
        method: isSaved ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId }),
      });
      if (res.ok) {
        setSavedCityIds((prev) => {
          const next = new Set(prev);
          if (isSaved) next.delete(cityId);
          else next.add(cityId);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalDestinationsVisited = trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0);
  const totalBudgetPlanned = trips.reduce((acc, t) => acc + (t.budgetLimit || 0), 0);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <p className="text-xs font-semibold text-slate-500">Loading your travel dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-8 sm:p-12 text-white shadow-xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-coral/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-coral-200">
            <Sparkles className="w-3.5 h-3.5 text-coral" /> Personalized Travel Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-coral via-rose-300 to-amber-200 bg-clip-text text-transparent">{userName}</span>!
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Your multi-city journeys, scheduled activities, and budget breakdowns are all in one place. Ready to map out your next adventure?
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/trips/new"
              className="px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-coral/30 hover:shadow-coral/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Plan New Trip
            </Link>
            <Link
              href="/cities"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 hover:border-white/30 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" /> Explore Cities
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral flex items-center justify-center font-black">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{trips.length}</div>
            <div className="text-xs font-semibold text-slate-400">Trips in Planning</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-black">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalDestinationsVisited}</div>
            <div className="text-xs font-semibold text-slate-400">Total City Stops</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">
              ${totalBudgetPlanned.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-slate-400">Target Budget Monitored</div>
          </div>
        </div>
      </div>

      {/* Recent Trips Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Itineraries</h2>
            <p className="text-xs text-slate-500">Pick up right where you left off</p>
          </div>
          <Link
            href="/trips"
            className="inline-flex items-center gap-1 text-xs font-bold text-coral hover:text-coral-dark transition-colors"
          >
            View All Trips <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4 shadow-soft">
            <div className="w-14 h-14 rounded-3xl bg-coral/10 text-coral flex items-center justify-center mx-auto">
              <Compass className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">No trips planned yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Create your first customized multi-city itinerary to organize cities, activities, and budgets.
              </p>
            </div>
            <Link
              href="/trips/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-xs font-bold shadow-md shadow-coral/20 hover:bg-coral-dark transition-all"
            >
              <Plus className="w-4 h-4" /> Start Planning
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.slice(0, 3).map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-semibold text-coral-300 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} -{' '}
                        {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h3 className="text-base font-bold truncate mt-0.5">{trip.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        {trip.stops?.length || 0} {trip.stops?.length === 1 ? 'Stop' : 'Stops'}
                      </span>
                      {trip.budgetLimit && (
                        <span className="font-bold text-slate-800">
                          Budget: ${trip.budgetLimit.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {trip.stops && trip.stops.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {trip.stops.slice(0, 3).map((stop) => (
                          <span
                            key={stop.id}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium"
                          >
                            {stop.city.name}
                          </span>
                        ))}
                        {trip.stops.length > 3 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[11px]">
                            +{trip.stops.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-3 gap-2 border-t border-slate-100">
                  <Link
                    href={`/trips/${trip.id}/builder`}
                    className="py-2 text-center bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    Builder
                  </Link>
                  <Link
                    href={`/trips/${trip.id}/view`}
                    className="py-2 text-center bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    href={`/trips/${trip.id}/budget`}
                    className="py-2 text-center bg-coral-50 hover:bg-coral-100 text-coral font-bold rounded-xl text-xs transition-colors"
                  >
                    Budget
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recommended Destinations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Recommended Destinations</h2>
            <p className="text-xs text-slate-500">Popular global travel spots with cost ratings</p>
          </div>
          <Link
            href="/cities"
            className="inline-flex items-center gap-1 text-xs font-bold text-coral hover:text-coral-dark transition-colors"
          >
            Explore All Cities <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cities.map((city) => {
            const isSaved = savedCityIds.has(city.id);
            return (
              <div
                key={city.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={city.imageUrl}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <button
                    onClick={() => toggleSaveCity(city.id)}
                    aria-label="Save City"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900/75 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                    {city.region || 'Global'}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold">{city.name}</h3>
                    <p className="text-xs text-slate-200">{city.country}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {city.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold">
                    <span className="text-slate-600 flex items-center gap-1">
                      Cost Index:{' '}
                      <span className="font-bold text-teal-700">{city.costIndex}x</span>
                    </span>
                    <Link
                      href={`/trips/new?city=${encodeURIComponent(city.name)}`}
                      className="text-coral hover:text-coral-dark font-bold inline-flex items-center gap-1"
                    >
                      Plan Trip <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
