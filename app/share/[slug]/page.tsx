'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Calendar,
  Copy,
  Clock,
  Check,
  Globe,
  Loader2,
  Camera,
  Utensils,
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

export default function PublicTripSharePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [trip, setTrip] = useState<TripDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/public/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.trip) {
          setTrip(data.trip);
        } else {
          setError(data.error || 'Public itinerary not found.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load public trip.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyTrip = async () => {
    if (!trip) return;
    try {
      setIsCopying(true);
      const res = await fetch(`/api/trips/${trip.id}/copy`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to copy trip');
      }

      setCopySuccess(true);
      setTimeout(() => {
        router.push(`/trips/${data.trip.id}/builder`);
      }, 1200);
    } catch (err: any) {
      alert(err.message || 'Please log in to copy this trip to your account.');
    } finally {
      setIsCopying(false);
    }
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
        <span className="text-xs font-normal text-muted">Loading public travel itinerary...</span>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center px-4 space-y-3">
        <div className="w-12 h-12 bg-charcoal text-off-white rounded flex items-center justify-center mx-auto shadow-inset-btn">
          <Globe className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-charcoal">Itinerary Not Available</h2>
        <p className="text-xs text-muted">{error || 'This trip is private or does not exist.'}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal active:opacity-80"
        >
          Explore Other Trips
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="relative rounded-card overflow-hidden border border-light-cream bg-cream">
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* User Creator Tag */}
            <div className="flex items-center gap-2 bg-charcoal-3 px-2.5 py-1 rounded text-charcoal text-xs font-normal">
              {trip.user?.avatarUrl && (
                <img src={trip.user.avatarUrl} alt="" className="w-4 h-4 rounded object-cover" />
              )}
              <span>Created by {trip.user?.name || 'GlobeTrotter Explorer'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShareLink}
                className="px-3 py-1.5 bg-cream border border-charcoal-40 hover:bg-charcoal-4 text-charcoal rounded text-xs font-normal flex items-center gap-1.5 transition-colors"
              >
                {shareCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {shareCopied ? 'Link Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
            <div>
              <span className="bg-charcoal text-off-white text-[10px] font-normal uppercase tracking-wider px-2 py-0.5 rounded shadow-inset-btn">
                Public Shared Itinerary
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal mt-2 tracking-tight">{trip.name}</h1>
              <div className="flex items-center gap-3 text-xs text-muted mt-1 flex-wrap font-normal">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 opacity-70" />
                  {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
                </span>
                <span>•</span>
                <span>{stops.length} Cities</span>
                <span>•</span>
                <span>{allActivities.length} Activities</span>
                <span>•</span>
                <span className="text-charcoal font-semibold">${totalCost.toFixed(2)} Total</span>
              </div>
            </div>

            {/* Clone / Copy Trip CTA */}
            <button
              type="button"
              onClick={handleCopyTrip}
              disabled={isCopying || copySuccess}
              className="px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 transition-opacity shrink-0 disabled:opacity-50"
            >
              {isCopying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Duplicating...
                </>
              ) : copySuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied to My Trips!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy This Trip to My Account
                </>
              )}
            </button>
          </div>
        </div>

        {trip.description && (
          <div className="p-6 text-xs text-muted leading-relaxed border-t border-light-cream font-normal">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-charcoal mb-1">About this Itinerary</h4>
            {trip.description}
          </div>
        )}
      </div>

      {/* Destinations Strip */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-charcoal flex items-center gap-2">
          <MapPin className="w-4 h-4 opacity-70" /> Route & Stops ({stops.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stops.map((stop, idx) => (
            <div
              key={stop.id}
              className="bg-cream rounded-card p-3 border border-light-cream flex items-center gap-2.5"
            >
              <img
                src={stop.city.imageUrl}
                alt={stop.city.name}
                className="w-10 h-10 rounded object-cover border border-light-cream"
              />
              <div className="min-w-0">
                <div className="text-[10px] text-muted font-normal">Stop #{idx + 1}</div>
                <h4 className="font-semibold text-xs text-charcoal truncate">{stop.city.name}</h4>
                <p className="text-[11px] text-muted truncate">{stop.city.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Day by Day Schedule */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-charcoal">Complete Itinerary Breakdown</h3>

        {daysList.map((dayDate, dayIdx) => {
          const formattedDate = format(dayDate, 'yyyy-MM-dd');
          const dayNumber = dayIdx + 1;

          const activeStop = stops.find((stop) => {
            const arr = new Date(stop.arrivalDate);
            const dep = new Date(stop.departureDate);
            return dayDate >= arr && dayDate <= dep;
          });

          const dayActivities = allActivities.filter((act) => {
            if (!act.scheduledDate) return false;
            return isSameDay(new Date(act.scheduledDate), dayDate);
          });

          return (
            <div
              key={formattedDate}
              className="bg-cream rounded-card p-5 border border-light-cream space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-light-cream">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-charcoal text-off-white font-normal flex items-center justify-center text-xs shadow-inset-btn">
                    D{dayNumber}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-charcoal">
                      {format(dayDate, 'EEEE, MMMM d')}
                    </h4>
                    {activeStop && (
                      <p className="text-[11px] text-muted flex items-center gap-1">
                        <MapPin className="w-3 h-3 opacity-70" /> {activeStop.city.name}, {activeStop.city.country}
                      </p>
                    )}
                  </div>
                </div>

                <span className="text-[11px] text-muted font-normal">
                  {dayActivities.length} activities
                </span>
              </div>

              {dayActivities.length === 0 ? (
                <p className="text-xs text-muted italic py-1 font-normal">
                  Open exploration and free time.
                </p>
              ) : (
                <div className="space-y-2">
                  {dayActivities.map((act) => {
                    const Icon = CATEGORY_ICONS[act.type] || Tag;
                    return (
                      <div
                        key={act.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded bg-charcoal-3 border border-light-cream"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded bg-cream flex items-center justify-center text-charcoal shrink-0 border border-light-cream">
                            <Icon className="w-3.5 h-3.5 opacity-70" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-semibold text-xs text-charcoal truncate">
                              {act.name}
                            </h5>
                            <div className="flex items-center gap-2 text-[11px] text-muted mt-0.5">
                              <span className="uppercase text-[9px] font-normal px-1 bg-cream rounded border border-light-cream">
                                {act.type}
                              </span>
                              {act.scheduledTime && <span>at {act.scheduledTime}</span>}
                              <span>• {act.durationMinutes}m</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-charcoal">
                          ${act.cost.toFixed(2)}
                        </span>
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
