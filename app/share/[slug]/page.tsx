'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  Copy,
  Clock,
  Check,
  Globe,
  Loader2,
  Camera,
  Utensils,
  Smile,
  Tag,
  Sparkles,
  ArrowRight,
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
      <div className="py-32 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <span className="text-sm font-semibold text-slate-500">Loading public travel itinerary...</span>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4 space-y-4">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto">
          <Globe className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Itinerary Not Available</h2>
        <p className="text-sm text-slate-500">{error || 'This trip is private or does not exist.'}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-xs font-bold shadow-md hover:bg-coral-dark"
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-soft-lg border border-slate-200 bg-white">
        <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
          <img
            src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80'}
            alt={trip.name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* User Creator Tag */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold">
            {trip.user?.avatarUrl && (
              <img src={trip.user.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
            )}
            <span>Created by {trip.user?.name || 'GlobeTrotter Explorer'}</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleCopyShareLink}
              className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-800 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            >
              {shareCopied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              {shareCopied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="bg-teal-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Public Shared Itinerary
              </span>
              <h1 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">{trip.name}</h1>
              <div className="flex items-center gap-3 text-xs text-slate-200 mt-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-coral" />
                  {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
                </span>
                <span>•</span>
                <span>{stops.length} Cities</span>
                <span>•</span>
                <span>{allActivities.length} Activities</span>
                <span>•</span>
                <span className="text-emerald-300 font-bold">${totalCost.toFixed(2)} Total</span>
              </div>
            </div>

            {/* Clone / Copy Trip CTA */}
            <button
              type="button"
              onClick={handleCopyTrip}
              disabled={isCopying || copySuccess}
              className="px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-2xl text-sm font-bold shadow-lg shadow-coral/30 hover:scale-105 active:scale-100 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isCopying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Duplicating...
                </>
              ) : copySuccess ? (
                <>
                  <Check className="w-4 h-4" /> Copied to My Trips!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy This Trip to My Account
                </>
              )}
            </button>
          </div>
        </div>

        {trip.description && (
          <div className="p-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">About this Itinerary</h4>
            {trip.description}
          </div>
        )}
      </div>

      {/* Destinations Strip */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-coral" /> Route & Stops ({stops.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stops.map((stop, idx) => (
            <div
              key={stop.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3"
            >
              <img
                src={stop.city.imageUrl}
                alt={stop.city.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-coral">Stop #{idx + 1}</div>
                <h4 className="font-bold text-sm text-slate-900 truncate">{stop.city.name}</h4>
                <p className="text-xs text-slate-500 truncate">{stop.city.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Day by Day Schedule */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Complete Itinerary Breakdown</h3>

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
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-coral text-white font-black flex items-center justify-center text-xs">
                    D{dayNumber}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {format(dayDate, 'EEEE, MMMM d')}
                    </h4>
                    {activeStop && (
                      <p className="text-xs text-coral font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {activeStop.city.name}, {activeStop.city.country}
                      </p>
                    )}
                  </div>
                </div>

                <span className="text-xs text-slate-400 font-semibold">
                  {dayActivities.length} activities
                </span>
              </div>

              {dayActivities.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">
                  Open exploration and free time.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {dayActivities.map((act) => {
                    const Icon = CATEGORY_ICONS[act.type] || Tag;
                    return (
                      <div
                        key={act.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-coral shadow-xs shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                              {act.name}
                            </h5>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="uppercase text-[9px] font-bold px-1 bg-white rounded border border-slate-200">
                                {act.type}
                              </span>
                              {act.scheduledTime && <span>at {act.scheduledTime}</span>}
                              <span>• {act.durationMinutes}m</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200">
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
