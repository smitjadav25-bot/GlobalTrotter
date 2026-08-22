'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!token) {
      setError('Missing or invalid password reset token.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to reset password');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-cream rounded-card p-6 sm:p-8 max-w-md w-full border border-light-cream space-y-6 text-center">
        <div className="w-12 h-12 rounded bg-charcoal text-off-white flex items-center justify-center mx-auto shadow-inset-btn">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-charcoal">Password Reset Complete</h1>
          <p className="text-xs font-normal text-muted">
            Your password has been successfully updated. You can now log in with your new credentials.
          </p>
        </div>
        <Link
          href="/login"
          className="w-full py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
        >
          Proceed to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-card p-6 sm:p-8 max-w-md w-full border border-light-cream space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded bg-charcoal flex items-center justify-center text-off-white mx-auto shadow-inset-btn">
          <Lock className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-semibold text-charcoal tracking-tight">Set New Password</h1>
        <p className="text-xs font-normal text-muted">Enter your new secure password below</p>
      </div>

      {!token && (
        <div className="p-2.5 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal">
          Warning: No reset token detected in URL. Please use the link provided in your email.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-normal text-charcoal mb-1">New Password</label>
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

        <div>
          <label className="block text-xs font-normal text-charcoal mb-1">Confirm New Password</label>
          <div className="relative">
            <Lock className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          disabled={loading || !token}
          className="w-full py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center justify-center gap-2 active:opacity-80 transition-opacity disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Reset Password'}
        </button>

        <div className="text-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-xs font-normal text-muted hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <Suspense fallback={<div className="p-8 text-center text-xs text-muted">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
