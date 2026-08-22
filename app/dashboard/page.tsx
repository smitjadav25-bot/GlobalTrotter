'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
  Compass,
  Heart,
  Zap,
} from 'lucide-react';
import { City } from '@/lib/types';

const FALLBACK_CITIES: City[] = [
  {
    id: 'city-in-jaipur',
    name: 'Jaipur',
    country: 'India',
    region: 'North India',
    costIndex: 0.95,
    popularity: 98,
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'The iconic Pink City of Rajasthan, famed for majestic forts, Amber Fort, and royal palaces.',
  },
  {
    id: 'city-in-mumbai',
    name: 'Mumbai',
    country: 'India',
    region: 'West India',
    costIndex: 1.30,
    popularity: 97,
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    description: 'The vibrant financial and entertainment capital of India, home to Gateway of India and Marine Drive.',
  },
  {
    id: 'city-in-varanasi',
    name: 'Varanasi',
    country: 'India',
    region: 'North India',
    costIndex: 0.85,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1200&q=80',
    description: 'The spiritual heart of India on the sacred Ganges, famous for the magical evening Ganga Aarti.',
  },
  {
    id: 'city-in-goa',
    name: 'Goa',
    country: 'India',
    region: 'West India',
    costIndex: 1.05,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'Sun-kissed Arabian Sea beaches, Portuguese colonial heritage, and vibrant coastal shacks.',
  },
  {
    id: 'city-in-udaipur',
    name: 'Udaipur',
    country: 'India',
    region: 'West India',
    costIndex: 1.0,
    popularity: 94,
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
    description: 'The enchanting City of Lakes, featuring Lake Pichola, royal palaces, and sunset boat cruises.',
  },
  {
    id: 'city-in-leh-ladakh',
    name: 'Leh-Ladakh',
    country: 'India',
    region: 'Himalayas',
    costIndex: 1.25,
    popularity: 94,
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    description: 'High-altitude desert wonderland featuring turquoise Pangong Tso and ancient Tibetan monasteries.',
  },
];

