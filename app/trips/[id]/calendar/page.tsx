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
      <div className="py-24 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
        <span className="text-xs font-normal text-muted">Loading interactive calendar...</span>
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

  const eventStyleGetter = (event: CalendarEvent) => {
    if (event.type === 'stop') {
      return {
        style: {
          backgroundColor: '#1c1c1c',
          color: '#fcfbf8',
          borderRadius: '4px',
          border: '1px solid #1c1c1c',
          padding: '2px 6px',
          fontWeight: '400',
          fontSize: '11px',
        },
      };
    }

    return {
      style: {
        backgroundColor: '#eceae4',
        color: '#1c1c1c',
        borderRadius: '4px',
        border: '1px solid #5f5f5d',
        padding: '2px 6px',
        fontWeight: '400',
        fontSize: '11px',
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
            className="inline-flex items-center gap-1 text-xs font-normal text-muted hover:text-charcoal mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Builder
          </Link>
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">
            Itinerary Timeline & Calendar
          </h1>
          <p className="text-xs text-muted font-normal">
            Interactive schedule for <span className="font-semibold text-charcoal">{trip.name}</span>
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 bg-cream px-3 py-1.5 rounded border border-light-cream text-xs font-normal">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-charcoal" />
            <span className="text-charcoal">City Stay (Multi-day)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-light-cream border border-muted" />
            <span className="text-charcoal">Activity / Experience</span>
          </div>
        </div>
      </div>

      {/* Calendar Area */}
      <div className="bg-cream rounded-card p-4 sm:p-6 border border-light-cream">
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
            className="rounded"
          />
        </div>
      </div>

      {/* Event Details Inspection Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-charcoal-40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-cream rounded-card max-w-md w-full p-6 border border-light-cream">
            <div className="flex items-center justify-between pb-3 border-b border-light-cream mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    selectedEvent.type === 'stop' ? 'bg-charcoal' : 'bg-muted'
                  }`}
                />
                <h3 className="font-semibold text-sm text-charcoal">
                  {selectedEvent.type === 'stop' ? 'Destination Stay' : 'Planned Experience'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded text-muted hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-semibold text-charcoal">{selectedEvent.title}</h4>

              {selectedEvent.type === 'stop' ? (
                <div className="space-y-2 text-xs text-muted font-normal">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 opacity-70" />
                    <span>
                      {selectedEvent.data.city.name}, {selectedEvent.data.city.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 opacity-70" />
                    <span>
                      {moment(selectedEvent.start).format('MMM D')} → {moment(selectedEvent.end).format('MMM D, YYYY')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 opacity-70" />
                    <span>Cost Index: {selectedEvent.data.city.costIndex}x</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-muted font-normal">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 opacity-70" />
                    <span>In {selectedEvent.data.cityName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 opacity-70" />
                    <span>
                      {moment(selectedEvent.start).format('MMM D [at] h:mm A')} ({selectedEvent.data.durationMinutes} min)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 opacity-70" />
                    <span className="font-semibold text-charcoal">${selectedEvent.data.cost}</span>
                  </div>
                  {selectedEvent.data.description && (
                    <p className="text-muted pt-2 border-t border-light-cream text-xs">
                      {selectedEvent.data.description}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-3.5 py-1.5 bg-cream border border-charcoal-40 hover:bg-charcoal-4 text-charcoal rounded text-xs font-normal"
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
