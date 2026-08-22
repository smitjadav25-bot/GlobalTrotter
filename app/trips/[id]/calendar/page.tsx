'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import {
  Calendar as CalendarIcon,
  Clock,
  DollarSign,
  MapPin,
  ArrowLeft,
  Loader2,
  X,
  Sparkles,
} from 'lucide-react';
import { TripDTO, ActivityDTO, StopDTO } from '@/lib/types';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  type: 'stop' | 'activity';
  data?: any;
}

export default function TripCalendarPage() {
  const params = useParams();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<TripDTO | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    fetch(`/api/trips/${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.trip) {
          setTrip(data.trip);

          const evs: CalendarEvent[] = [];

          // 1. Add city stops as multi-day banner events
          (data.trip.stops || []).forEach((stop: StopDTO) => {
            const arr = new Date(stop.arrivalDate);
            const dep = new Date(stop.departureDate);
            evs.push({
              id: `stop-${stop.id}`,
              title: `📍 ${stop.city.name}, ${stop.city.country}`,
              start: arr,
              end: dep,
              allDay: true,
              type: 'stop',
              data: stop,
            });

            // 2. Add individual activities
            (stop.activities || []).forEach((act: ActivityDTO) => {
              if (act.scheduledDate) {
                const actDate = new Date(act.scheduledDate);
                let startHours = 10;
                let startMinutes = 0;

                if (act.scheduledTime && act.scheduledTime.includes(':')) {
                  const [h, m] = act.scheduledTime.split(':').map(Number);
                  if (!isNaN(h)) startHours = h;
                  if (!isNaN(m)) startMinutes = m;
                }

                const actStart = new Date(actDate);
                actStart.setHours(startHours, startMinutes, 0);

                const actEnd = new Date(actStart);
                actEnd.setMinutes(actEnd.getMinutes() + (act.durationMinutes || 60));

                evs.push({
                  id: `act-${act.id}`,
                  title: `• ${act.name} ($${act.cost})`,
                  start: actStart,
                  end: actEnd,
                  allDay: false,
                  type: 'activity',
                  data: { ...act, cityName: stop.city.name },
                });
              }
            });
          });

          setEvents(evs);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return (
      <div className="py-32 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <span className="text-sm font-semibold text-slate-500">Loading interactive calendar...</span>
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

  const eventStyleGetter = (event: CalendarEvent) => {
    if (event.type === 'stop') {
      return {
        style: {
          backgroundColor: '#0d9488', // Teal
          color: '#ffffff',
          borderRadius: '8px',
          border: 'none',
          padding: '3px 8px',
          fontWeight: '600',
        },
      };
    }

    return {
      style: {
        backgroundColor: '#ff5a5f', // Coral
        color: '#ffffff',
        borderRadius: '8px',
        border: 'none',
        padding: '2px 6px',
        fontWeight: '500',
      },
    };
  };

  const defaultDate = trip.startDate ? new Date(trip.startDate) : new Date();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href={`/trips/${tripId}/builder`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Builder
          </Link>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Itinerary Timeline & Calendar
          </h1>
          <p className="text-xs text-slate-500">
            Interactive multi-view schedule for <span className="font-semibold text-slate-700">{trip.name}</span>
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal-600" />
            <span className="text-slate-700">City Stay (Multi-day)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-coral" />
            <span className="text-slate-700">Activity / Experience</span>
          </div>
        </div>
      </div>

      {/* Calendar Area */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-soft">
        <div className="h-[650px] w-full">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={defaultDate}
            defaultView={Views.MONTH}
            views={[Views.MONTH, Views.WEEK, Views.AGENDA]}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => setSelectedEvent(event as CalendarEvent)}
            className="rounded-2xl"
          />
        </div>
      </div>

      {/* Event Details Inspection Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    selectedEvent.type === 'stop' ? 'bg-teal-600' : 'bg-coral'
                  }`}
                />
                <h3 className="font-bold text-base text-slate-900">
                  {selectedEvent.type === 'stop' ? 'Destination Stay' : 'Planned Experience'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-bold text-slate-900">{selectedEvent.title}</h4>

              {selectedEvent.type === 'stop' ? (
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>
                      {selectedEvent.data.city.name}, {selectedEvent.data.city.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-coral" />
                    <span>
                      {moment(selectedEvent.start).format('MMM D')} → {moment(selectedEvent.end).format('MMM D, YYYY')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span>Cost Index: {selectedEvent.data.city.costIndex}x</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-coral" />
                    <span>In {selectedEvent.data.cityName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>
                      {moment(selectedEvent.start).format('MMM D [at] h:mm A')} ({selectedEvent.data.durationMinutes} min)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-teal-600" />
                    <span className="font-bold text-teal-700">${selectedEvent.data.cost}</span>
                  </div>
                  {selectedEvent.data.description && (
                    <p className="text-slate-500 pt-2 border-t border-slate-100 text-xs">
                      {selectedEvent.data.description}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
