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

  if (status !== 'authenticated') {
    return null;
  }

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
    { href: '/ai-planner', label: 'AI', icon: Sparkles },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream border-t border-light-cream px-4 py-2 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== '/dashboard' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded text-[10px] font-normal transition-colors ${
              isActive
                ? 'text-charcoal font-semibold bg-charcoal-4'
                : 'text-muted hover:text-charcoal'
            }`}
          >
            <Icon className="w-4 h-4 opacity-80" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
