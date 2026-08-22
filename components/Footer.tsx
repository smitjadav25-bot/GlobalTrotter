import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Heart, Shield, Globe, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-16 lg:pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌍</span>
              <span className="font-extrabold text-base tracking-tight text-navy-900">
                GlobeTrotter<span className="text-sunset-500">AI</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Next-generation AI travel operating system. Plan personalized multi-destination journeys with real-time budget optimization, weather contingencies, and curated boutique stays.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-teal-700">
              <Shield className="w-3.5 h-3.5" /> 100% Zero-Cloud Private & Offline Capable
            </div>
          </div>

          <div>
            <h4 className="font-bold text-navy-900 mb-3 uppercase tracking-wider text-[11px]">Explore Hubs</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/explore/bali" className="hover:text-teal-700">Bali, Indonesia</Link></li>
              <li><Link href="/explore/paris" className="hover:text-teal-700">Paris, France</Link></li>
              <li><Link href="/explore/tokyo" className="hover:text-teal-700">Tokyo, Japan</Link></li>
              <li><Link href="/explore/switzerland" className="hover:text-teal-700">Switzerland Alps</Link></li>
              <li><Link href="/explore/dubai" className="hover:text-teal-700">Dubai, UAE</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-navy-900 mb-3 uppercase tracking-wider text-[11px]">AI Travel Suite</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/planner" className="hover:text-teal-700 flex items-center gap-1">✨ Multi-Step AI Planner</Link></li>
              <li><Link href="/budget" className="hover:text-teal-700">📊 Budget Breakdown & Charts</Link></li>
              <li><Link href="/weather" className="hover:text-teal-700">🌦️ Weather Intel & Alerts</Link></li>
              <li><Link href="/packing" className="hover:text-teal-700">🧰 Smart Packing Assistant</Link></li>
              <li><Link href="/simulator" className="hover:text-teal-700">🔮 What-If Trip Simulator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-navy-900 mb-3 uppercase tracking-wider text-[11px]">Community & Trust</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/community" className="hover:text-teal-700">👥 Traveler Stories & Groups</Link></li>
              <li><Link href="/safety" className="hover:text-teal-700">🛡️ Safety & Emergency Center</Link></li>
              <li><Link href="/profile" className="hover:text-teal-700">🏆 Badges & Scratch Map</Link></li>
              <li><Link href="/map" className="hover:text-teal-700">🗺️ Fullscreen Interactive Map</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 GlobeTrotter AI. Built with precision for modern global voyagers.</p>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/safety" className="hover:underline">Emergency Helpline</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
