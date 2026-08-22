'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  MapPin,
  Star,
  CloudSun,
  Calendar,
  Sparkles,
  Heart,
  Share2,
  Clock,
  DollarSign,
  Plus,
  Check,
  ArrowRight,
  ShieldCheck,
  Hotel,
  Compass,
  Plane,
  Train,
  Bus,
  Car,
  Bike,
  Utensils,
  Eye,
  UserCheck,
  Mail,
  ChevronRight,
  Info
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';
import { Destination, StayItem, DestinationActivity, PlaceToVisit } from '@/lib/types';

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const destId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const destination = SAMPLE_DESTINATIONS.find(
    (d) => d.id.toLowerCase() === (destId?.toLowerCase() || 'bali')
  ) || SAMPLE_DESTINATIONS[0];

  const [activeStayTab, setActiveStayTab] = useState<'All' | 'Hotels' | 'Villas' | 'Homestays' | 'Resorts' | 'Cruises'>('All');
  const [activeTransportTab, setActiveTransportTab] = useState<'Flights' | 'Trains' | 'Buses' | 'Cabs' | 'Self Drive' | 'Bike Rental'>('Flights');
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [bookedItem, setBookedItem] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToTrip = (itemId: string, itemName: string) => {
    if (addedItems.includes(itemId)) {
      setAddedItems(addedItems.filter((id) => id !== itemId));
      showToast(`Removed "${itemName}" from current trip`);
    } else {
      setAddedItems([...addedItems, itemId]);
      showToast(`Added "${itemName}" to trip itinerary!`);
    }
  };

  // Filter Stays by Tab
  const displayedStays = activeStayTab === 'All'
    ? destination.stays
    : destination.stays.filter((s) => s.type.toLowerCase() === activeStayTab.toLowerCase());

  // Filter Transportation by Tab
  const displayedTransport = destination.transportation.filter(
    (t) => t.type.toLowerCase() === activeTransportTab.toLowerCase()
  );

  return (
    <div className="space-y-14 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Booking Modal Confirmation */}
      {bookedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto text-2xl">
              🎉
            </div>
            <h3 className="text-lg font-extrabold text-navy-900">Booking Confirmed!</h3>
            <p className="text-xs text-slate-500">
              Your reservation for <strong>{bookedItem}</strong> in {destination.name} is confirmed with instant confirmation voucher saved to your profile.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setBookedItem(null)}
                className="flex-1 py-2.5 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-colors"
              >
                Done
              </button>
              <Link
                href="/trips"
                onClick={() => setBookedItem(null)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors text-center"
              >
                View in My Trips
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 1. HERO BANNER */}
      <section className="relative h-[480px] sm:h-[540px] w-full overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-black/30" />

        {/* Top Breadcrumbs & Back */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between text-white text-xs font-medium z-10">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <Link href="/explore" className="hover:underline text-slate-300">
              Explore
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-bold text-white">{destination.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/planner?destination=${encodeURIComponent(destination.name)}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-teal-500 hover:bg-teal-400 text-navy-900 font-extrabold text-xs shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" /> Plan AI Itinerary
            </Link>
          </div>
        </div>

        {/* Bottom Hero Content */}
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-5xl text-white space-y-4 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-500/20 backdrop-blur-md border border-teal-400/40 text-teal-300 text-xs font-bold px-3 py-1 rounded-full">
              {destination.climate} Region
            </span>
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {destination.rating} ({destination.reviewCount} reviews)
            </span>
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-300" />
              {destination.weather.temp}°C {destination.weather.condition}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {destination.name}, <span className="text-teal-300">{destination.country}</span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-3xl leading-relaxed">
            {destination.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl text-xs">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-slate-300 text-[10px] uppercase font-semibold">Best Time to Visit</div>
              <div className="font-extrabold text-white mt-0.5">{destination.bestTimeToVisit}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-slate-300 text-[10px] uppercase font-semibold">Ideal Trip Length</div>
              <div className="font-extrabold text-white mt-0.5">{destination.idealDurationDays}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-slate-300 text-[10px] uppercase font-semibold">Currency & Lang</div>
              <div className="font-extrabold text-white mt-0.5">{destination.currency} • {destination.language.split(',')[0]}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-slate-300 text-[10px] uppercase font-semibold">Cost Index</div>
              <div className="font-extrabold text-teal-300 mt-0.5">{destination.costIndex}x Global Avg</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 2. PLACES TO VISIT */}
        <section id="places" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-teal-700">Must-See Landmarks</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Places to Visit in {destination.name}
              </h2>
            </div>
            <Link
              href="/map"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 px-3.5 py-2 rounded-xl border border-teal-200 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" /> View on Map
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.placesToVisit.map((place) => {
              const isAdded = addedItems.includes(place.id);

              return (
                <div
                  key={place.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {place.rating} ({place.reviews})
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow-xs">
                      {place.ticketPrice === 0 ? 'Free Entry' : `$${place.ticketPrice} Ticket`}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        {place.category}
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-navy-900 mt-2 group-hover:text-teal-700 transition-colors">
                        {place.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {place.description}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {place.openingHours}
                        </span>
                        <span>⏳ {place.estimatedDuration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/map?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}`}
                        className="text-xs font-bold text-slate-600 hover:text-navy-900 flex items-center gap-1"
                      >
                        Map Pin →
                      </Link>

                      <button
                        onClick={() => handleAddToTrip(place.id, place.name)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isAdded
                            ? 'bg-teal-600 text-white'
                            : 'bg-navy-900 hover:bg-teal-700 text-white shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added to Trip
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Add to Trip
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. POPULAR STAYS (Categorized / Tabbed) */}
        <section id="stays" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-sunset-600">Curated Accommodations</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Popular Stays & Boutique Resorts
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified luxury villas, heritage homestays, wellness resorts, and boutique hotels with AI match scoring.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(['All', 'Hotels', 'Villas', 'Homestays', 'Resorts', 'Cruises'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStayTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    activeStayTab === tab
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedStays.map((stay) => {
              const isAdded = addedItems.includes(stay.id);

              return (
                <div
                  key={stay.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={stay.imageUrl}
                      alt={stay.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-teal-700/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow-xs">
                      ✨ {stay.aiScore}% AI Match
                    </div>
                    {stay.badge && (
                      <div className="absolute top-3 right-3 bg-sunset-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        {stay.badge}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {stay.distanceFromCenter}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {stay.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {stay.rating} ({stay.reviews})
                        </div>
                      </div>

                      <h3 className="font-extrabold text-base text-navy-900 mt-1 group-hover:text-teal-700 transition-colors">
                        {stay.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {stay.description}
                      </p>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {stay.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-md"
                          >
                            ✓ {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-base font-extrabold text-navy-900">
                          ${stay.pricePerNight}
                          <span className="text-[10px] font-normal text-slate-400"> / night</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToTrip(stay.id, stay.name)}
                          className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                            isAdded
                              ? 'bg-teal-50 border-teal-300 text-teal-700'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                          title={isAdded ? 'Remove from trip' : 'Add to trip'}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setBookedItem(stay.name)}
                          className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. ACTIVITIES */}
        <section id="activities" className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-teal-700">Adventures & Excursions</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Trending Activities & Tours
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.activities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={act.imageUrl}
                    alt={act.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {act.rating} ({act.reviews})
                  </div>
                  {act.badge && (
                    <div className="absolute top-3 right-3 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {act.badge}
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>{act.category}</span>
                      <span className="text-teal-700">{act.intensity || 'Moderate'} Intensity</span>
                    </div>

                    <h3 className="font-extrabold text-base text-navy-900 mt-1.5 group-hover:text-teal-700 transition-colors">
                      {act.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {act.description}
                    </p>

                    <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center gap-3">
                      <span>⏳ {Math.round(act.durationMinutes / 60)} Hours</span>
                      <span>🛡️ Certified Gear</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Price per person</span>
                      <span className="text-base font-extrabold text-navy-900">${act.cost}</span>
                    </div>

                    <button
                      onClick={() => setBookedItem(act.name)}
                      className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. HOW TO REACH (TRANSPORTATION TABBED) */}
        <section id="transport" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-teal-700">Connectivity & Transit</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                How to Reach & Local Transport
              </h2>
            </div>

            {/* Transport Mode Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(['Flights', 'Trains', 'Buses', 'Cabs', 'Self Drive', 'Bike Rental'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTransportTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    activeTransportTab === tab
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedTransport.length > 0 ? (
              displayedTransport.map((trans) => (
                <div
                  key={trans.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        {trans.type}
                      </span>
                      {trans.ecoScore && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Eco Score {trans.ecoScore}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-navy-900 mt-2">{trans.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">Provider: {trans.provider}</p>

                    <div className="space-y-1.5 pt-3 mt-3 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span className="font-semibold">{trans.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Frequency:</span>
                        <span className="font-semibold">{trans.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Route:</span>
                        <span className="font-semibold truncate max-w-[180px]">{trans.departure} → {trans.arrival}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Estimated Fare</span>
                      <div className="text-base font-extrabold text-navy-900">${trans.price}</div>
                    </div>
                    <button
                      onClick={() => setBookedItem(trans.title)}
                      className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 p-8 text-center rounded-3xl bg-slate-50 border border-slate-200 text-slate-500 text-xs">
                Local {activeTransportTab} options are integrated into our private chauffeur and verified partner desk.
              </div>
            )}
          </div>
        </section>

        {/* 6. LOCAL FOOD */}
        <section id="food" className="space-y-6 pt-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-sunset-600">Culinary Heritage</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Authentic Local Food & Dishes
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Curated iconic dishes with verified veg/non-veg tags, restaurant spots, and AI flavor ratings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.food.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                    <span className={`w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className="text-[10px] font-extrabold text-slate-800">
                      {dish.isVeg ? 'Pure Veg' : 'Non-Veg'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-navy-900/85 backdrop-blur-md text-teal-300 text-[10px] font-extrabold px-2 py-0.5 rounded-lg">
                    AI Score: {dish.aiScore}/100
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-navy-900 group-hover:text-teal-700 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {dish.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Best Restaurant</div>
                      <div className="font-bold text-navy-900 mt-0.5">{dish.restaurant}</div>
                      <div className="text-[11px] text-slate-500 truncate">{dish.restaurantLocation}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-extrabold text-navy-900">~${dish.price}</span>
                    <span className="text-[10px] font-bold text-sunset-700 bg-sunset-50 px-2 py-0.5 rounded-md">
                      Chef Favorite
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. HIDDEN GEMS */}
        <section id="gems" className="space-y-6 pt-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-teal-700">Secret Itineraries</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Hidden Gems (Low Crowds)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.hiddenGems.map((gem) => (
              <div
                key={gem.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row group"
              >
                <div className="relative sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden">
                  <img
                    src={gem.imageUrl}
                    alt={gem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-navy-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                    Crowd: {gem.crowdLevel}
                  </div>
                </div>

                <div className="p-5 sm:w-1/2 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-extrabold text-base text-navy-900">{gem.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{gem.description}</p>
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 font-medium mt-3">
                      💡 <strong>Secret Tip:</strong> {gem.localSecretTip}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Best: {gem.bestTime}</span>
                    <button
                      onClick={() => handleAddToTrip(gem.id, gem.name)}
                      className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold"
                    >
                      + Add to Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. LOCAL GUIDES */}
        <section id="guides" className="space-y-6 pt-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-teal-700">Verified Local Experts</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Meet Local Guides in {destination.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.guides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row gap-5 items-start"
              >
                <img
                  src={guide.avatarUrl}
                  alt={guide.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border-2 border-slate-200"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-1.5">
                        {guide.name}
                        {guide.verified && (
                          <span className="text-teal-600 text-xs font-bold bg-teal-50 px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" /> Verified
                          </span>
                        )}
                      </h3>
                      <div className="text-xs text-slate-500">
                        {guide.experienceYears} Years Exp • ⭐ {guide.rating} ({guide.reviewsCount} reviews)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-extrabold text-navy-900">${guide.dailyRate}</div>
                      <div className="text-[10px] text-slate-400">/ day</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{guide.bio}</p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Languages: {guide.languages.join(', ')}
                    </span>
                    <button
                      onClick={() => showToast(`Contact request sent to ${guide.name}!`)}
                      className="px-4 py-1.5 bg-navy-900 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" /> Contact Guide
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
