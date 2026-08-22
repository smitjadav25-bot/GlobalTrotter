'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Compass, Mail, Lock, User, Loader2, Sparkles } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      const loginRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        router.push('/login');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      const res = await signIn('credentials', { isDemo: 'true', redirect: false });
      if (!res?.error) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="bg-cream rounded-card p-6 sm:p-8 max-w-md w-full border border-light-cream space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded bg-charcoal flex items-center justify-center text-off-white mx-auto shadow-inset-btn">
            <Compass className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold text-charcoal tracking-tight">Create Account</h1>
          <p className="text-xs font-normal text-muted">Join GlobeTrotter to plan and budget your travels</p>
        </div>

        {/* Demo Fast Track */}
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
            Or create new account
          </span>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-normal text-charcoal mb-1">Full Name</label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:ring-2 focus:ring-ring-blue focus:outline-none"
                required
              />
            </div>
          </div>

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
            <label className="block text-xs font-normal text-charcoal mb-1">Password</label>
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
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-muted font-normal">
          Already have an account?{' '}
          <Link href="/login" className="text-charcoal underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
