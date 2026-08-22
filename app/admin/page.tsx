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
  TrendingUp,
  Building2,
  Lock,
  Globe,
  Loader2,
  ArrowRight,
  CheckCircle2,
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
          throw new Error('Failed to load administrator statistics. Access may be restricted.');
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <p className="text-xs font-semibold text-slate-500">Loading Administrator Console...</p>
      </div>
    );
  }

  if (userRole !== 'ADMIN' || error) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900">Admin Access Restricted</h2>
          <p className="text-xs text-slate-500">
            You must be logged in as an administrator to view this platform analytics dashboard.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-xs font-bold shadow-xs"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-coral" /> Admin Operations Console
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Analytics & Metrics</h1>
          <p className="text-sm text-slate-500 mt-1">
            System-wide usage telemetry, destination popularity, and traveler activities.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats?.totalUsers || 0}</div>
          <p className="text-[11px] text-slate-400">Registered travelers and admins</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Trips</span>
            <div className="w-9 h-9 rounded-xl bg-coral-50 text-coral flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats?.totalTrips || 0}</div>
          <p className="text-[11px] text-slate-400">
            {stats?.publicTrips || 0} Public • {stats?.privateTrips || 0} Private
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">City Stops</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats?.totalStops || 0}</div>
          <p className="text-[11px] text-slate-400">Scheduled destination stops</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget Volume</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ${(stats?.totalBudgetVolume || 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Total planned travel budgets</p>
        </div>
      </div>

      {/* Analytics Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Cities */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Top Popular Destinations</h2>
            </div>
            <Link href="/cities" className="text-xs font-bold text-coral hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.topCities?.map((city: any, index: number) => (
              <div
                key={city.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-700">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{city.name}</div>
                    <div className="text-[11px] text-slate-500">{city.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="font-semibold text-slate-600">
                    ★ {city.popularity} popularity
                  </span>
                  <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-teal-700 font-bold">
                    {city.stopsCount} stops
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Scheduled Experiences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-coral/10 text-coral flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Featured Experiences</h2>
            </div>
            <Link href="/activities" className="text-xs font-bold text-coral hover:underline">
              View Catalog
            </Link>
          </div>

          <div className="space-y-3">
            {stats?.topActivities?.map((act: any, index: number) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-coral">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 truncate max-w-xs">{act.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {act.cityName} • {act.type}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-900 font-black text-xs">
                  {act.cost === 0 ? 'FREE' : `$${act.cost}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent User Registrations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent User Registrations</h2>
            <p className="text-xs text-slate-500">Latest platform accounts</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">User</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Trips Count</th>
                <th className="pb-3">Language</th>
                <th className="pb-3">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {stats?.recentUsers?.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-900">{u.name || 'Anonymous'}</td>
                  <td className="py-3 text-slate-600">{u.email}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        u.role === 'ADMIN'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 font-bold">{u._count?.trips || 0}</td>
                  <td className="py-3 uppercase text-[11px]">{u.languagePref}</td>
                  <td className="py-3 text-slate-400">
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
