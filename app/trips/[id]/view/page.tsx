'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Share2,
  Sliders,
  PieChart,
  Printer,
  ArrowLeft,
  Loader2,
  Camera,
  Utensils,
  Compass,
  Smile,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { format, eachDayOfInterval, isSameDay } from 'date-fns';
import { TripDTO, StopDTO, ActivityDTO } from '@/lib/types';

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
      <div className="py-32 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <span className="text-sm font-semibold text-slate-500">Loading itinerary view...</span>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Trip not found</h2>
        <Link href="/trips" className="text-sm font-semibold text-coral hover:underline">
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Builder
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" /> Print Itinerary
          </button>
          <Link
            href={`/share/${trip.shareSlug}`}
            className="px-3.5 py-1.5 bg-coral text-white rounded-xl text-xs font-bold shadow-md shadow-coral/25 flex items-center gap-1.5 hover:bg-coral-dark"
          >
            <Share2 className="w-3.5 h-3.5" /> Public Share
          </Link>
        </div>
      </div>

      {/* Itinerary Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-coral px-2.5 py-1 bg-coral-50 rounded-full">
              Trip Itinerary
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-1 tracking-tight">
              {trip.name}
            </h1>
            {trip.description && (
              <p className="text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed">
                {trip.description}
              </p>
            )}
          </div>

          {trip.coverPhotoUrl && (
            <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden shadow-xs shrink-0">
              <img src={trip.coverPhotoUrl} alt={trip.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-400 font-medium">Date Range</div>
            <div className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-coral" />
              {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Destinations</div>
            <div className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-coral" />
              {stops.length} Cities
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Duration</div>
            <div className="text-sm font-bold text-slate-800 mt-0.5">
              {daysList.length} Days
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Estimated Budget</div>
            <div className="text-sm font-bold text-teal-700 mt-0.5">
              ${totalCost.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Day by Day Breakdown */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-slate-900">Day-by-Day Schedule</h2>

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
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft relative overflow-hidden"
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral text-white font-black flex items-center justify-center text-sm shadow-xs">
                    D{dayNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {format(dayDate, 'EEEE, MMMM d, yyyy')}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {activeStop ? (
                        <span className="font-semibold text-coral flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {activeStop.city.name}, {activeStop.city.country}
                        </span>
                      ) : (
                        <span>Travel / Transit day</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-500">
                  {dayActivities.length} {dayActivities.length === 1 ? 'Activity' : 'Activities'}
                </div>
              </div>

              {/* Activities on this day */}
              {dayActivities.length === 0 ? (
                <div className="py-4 px-4 bg-slate-50 rounded-2xl text-xs text-slate-500 italic">
                  No scheduled activities for this day. Free time for exploration, rest, or casual dining.
                </div>
              ) : (
                <div className="space-y-3">
                  {dayActivities.map((act) => {
                    const Icon = CATEGORY_ICONS[act.type] || Tag;
                    return (
                      <div
                        key={act.id}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-coral shadow-xs shrink-0 mt-0.5 border border-slate-200">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-slate-900 truncate">
                              {act.name}
                            </h4>
                            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200">
                              ${act.cost.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 bg-white rounded border border-slate-200 text-slate-700">
                              {act.type}
                            </span>
                            {act.scheduledTime && <span>at {act.scheduledTime}</span>}
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 text-slate-400" /> {act.durationMinutes} min
                            </span>
                          </div>

                          {act.description && (
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
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
