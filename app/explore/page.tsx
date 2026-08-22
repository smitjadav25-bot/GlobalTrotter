'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  Search,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  CloudSun,
  DollarSign
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

const REGIONS = ['All Regions', 'Asia', 'Europe', 'South Asia', 'Middle East', 'Southeast Asia', 'North America'];
const CLIMATES = ['All Climates', 'Tropical', 'Alpine', 'Temperate', 'Desert', 'Coastal', 'Mountain'];

export default function ExploreHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedClimate, setSelectedClimate] = useState('All Climates');

  const filteredDestinations = SAMPLE_DESTINATIONS.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === 'All Regions' || dest.region.toLowerCase() === selectedRegion.toLowerCase();

    const matchesClimate =
      selectedClimate === 'All Climates' || dest.climate.toLowerCase() === selectedClimate.toLowerCase();

    return matchesSearch && matchesRegion && matchesClimate;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-soft-lg">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold border border-white/15">
            <Compass className="w-3.5 h-3.5" /> Curated Global Hubs
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Explore 12 Iconic Global Destinations
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            Detailed guides featuring verified stays, adventure activities, transport schedules, local food trails, hidden gems, and local guides.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, country or vibe..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Region Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRegion === region
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Climate Dropdown */}
        <select
          value={selectedClimate}
          onChange={(e) => setSelectedClimate(e.target.value)}
          className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-auto"
        >
          {CLIMATES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Destination Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
          >
            {/* Image Banner */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-3.5 left-3.5 bg-navy-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{dest.rating}</span>
                <span className="text-[10px] text-slate-300 font-normal">({dest.reviewCount})</span>
              </div>

              <div className="absolute top-3.5 right-3.5 bg-teal-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                {dest.climate}
              </div>

              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  {dest.country}
                </span>
                <span className="text-[11px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/30">
                  {dest.weather.temp}°C {dest.weather.condition}
                </span>
              </div>
            </div>

            {/* Card Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-xl text-navy-900 group-hover:text-teal-700 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                  {dest.description}
                </p>
              </div>

              {/* Quick counts */}
              <div className="grid grid-cols-3 gap-2 text-center py-2.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <div className="text-xs font-extrabold text-navy-900">{dest.placesToVisit.length}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Spots</div>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-teal-700">{dest.stays.length}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Stays</div>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-sunset-600">{dest.activities.length}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Activities</div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <Link
                  href={`/planner?destination=${encodeURIComponent(dest.name)}`}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 px-3 py-2 rounded-xl transition-colors"
                >
                  ✨ AI Plan
                </Link>
                <Link
                  href={`/explore/${dest.id}`}
                  className="flex-1 text-center py-2 bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
