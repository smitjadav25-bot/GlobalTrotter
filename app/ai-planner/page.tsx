'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Compass,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Clock,
  Building2,
  Utensils,
  Camera,
  HeartHandshake,
} from 'lucide-react';
import Link from 'next/link';

interface AiPlanResult {
  title: string;
  summary: string;
  estimatedBudget: number;
  currency: string;
  days: {
    day: number;
    title: string;
    city: string;
    highlights: string[];
    stays: string;
    foodRecommendation: string;
  }[];
}

const POPULAR_DESTINATIONS = [
  'Tokyo & Kyoto, Japan',
  'Paris & French Riviera, France',
  'Rome, Florence & Venice, Italy',
  'Bali & Lombok, Indonesia',
  'Barcelona & Madrid, Spain',
  'Zurich & Interlaken, Switzerland',
];

const TRAVEL_STYLES = [
  { id: 'balanced', label: 'Balanced Explorer', desc: 'Mix of iconic landmarks and local relaxation' },
  { id: 'foodie', label: 'Culinary Journey', desc: 'Street food, markets, and regional masterclasses' },
  { id: 'culture', label: 'Art & Heritage', desc: 'Museums, ancient temples, and historic quarters' },
  { id: 'budget', label: 'Smart Backpacker', desc: 'Cost-effective stays, walking tours, transit' },
];

const INTEREST_TAGS = [
  'Historic Shrines',
  'Night Markets',
  'Scenic Rail',
  'Art Galleries',
  'Mountain Hikes',
  'Café Crawls',
  'Architecture',
  'Hot Springs / Onsens',
];

