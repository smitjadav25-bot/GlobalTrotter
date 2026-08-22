'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CloudSun,
  CloudRain,
  Sun,
  Snowflake,
  Wind,
  Droplets,
  Eye,
  AlertTriangle,
  Sparkles,
  Check,
  ArrowRight,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState('Bali');
  const [adapted, setAdapted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const destination = SAMPLE_DESTINATIONS.find(
    (d) => d.name.toLowerCase().includes(selectedCity.toLowerCase())
  ) || SAMPLE_DESTINATIONS[0];

  const handleAdaptItinerary = () => {
    setAdapted(true);
    setToastMessage('🌦 Itinerary successfully adapted! Swapped Day 3 outdoor hikes for indoor cultural & culinary experiences.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & City Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
            <CloudSun className="w-3.5 h-3.5" /> AI Weather Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Weather Forecast & Travel Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time climate tracking with automated indoor contingency switching.
          </p>
        </div>

        {/* City Filter */}
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setAdapted(false);
          }}
          className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {SAMPLE_DESTINATIONS.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}, {d.country}
            </option>
          ))}
        </select>
      </div>

      {/* Live Conditions Hero Card */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white p-8 sm:p-10 shadow-soft-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-white/15">
            <MapPin className="w-3.5 h-3.5" /> {destination.name}, {destination.country}
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-6xl sm:text-7xl font-black tracking-tight">{destination.weather.temp}°C</span>
            <div className="space-y-0.5">
              <span className="text-lg sm:text-xl font-extrabold block text-teal-300">
                {destination.weather.condition}
              </span>
              <span className="text-xs text-slate-300">Feels like {destination.weather.temp + 1}°C</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Ideal season for traveling. UV levels peak around 12:30 PM. Keep lightweight hydration on hand.
          </p>

          <div className="pt-2">
            <button
              onClick={handleAdaptItinerary}
              disabled={adapted}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-80 text-navy-900 font-extrabold text-xs shadow-lg transition-all"
            >
              {adapted ? (
                <>
                  <Check className="w-4 h-4" /> Contingency Schedule Active
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-navy-900" /> Adapt Itinerary for Weather
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Environmental Gauges */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Humidity</span>
              <Droplets className="w-4 h-4 text-teal-300" />
            </div>
            <div className="text-2xl font-black text-white">68%</div>
            <div className="text-[10px] text-teal-300">Optimal Tropical</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Wind Speed</span>
              <Wind className="w-4 h-4 text-teal-300" />
            </div>
            <div className="text-2xl font-black text-white">12 km/h</div>
            <div className="text-[10px] text-teal-300">Gentle Breeze</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>UV Index</span>
              <Sun className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-2xl font-black text-white">6 (High)</div>
            <div className="text-[10px] text-amber-300">Wear SPF 50+</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1">
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <span>Visibility</span>
              <Eye className="w-4 h-4 text-teal-300" />
            </div>
            <div className="text-2xl font-black text-white">10 km</div>
            <div className="text-[10px] text-teal-300">Crystal Clear</div>
          </div>
        </div>
      </div>

      {/* Travel Weather Alerts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
            <span>🌧</span> Rain Expected Day 3
          </div>
          <p className="text-[11px] text-amber-800 leading-snug">
            Afternoon showers forecasted from 2:00 PM to 5:00 PM.
          </p>
          <div className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
            Alt: Cooking Class or Museum
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-teal-50 border border-teal-200 space-y-2">
          <div className="flex items-center gap-2 text-teal-900 font-extrabold text-xs">
            <span>☀</span> Peak Golden Hour
          </div>
          <p className="text-[11px] text-teal-800 leading-snug">
            Sunset scheduled at 6:18 PM with zero cloud obstruction.
          </p>
          <div className="text-[10px] font-bold text-teal-900 bg-teal-100 px-2 py-0.5 rounded-md inline-block">
            Alt: Cliff Temple or Rooftop
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-blue-50 border border-blue-200 space-y-2">
          <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs">
            <span>💨</span> Coastal Breeze Alert
          </div>
          <p className="text-[11px] text-blue-800 leading-snug">
            Calm morning sea conditions ideal for scuba & boat transfers.
          </p>
          <div className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-md inline-block">
            Alt: Morning Boat Trip
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
            <span>🌡️</span> Evening Temp Drop
          </div>
          <p className="text-[11px] text-slate-700 leading-snug">
            Night temperatures dip to 22°C. Light cardigan recommended.
          </p>
          <div className="text-[10px] font-bold text-slate-800 bg-slate-200 px-2 py-0.5 rounded-md inline-block">
            Alt: Night Market Trail
          </div>
        </div>
      </div>

      {/* 7-Day Forecast & Indoor Contingency Swaps */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-navy-900">7-Day Travel Weather & Contingencies</h2>
          <span className="text-xs text-slate-400 font-medium">Smart AI Auto-Switch Enabled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {destination.weather.forecast.map((fc, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border space-y-3 transition-all ${
                fc.condition === 'Rain'
                  ? 'bg-amber-50/50 border-amber-200 shadow-sm'
                  : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-navy-900">{fc.day}</span>
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  {fc.condition === 'Rain' ? '🌧' : fc.condition === 'Snow' ? '❄️' : '☀️'} {fc.temp}°C
                </span>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                Forecast: <strong>{fc.condition}</strong>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[11px]">
                <span className="text-[10px] uppercase font-bold text-teal-700 block mb-0.5">
                  AI Indoor Alternative
                </span>
                <p className="text-slate-700 leading-snug font-medium">{fc.indoorAlternative}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
