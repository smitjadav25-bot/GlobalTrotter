'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  PhoneCall,
  Hospital,
  Building,
  FileText,
  AlertTriangle,
  MapPin,
  Lock,
  Download,
  Check,
  Upload
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export default function SafetyCenterPage() {
  const [selectedCityId, setSelectedCityId] = useState('bali');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const destination = SAMPLE_DESTINATIONS.find((d) => d.id === selectedCityId) || SAMPLE_DESTINATIONS[0];
  const { safety } = destination;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & City Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 24/7 Voyager Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Safety & Emergency Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified local emergency helplines, nearby medical trauma centers, embassies, and offline documents.
          </p>
        </div>

        <select
          value={selectedCityId}
          onChange={(e) => setSelectedCityId(e.target.value)}
          className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {SAMPLE_DESTINATIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}, {d.country}
            </option>
          ))}
        </select>
      </div>

      {/* Emergency Helplines 4-Card Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span>Police</span>
            <PhoneCall className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black">{safety.emergencyNumbers.police}</div>
          <div className="text-[10px] text-rose-700 font-semibold">Toll-Free Emergency</div>
        </div>

        <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span>Ambulance</span>
            <Hospital className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black">{safety.emergencyNumbers.ambulance}</div>
          <div className="text-[10px] text-amber-700 font-semibold">Medical Emergency</div>
        </div>

        <div className="p-5 rounded-3xl bg-orange-50 border border-orange-200 text-orange-900 space-y-1">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span>Fire & Rescue</span>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black">{safety.emergencyNumbers.fire}</div>
          <div className="text-[10px] text-orange-700 font-semibold">Fire Dispatch</div>
        </div>

        <div className="p-5 rounded-3xl bg-teal-50 border border-teal-200 text-teal-900 space-y-1">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span>Tourist Police</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-lg sm:text-xl font-black truncate">{safety.emergencyNumbers.touristPolice}</div>
          <div className="text-[10px] text-teal-700 font-semibold">English-Speaking Desk</div>
        </div>
      </div>

      {/* Hospitals & Police Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nearby Hospitals */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
            <Hospital className="w-4 h-4 text-teal-600" /> Nearby Hospitals & Trauma Centers
          </h3>
          <div className="space-y-3">
            {safety.nearbyHospitals.map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-extrabold text-xs text-navy-900">{h.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {h.distance} away • ⭐ {h.rating} Rating
                  </div>
                </div>
                <button
                  onClick={() => showToast(`Calling ${h.name} at ${h.phone}...`)}
                  className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Embassies */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-600" /> Diplomatic Missions & Embassies
          </h3>
          <div className="space-y-3">
            {safety.embassies.map((emb, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-extrabold text-xs text-navy-900">{emb.country}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[220px]">{emb.address}</div>
                </div>
                <button
                  onClick={() => showToast(`Contacting ${emb.country} at ${emb.phone}...`)}
                  className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Tips & Encrypted Document Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Advisories */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Destination Safety Advisories
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {safety.safetyTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/50 border border-amber-100">
                <span className="text-amber-600 font-bold">✓</span>
                <span className="font-medium">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Encrypted Document Vault */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-600" /> Offline Encrypted Document Vault
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              AES-256 Offline
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Passport Copy (Encrypted PDF)', size: '1.4 MB', synced: true },
              { name: 'International Travel Insurance Card', size: '420 KB', synced: true },
              { name: 'Flight & Hotel Confirmation Slips', size: '890 KB', synced: true }
            ].map((doc, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <div>
                    <div className="font-bold text-navy-900">{doc.name}</div>
                    <div className="text-[10px] text-slate-400">{doc.size} • Available Offline</div>
                  </div>
                </div>
                <button
                  onClick={() => showToast(`Downloaded ${doc.name} to offline storage!`)}
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-600"
                  title="Download offline copy"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => showToast('File selector opened for secure document upload!')}
            className="w-full py-2.5 rounded-2xl border border-dashed border-slate-300 text-slate-600 hover:border-teal-500 hover:text-teal-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" /> Upload Additional Document
          </button>
        </div>
      </div>
    </div>
  );
}
