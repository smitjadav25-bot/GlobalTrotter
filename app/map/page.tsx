'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';
import Link from 'next/link';

interface MapPlace {
  id: string;
  name: string;
  category: 'Attraction' | 'Hotel' | 'Restaurant' | 'Activity' | 'Hidden Gem';
  city: string;
  lat: number;
  lng: number;
  rating: number;
  price: string;
  description: string;
  imageUrl: string;
}

const SAMPLE_PLACES: MapPlace[] = [
  {
    id: 'p-1',
    name: 'Taj Mahal Monument',
    category: 'Attraction',
    city: 'Agra, Uttar Pradesh',
    lat: 27.1751,
    lng: 78.0421,
    rating: 4.9,
    price: '$15',
    description: 'Iconic white marble mausoleum and UNESCO World Heritage monument on the Yamuna riverbank.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Amber Palace & Sheesh Mahal',
    id: 'p-2',
    category: 'Attraction',
    city: 'Jaipur, Rajasthan',
    lat: 26.9855,
    lng: 75.8513,
    rating: 4.8,
    price: '$12',
    description: 'Hilltop fortress blending Rajput and Mughal architecture with stunning mirrored hall.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p-3',
    name: 'Gateway of India',
    category: 'Attraction',
    city: 'Mumbai, Maharashtra',
    lat: 18.9220,
    lng: 72.8347,
    rating: 4.7,
    price: 'Free',
    description: '20th-century arch monument overlooking Mumbai Harbour and the Arabian Sea.',
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p-4',
    name: 'Ganga Aarti at Dashashwamedh',
    category: 'Hidden Gem',
    city: 'Varanasi, Uttar Pradesh',
    lat: 25.3076,
    lng: 83.0107,
    rating: 4.9,
    price: 'Free',
    description: 'Mesmerizing evening prayer ceremony of light, brass lamps, and sacred chanting on the Ganges.',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p-5',
    name: 'Alleppey Backwaters Houseboat',
    category: 'Hidden Gem',
    city: 'Kochi & Alleppey, Kerala',
    lat: 9.4981,
    lng: 76.3388,
    rating: 4.9,
    price: '$50',
    description: 'Serene palm-fringed canals, traditional kettuvallam houseboats, and fresh Karimeen cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p-6',
    name: 'Pangong Tso High Altitude Lake',
    category: 'Hidden Gem',
    city: 'Leh-Ladakh, Ladakh',
    lat: 33.7595,
    lng: 78.6674,
    rating: 4.9,
    price: '$75',
    description: 'Color-shifting azure saltwater lake at 14,270 ft nestled in the rugged Himalayas.',
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&q=80',
  },
];

const CATEGORY_FILTERS = [
  'All',
  'Attractions',
  'Hotels',
  'Restaurants',
  'Activities',
  'Hidden Gems',
  'Routes',
];

export default function MapExplorerPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<MapPlace>(SAMPLE_PLACES[0]);

  const filteredPlaces = SAMPLE_PLACES.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Attractions') return p.category === 'Attraction';
    if (activeCategory === 'Hidden Gems') return p.category === 'Hidden Gem';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
            <Compass className="w-6 h-6 opacity-80" /> Interactive India Explorer Map
          </h1>
          <p className="text-xs text-muted font-normal mt-1">
            Pinpoint attractions, curated heritage havelis, authentic cuisine, and multi-city travel routes across India.
          </p>
        </div>
      </div>

      {/* Filter Chips Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-pill text-xs font-normal border whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map Explorer Canvas & Drawer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch min-h-[560px]">
        {/* Visual Map Surface */}
        <div className="lg:col-span-2 bg-cream rounded-card border border-light-cream overflow-hidden relative min-h-[420px] flex flex-col justify-between p-6">
          {/* Subtle topological grid backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(28,28,28,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Top Controls Overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="px-3 py-1.5 bg-cream rounded border border-light-cream text-xs font-normal text-charcoal flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 opacity-70" />
              <span>India Overview Projection</span>
            </div>
            <div className="px-3 py-1.5 bg-cream rounded border border-light-cream text-xs font-normal text-muted">
              {filteredPlaces.length} Locations Mapped
            </div>
          </div>

          {/* Simulated Interactive Map Pins */}
          <div className="relative z-10 my-auto grid grid-cols-2 sm:grid-cols-3 gap-4 py-8">
            {filteredPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={`p-3 rounded-card text-left transition-colors border ${
                  selectedPlace.id === place.id
                    ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                    : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="text-xs font-semibold truncate">{place.name}</span>
                </div>
                <div className="text-[11px] mt-1 opacity-80">{place.city}</div>
                <div className="text-[10px] mt-1 font-normal opacity-70">
                  {place.category} • {place.price}
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Map Info */}
          <div className="relative z-10 flex items-center justify-between text-xs text-muted font-normal pt-3 border-t border-light-cream">
            <div className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 opacity-70" /> Select any pin to preview details and add to itinerary
            </div>
            <span>GPS: 20.5937° N, 78.9629° E (India)</span>
          </div>
        </div>

        {/* Place Detail Sidebar */}
        <div className="bg-cream rounded-card p-6 border border-light-cream flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-card overflow-hidden bg-cream border border-light-cream">
              <img
                src={selectedPlace.imageUrl}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-cream border border-light-cream text-[10px] font-normal text-charcoal">
                {selectedPlace.category}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-charcoal">{selectedPlace.name}</h3>
                <span className="text-xs font-semibold text-charcoal">
                  ★ {selectedPlace.rating}
                </span>
              </div>
              <p className="text-xs text-muted font-normal flex items-center gap-1">
                <MapPin className="w-3 h-3 opacity-70" /> {selectedPlace.city}
              </p>
            </div>

            <p className="text-xs text-muted font-normal leading-relaxed">
              {selectedPlace.description}
            </p>

            <div className="p-3 bg-charcoal-4 rounded space-y-1 text-xs font-normal">
              <div className="flex justify-between text-muted">
                <span>Admission / Cost:</span>
                <span className="font-semibold text-charcoal">{selectedPlace.price}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Recommended Time:</span>
                <span className="font-semibold text-charcoal">1.5 - 2.5 Hours</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-light-cream">
            <Link
              href={`/trips/new?city=${encodeURIComponent(selectedPlace.city.split(',')[0])}`}
              className="w-full py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center justify-center gap-1.5 active:opacity-80 transition-opacity"
            >
              Plan Trip to this Location <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