export default function AiPlannerPage() {
  const router = useRouter();

  // Wizard Form State
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [durationDays, setDurationDays] = useState(7);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [travelersCount, setTravelersCount] = useState(2);
  const [budgetTier, setBudgetTier] = useState('moderate');
  const [selectedStyle, setSelectedStyle] = useState('balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Historic Shrines',
    'Night Markets',
  ]);

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [planResult, setPlanResult] = useState<AiPlanResult | null>(null);

  const toggleInterest = (tag: string) => {
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGeneratePlan = async () => {
    setGenerating(true);
    // Simulate AI synthesis
    setTimeout(() => {
      const isJapan = destination.toLowerCase().includes('japan') || destination.toLowerCase().includes('tokyo');
      const mockResult: AiPlanResult = {
        title: destination ? `${destination} Discovery Circuit` : 'Grand Multi-City Odyssey',
        summary: `A personalized ${durationDays}-day itinerary optimized for transit efficiency, authentic cuisine, and iconic attractions.`,
        estimatedBudget: durationDays * (budgetTier === 'budget' ? 85 : budgetTier === 'luxury' ? 260 : 145) * travelersCount,
        currency: 'USD',
        days: Array.from({ length: durationDays }).map((_, i) => {
          const dayNum = i + 1;
          if (isJapan) {
            if (dayNum <= 3) {
              return {
                day: dayNum,
                title: `Tokyo Modern Pulse — Part ${dayNum}`,
                city: 'Tokyo',
                highlights: [
                  'Tsukiji Outer Market Culinary Walk',
                  'Shinjuku Gyoen National Garden',
                  'Shibuya Sky Sunset Observation Deck',
                ],
                stays: 'Boutique Ryokan in Asakusa',
                foodRecommendation: 'Artisanal Tonkotsu Ramen & Matcha Crepes',
              };
            } else {
              return {
                day: dayNum,
                title: `Kyoto & Nara Ancient Serenity`,
                city: 'Kyoto',
                highlights: [
                  'Fushimi Inari-taisha 1,000 Torii Gates at dawn',
                  'Arashiyama Bamboo Grove & Tenryu-ji Zen Garden',
                  'Gion historic Geisha district evening stroll',
                ],
                stays: 'Machiya Heritage Townhouse in Gion',
                foodRecommendation: 'Multi-course Kaiseki & Yudofu Hot Pot',
              };
            }
          }
          return {
            day: dayNum,
            title: `City Exploration & Cultural Landmarks — Day ${dayNum}`,
            city: destination.split(',')[0] || 'Primary Destination',
            highlights: [
              'Morning heritage walking tour with local guide',
              'Art & Architecture district exploration',
              'Panoramic sunset terrace dining',
            ],
            stays: 'Centrally Located Design Hotel',
            foodRecommendation: 'Signature Local Specialties & Artisan Bakery',
          };
        }),
      };

      setPlanResult(mockResult);
      setGenerating(false);
      setStep(5);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 opacity-80" /> AI Travel Itinerary Planner
        </h1>
        <p className="text-xs text-muted font-normal mt-1">
          Tell Globe AI where you want to travel, and get a day-by-day itinerary tailored to your style.
        </p>
      </div>

      {/* Progress Steps (1-4) */}
      {step <= 4 && (
        <div className="bg-cream rounded-card p-4 border border-light-cream">
          <div className="flex items-center justify-between text-xs text-muted font-normal">
            <span className={step >= 1 ? 'font-semibold text-charcoal' : ''}>1. Destination</span>
            <span>→</span>
            <span className={step >= 2 ? 'font-semibold text-charcoal' : ''}>2. Dates & Group</span>
            <span>→</span>
            <span className={step >= 3 ? 'font-semibold text-charcoal' : ''}>3. Budget & Style</span>
            <span>→</span>
            <span className={step >= 4 ? 'font-semibold text-charcoal' : ''}>4. Interests</span>
          </div>
        </div>
      )}

      {/* STEP 1: Destination */}
      {step === 1 && (
        <div className="bg-cream rounded-card p-6 sm:p-8 border border-light-cream space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-charcoal">Where would you like to explore?</h2>
            <p className="text-xs text-muted font-normal">
              Enter one or multiple cities, or select from popular circuits below.
            </p>
          </div>

          <div>
            <label className="block text-xs font-normal text-charcoal mb-1">Destination Name</label>
            <input
              type="text"
              placeholder="e.g. Tokyo & Kyoto, Japan or Amalfi Coast, Italy"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-normal text-muted">Or pick a popular circuit:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {POPULAR_DESTINATIONS.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setDestination(dest)}
                  className={`p-3 rounded text-left text-xs font-normal border transition-colors flex items-center justify-between ${
                    destination === dest
                      ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                      : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
                  }`}
                >
                  <span>{dest}</span>
                  {destination === dest && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-light-cream">
            <button
              type="button"
              disabled={!destination.trim()}
              onClick={() => setStep(2)}
              className="px-5 py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 transition-opacity disabled:opacity-50"
            >
              Continue to Dates <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Dates & Group */}
      {step === 2 && (
        <div className="bg-cream rounded-card p-6 sm:p-8 border border-light-cream space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-charcoal">When & with whom are you traveling?</h2>
            <p className="text-xs text-muted font-normal">
              Set trip duration, starting date, and traveler count.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">Starting Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">Total Duration (Days)</label>
              <input
                type="number"
                min="2"
                max="30"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">Number of Travelers</label>
              <input
                type="number"
                min="1"
                max="12"
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-light-cream">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-5 py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80"
            >
              Continue to Budget <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Budget & Style */}
      {step === 3 && (
        <div className="bg-cream rounded-card p-6 sm:p-8 border border-light-cream space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-charcoal">Budget & Travel Style</h2>
            <p className="text-xs text-muted font-normal">Choose pacing and spending expectations.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-normal text-charcoal">Travel Philosophy</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRAVEL_STYLES.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded border cursor-pointer transition-colors ${
                    selectedStyle === style.id
                      ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                      : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
                  }`}
                >
                  <div className="text-xs font-semibold">{style.label}</div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      selectedStyle === style.id ? 'text-slate-300' : 'text-muted'
                    }`}
                  >
                    {style.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-normal text-charcoal">Target Budget Tier</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'budget', label: 'Budget ($)', desc: 'Hostels & local eats' },
                { id: 'moderate', label: 'Moderate ($$)', desc: 'Boutique hotels & mix' },
                { id: 'luxury', label: 'Premium ($$$)', desc: 'High-end dining & stays' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setBudgetTier(tier.id)}
                  className={`p-3 rounded text-center border text-xs transition-colors ${
                    budgetTier === tier.id
                      ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                      : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
                  }`}
                >
                  <div className="font-semibold">{tier.label}</div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      budgetTier === tier.id ? 'text-slate-300' : 'text-muted'
                    }`}
                  >
                    {tier.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-light-cream">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-5 py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80"
            >
              Continue to Interests <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Interests & Generate */}
      {step === 4 && (
        <div className="bg-cream rounded-card p-6 sm:p-8 border border-light-cream space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-charcoal">Specific Interests & Activities</h2>
            <p className="text-xs text-muted font-normal">
              Select key experience tags to include in your personalized route.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map((tag) => {
              const active = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleInterest(tag)}
                  className={`px-3 py-1.5 rounded-pill text-xs font-normal border transition-colors ${
                    active
                      ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                      : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-light-cream">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-2 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Back
            </button>
            <button
              type="button"
              disabled={generating}
              onClick={handleGeneratePlan}
              className="px-6 py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-2 active:opacity-80 disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing Itinerary...
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

      {/* STEP 5: Generated Plan Result */}
      {step === 5 && planResult && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-cream rounded-card p-6 sm:p-8 border border-light-cream space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-normal uppercase tracking-wider text-muted">
                  Custom AI Travel Blueprint
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight mt-0.5">
                  {planResult.title}
                </h2>
                <p className="text-xs text-muted font-normal mt-1">{planResult.summary}</p>
              </div>

              <div className="p-3 rounded bg-charcoal-4 border border-charcoal-40 text-left sm:text-right shrink-0">
                <span className="text-[10px] uppercase text-muted block">Estimated Total Budget</span>
                <span className="text-lg font-semibold text-charcoal">
                  ${planResult.estimatedBudget.toLocaleString()} {planResult.currency}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <Link
                href={`/trips/new?name=${encodeURIComponent(planResult.title)}`}
                className="px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80"
              >
                <Check className="w-3.5 h-3.5" /> Save to My Trips
              </Link>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4"
              >
                Plan Another Trip
              </button>
            </div>
          </div>

          {/* Timeline of Days */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-charcoal">Day-by-Day Timeline</h3>
            <div className="space-y-3">
              {planResult.days.map((d) => (
                <div
                  key={d.day}
                  className="bg-cream rounded-card p-5 border border-light-cream space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-light-cream pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-charcoal text-off-white text-xs font-semibold flex items-center justify-center shadow-inset-btn">
                        {d.day}
                      </span>
                      <h4 className="text-sm font-semibold text-charcoal">{d.title}</h4>
                    </div>
                    <span className="text-xs text-muted font-normal">{d.city}</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-normal text-muted">Key Highlights:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {d.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          className="p-2 rounded bg-charcoal-3 text-xs text-charcoal font-normal flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3 text-muted shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-light-cream text-xs text-muted font-normal">
                    <div>
                      <span className="text-charcoal font-semibold">Suggested Stay:</span> {d.stays}
                    </div>
                    <div>
                      <span className="text-charcoal font-semibold">Culinary Pick:</span> {d.foodRecommendation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
