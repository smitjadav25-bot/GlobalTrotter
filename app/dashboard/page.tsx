'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Sparkles,
  MapPin,
  Star,
  DollarSign,
  ArrowRight,
  Compass,
  Heart,
  Loader2,
  Building2,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { City } from '@/lib/types';

const FALLBACK_CITIES: City[] = [
  {
    id: 'city-tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    costIndex: 1.35,
    popularity: 98,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description: 'A mesmerizing blend of neon skyscrapers, ancient shrines, and world-class culinary mastery.',
  },
  {
    id: 'city-paris',
    name: 'Paris',
    country: 'France',
    region: 'Western Europe',
    costIndex: 1.45,
    popularity: 96,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    description: 'The world capital of art, fashion, gastronomy, and iconic romantic architecture.',
  },
  {
    id: 'city-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    costIndex: 1.2,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'Classical Buddhist temples, zen gardens, imperial palaces, and traditional wooden machiyas.',
  },
  {
    id: 'city-rome',
    name: 'Rome',
    country: 'Italy',
    region: 'Southern Europe',
    costIndex: 1.15,
    popularity: 94,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    description: 'An open-air museum filled with millennia of ancient ruins and vibrant piazza cafes.',
  },
  {
    id: 'city-bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    costIndex: 0.65,
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'An island paradise famous for lush emerald rice terraces, sea temples, and wellness sanctuaries.',
  },
  {
    id: 'city-barcelona',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Southern Europe',
    costIndex: 1.1,
    popularity: 92,
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    description: 'Gaudí’s fantastical modernist architecture, sun-drenched Mediterranean beaches, and tapas.',
  },
];

const TRENDING_ACTIVITIES = [
  {
    id: 'act-1',
    name: 'Tsukiji Outer Market Culinary & Sushi Tour',
    city: 'Tokyo, Japan',
    type: 'Food',
    avgPrice: '$45',
    rating: 4.9,
    reviews: 620,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'act-2',
    name: 'Sunset Catamaran Cruise on the Seine',
    city: 'Paris, France',
    type: 'Sightseeing',
    avgPrice: '$38',
    rating: 4.8,
    reviews: 940,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'act-3',
    name: 'Traditional Matcha Tea Ceremony in Gion',
    city: 'Kyoto, Japan',
    type: 'Culture',
    avgPrice: '$32',
    rating: 4.9,
    reviews: 410,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'act-4',
    name: 'Colosseum & Roman Forum VIP Guided Trek',
    city: 'Rome, Italy',
    type: 'Sightseeing',
    avgPrice: '$55',
    rating: 4.9,
    reviews: 1280,
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section per specification */}
      <div className="relative rounded-card overflow-hidden bg-slate-900 text-white min-h-[420px] flex items-center shadow-xl">
        {/* Large Travel Photography Background */}
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
          alt="World Travel Adventure"
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-300 text-xs font-extrabold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Next-Generation AI Travel Co-Pilot
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              Where will you go next?
            </h1>
            <p className="text-sm sm:text-lg text-slate-200 font-medium max-w-xl leading-relaxed">
              Let AI plan the journey while you enjoy the experience.
            </p>
          </div>

          {/* Large AI Search Input & CTA Button */}
          <form
            onSubmit={handleAiPlanSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-white/20 shadow-2xl"
          >
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Sparkles className="w-4 h-4 text-sunset-500 shrink-0" />
              <input
                type="text"
                placeholder="Tell Globe AI where you want to travel..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full px-3 py-2.5 bg-transparent text-slate-900 dark:text-white text-xs sm:text-sm font-semibold placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sunset-500 to-teal-500 hover:from-sunset-600 hover:to-teal-600 text-white rounded-xl sm:rounded-full text-xs font-black shadow-md shadow-sunset-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ Plan with AI</span>
            </button>
          </form>
        </div>
      </div>

      {/* SECTION 1: Trending Destinations per specification */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-teal-500" /> Trending Destinations
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curated global cities with verified cost indices, cultural sights, and multi-city connectivity.
            </p>
          </div>
          <Link
            href="/cities"
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-1 group"
          >
            Explore all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.slice(0, 6).map((city) => {
            const isSaved = savedCityIds.has(city.id);
            return (
              <div
                key={city.id}
                className="group bg-white dark:bg-card-dark rounded-card overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={city.imageUrl}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-extrabold text-navy-900 dark:text-white shadow-xs">
                      {city.country}
                    </span>
                    {city.region && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-md text-[10px] font-bold text-teal-300">
                        {city.region}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaveCity(city.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-rose-500 transition-colors shadow-xs"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-base font-black tracking-tight">{city.name}</span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      {(4.5 + (city.popularity % 5) * 0.1).toFixed(1)}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {city.description || 'Explore rich heritage, vibrant neighborhoods, and authentic culinary stops.'}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span className="text-sunset-500 font-black">
                        {city.costIndex < 0.8 ? '$$' : city.costIndex < 1.3 ? '$$$' : '$$$$'}
                      </span>
                      <span>• Cost Index {city.costIndex}x</span>
                    </div>

                    <Link
                      href={`/cities?search=${encodeURIComponent(city.name)}`}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 text-navy-900 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
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

      {/* SECTION 2: Trending Activities per specification */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-sunset-500" /> Trending Activities & Experiences
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Top-rated guided masterclasses, culinary crawls, and landmark admissions.
            </p>
          </div>
          <Link
            href="/activities"
            className="text-xs font-bold text-sunset-500 hover:text-sunset-600 flex items-center gap-1 group"
          >
            View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRENDING_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="bg-white dark:bg-card-dark rounded-card overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={act.imageUrl}
                  alt={act.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-bold">
                  {act.type}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-sunset-500 text-white text-[11px] font-extrabold shadow-sm">
                  {act.avgPrice}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400 font-bold mb-1">
                    <MapPin className="w-3 h-3" /> {act.city}
                  </div>
                  <h3 className="text-xs font-bold text-navy-900 dark:text-white line-clamp-2">
                    {act.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{act.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({act.reviews})</span>
                  </div>
                  <Link
                    href="/activities"
                    className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
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