const TRENDING_ACTIVITIES = [
  {
    id: 'act-1',
    name: 'Sunrise Boat Cruise & Ganga Aarti',
    city: 'Varanasi, India',
    type: 'Culture',
    avgPrice: '₹1,200',
    rating: 4.9,
    reviews: 840,
    imageUrl: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'act-2',
    name: 'Amber Fort Guided Heritage & Elephant Valley Trek',
    city: 'Jaipur, India',
    type: 'Sightseeing',
    avgPrice: '₹1,500',
    rating: 4.9,
    reviews: 940,
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'act-3',
    name: 'Alleppey Houseboat Backwater Cruise with Keralan Lunch',
    city: 'Kochi, India',
    type: 'Relaxation',
    avgPrice: '₹3,200',
    rating: 4.9,
    reviews: 620,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'act-4',
    name: 'Taj Mahal Sunrise VIP Guided Experience',
    city: 'Agra, India',
    type: 'Sightseeing',
    avgPrice: '₹1,800',
    rating: 5.0,
    reviews: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cities, setCities] = useState<City[]>(FALLBACK_CITIES);
  const [loading, setLoading] = useState(true);
  const [aiPrompt, setAiPrompt] = useState('');
  const [savedCityIds, setSavedCityIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [citiesRes, savedRes] = await Promise.all([
          fetch('/api/cities?limit=6'),
          fetch('/api/profile/saved'),
        ]);

        const citiesData = await citiesRes.json();
        const savedData = await savedRes.json();

        if (citiesData.cities && citiesData.cities.length > 0) {
          setCities(citiesData.cities);
        }
        if (savedData.saved) {
          setSavedCityIds(new Set(savedData.saved.map((s: any) => s.cityId)));
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAiPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/ai-planner');
  };

  const toggleSaveCity = async (cityId: string) => {
    try {
      const isSaved = savedCityIds.has(cityId);
      const res = await fetch('/api/profile/saved', {
        method: isSaved ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId }),
      });
      if (res.ok) {
        setSavedCityIds((prev) => {
          const next = new Set(prev);
          if (isSaved) next.delete(cityId);
          else next.add(cityId);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Dashboard Hero: Cream background, display typography with negative tracking, atmospheric wash */}
      <div className="relative rounded-card p-8 sm:p-14 lg:p-16 border border-light-cream overflow-hidden bg-gradient-to-b from-charcoal-3 to-transparent">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold text-charcoal tracking-[-1.5px] leading-[1.08]">
              Where will you go next?
            </h1>
            <p className="text-base sm:text-lg text-muted font-normal leading-relaxed">
              Let AI plan the journey while you enjoy the experience.
            </p>
          </div>

          {/* AI Search & Dual Action Buttons */}
          <form onSubmit={handleAiPlanSubmit} className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                placeholder="Tell Globe AI where you want to travel..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-cream text-charcoal border border-light-cream rounded text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-sm font-normal active:opacity-80 focus:shadow-focus-soft transition-opacity flex items-center justify-center gap-2 shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Plan with AI</span>
              </button>
              <Link
                href="/trips/new"
                className="px-4 py-2.5 bg-transparent text-charcoal border border-charcoal-40 rounded text-sm font-normal active:opacity-80 transition-opacity flex items-center justify-center gap-1.5 shrink-0 hover:bg-charcoal-4"
              >
                <span>Plan New Trip</span>
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* SECTION 1: Trending Destinations */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2">
              <Compass className="w-5 h-5 opacity-80" /> Trending Destinations
            </h2>
            <p className="text-xs text-muted font-normal mt-1">
              Curated global cities with verified cost indices, cultural sights, and multi-city connectivity.
            </p>
          </div>
          <Link
            href="/cities"
            className="text-xs font-normal text-charcoal hover:underline flex items-center gap-1 group"
          >
            Explore all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.slice(0, 6).map((city) => {
            const isSaved = savedCityIds.has(city.id);
            return (
              <div
                key={city.id}
                className="group bg-cream rounded-card overflow-hidden border border-light-cream flex flex-col transition-colors"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream border-b border-light-cream">
                  <img
                    src={city.imageUrl}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSaveCity(city.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-pill bg-cream border border-light-cream text-charcoal shadow-inset-btn opacity-80 active:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-charcoal text-charcoal' : ''}`} />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-charcoal tracking-tight">{city.name}</h3>
                      <span className="text-xs font-normal text-muted">{city.country}</span>
                    </div>
                    <p className="text-xs text-muted font-normal line-clamp-2 leading-relaxed">
                      {city.description || 'Explore rich heritage, vibrant neighborhoods, and authentic culinary stops.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-light-cream flex items-center justify-between text-xs font-normal text-muted">
                    <span>Cost Index {city.costIndex}x</span>
                    <Link
                      href={`/cities?search=${encodeURIComponent(city.name)}`}
                      className="px-3 py-1.5 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4 transition-colors"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Trending Activities */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2">
              <Zap className="w-5 h-5 opacity-80" /> Trending Activities & Experiences
            </h2>
            <p className="text-xs text-muted font-normal mt-1">
              Top-rated guided tours, culinary crawls, and landmark admissions.
            </p>
          </div>
          <Link
            href="/activities"
            className="text-xs font-normal text-charcoal hover:underline flex items-center gap-1 group"
          >
            View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRENDING_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="bg-cream rounded-card overflow-hidden border border-light-cream flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream border-b border-light-cream">
                <img
                  src={act.imageUrl}
                  alt={act.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-cream border border-light-cream text-[10px] font-normal text-charcoal">
                  {act.type}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-charcoal text-off-white text-[11px] font-normal shadow-inset-btn">
                  {act.avgPrice}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-muted font-normal">
                    <MapPin className="w-3 h-3 opacity-70" /> {act.city}
                  </div>
                  <h3 className="text-xs font-semibold text-charcoal line-clamp-2 leading-snug">
                    {act.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-light-cream flex items-center justify-between text-xs text-muted font-normal">
                  <div className="flex items-center gap-1 text-charcoal">
                    <Star className="w-3 h-3 fill-charcoal text-charcoal" />
                    <span>{act.rating}</span>
                  </div>
                  <Link
                    href="/activities"
                    className="text-charcoal underline font-normal hover:text-muted"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
