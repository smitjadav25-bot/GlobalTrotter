'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Map as MapIcon,
  MapPin,
  Hotel,
  Utensils,
  Sparkles,
  Compass,
  Layers,
  Search,
  Check,
  Star,
  Plus,
  ArrowRight,
  Shield,
  Eye
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

type LayerFilter = 'all' | 'attractions' | 'hotels' | 'restaurants' | 'activities' | 'hiddenGems';

export default function ExploreMapPage() {
  const [selectedCityId, setSelectedCityId] = useState('bali');
  const [activeLayer, setActiveLayer] = useState<LayerFilter>('all');
  const [selectedPin, setSelectedPin] = useState<{
    id: string;
    name: string;
    category: string;
    image: string;
    rating: number;
    price?: number;
    description: string;
    lat: number;
    lng: number;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const destination = SAMPLE_DESTINATIONS.find((d) => d.id === selectedCityId) || SAMPLE_DESTINATIONS[0];

  // Consolidate map pins based on active layer
  const allPins = [
    ...destination.placesToVisit.map((p, idx) => ({
      id: p.id,
      name: p.name,
      category: 'attractions',
      categoryLabel: 'Attraction',
      image: p.imageUrl,
      rating: p.rating,
      price: p.ticketPrice,
      description: p.description,
      lat: destination.coordinates.lat + (idx === 0 ? 0.04 : idx === 1 ? -0.03 : 0.02),
      lng: destination.coordinates.lng + (idx === 0 ? -0.05 : idx === 1 ? 0.04 : -0.02),
      icon: '🏛️'
    })),
    ...destination.stays.map((s, idx) => ({
      id: s.id,
      name: s.name,
      category: 'hotels',
      categoryLabel: 'Hotel & Stay',
      image: s.imageUrl,
      rating: s.rating,
      price: s.pricePerNight,
      description: s.description,
      lat: destination.coordinates.lat + (idx === 0 ? -0.02 : idx === 1 ? 0.05 : -0.06),
      lng: destination.coordinates.lng + (idx === 0 ? -0.03 : idx === 1 ? -0.04 : 0.05),
      icon: '🏨'
    })),
    ...destination.activities.map((a, idx) => ({
      id: a.id,
      name: a.name,
      category: 'activities',
      categoryLabel: 'Activity',
      image: a.imageUrl,
      rating: a.rating,
      price: a.cost,
      description: a.description,
      lat: destination.coordinates.lat + (idx === 0 ? 0.06 : -0.05),
      lng: destination.coordinates.lng + (idx === 0 ? 0.06 : -0.07),
      icon: '🏄'
    })),
    ...destination.food.map((f, idx) => ({
      id: f.id,
      name: f.name,
      category: 'restaurants',
      categoryLabel: 'Restaurant / Food',
      image: f.imageUrl,
      rating: 4.9,
      price: f.price,
      description: f.description,
      lat: destination.coordinates.lat + (idx === 0 ? 0.01 : -0.01),
      lng: destination.coordinates.lng + (idx === 0 ? 0.02 : -0.02),
      icon: '🍽️'
    })),
    ...destination.hiddenGems.map((g, idx) => ({
      id: g.id,
      name: g.name,
      category: 'hiddenGems',
      categoryLabel: 'Hidden Gem',
      image: g.imageUrl,
      rating: 4.95,
      price: g.estimatedCost,
      description: g.description,
      lat: destination.coordinates.lat + (idx === 0 ? -0.07 : 0.08),
      lng: destination.coordinates.lng + (idx === 0 ? 0.07 : -0.06),
      icon: '💎'
    }))
  ];

  const visiblePins = activeLayer === 'all'
    ? allPins
    : allPins.filter((p) => p.category === activeLayer);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-100 flex flex-col">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Top Controls Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pointer-events-none">
        {/* City Selector */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-soft-lg border border-slate-200/80 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600 ml-2" />
          <select
            value={selectedCityId}
            onChange={(e) => {
              setSelectedCityId(e.target.value);
              setSelectedPin(null);
            }}
            className="bg-transparent text-xs font-extrabold text-navy-900 focus:outline-none pr-3"
          >
            {SAMPLE_DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}, {d.country}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Layer Chips */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-soft-lg border border-slate-200/80 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Layers', icon: '🌐' },
            { id: 'attractions', label: 'Attractions', icon: '🏛️' },
            { id: 'hotels', label: 'Hotels', icon: '🏨' },
            { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
            { id: 'activities', label: 'Activities', icon: '🏄' },
            { id: 'hiddenGems', label: 'Hidden Gems', icon: '💎' }
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id as LayerFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeLayer === layer.id
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{layer.icon}</span>
              <span>{layer.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visual Simulation Canvas */}
      <div className="relative flex-1 w-full h-full bg-[#EBF2F7] overflow-hidden flex items-center justify-center select-none">
        {/* Subtle Styled Map Grids & Topography Vector Pattern */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Stylized Geography Coastline/Road SVG Vector */}
        <svg className="absolute inset-0 w-full h-full text-slate-300 stroke-current stroke-2 fill-none opacity-30">
          <path d="M 50 150 Q 300 200 450 100 T 800 300 T 1200 200" strokeWidth="6" stroke="#94A3B8" />
          <path d="M 100 400 Q 350 300 650 500 T 1100 450" strokeWidth="4" stroke="#CBD5E1" />
          <path d="M 200 100 L 250 600 M 500 50 L 550 700 M 900 100 L 850 750" strokeWidth="2" strokeDasharray="6 6" />
        </svg>

        {/* Route Polyline connecting pins */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <polyline
            points="380,240 520,310 660,260 740,420 480,480"
            fill="none"
            stroke="#0D9488"
            strokeWidth="3"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
        </svg>

        {/* Render Interactive Pins */}
        <div className="relative w-full max-w-4xl h-[520px]">
          {visiblePins.map((pin, index) => {
            // Position pins visually in distributed layout around map center
            const positions = [
              { top: '25%', left: '38%' },
              { top: '42%', left: '55%' },
              { top: '32%', left: '70%' },
              { top: '65%', left: '46%' },
              { top: '58%', left: '68%' },
              { top: '18%', left: '52%' },
              { top: '72%', left: '32%' },
              { top: '48%', left: '26%' },
              { top: '35%', left: '82%' },
              { top: '78%', left: '60%' }
            ];
            const pos = positions[index % positions.length];

            const isSelected = selectedPin?.id === pin.id;

            return (
              <div
                key={pin.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <button
                  onClick={() => setSelectedPin(pin)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group ${
                    isSelected
                      ? 'bg-navy-900 text-white ring-4 ring-teal-400/40 scale-110'
                      : 'bg-white text-navy-900 border border-slate-200 hover:border-teal-500'
                  }`}
                >
                  <span className="text-sm">{pin.icon}</span>
                  <span className="text-[11px] font-extrabold max-w-[120px] truncate">
                    {pin.name}
                  </span>
                  {pin.price !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-teal-500 text-navy-900' : 'bg-slate-100 text-slate-700'
                    }`}>
                      ${pin.price}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Pin Details Overlay Card */}
        {selectedPin && (
          <div className="absolute bottom-6 left-4 sm:left-auto right-4 sm:right-6 z-30 max-w-sm w-full bg-white rounded-3xl p-5 shadow-2xl border border-slate-200/90 animate-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start gap-3">
              <img
                src={selectedPin.image}
                alt={selectedPin.name}
                className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm"
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {selectedPin.category}
                  </span>
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <h4 className="font-extrabold text-sm text-navy-900 mt-1 truncate">
                  {selectedPin.name}
                </h4>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {selectedPin.rating}
                  </span>
                  {selectedPin.price !== undefined && (
                    <span>• Est. ${selectedPin.price}</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mt-3 leading-relaxed">
              {selectedPin.description}
            </p>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href={`/explore/${selectedCityId}`}
                className="text-xs font-bold text-slate-600 hover:text-navy-900"
              >
                Destination Guide →
              </Link>

              <button
                onClick={() => showToast(`Added "${selectedPin.name}" to trip itinerary!`)}
                className="px-4 py-1.5 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add to Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
