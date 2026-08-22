'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  ShieldAlert,
  Users,
  MapPin,
  Compass,
  DollarSign,
  Sparkles,
  Building2,
  Loader2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userRole = (session?.user as any)?.role || 'USER';

  useEffect(() => {
    async function loadAdminStats() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/stats');
        if (!res.ok) {
          throw new Error('Failed to load administrator statistics.');
        }
        const data = await res.json();
        setStats(data.stats);
      } catch (err: any) {
        setError(err.message || 'Unauthorized');
      } finally {
        setLoading(false);
      }
    }

    if (status === 'authenticated') {
      loadAdminStats();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
        <p className="text-xs font-normal text-muted">Loading Administrator Console...</p>
      </div>
    );
  }

  if (userRole !== 'ADMIN' || error) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded bg-charcoal text-off-white flex items-center justify-center mx-auto shadow-inset-btn">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-charcoal">Admin Access Restricted</h2>
          <p className="text-xs text-muted font-normal">
            You must be logged in as an administrator to view this platform analytics dashboard.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-charcoal text-off-white text-[10px] font-normal uppercase tracking-wider mb-2 shadow-inset-btn">
          <ShieldAlert className="w-3 h-3" /> Admin Operations Console
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px]">Platform Analytics & Metrics</h1>
        <p className="text-xs text-muted font-normal mt-1">
          System-wide usage telemetry, destination popularity, and traveler activities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cream p-5 rounded-card border border-light-cream space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal uppercase tracking-wider text-muted">Total Users</span>
            <Users className="w-4 h-4 text-muted" />
          </div>
          <div className="text-2xl font-semibold text-charcoal">{stats?.totalUsers || 0}</div>
          <p className="text-[11px] text-muted">Registered travelers and admins</p>
        </div>

        <div className="bg-cream p-5 rounded-card border border-light-cream space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal uppercase tracking-wider text-muted">Total Trips</span>
            <Compass className="w-4 h-4 text-muted" />
          </div>
          <div className="text-2xl font-semibold text-charcoal">{stats?.totalTrips || 0}</div>
          <p className="text-[11px] text-muted">
            {stats?.publicTrips || 0} Public • {stats?.privateTrips || 0} Private
          </p>
        </div>

        <div className="bg-cream p-5 rounded-card border border-light-cream space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal uppercase tracking-wider text-muted">City Stops</span>
            <MapPin className="w-4 h-4 text-muted" />
          </div>
          <div className="text-2xl font-semibold text-charcoal">{stats?.totalStops || 0}</div>
          <p className="text-[11px] text-muted">Scheduled destination stops</p>
        </div>

        <div className="bg-cream p-5 rounded-card border border-light-cream space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal uppercase tracking-wider text-muted">Budget Volume</span>
            <DollarSign className="w-4 h-4 text-muted" />
          </div>
          <div className="text-2xl font-semibold text-charcoal">
            ${(stats?.totalBudgetVolume || 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-muted">Total planned travel budgets</p>
        </div>
      </div>

      {/* Analytics Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Cities */}
        <div className="bg-cream rounded-card p-6 border border-light-cream space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-light-cream">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted" />
              <h2 className="text-sm font-semibold text-charcoal">Top Popular Destinations</h2>
            </div>
            <Link href="/cities" className="text-xs font-normal text-charcoal underline">
              View All
            </Link>
          </div>

          <div className="space-y-2">
            {stats?.topCities?.map((city: any, index: number) => (
              <div
                key={city.id}
                className="p-3 rounded bg-charcoal-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-charcoal">#{index + 1}</span>
                  <div>
                    <div className="font-semibold text-charcoal">{city.name}</div>
                    <div className="text-[11px] text-muted">{city.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted">
                  <span>★ {city.popularity}</span>
                  <span className="font-semibold text-charcoal">{city.stopsCount} stops</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Scheduled Experiences */}
        <div className="bg-cream rounded-card p-6 border border-light-cream space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-light-cream">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-muted" />
              <h2 className="text-sm font-semibold text-charcoal">Featured Experiences</h2>
            </div>
            <Link href="/activities" className="text-xs font-normal text-charcoal underline">
              View Catalog
            </Link>
          </div>

          <div className="space-y-2">
            {stats?.topActivities?.map((act: any, index: number) => (
              <div
                key={act.id}
                className="p-3 rounded bg-charcoal-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-charcoal">#{index + 1}</span>
                  <div>
                    <div className="font-semibold text-charcoal truncate max-w-xs">{act.name}</div>
                    <div className="text-[11px] text-muted">
                      {act.cityName} • {act.type}
                    </div>
                  </div>
                </div>

                <span className="font-semibold text-charcoal">
                  {act.cost === 0 ? 'FREE' : `$${act.cost}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent User Registrations */}
      <div className="bg-cream rounded-card p-6 border border-light-cream space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-light-cream">
          <Users className="w-4 h-4 text-muted" />
          <h2 className="text-sm font-semibold text-charcoal">Recent User Registrations</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-light-cream text-[11px] font-normal text-muted uppercase tracking-wider">
                <th className="pb-2">User</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Trips</th>
                <th className="pb-2">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-cream text-muted font-normal">
              {stats?.recentUsers?.map((u: any) => (
                <tr key={u.id} className="hover:bg-charcoal-3">
                  <td className="py-2 font-semibold text-charcoal">{u.name || 'Anonymous'}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">
                    <span className="uppercase text-[10px] text-charcoal font-semibold">{u.role}</span>
                  </td>
                  <td className="py-2 font-semibold text-charcoal">{u._count?.trips || 0}</td>
                  <td className="py-2 text-[11px]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
