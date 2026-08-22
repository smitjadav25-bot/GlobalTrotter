'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Home,
  Compass,
  MapPin,
  Sparkles,
  User,
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { status } = useSession();

  // Only show for authenticated users on mobile
  if (status !== 'authenticated') {
    return null;
  }

  // Do not show on share links or auth pages
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/share')
  ) {
    return null;
  }

  const items = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/cities', label: 'Explore', icon: Compass },
    { href: '/trips', label: 'Trips', icon: MapPin },
    { href: '/ai-planner', label: 'AI', icon: Sparkles, highlight: true },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== '/dashboard' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl text-[10px] font-bold transition-all ${
              item.highlight
                ? isActive
                  ? 'text-teal-600 dark:text-teal-400 font-extrabold'
                  : 'text-sunset-500 hover:text-sunset-600'
                : isActive
                ? 'text-navy-900 dark:text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                item.highlight
                  ? 'bg-sunset-50 dark:bg-sunset-950/50 text-sunset-500'
                  : isActive
                  ? 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400'
                  : ''
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
