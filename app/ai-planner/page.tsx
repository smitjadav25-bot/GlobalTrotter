'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Compass,
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Building2,
  Utensils,
  Camera,
  ShieldCheck,
  Zap,
  Sliders,
  Luggage,
} from 'lucide-react';

const POPULAR_DESTINATIONS = [
  { name: 'Tokyo & Kyoto, Japan', region: 'East Asia', img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80' },
  { name: 'Paris & Rome, Europe', region: 'Western Europe', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' },
  { name: 'Bali & Bangkok, SE Asia', region: 'Southeast Asia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { name: 'Reykjavik & Vik, Iceland', region: 'Northern Europe', img: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80' },
];

const TRAVEL_STYLES = [
  { id: 'balanced', title: 'Balanced & Classic', desc: 'Mix of iconic landmarks and authentic hidden gems.', icon: Compass },
  { id: 'cultural', title: 'Cultural & Historic', desc: 'Deep dive into heritage, architecture, and art museums.', icon: Building2 },
  { id: 'foodie', title: 'Culinary & Gastronomy', desc: 'Street food markets, Michelin guide spots, and cooking classes.', icon: Utensils },
  { id: 'adventure', title: 'Active & Outdoors', desc: 'Hiking, cycling, viewpoint treks, and nature excursions.', icon: Zap },
  { id: 'luxury', title: 'Boutique & Leisure', desc: '5-star boutique hotels, wellness spas, and curated private tours.', icon: Sparkles },
];

const INTEREST_TAGS = [
  '🏯 Temples & Shrines',
  '🍜 Street Food Markets',
  '☕ Specialty Cafes',
  '🎨 Modern Art Galleries',
  '🌸 Botanical Gardens',
  '🛍️ Vintage Shopping',
  '🌅 Sunset Viewpoints',
  '🚲 Bike Tours',
  '🍷 Wine & Sake Tasting',
  '🎭 Live Performances',
];

export default function AiPlannerPage() {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('Tokyo & Kyoto, Japan');
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-18');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(2800);
  const [style, setStyle] = useState('balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    '🏯 Temples & Shrines',
    '🍜 Street Food Markets',
    '☕ Specialty Cafes',
    '🌅 Sunset Viewpoints',
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleInterest = (tag: string) => {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Travel Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-navy-900 dark:text-white tracking-tight">
          AI Multi-City Trip Planner
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Answer a few questions and our AI will architect an optimized route, day-by-day pacing, and verified budget estimate.
        </p>
      </div>

      {!generatedResult ? (
        <div className="bg-white dark:bg-card-dark rounded-card p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-soft max-w-3xl mx-auto space-y-8">
          {/* Step Progress Pills */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-6 overflow-x-auto no-scrollbar">
            {[
              { num: 1, label: 'Destination' },
              { num: 2, label: 'Dates & Group' },
              { num: 3, label: 'Budget & Style' },
              { num: 4, label: 'Interests' },
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  step === s.num
                    ? 'text-teal-600 dark:text-teal-400 font-bold'
                    : step > s.num
                    ? 'text-navy-900 dark:text-slate-200 font-semibold'
                    : 'text-slate-400 font-medium'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${
                    step === s.num
                      ? 'bg-teal-500 text-white shadow-sm'
                      : step > s.num
                      ? 'bg-navy-800 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="text-xs whitespace-nowrap">{s.label}</span>
              </div>
            ))}
          </div>

          {/* STEP 1: Destination */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Where would you like to travel?
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-teal-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter city or multi-city route (e.g. Tokyo to Kyoto)"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 mb-3">Or choose a trending route:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {POPULAR_DESTINATIONS.map((d) => (
                    <div
                      key={d.name}
                      onClick={() => setDestination(d.name)}
                      className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                        destination === d.name
                          ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 ring-2 ring-teal-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <img src={d.img} alt={d.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{d.name}</div>
                        <div className="text-[11px] text-slate-400">{d.region}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dates & Travelers */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Number of Travelers: <span className="text-teal-600 dark:text-teal-400 font-extrabold">{travelers} {travelers === 1 ? 'person' : 'people'}</span>
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, '5+'].map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTravelers(typeof num === 'number' ? num : 5)}
                      className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        (typeof num === 'number' ? travelers === num : travelers >= 5)
                          ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Budget & Travel Style */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Estimated Total Budget (USD)
                  </label>
                  <span className="text-sm font-black text-sunset-500">${budget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-sunset-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Budget ($500)</span>
                  <span>Moderate ($3,000)</span>
                  <span>Luxury ($10,000+)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Select Travel Vibe & Style
                </label>
                <div className="space-y-2.5">
                  {TRAVEL_STYLES.map((st) => {
                    const Icon = st.icon;
                    const isSelected = style === st.id;
                    return (
                      <div
                        key={st.id}
                        onClick={() => setStyle(st.id)}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 ring-2 ring-teal-500/20'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-teal-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">{st.title}</div>
                          <div className="text-[11px] text-slate-400">{st.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Interests & Generate */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  What experiences do you want included?
                </label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {INTEREST_TAGS.map((tag) => {
                    const isSelected = selectedInterests.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterest(tag)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-teal-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary recap box */}
              <div className="p-4 rounded-2xl bg-surface-light dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-500" /> Plan Parameters:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 dark:text-slate-300 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Route:</span>
                    <span className="font-bold">{destination}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Duration:</span>
                    <span className="font-bold">8 Days (2 Stops)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Travelers:</span>
                    <span className="font-bold">{travelers} Adults</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Budget Target:</span>
                    <span className="font-bold text-sunset-500">${budget}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-7 py-3 bg-gradient-to-r from-sunset-500 to-teal-500 hover:from-sunset-600 hover:to-teal-600 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-sunset-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Architecting Itinerary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Generate AI Itinerary
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Generated Result View */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top banner summary */}
          <div className="relative rounded-card overflow-hidden bg-gradient-to-r from-navy-900 via-slate-900 to-teal-950 p-6 sm:p-10 text-white shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                    AI Generated Blueprint
                  </span>
                  <span className="text-xs text-slate-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Optimized for {style} travel
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black">{destination} Discovery</h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  8-Day curated journey balancing high-speed Shinkansen transit, historic shrines, and culinary hot-spots.
                </p>
                <div className="flex flex-wrap gap-4 text-xs pt-2">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" /> Oct 10 — Oct 18, 2026
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <DollarSign className="w-3.5 h-3.5 text-sunset-400" /> Est. Cost: $2,420 (Under ${budget} Budget)
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-teal-300" /> {travelers} Travelers
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGeneratedResult(false)}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold backdrop-blur-md border border-white/20 transition-all"
                >
                  Adjust Parameters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSuccess(true);
                    setTimeout(() => setSavedSuccess(false), 3000);
                  }}
                  className="px-5 py-2.5 bg-sunset-500 hover:bg-sunset-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sunset-500/25 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save to My Trips
                </button>
              </div>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-4 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-2xl text-xs font-bold text-teal-800 dark:text-teal-200 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-teal-500" /> Saved! This itinerary blueprint has been added to your My Trips repository.
            </div>
          )}

          {/* Timeline & Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Day by Day schedule (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-500" /> Day-by-Day AI Plan
              </h3>

              {[
                {
                  day: 'Day 1 — Tokyo Arrival & Neon Shinjuku',
                  stay: 'Hotel Gracery Shinjuku (Godzilla Head)',
                  cost: '$180',
                  items: [
                    { time: '14:00', title: 'Check-in & settle in Shinjuku', type: 'Check-in' },
                    { time: '17:30', title: 'Omoide Yokocho Yakitori Alley Food Crawl', type: 'Food', price: '$28' },
                    { time: '20:00', title: 'Tokyo Metropolitan Govt Observatory Sunset', type: 'Sightseeing', price: 'Free' },
                  ],
                },
                {
                  day: 'Day 2 — Historic Asakusa & Akihabara',
                  stay: 'Hotel Gracery Shinjuku',
                  cost: '$140',
                  items: [
                    { time: '09:00', title: 'Senso-ji Temple & Nakamise Dori Street Snacks', type: 'Sightseeing', price: '$12' },
                    { time: '13:00', title: 'Sumida River Cruise to Hamarikyu Gardens', type: 'Adventure', price: '$18' },
                    { time: '16:30', title: 'Retro Gaming & Anime Discovery in Akihabara', type: 'Culture', price: '$20' },
                  ],
                },
                {
                  day: 'Day 3 — Shinkansen to Kyoto & Bamboo Grove',
                  stay: 'Kyoto Machiya Boutique Ryokan',
                  cost: '$260',
                  items: [
                    { time: '08:30', title: 'Nozomi Bullet Train: Tokyo to Kyoto (2h 15m)', type: 'Transit', price: '$95' },
                    { time: '14:00', title: 'Arashiyama Bamboo Forest & Monkey Park', type: 'Nature', price: '$15' },
                    { time: '19:00', title: 'Traditional Kaiseki Multi-Course Dinner in Gion', type: 'Food', price: '$65' },
                  ],
                },
                {
                  day: 'Day 4 — Golden Pavilion & Fushimi Inari Torii Gates',
                  stay: 'Kyoto Machiya Boutique Ryokan',
                  cost: '$110',
                  items: [
                    { time: '07:30', title: 'Early Morning Hike through 10,000 Torii Gates', type: 'Sightseeing', price: 'Free' },
                    { time: '11:30', title: 'Kinkaku-ji (The Golden Pavilion) Gardens', type: 'Culture', price: '$8' },
                    { time: '15:00', title: 'Matcha Tea Ceremony Masterclass in Uji', type: 'Experience', price: '$40' },
                  ],
                },
              ].map((d, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-card-dark rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <span className="text-xs font-black text-navy-900 dark:text-white">{d.day}</span>
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">{d.cost} est.</span>
                  </div>
                  <div className="space-y-2">
                    {d.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-400 w-10">{it.time}</span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{it.title}</span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400">{it.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights & Budget Breakdown (1 col) */}
            <div className="space-y-6">
              {/* Cost Category breakdown */}
              <div className="bg-white dark:bg-card-dark rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Estimated Budget Split
                </h3>
                <div className="space-y-2.5 text-xs">
                  {[
                    { label: 'Hotels & Ryokans (7 nights)', amount: '$1,120', pct: '46%' },
                    { label: 'Food & Culinary Tastings', amount: '$620', pct: '26%' },
                    { label: 'Bullet Train & City Transit', amount: '$420', pct: '17%' },
                    { label: 'Sightseeing & Activities', amount: '$260', pct: '11%' },
                  ].map((c, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-slate-700 dark:text-slate-300">
                        <span>{c.label}</span>
                        <span className="font-bold">{c.amount}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-500 h-full rounded-full"
                          style={{ width: c.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Smart Tips */}
              <div className="bg-sunset-50 dark:bg-sunset-950/40 rounded-2xl p-5 border border-sunset-200 dark:border-sunset-800 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sunset-700 dark:text-sunset-300">
                  <Sparkles className="w-4 h-4" /> AI Route Optimization
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  We clustered activities geographically by neighborhood (Shinjuku/Shibuya in West Tokyo, Asakusa in East Tokyo) saving you 3.5 hours of transit time across your 8 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
