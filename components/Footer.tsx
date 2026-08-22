import React from 'react';
import Link from 'next/link';
import { Compass, Heart, Globe, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coral flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">GlobeTrotter</span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              Your intelligent, personalized multi-city travel itinerary planner. Organize stops, estimate budgets, and share adventures with ease.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-teal-600" /> Zero-Cloud Local SQLite</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-coral" /> Multi-City Routing</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/" className="hover:text-coral transition-colors">Explore Destinations</Link></li>
              <li><Link href="/trips" className="hover:text-coral transition-colors">My Itineraries</Link></li>
              <li><Link href="/trips/new" className="hover:text-coral transition-colors">Create New Trip</Link></li>
              <li><Link href="/profile" className="hover:text-coral transition-colors">Saved Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Sample Featured Trip</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
              <div className="font-semibold text-slate-800 mb-1">Japan Cultural Odyssey</div>
              <p className="text-slate-500 mb-2">Tokyo to Kyoto (10 Days)</p>
              <Link
                href="/share/japan-cultural-odyssey"
                className="inline-flex items-center gap-1 font-semibold text-coral hover:underline"
              >
                <Sparkles className="w-3 h-3" /> View Public Itinerary
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} GlobeTrotter Planner. Built for the Hackathon.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-coral fill-coral" /> for global travelers
          </p>
        </div>
      </div>
    </footer>
  );
}
