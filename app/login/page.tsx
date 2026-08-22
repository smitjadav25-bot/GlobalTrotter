'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Compass, Mail, Lock, Loader2, Sparkles } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error || 'Invalid email or password');
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await signIn('credentials', {
        isDemo: 'true',
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream rounded-card p-6 sm:p-8 max-w-md w-full border border-light-cream space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded bg-charcoal flex items-center justify-center text-off-white mx-auto shadow-inset-btn">
          <Compass className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-semibold text-charcoal tracking-tight">Sign In</h1>
        <p className="text-xs font-normal text-muted">Manage and plan your multi-city trips</p>
      </div>

      {/* Demo Fast Track Button */}
      <button
        type="button"
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full py-2.5 px-4 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center justify-center gap-2 active:opacity-80 transition-opacity disabled:opacity-50"
      >
        <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Traveler Login
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-light-cream w-full" />
        <span className="bg-cream px-2.5 text-[11px] font-normal text-muted uppercase tracking-wider">
          Or with email
        </span>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-normal text-charcoal mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:ring-2 focus:ring-ring-blue focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-normal text-charcoal">Password</label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-normal text-muted hover:text-charcoal hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:ring-2 focus:ring-ring-blue focus:outline-none"
              required
            />
          </div>
        </div>

        {error && (
          <div className="p-2.5 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center justify-center gap-2 active:opacity-80 transition-opacity disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-xs text-muted font-normal">
        Don't have an account?{' '}
        <Link href="/register" className="text-charcoal underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <Suspense fallback={<div className="p-8 text-center text-xs text-muted">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
