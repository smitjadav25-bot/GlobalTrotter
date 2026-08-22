'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, MapPin, Luggage, Sparkles, User } from 'lucide-react';

const MOBILE_TABS = [
  { label: 'Home', href: '/', icon: Compass },
  { label: 'Explore', href: '/explore', icon: MapPin },
  { label: 'Trips', href: '/trips', icon: Luggage },
  { label: 'AI Planner', href: '/planner', icon: Sparkles, isPrimary: true },
  { label: 'Profile', href: '/profile', icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {MOBILE_TABS.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        const Icon = tab.icon;

        if (tab.isPrimary) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center -mt-5 relative group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-900 via-teal-700 to-sunset-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[10px] font-bold text-navy-900 mt-1">AI</span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
              isActive ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
