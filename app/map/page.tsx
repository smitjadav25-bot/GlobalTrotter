'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Compass,
  Layers,
  Search,
  Filter,
  Star,
  DollarSign,
  Utensils,
  Camera,
  Building2,
  Zap,
  Sparkles,
  Navigation,
  ChevronRight,
  Maximize2,
  Info,
} from 'lucide-react';

const FILTER_CHIPS = [
  { id: 'all', label: 'All Places', icon: Layers },
  { id: 'attractions', label: 'Attractions', icon: Camera },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'restaurants', label: 'Restaurants', icon: Utensils },
  { id: 'activities', label: 'Activities', icon: Zap },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: Sparkles },
  { id: 'routes', label: 'Multi-City Routes', icon: Navigation },
];

const MAP_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Senso-ji Temple & Asakusa',
    category: 'attractions',
    city: 'Tokyo, Japan',
    lat: '35.7148° N',
    lng: '139.7967° E',
    rating: 4.9,
    reviews: 1420,
    cost: 'Free',
    img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    desc: 'Tokyo’s oldest Buddhist temple founded in 645 AD with vibrant market stalls.',
  },
  {
    id: 'loc-2',
    name: 'Fushimi Inari-Taisha Shrine',
    category: 'attractions',
    city: 'Kyoto, Japan',
    lat: '34.9671° N',
    lng: '135.7727° E',
    rating: 4.9,
    reviews: 2180,
    cost: 'Free',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    desc: 'Breathtaking mountain path lined with over 10,000 vibrant vermilion Torii gates.',
  },
  {
    id: 'loc-3',
    name: 'Kyoto Machiya Boutique Ryokan',
    category: 'hotels',
    city: 'Kyoto, Japan',
    lat: '35.0037° N',
    lng: '135.7681° E',
    rating: 4.8,
    reviews: 430,
    cost: '$190/night',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    desc: 'Restored wooden townhouse featuring private onsen baths and zen pebble gardens.',
  },
  {
    id: 'loc-4',
    name: 'Omoide Yokocho Yakitori Alleys',
    category: 'restaurants',
    city: 'Tokyo, Japan',
    lat: '35.6938° N',
    lng: '139.7000° E',
    rating: 4.7,
    reviews: 890,
    cost: '$20-40',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    desc: 'Atmospheric lanterns and smoke-filled izakayas serving charcoal skewers.',
  },
  {
    id: 'loc-5',
    name: 'Yanaka Old Town Hidden Coffee',
    category: 'hidden-gems',
    city: 'Tokyo, Japan',
    lat: '35.7275° N',
    lng: '139.7690° E',
    rating: 4.9,
    reviews: 310,
    cost: '$6',
    img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    desc: 'Post-war preserved historic district known for artisanal drip coffee and resident cats.',
  },
  {
    id: 'loc-6',
    name: 'Eiffel Tower & Seine River Walk',
    category: 'attractions',
    city: 'Paris, France',
    lat: '48.8584° N',
    lng: '2.2945° E',
    rating: 4.8,
    reviews: 3400,
    cost: '€28',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    desc: 'Iconic wrought-iron monument with panoramic terrace views over the City of Light.',
  },
];

export default function ExploreMapPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLoc, setSelectedLoc] = useState<any>(MAP_LOCATIONS[0]);
  const [search, setSearch] = useState('');

  const filteredLocations = MAP_LOCATIONS.filter((loc) => {
    const matchesFilter = activeFilter === 'all' || loc.category === activeFilter;
    const matchesSearch =
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.city.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-500" /> Interactive Explorer Map
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse verified points of interest, authentic neighborhoods, and curated multi-city routes.
          </p>
        </div>

        {/* Search & Action */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by place or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
          </div>
          <Link
            href="/ai-planner"
            className="px-4 py-2 bg-sunset-500 hover:bg-sunset-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sunset-500/20 whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Plan Route
          </Link>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {FILTER_CHIPS.map((chip) => {
          const Icon = chip.icon;
          const isActive = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-navy-900 dark:bg-teal-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Map Layout Grid: Left Sidebar + Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[680px]">
        {/* Places List (1 col) */}
        <div className="bg-white dark:bg-card-dark rounded-card p-4 border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-y-auto space-y-3">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {filteredLocations.length} Locations Found
            </span>
          </div>

          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => setSelectedLoc(loc)}
              className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                selectedLoc?.id === loc.id
                  ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/40 shadow-xs ring-1 ring-teal-500/20'
                  : 'border-slate-200/70 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <img src={loc.img} alt={loc.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-navy-900 dark:text-white truncate">
                    {loc.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-teal-500" /> {loc.city}
                </p>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 pt-1">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {loc.rating}
                  </span>
                  <span className="text-sunset-500 font-bold">{loc.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Canvas & Selected Detail Drawer (2 cols) */}
        <div className="lg:col-span-2 relative rounded-card overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft bg-slate-900 flex flex-col">
          {/* Map Graphic Simulation Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
            alt="World Map Topography"
            className="w-full h-full object-cover opacity-35"
          />

          {/* Interactive Simulated Map Pins */}
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            <div className="relative w-full h-full">
              {filteredLocations.map((loc, index) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLoc(loc)}
                  style={{
                    top: `${25 + (index * 15) % 65}%`,
                    left: `${20 + (index * 22) % 70}%`,
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg transition-all ${
                    selectedLoc?.id === loc.id
                      ? 'bg-sunset-500 text-white scale-110 z-30 ring-4 ring-sunset-500/30'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white hover:scale-105 z-20 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-[11px] font-bold truncate max-w-[120px]">{loc.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Location Card Floating Overlay */}
          {selectedLoc && (
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedLoc.img}
                  alt={selectedLoc.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-navy-900 dark:text-white">
                      {selectedLoc.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 uppercase">
                      {selectedLoc.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {selectedLoc.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>GPS: {selectedLoc.lat}, {selectedLoc.lng}</span>
                    <span>•</span>
                    <span className="text-sunset-500 font-bold">{selectedLoc.cost}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/trips/new"
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Add to Itinerary
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
