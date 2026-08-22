'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Printer,
  ArrowLeft,
  Loader2,
  Camera,
  Utensils,
  Compass,
  Smile,
  Tag,
} from 'lucide-react';
import { format, eachDayOfInterval, isSameDay } from 'date-fns';
import { TripDTO } from '@/lib/types';

const CATEGORY_ICONS: Record<string, any> = {
  SIGHTSEEING: Camera,
  FOOD: Utensils,
  ADVENTURE: Compass,
  RELAXATION: Smile,
  OTHER: Tag,
};

export default function TripStructuredViewPage() {
  const params = useParams();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<TripDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trips/${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.trip) setTrip(data.trip);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
        <span className="text-xs font-normal text-muted">Loading itinerary view...</span>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-3">
        <h2 className="text-lg font-semibold text-charcoal">Trip not found</h2>
        <Link href="/trips" className="text-xs font-normal text-charcoal underline">
          Back to all trips
        </Link>
      </div>
    );
  }

  const stops = trip.stops || [];
  const allActivities = stops.flatMap((s) => s.activities);
  const totalCost = allActivities.reduce((sum, a) => sum + (a.cost || 0), 0);

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const daysList = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:m-0 print:max-w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          href={`/trips/${trip.id}/builder`}
          className="inline-flex items-center gap-1 text-xs font-normal text-muted hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Builder
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-cream border border-light-cream text-charcoal hover:bg-charcoal-4 rounded text-xs font-normal flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 opacity-70" /> Print Itinerary
          </button>
          <Link
            href={`/share/${trip.shareSlug}`}
            target="_blank"
            className="px-3.5 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 transition-opacity"
          >
            <Share2 className="w-3.5 h-3.5" /> Public Share
          </Link>
        </div>
      </div>

      {/* Itinerary Hero Header */}
      <div className="bg-cream rounded-card p-6 sm:p-8 border border-light-cream">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-normal uppercase tracking-widest text-off-white px-2 py-0.5 bg-charcoal rounded shadow-inset-btn">
              Trip Itinerary
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal mt-2 mb-1 tracking-tight">
              {trip.name}
            </h1>
            {trip.description && (
              <p className="text-xs text-muted max-w-2xl mt-1 leading-relaxed">
                {trip.description}
              </p>
            )}
          </div>

          {trip.coverPhotoUrl && (
            <div className="w-full sm:w-48 h-32 rounded overflow-hidden border border-light-cream shrink-0">
              <img src={trip.coverPhotoUrl} alt={trip.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-4 border-t border-light-cream">
          <div>
            <div className="text-[11px] text-muted font-normal">Date Range</div>
            <div className="text-xs font-semibold text-charcoal flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3 opacity-70" />
              {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted font-normal">Destinations</div>
            <div className="text-xs font-semibold text-charcoal flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 opacity-70" />
              {stops.length} Cities
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted font-normal">Total Duration</div>
            <div className="text-xs font-semibold text-charcoal mt-0.5">
              {daysList.length} Days
            </div>
          </div>
          <div>
            <div className="text-[11px] text-muted font-normal">Estimated Budget</div>
            <div className="text-xs font-semibold text-charcoal mt-0.5">
              ${totalCost.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Day by Day Breakdown */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-charcoal">Day-by-Day Schedule</h2>

        {daysList.map((dayDate, dayIdx) => {
          const formattedDate = format(dayDate, 'yyyy-MM-dd');
          const dayNumber = dayIdx + 1;

          // Find active city stop for this day
          const activeStop = stops.find((stop) => {
            const arr = new Date(stop.arrivalDate);
            const dep = new Date(stop.departureDate);
            return dayDate >= arr && dayDate <= dep;
          });

          // Activities on this day
          const dayActivities = allActivities.filter((act) => {
            if (!act.scheduledDate) return false;
            return isSameDay(new Date(act.scheduledDate), dayDate);
          });

          return (
            <div
              key={formattedDate}
              className="bg-cream rounded-card p-5 border border-light-cream relative overflow-hidden"
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-light-cream">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-charcoal text-off-white font-normal flex items-center justify-center text-xs shadow-inset-btn">
                    D{dayNumber}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal">
                      {format(dayDate, 'EEEE, MMMM d, yyyy')}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      {activeStop ? (
                        <span className="font-semibold text-charcoal flex items-center gap-1">
                          <MapPin className="w-3 h-3 opacity-70" /> {activeStop.city.name}, {activeStop.city.country}
                        </span>
                      ) : (
                        <span>Travel / Transit day</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted font-normal">
                  {dayActivities.length} {dayActivities.length === 1 ? 'Activity' : 'Activities'}
                </div>
              </div>

              {/* Activities on this day */}
              {dayActivities.length === 0 ? (
                <div className="py-3 px-3.5 bg-charcoal-3 rounded text-xs text-muted italic font-normal">
                  No scheduled activities for this day. Free time for exploration, rest, or casual dining.
                </div>
              ) : (
                <div className="space-y-2">
                  {dayActivities.map((act) => {
                    const Icon = CATEGORY_ICONS[act.type] || Tag;
                    return (
                      <div
                        key={act.id}
                        className="flex items-start gap-3 p-3 rounded bg-charcoal-3 border border-light-cream"
                      >
                        <div className="w-8 h-8 rounded bg-cream flex items-center justify-center text-charcoal shrink-0 mt-0.5 border border-light-cream">
                          <Icon className="w-4 h-4 opacity-70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h4 className="font-semibold text-xs text-charcoal truncate">
                              {act.name}
                            </h4>
                            <span className="text-xs font-semibold text-charcoal">
                              ${act.cost.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-muted mt-0.5 flex-wrap">
                            <span className="text-[10px] font-normal uppercase px-1 py-0.2 bg-cream rounded border border-light-cream text-muted">
                              {act.type}
                            </span>
                            {act.scheduledTime && <span>at {act.scheduledTime}</span>}
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 opacity-70" /> {act.durationMinutes} min
                            </span>
                          </div>

                          {act.description && (
                            <p className="text-xs text-muted mt-1 leading-relaxed">
                              {act.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
