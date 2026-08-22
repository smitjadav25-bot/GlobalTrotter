'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Loader2, ArrowLeft, CheckCircle2, KeyRound, ExternalLink } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to send reset link');

      setSubmitted(true);
      if (json.resetUrl) {
        setResetUrl(json.resetUrl);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="bg-cream rounded-card p-6 sm:p-8 max-w-md w-full border border-light-cream space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded bg-charcoal flex items-center justify-center text-off-white mx-auto shadow-inset-btn">
            <KeyRound className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold text-charcoal tracking-tight">Forgot Password</h1>
          <p className="text-xs font-normal text-muted">
            Enter your registered email address to receive a reset link.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="p-3 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Reset request received</p>
                <p className="mt-0.5 text-muted">
                  If an account exists for <span className="font-normal text-charcoal">{email}</span>, your reset link is ready.
                </p>
              </div>
            </div>

            {resetUrl && (
              <div className="p-3 bg-cream border border-light-cream rounded space-y-1.5">
                <div className="text-[11px] font-normal uppercase tracking-wider text-muted">
                  Local Reset Link:
                </div>
                <Link
                  href={resetUrl}
                  className="text-xs font-normal text-charcoal underline break-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" /> Open Password Reset Page
                </Link>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full py-2 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="demo@globetrotter.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Send Reset Link'}
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
        )}
      </div>
    </div>
  );
}
