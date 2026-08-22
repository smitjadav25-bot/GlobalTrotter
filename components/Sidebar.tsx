'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  MapPin,
  Sparkles,
  Calendar,
  DollarSign,
  Users,
  Map as MapIcon,
  CloudSun,
  ShieldCheck,
  Briefcase,
  GitCompare,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Luggage,
  Hotel
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: Compass },
  { label: 'Explore', href: '/explore', icon: MapPin },
  { label: 'My Trips', href: '/trips', icon: Luggage, badge: '3', badgeColor: 'bg-teal-500/10 text-teal-700' },
  { label: 'AI Planner', href: '/planner', icon: Sparkles, badge: 'AI', badgeColor: 'bg-sunset-500/10 text-sunset-600 font-bold' },
  { label: 'Explore Map', href: '/map', icon: MapIcon },
  { label: 'Budget Analysis', href: '/budget', icon: DollarSign },
  { label: 'Weather Intel', href: '/weather', icon: CloudSun },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Packing Assistant', href: '/packing', icon: Briefcase },
  { label: 'Safety Center', href: '/safety', icon: ShieldCheck },
  { label: 'What-If Simulator', href: '/simulator', icon: GitCompare },
  { label: 'Calendar', href: '/calendar', icon: Calendar },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 h-screen transition-all duration-300 z-30 select-none shadow-soft-xs ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header / Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-navy-900 via-navy-800 to-teal-700 flex items-center justify-center text-white shadow-md shadow-navy-900/20 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <span className="text-xl">🌍</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-navy-900 flex items-center gap-1.5">
                GlobeTrotter
                <span className="text-[10px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded-full bg-sunset-500/15 text-sunset-600">
                  AI
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium -mt-0.5">Next-Gen Travel OS</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative group ${
                isActive
                  ? 'bg-navy-900 text-white shadow-sm shadow-navy-900/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile / Logout */}
      <div className="p-3 border-t border-slate-100">
        {!collapsed ? (
          <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 border border-slate-100/80">
            <Link href="/profile" className="flex items-center gap-2.5 overflow-hidden flex-1 group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Alex Rivera"
                className="w-8 h-8 rounded-full object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-teal-500 transition-all"
              />
              <div className="truncate">
                <div className="text-xs font-bold text-slate-800 truncate group-hover:text-teal-700">Alex Rivera</div>
                <div className="text-[10px] text-teal-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  Elite Voyager
                </div>
              </div>
            </Link>
            <Link
              href="/login"
              className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Link href="/profile">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </Link>
            <Link href="/login" className="p-1.5 text-slate-400 hover:text-red-600">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
