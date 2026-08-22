'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  CloudSun,
  Plus
} from 'lucide-react';
import { SAMPLE_TRIPS } from '@/lib/mockData';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState('October 2026');

  // Calendar Day cell events
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const getDayEvents = (dayNum: number) => {
    if (dayNum === 15) {
      return [
        { type: 'flight', title: '✈️ Flight DPS 09:30 AM', color: 'bg-navy-900 text-white' },
        { type: 'hotel', title: '🏨 Check-in Mandapa Ubud', color: 'bg-teal-50 text-teal-800 border border-teal-200' }
      ];
    }
    if (dayNum === 16) {
      return [
        { type: 'act', title: '🌋 Mount Batur Sunrise 04:00 AM', color: 'bg-sunset-50 text-sunset-800 border border-sunset-200' },
        { type: 'food', title: '🍜 Warung Ibu Oka 3 Tasting', color: 'bg-slate-100 text-slate-700' }
      ];
    }
    if (dayNum === 17) {
      return [
        { type: 'weather', title: '🌧 Indoor Cooking Academy', color: 'bg-amber-50 text-amber-800 border border-amber-200' }
      ];
    }
    if (dayNum === 18) {
      return [
        { type: 'act', title: '🏄 Nusa Penida Manta Ray Safari', color: 'bg-teal-50 text-teal-800 border border-teal-200' }
      ];
    }
    return [];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
            <CalendarIcon className="w-3.5 h-3.5" /> Synchronized Schedule
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Travel Schedule & Itinerary Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Synced departures, hotel check-ins, guided activities, and weather alerts.
          </p>
        </div>

        {/* Month Switcher */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-soft self-start sm:self-auto">
          <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-navy-900 px-2">{currentMonth}</span>
          <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center font-extrabold text-xs text-slate-400 pb-2 border-b border-slate-100 uppercase tracking-wider">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* 31 Calendar Day Cells */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {/* Pad offset for start of month (e.g. 4 empty cells) */}
          <div className="h-24 sm:h-28 rounded-2xl bg-slate-50/50 p-2 opacity-30" />
          <div className="h-24 sm:h-28 rounded-2xl bg-slate-50/50 p-2 opacity-30" />
          <div className="h-24 sm:h-28 rounded-2xl bg-slate-50/50 p-2 opacity-30" />
          <div className="h-24 sm:h-28 rounded-2xl bg-slate-50/50 p-2 opacity-30" />

          {daysInMonth.map((dayNum) => {
            const events = getDayEvents(dayNum);
            const isHighlighted = events.length > 0;

            return (
              <div
                key={dayNum}
                className={`h-24 sm:h-28 rounded-2xl p-2 border flex flex-col justify-between transition-all overflow-hidden ${
                  isHighlighted
                    ? 'bg-white border-teal-400/80 shadow-sm ring-1 ring-teal-400/30'
                    : 'bg-white border-slate-200/70 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-black ${
                      isHighlighted ? 'text-teal-700 font-extrabold' : 'text-slate-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {isHighlighted && <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
                </div>

                <div className="space-y-1 overflow-hidden">
                  {events.map((ev, idx) => (
                    <div
                      key={idx}
                      className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md truncate leading-tight ${ev.color}`}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
