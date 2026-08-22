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
  'Golden Triangle: Delhi, Agra & Jaipur',
  'Royal Rajasthan: Jaipur & Udaipur',
  'Kerala Backwaters & Kochi Port',
  'Himalayan Odyssey: Manali & Rishikesh',
  'Goa Sun, Heritage & Beach Shacks',
  'Spiritual Kashi: Varanasi & Sarnath',
];

const TRAVEL_STYLES = [
  { id: 'balanced', label: 'Balanced Explorer', desc: 'Mix of iconic landmarks and local relaxation' },
  { id: 'foodie', label: 'Culinary Journey', desc: 'Street food, royal thalis, and tea masterclasses' },
  { id: 'culture', label: 'Heritage & Temples', desc: 'UNESCO monuments, ghats, and royal palaces' },
  { id: 'adventure', label: 'Adventure & Mountains', desc: 'White-water rafting, paragliding, and high treks' },
];

const INTEREST_TAGS = [
  'Mughal Heritage & Forts',
  'Street Food Crawls',
  'Ayurvedic Spas & Yoga',
  'Ganges Ganga Aarti',
  'Himalayan Mountain Treks',
  'Royal Rajput Palaces',
  'Traditional Craft Bazaars',
  'Backwater Houseboats',
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
    'Mughal Heritage & Forts',
    'Street Food Crawls',
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
    // Simulate AI synthesis with India-rich itineraries
    setTimeout(() => {
      const destLower = destination.toLowerCase();
      const isKerala = destLower.includes('kerala') || destLower.includes('kochi');
      const isRajasthan = destLower.includes('rajasthan') || destLower.includes('jaipur') || destLower.includes('udaipur');

      const mockResult: AiPlanResult = {
        title: destination ? `${destination} Journey` : 'Incredible India Heritage Circuit',
        summary: `A personalized ${durationDays}-day India itinerary curated for rich cultural heritage, authentic regional cuisine, and comfortable travel pacing.`,
        estimatedBudget: durationDays * (budgetTier === 'budget' ? 45 : budgetTier === 'luxury' ? 150 : 80) * travelersCount,
        currency: 'USD',
        days: Array.from({ length: durationDays }).map((_, i) => {
          const dayNum = i + 1;
          if (isRajasthan) {
            if (dayNum <= 3) {
              return {
                day: dayNum,
                title: `Jaipur Pink City Majesty — Day ${dayNum}`,
                city: 'Jaipur',
                highlights: [
                  'Amber Fort & Sheesh Mahal Jeep Excursion',
                  'Hawa Mahal & City Palace Heritage Photography',
                  'Chokhi Dhani Royal Rajasthani Thali Dinner',
                ],
                stays: 'Heritage Haveli in Old Jaipur',
                foodRecommendation: 'Authentic Dal Baati Churma & Pyaz Kachori',
              };
            } else {
              return {
                day: dayNum,
                title: `Udaipur City of Lakes Romance — Day ${dayNum}`,
                city: 'Udaipur',
                highlights: [
                  'Lake Pichola Sunset Boat Cruise past Jagmandir',
                  'Udaipur City Palace & Crystal Gallery Walk',
                  'Saheliyon Ki Bari Fountains & Gardens',
                ],
                stays: 'Lakeside Boutique Resort with Pichola View',
                foodRecommendation: 'Laal Maas, Gatte ki Sabzi & Saffron Kheer',
              };
            }
          }

          if (isKerala) {
            return {
              day: dayNum,
              title: `Kerala Backwaters & Coastal Serenity — Day ${dayNum}`,
              city: dayNum <= 3 ? 'Kochi' : 'Alleppey',
              highlights: [
                'Fort Kochi Chinese Fishing Nets & Heritage Walk',
                'Alleppey Houseboat Day Cruise through Palm Canals',
                'Traditional Kerala Ayurvedic Full-Body Herbal Spa',
              ],
              stays: 'Eco Heritage Backwater Villa',
              foodRecommendation: 'Appam with Coconut Stew & Karimeen Fish Fry',
            };
          }

          return {
            day: dayNum,
            title: `India Cultural Discovery — Day ${dayNum}`,
            city: destination.split(',')[0] || 'Delhi',
            highlights: [
              'Morning heritage monument guided exploration',
              'Local artisanal craft market & spice trail',
              'Evening traditional music or Ganga Aarti ceremony',
            ],
            stays: 'Curated Heritage Stay with Garden Courtyard',
            foodRecommendation: 'Hot Tandoori Breads, Rich Mughlai Gravies & Claypot Chai',
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
          Tell Globe AI where in India you want to travel, and get a day-by-day itinerary tailored to your style.
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
            <h2 className="text-base font-semibold text-charcoal">Where in India would you like to explore?</h2>
            <p className="text-xs text-muted font-normal">
              Enter destinations, or select from curated popular Indian circuits below.
            </p>
          </div>

          <div>
            <label className="block text-xs font-normal text-charcoal mb-1">Destination Name</label>
            <input
              type="text"
              placeholder="e.g. Jaipur, Agra, Goa, Kerala, Varanasi, or Manali"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-normal text-muted">Or pick a popular Indian circuit:</label>
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
                { id: 'budget', label: 'Budget ($)', desc: 'Hostels, dhabas & trains' },
                { id: 'moderate', label: 'Moderate ($$)', desc: 'Boutique havelis & flights' },
                { id: 'luxury', label: 'Heritage Luxury ($$$)', desc: 'Royal palace hotels & private drivers' },
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
            <h2 className="text-base font-semibold text-charcoal">Specific Interests & Experiences</h2>
            <p className="text-xs text-muted font-normal">
              Select key experience tags to prioritize in your itinerary.
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
                          className="p-2 rounded bg-charcoal-4 text-xs text-charcoal font-normal flex items-center gap-1.5"
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
