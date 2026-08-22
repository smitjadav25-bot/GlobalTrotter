'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Compass,
  Check,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Clock,
  CloudSun,
  Star,
  Hotel,
  Utensils,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';
import { trotStore } from '@/lib/store';
import { UserTrip, TripDay } from '@/lib/types';

const TRAVEL_STYLES = [
  { id: 'luxury', name: 'Luxury & Comfort', icon: '💎', desc: '5-star resorts, private transfers, Michelin dining' },
  { id: 'adventure', name: 'Adventure & Thrill', icon: '🧗', desc: 'Volcano treks, paragliding, scuba diving' },
  { id: 'couple', name: 'Romantic / Couple', icon: '❤️', desc: 'Sunset cruises, private dinners, scenic villas' },
  { id: 'foodie', name: 'Culinary & Street Food', icon: '🍜', desc: 'Cooking masterclasses, night food markets' },
  { id: 'family', name: 'Family Friendly', icon: '👨‍👩‍👧‍👦', desc: 'Relaxed pacing, kid-friendly parks, private suites' },
  { id: 'backpacker', name: 'Backpacker & Cultural', icon: '🎒', desc: 'Eco homestays, public transit, hidden trails' },
  { id: 'nature', name: 'Nature & Wildlife', icon: '🌿', desc: 'National parks, botanical gardens, wildlife safaris' },
  { id: 'culture', name: 'Heritage & Art', icon: '🏛️', desc: 'Ancient temples, museums, local crafts' }
];

const INTEREST_OPTIONS = [
  'Local Street Food',
  'Scenic Photography Spots',
  'Historic Temples & Palaces',
  'Mountain & Jungle Treks',
  'Hidden Secret Waterfalls',
  'Art & Digital Museums',
  'Sunset Viewpoints & Rooftops',
  'Ayurvedic Spas & Wellness',
  'Water Sports & Diving',
  'Local Nightlife & Speakeasies',
  'Artisan Craft Workshops',
  'Wildlife & Bird Watching'
];

function AIPlannerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('Bali');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [durationDays, setDurationDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [travelerType, setTravelerType] = useState('Couple');
  const [budgetTier, setBudgetTier] = useState<'Budget' | 'Moderate' | 'Luxury'>('Moderate');
  const [customBudget, setCustomBudget] = useState(2400);
  const [selectedStyle, setSelectedStyle] = useState('luxury');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Local Street Food',
    'Scenic Photography Spots',
    'Historic Temples & Palaces',
    'Hidden Secret Waterfalls'
  ]);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedTrip, setGeneratedTrip] = useState<UserTrip | null>(null);

  useEffect(() => {
    const destParam = searchParams.get('destination') || searchParams.get('q');
    if (destParam) {
      const match = SAMPLE_DESTINATIONS.find((d) => d.name.toLowerCase().includes(destParam.toLowerCase()));
      if (match) setDestination(match.name);
    }
  }, [searchParams]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep(1);

    const stepsTimeline = [
      'Analyzing destination climate & optimal seasonal routes...',
      'Matching boutique stays & verified local guides...',
      'Curating day-wise schedule with weather contingency buffers...',
      'Optimizing travel budget and computing cost breakdowns...'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setGenerationStep(current);
      if (current >= stepsTimeline.length) {
        clearInterval(interval);

        // Build generated trip
        const matchedDest = SAMPLE_DESTINATIONS.find((d) => d.name.toLowerCase() === destination.toLowerCase()) || SAMPLE_DESTINATIONS[0];
        
        const days: TripDay[] = Array.from({ length: durationDays }).map((_, idx) => {
          const dNum = idx + 1;
          const isRainy = idx === 2; // Simulated rain on day 3

          return {
            dayNumber: dNum,
            date: `2026-10-${15 + idx}`,
            title: `Day ${dNum}: ${dNum === 1 ? 'Arrival & Heritage Exploration' : dNum === 2 ? 'Highland Sunrise & Nature Discovery' : dNum === 3 ? 'Cultural Art & Culinary Immersion' : 'Coastal Relaxation & Secret Spots'}`,
            weather: {
              temp: matchedDest.weather.temp - (idx % 2),
              condition: isRainy ? 'Rain' : 'Sunny',
              rainAlert: isRainy,
              indoorAlternative: isRainy ? 'Artisanal Cooking Academy & Museum Gallery' : undefined
            },
            slots: [
              {
                id: `gen-${dNum}-1`,
                period: 'Morning',
                time: '09:00 AM',
                activityName: matchedDest.placesToVisit[idx % matchedDest.placesToVisit.length]?.name || 'Scenic Sightseeing Walk',
                category: 'Culture',
                durationMinutes: 120,
                travelTimeToNext: '15 min drive',
                cost: matchedDest.placesToVisit[idx % matchedDest.placesToVisit.length]?.ticketPrice || 10,
                imageUrl: matchedDest.placesToVisit[idx % matchedDest.placesToVisit.length]?.imageUrl || matchedDest.heroImage,
                foodSuggestion: 'Fresh tropical breakfast & artisan local brew',
                nearbyAttractions: ['Heritage Courtyard', 'Local Market'],
                coordinates: matchedDest.coordinates
              },
              {
                id: `gen-${dNum}-2`,
                period: 'Afternoon',
                time: '02:00 PM',
                activityName: matchedDest.activities[idx % matchedDest.activities.length]?.name || 'Guided Nature Tour',
                category: 'Adventure',
                durationMinutes: 150,
                travelTimeToNext: '25 min transfer',
                cost: matchedDest.activities[idx % matchedDest.activities.length]?.cost || 45,
                imageUrl: matchedDest.activities[idx % matchedDest.activities.length]?.imageUrl || matchedDest.heroImage,
                foodSuggestion: matchedDest.food[idx % matchedDest.food.length]?.name || 'Authentic Regional Delicacy',
                nearbyAttractions: ['Panoramic Lookout', 'Tea Pavilion'],
                coordinates: matchedDest.coordinates
              },
              {
                id: `gen-${dNum}-3`,
                period: 'Evening',
                time: '06:30 PM',
                activityName: `${destination} Golden Hour Sunset & Starlit Dinner`,
                category: 'Relaxation',
                durationMinutes: 120,
                travelTimeToNext: 'Back to stay',
                cost: 30,
                imageUrl: matchedDest.gallery[0] || matchedDest.heroImage,
                foodSuggestion: `Chef table tasting at ${matchedDest.food[0]?.restaurant || 'Seaside Bistro'}`,
                nearbyAttractions: ['Sunset Deck'],
                coordinates: matchedDest.coordinates
              }
            ]
          };
        });

        const newTrip: UserTrip = {
          id: `trip-ai-${Date.now()}`,
          name: `${destination} AI Odyssey: ${TRAVEL_STYLES.find((s) => s.id === selectedStyle)?.name || 'Custom Expedition'}`,
          destinationId: matchedDest.id,
          destinationName: destination,
          country: matchedDest.country,
          coverImage: matchedDest.heroImage,
          startDate,
          endDate: `2026-10-${15 + durationDays}`,
          status: 'upcoming',
          travelers,
          travelStyle: TRAVEL_STYLES.find((s) => s.id === selectedStyle)?.name || 'Custom',
          totalBudget: customBudget,
          spentBudget: Math.round(customBudget * 0.72),
          tripScore: 98,
          preferenceMatch: 97,
          cities: [destination],
          packingProgress: 0,
          days
        };

        trotStore.addTrip(newTrip);
        setGeneratedTrip(newTrip);
        setIsGenerating(false);
        setStep(8); // Generated result step
      }
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Wizard Step Progress Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunset-50 text-sunset-700 text-xs font-bold border border-sunset-200">
          <Sparkles className="w-3.5 h-3.5" /> AI Trip Architect
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
          {step <= 7 ? 'Design Your Dream Itinerary in 6 Steps' : 'Your Personalized AI Journey is Ready!'}
        </h1>
        {step <= 7 && (
          <p className="text-xs sm:text-sm text-slate-500">
            Step {step} of 7 — {step === 1 ? 'Choose Destination' : step === 2 ? 'Select Dates' : step === 3 ? 'Travelers' : step === 4 ? 'Budget & Currency' : step === 5 ? 'Travel Style' : step === 6 ? 'Interests & Pace' : 'Generate'}
          </p>
        )}
      </div>

      {/* Progress Bar */}
      {step <= 7 && (
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-500 to-sunset-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      )}

      {/* STEP 1: DESTINATION */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-extrabold text-navy-900">Where would you like to travel?</h2>
            <p className="text-xs text-slate-500 mt-1">Select from our 12 curated global destinations or choose below.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SAMPLE_DESTINATIONS.map((dest) => {
              const isSelected = destination.toLowerCase() === dest.name.toLowerCase();

              return (
                <button
                  key={dest.id}
                  onClick={() => setDestination(dest.name)}
                  className={`rounded-2xl p-3 text-left border transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/20 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-24 rounded-xl object-cover mb-2 group-hover:scale-105 transition-transform"
                  />
                  <div className="font-bold text-xs text-navy-900 flex items-center justify-between">
                    <span>{dest.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                  </div>
                  <div className="text-[10px] text-slate-500">{dest.country}</div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DATES & DURATION */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-extrabold text-navy-900">When are you traveling and for how long?</h2>
            <p className="text-xs text-slate-500 mt-1">Globe AI uses live historical weather forecasts to adapt daily schedules.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Trip Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Trip Duration</label>
                <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {durationDays} Days
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>3 Days</span>
                <span>7 Days</span>
                <span>10 Days</span>
                <span>14 Days</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TRAVELERS */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-extrabold text-navy-900">Who is coming along?</h2>
            <p className="text-xs text-slate-500 mt-1">We tailor suite sizes, pacing, and group transfers accordingly.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { type: 'Solo', count: 1, icon: '🚶' },
              { type: 'Couple', count: 2, icon: '👩‍❤️‍👨' },
              { type: 'Family', count: 4, icon: '👨‍👩‍👧‍👦' },
              { type: 'Friends Group', count: 5, icon: '🎉' }
            ].map((t) => (
              <button
                key={t.type}
                onClick={() => {
                  setTravelerType(t.type);
                  setTravelers(t.count);
                }}
                className={`p-5 rounded-3xl border text-center space-y-2 transition-all ${
                  travelerType === t.type
                    ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/30 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-3xl">{t.icon}</div>
                <div className="font-extrabold text-xs text-navy-900">{t.type}</div>
                <div className="text-[10px] text-slate-400">{t.count} {t.count === 1 ? 'Traveler' : 'Travelers'}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: BUDGET */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-extrabold text-navy-900">What is your total target budget?</h2>
            <p className="text-xs text-slate-500 mt-1">Our AI budget optimizer will dynamically distribute funds across stays, food, and activities.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'Budget', label: 'Backpacker / Budget', range: '$800 – $1,500', icon: '🌱' },
              { id: 'Moderate', label: 'Balanced / Comfort', range: '$1,800 – $3,200', icon: '⚖️' },
              { id: 'Luxury', label: 'Luxury & Palace', range: '$4,000 – $8,000+', icon: '👑' }
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setBudgetTier(b.id as any);
                  if (b.id === 'Budget') setCustomBudget(1200);
                  if (b.id === 'Moderate') setCustomBudget(2400);
                  if (b.id === 'Luxury') setCustomBudget(5000);
                }}
                className={`p-5 rounded-3xl border text-left space-y-2 transition-all ${
                  budgetTier === b.id
                    ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/30 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-2xl">{b.icon}</div>
                <div className="font-extrabold text-xs text-navy-900">{b.label}</div>
                <div className="text-[11px] text-teal-700 font-bold">{b.range}</div>
              </button>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700 block mb-2">Custom Total Budget ($ USD)</label>
            <input
              type="number"
              value={customBudget}
              onChange={(e) => setCustomBudget(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-extrabold text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: TRAVEL STYLE */}
      {step === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-extrabold text-navy-900">Select your travel vibe & style</h2>
            <p className="text-xs text-slate-500 mt-1">This guides our recommendation engine on stays and daily tempo.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-2xl border text-left space-y-1.5 transition-all ${
                  selectedStyle === style.id
                    ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/30 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-2xl">{style.icon}</div>
                <div className="font-extrabold text-xs text-navy-900">{style.name}</div>
                <p className="text-[10px] text-slate-500 leading-snug">{style.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(6)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: INTERESTS */}
      {step === 6 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-extrabold text-navy-900">What experiences excite you most?</h2>
            <p className="text-xs text-slate-500 mt-1">Select all checkboxes that apply for customized slot distribution.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INTEREST_OPTIONS.map((interest) => {
              const isChecked = selectedInterests.includes(interest);

              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                    isChecked
                      ? 'border-teal-500 bg-teal-50/40 text-teal-900 shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{interest}</span>
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      isChecked ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(5)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-navy-900 hover:from-teal-500 hover:to-navy-800 text-white font-extrabold text-sm shadow-xl shadow-teal-600/20 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 text-sunset-400 animate-spin-slow" />
              Generate AI Trip
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: LIVE GENERATION ANIMATION */}
      {isGenerating && (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-6 shadow-soft-xl animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-navy-900 via-teal-700 to-sunset-500 text-white flex items-center justify-center mx-auto text-3xl shadow-xl shadow-teal-500/30 animate-bounce">
            🤖
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-navy-900">Crafting Your AI Itinerary for {destination}...</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Synthesizing travel preferences, flight routes, weather safety, and local secret spots.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-2.5 text-left text-xs text-slate-600">
            {[
              'Analyzing destination climate & optimal seasonal routes...',
              'Matching boutique stays & verified local guides...',
              'Curating day-wise schedule with weather contingency buffers...',
              'Optimizing travel budget and computing cost breakdowns...'
            ].map((st, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {generationStep > i ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                ) : generationStep === i + 1 ? (
                  <div className="w-5 h-5 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-100" />
                )}
                <span className={generationStep > i ? 'text-navy-900 font-semibold' : 'text-slate-400'}>
                  {st}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 8: GENERATED TRIP PREVIEW */}
      {step === 8 && generatedTrip && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Trip Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-lg space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Generated Trip Summary
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">{generatedTrip.name}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {destination}, {generatedTrip.country} • {generatedTrip.startDate} to {generatedTrip.endDate} • {travelers} Travelers
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/trips/${generatedTrip.id}/builder`}
                  className="px-5 py-2.5 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5"
                >
                  Open Drag & Drop Builder <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Score & Metric Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">Preference Match</div>
                <div className="text-xl font-black text-teal-700 mt-0.5">{generatedTrip.preferenceMatch}%</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">Trip AI Score</div>
                <div className="text-xl font-black text-navy-900 mt-0.5">{generatedTrip.tripScore}/100</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">Estimated Budget</div>
                <div className="text-xl font-black text-sunset-600 mt-0.5">${generatedTrip.totalBudget}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">Weather Outlook</div>
                <div className="text-xl font-black text-slate-800 mt-0.5">29°C Sunny</div>
              </div>
            </div>
          </div>

          {/* Day-Wise Timeline */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-navy-900">Day-by-Day AI Schedule</h3>
              <span className="text-xs text-slate-500">{generatedTrip.days.length} Days Generated</span>
            </div>

            <div className="space-y-6">
              {generatedTrip.days.map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <h4 className="font-extrabold text-base text-navy-900">{day.title}</h4>
                      <div className="text-[11px] text-slate-400">{day.date}</div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {day.weather.rainAlert && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                          🌧 Rain Contingency Active
                        </span>
                      )}
                      <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {day.weather.temp}°C {day.weather.condition}
                      </span>
                    </div>
                  </div>

                  {/* Day Slots */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="rounded-2xl p-4 bg-slate-50/70 border border-slate-100 space-y-2 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                            <span>{slot.period} ({slot.time})</span>
                            <span className="text-teal-700">{slot.category}</span>
                          </div>
                          <h5 className="font-bold text-xs text-navy-900 mt-1 line-clamp-1">{slot.activityName}</h5>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">🍽 {slot.foodSuggestion}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">⏳ {slot.durationMinutes} mins</span>
                          <span className="font-bold text-navy-900">${slot.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-6 rounded-3xl bg-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="font-extrabold text-base">Ready to customize or book this journey?</div>
              <div className="text-xs text-slate-300">All activities, stays, and budget charts are saved to your account.</div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/trips"
                className="px-5 py-2.5 bg-white text-navy-900 rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                Go to My Trips
              </Link>
              <Link
                href="/budget"
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-navy-900 rounded-xl font-extrabold text-xs transition-colors"
              >
                View Budget Analysis →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AIPlannerPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs font-semibold text-slate-400">Loading AI Trip Planner...</div>}>
      <AIPlannerContent />
    </Suspense>
  );
}
