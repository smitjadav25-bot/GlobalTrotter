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
import { TripDTO, ActivityDTO } from '@/lib/types';

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
        return <Camera className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      case 'FOOD':
        return <Utensils className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      case 'ADVENTURE':
        return <Mountain className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      case 'RELAXATION':
        return <Palmtree className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-charcoal opacity-70" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 text-charcoal animate-spin" />
        <p className="text-xs font-normal text-muted">Loading itinerary view...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-lg font-semibold text-charcoal">Trip not found</h2>
        <Link href="/trips" className="mt-4 inline-block px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal">
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
          className="inline-flex items-center gap-1.5 text-xs font-normal text-muted hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Trips
        </Link>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-cream p-1 rounded border border-light-cream">
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-3 py-1 rounded text-xs font-normal flex items-center gap-1.5 transition-colors ${
                viewMode === 'grouped'
                  ? 'bg-charcoal text-off-white shadow-inset-btn font-semibold'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              <LayoutGrid className="w-3 h-3" /> Group by City
            </button>
            <button
              onClick={() => setViewMode('daywise')}
              className={`px-3 py-1 rounded text-xs font-normal flex items-center gap-1.5 transition-colors ${
                viewMode === 'daywise'
                  ? 'bg-charcoal text-off-white shadow-inset-btn font-semibold'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              <List className="w-3 h-3" /> Day-by-Day
            </button>
          </div>

          <Link
            href={`/trips/${trip.id}/build`}
            className="px-3 py-1.5 bg-transparent text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded text-xs font-normal flex items-center gap-1.5 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" /> Builder
          </Link>
          <Link
            href={`/trips/${trip.id}/budget`}
            className="px-3 py-1.5 bg-transparent text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded text-xs font-normal flex items-center gap-1.5 transition-colors"
          >
            <PieChart className="w-3.5 h-3.5" /> Budget
          </Link>
          <Link
            href={`/trips/${trip.id}/calendar`}
            className="px-3 py-1.5 bg-transparent text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded text-xs font-normal flex items-center gap-1.5 transition-colors"
          >
            <CalendarIcon className="w-3.5 h-3.5" /> Calendar
          </Link>
          <button
            onClick={() => window.print()}
            className="p-1.5 text-muted hover:text-charcoal rounded"
            title="Print Itinerary"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-card overflow-hidden bg-cream border border-light-cream p-6 sm:p-10">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-charcoal text-off-white text-[10px] font-normal uppercase tracking-wider shadow-inset-btn">
            Verified Itinerary
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">{trip.name}</h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">{trip.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-normal text-muted pt-2">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 opacity-70" />
              {format(new Date(trip.startDate), 'MMM dd, yyyy')} — {format(new Date(trip.endDate), 'MMM dd, yyyy')}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-70" />
              {trip.stops?.length || 0} Destination Stops
            </span>
            <span className="flex items-center gap-1.5 text-charcoal font-semibold">
              <DollarSign className="w-3.5 h-3.5 opacity-70" />
              Est. Total: ${totalCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Content depending on viewMode */}
      {viewMode === 'grouped' ? (
        /* Grouped by City Stops */
        <div className="space-y-6">
          {trip.stops && trip.stops.length > 0 ? (
            trip.stops.map((stop, idx) => (
              <div
                key={stop.id}
                className="bg-cream rounded-card p-6 border border-light-cream space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-light-cream">
                  <div className="flex items-center gap-3">
                    <img
                      src={stop.city.imageUrl}
                      alt={stop.city.name}
                      className="w-12 h-12 rounded object-cover border border-light-cream"
                    />
                    <div>
                      <div className="text-[10px] font-normal text-muted uppercase tracking-wider">
                        Stop #{idx + 1}
                      </div>
                      <h2 className="text-lg font-semibold text-charcoal">
                        {stop.city.name}, {stop.city.country}
                      </h2>
                      <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                        <CalendarIcon className="w-3 h-3 opacity-70" />
                        {format(new Date(stop.arrivalDate), 'MMM dd')} — {format(new Date(stop.departureDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-charcoal-3 text-charcoal text-xs font-normal rounded">
                    {stop.activities?.length || 0} Experiences
                  </span>
                </div>

                {stop.activities && stop.activities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stop.activities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3.5 rounded bg-charcoal-3 space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded bg-cream border border-light-cream flex items-center justify-center">
                              {getActivityIcon(act.type)}
                            </div>
                            <span className="text-[10px] text-muted uppercase font-normal">
                              {act.type}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-charcoal">
                            {act.cost === 0 ? 'FREE' : `$${act.cost}`}
                          </span>
                        </div>

                        <h4 className="text-xs font-semibold text-charcoal">{act.name}</h4>
                        {act.description && (
                          <p className="text-xs text-muted line-clamp-2">{act.description}</p>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-muted pt-1 border-t border-light-cream">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 opacity-70" />
                            {act.durationMinutes} min
                          </span>
                          {act.scheduledTime && <span>Time: {act.scheduledTime}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-muted">
                    No activities scheduled for this stop yet.
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-cream rounded-card p-8 text-center border border-light-cream">
              <p className="text-xs text-muted">No destination stops found for this trip.</p>
            </div>
          )}
        </div>
      ) : (
        /* Day-by-Day Chronological View */
        <div className="space-y-4">
          {sortedDates.map((dateStr, idx) => {
            const dayActs = activitiesByDate[dateStr];
            return (
              <div
                key={dateStr}
                className="bg-cream rounded-card p-6 border border-light-cream space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-light-cream">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-charcoal text-off-white text-xs font-normal flex items-center justify-center shadow-inset-btn">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-charcoal">
                        {dateStr === 'Unscheduled' ? 'Unscheduled Experiences' : format(new Date(dateStr), 'EEEE, MMMM dd, yyyy')}
                      </h3>
                      <p className="text-[11px] text-muted">{dayActs.length} scheduled items</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-charcoal">
                    Day Total: ${dayActs.reduce((a, b) => a + (b.cost || 0), 0)}
                  </span>
                </div>

                <div className="space-y-2">
                  {dayActs.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded bg-charcoal-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded bg-cream border border-light-cream flex items-center justify-center shrink-0">
                          {getActivityIcon(act.type)}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-charcoal">{act.name}</div>
                          <div className="text-[11px] text-muted flex items-center gap-1.5 mt-0.5">
                            <span>{act.cityName}</span>
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
                      <div className="text-xs font-semibold text-charcoal self-end sm:self-auto">
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
