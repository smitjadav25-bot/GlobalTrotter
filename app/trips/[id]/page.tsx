'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Calendar as CalendarIcon,
  DollarSign,
  Clock,
  ArrowLeft,
  Share2,
  Sliders,
  PieChart,
  Printer,
  Sparkles,
  Utensils,
  Camera,
  Mountain,
  Palmtree,
  Loader2,
  List,
  LayoutGrid,
} from 'lucide-react';
import { format } from 'date-fns';
import { TripDTO, StopDTO, ActivityDTO } from '@/lib/types';

export default function TripOverviewPage() {
  const params = useParams();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<TripDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grouped' | 'daywise'>('grouped');

  useEffect(() => {
    async function loadTrip() {
      try {
        setLoading(true);
        const res = await fetch(`/api/trips/${tripId}`);
        if (!res.ok) throw new Error('Trip not found');
        const data = await res.json();
        setTrip(data.trip);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (tripId) loadTrip();
  }, [tripId]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'SIGHTSEEING':
        return <Camera className="w-4 h-4 text-blue-500" />;
      case 'FOOD':
        return <Utensils className="w-4 h-4 text-amber-500" />;
      case 'ADVENTURE':
        return <Mountain className="w-4 h-4 text-emerald-500" />;
      case 'RELAXATION':
        return <Palmtree className="w-4 h-4 text-teal-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-coral" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-coral animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading itinerary view...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Trip not found</h2>
        <Link href="/trips" className="mt-4 inline-block px-4 py-2 bg-coral text-white rounded-xl text-xs font-bold">
          Back to My Trips
        </Link>
      </div>
    );
  }

  const allActivities: Array<ActivityDTO & { cityName: string; cityCountry: string }> = [];
  trip.stops?.forEach((stop) => {
    stop.activities?.forEach((act) => {
      allActivities.push({
        ...act,
        cityName: stop.city.name,
        cityCountry: stop.city.country,
      });
    });
  });

  const totalCost = allActivities.reduce((acc, a) => acc + (a.cost || 0), 0);

  // Group activities by date
  const activitiesByDate: Record<string, typeof allActivities> = {};
  allActivities.forEach((act) => {
    const d = act.scheduledDate
      ? format(new Date(act.scheduledDate), 'yyyy-MM-dd')
      : 'Unscheduled';
    if (!activitiesByDate[d]) activitiesByDate[d] = [];
    activitiesByDate[d].push(act);
  });

  const sortedDates = Object.keys(activitiesByDate).sort();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:py-0 print:px-0">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <Link
          href="/trips"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Trips
        </Link>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grouped'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Group by City
            </button>
            <button
              onClick={() => setViewMode('daywise')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'daywise'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" /> Day-by-Day
            </button>
          </div>

          <Link
            href={`/trips/${trip.id}/build`}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-coral" /> Builder
          </Link>
          <Link
            href={`/trips/${trip.id}/budget`}
            className="px-3.5 py-2 bg-coral-50 hover:bg-coral-100 text-coral rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <PieChart className="w-3.5 h-3.5" /> Budget
          </Link>
          <Link
            href={`/trips/${trip.id}/calendar`}
            className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <CalendarIcon className="w-3.5 h-3.5" /> Calendar
          </Link>
          <button
            onClick={() => window.print()}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Print Itinerary"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 shadow-soft">
        <img
          src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'}
          alt={trip.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/90 text-white text-[11px] font-bold uppercase tracking-wider">
            Verified Itinerary
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{trip.name}</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{trip.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200 pt-2">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-coral" />
              {format(new Date(trip.startDate), 'MMM dd, yyyy')} — {format(new Date(trip.endDate), 'MMM dd, yyyy')}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-400" />
              {trip.stops?.length || 0} Destination Stops
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-amber-400" />
              Total Estimated Cost: ${totalCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Content depending on viewMode */}
      {viewMode === 'grouped' ? (
        /* Grouped by City Stops */
        <div className="space-y-8">
          {trip.stops && trip.stops.length > 0 ? (
            trip.stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={stop.city.imageUrl}
                      alt={stop.city.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-coral/20"
                    />
                    <div>
                      <div className="text-[11px] font-bold text-coral uppercase tracking-wider">
                        Stop #{idx + 1}
                      </div>
                      <h2 className="text-2xl font-black text-slate-900">
                        {stop.city.name}, {stop.city.country}
                      </h2>
                      <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-teal-600" />
                        {format(new Date(stop.arrivalDate), 'MMM dd')} — {format(new Date(stop.departureDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl self-start sm:self-auto">
                    {stop.activities?.length || 0} Experiences
                  </span>
                </div>

                {stop.activities && stop.activities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stop.activities.map((act) => (
                      <div
                        key={act.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-slate-100/60 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                              {getActivityIcon(act.type)}
                            </div>
                            <span className="text-[11px] font-bold text-slate-500 uppercase">
                              {act.type}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-white text-slate-800 text-xs font-black border border-slate-200">
                            {act.cost === 0 ? 'FREE' : `$${act.cost}`}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">{act.name}</h4>
                        {act.description && (
                          <p className="text-xs text-slate-500 line-clamp-2">{act.description}</p>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-1 border-t border-slate-200/50">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {act.durationMinutes} min
                          </span>
                          {act.scheduledTime && <span>Scheduled at {act.scheduledTime}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                    No activities scheduled for this stop yet.
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
              <p className="text-sm text-slate-500">No destination stops found for this trip.</p>
            </div>
          )}
        </div>
      ) : (
        /* Day-by-Day Chronological View */
        <div className="space-y-6">
          {sortedDates.map((dateStr, idx) => {
            const dayActs = activitiesByDate[dateStr];
            return (
              <div
                key={dateStr}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-coral/10 text-coral flex items-center justify-center font-black text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        {dateStr === 'Unscheduled' ? 'Unscheduled Experiences' : format(new Date(dateStr), 'EEEE, MMMM dd, yyyy')}
                      </h3>
                      <p className="text-xs text-slate-500">{dayActs.length} scheduled items</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-teal-700">
                    Day Total: ${dayActs.reduce((a, b) => a + (b.cost || 0), 0)}
                  </span>
                </div>

                <div className="space-y-3">
                  {dayActs.map((act) => (
                    <div
                      key={act.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                          {getActivityIcon(act.type)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{act.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-semibold text-coral">{act.cityName}</span>
                            <span>•</span>
                            <span>{act.durationMinutes} min</span>
                            {act.scheduledTime && (
                              <>
                                <span>•</span>
                                <span>Time: {act.scheduledTime}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-black text-slate-900 self-end sm:self-auto">
                        {act.cost === 0 ? 'FREE' : `$${act.cost}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
