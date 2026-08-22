'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Check,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  Shirt,
  Smartphone,
  HeartPulse,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { trotStore } from '@/lib/store';
import { PackingCategory } from '@/lib/types';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export default function PackingAssistantPage() {
  const [categories, setCategories] = useState<PackingCategory[]>(trotStore.getPackingList());
  const [selectedDest, setSelectedDest] = useState('Bali, Indonesia');
  const [newItemName, setNewItemName] = useState('');
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleItem = (catIdx: number, itemId: string) => {
    const updated = trotStore.togglePackingItem(catIdx, itemId);
    setCategories([...updated]);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const next = [...categories];
    next[selectedCategoryIdx].items.push({
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      packed: false,
      essential: false
    });
    setCategories(next);
    setNewItemName('');
    showToast(`Added "${newItemName}" to ${categories[selectedCategoryIdx].name}`);
  };

  const handleDeleteItem = (catIdx: number, itemId: string) => {
    const next = [...categories];
    next[catIdx].items = next[catIdx].items.filter((i) => i.id !== itemId);
    setCategories(next);
  };

  const allItems = categories.flatMap((c) => c.items);
  const packedCount = allItems.filter((i) => i.packed).length;
  const totalCount = allItems.length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
            <Briefcase className="w-3.5 h-3.5" /> Dynamic Luggage Copilot
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Smart Packing Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Auto-generated checklist tailored to <strong>{selectedDest}</strong> tropical climate and activities.
          </p>
        </div>

        <select
          value={selectedDest}
          onChange={(e) => {
            setSelectedDest(e.target.value);
            showToast(`Regenerated packing list for ${e.target.value}`);
          }}
          className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {SAMPLE_DESTINATIONS.map((d) => (
            <option key={d.id} value={`${d.name}, ${d.country}`}>
              {d.name}, {d.country}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-sm text-navy-900">
            Packing Progress: <span className="text-teal-700">{packedCount} of {totalCount} Items Packed</span>
          </span>
          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800">
            {progressPercent}% Complete
          </span>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-500 to-sunset-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, catIdx) => (
          <div
            key={cat.name}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-extrabold text-sm text-navy-900 flex items-center gap-2">
                  {cat.name === 'Essential Documents' && <FileText className="w-4 h-4 text-teal-600" />}
                  {cat.name === 'Clothing & Footwear' && <Shirt className="w-4 h-4 text-sunset-500" />}
                  {cat.name === 'Electronics & Tech' && <Smartphone className="w-4 h-4 text-indigo-600" />}
                  {cat.name === 'Health & Toiletries' && <HeartPulse className="w-4 h-4 text-rose-500" />}
                  <span>{cat.name}</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-bold">
                  {cat.items.filter((i) => i.packed).length}/{cat.items.length}
                </span>
              </div>

              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      item.packed
                        ? 'bg-teal-50/30 border-teal-200/60'
                        : 'bg-slate-50 border-slate-200/60'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(catIdx, item.id)}
                      className="flex items-center gap-2.5 flex-1 text-left"
                    >
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          item.packed
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {item.packed && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          item.packed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>

                    {item.essential && (
                      <span className="text-[9px] font-extrabold uppercase bg-sunset-100 text-sunset-800 px-1.5 py-0.5 rounded mr-2">
                        Must Have
                      </span>
                    )}

                    <button
                      onClick={() => handleDeleteItem(catIdx, item.id)}
                      className="text-slate-300 hover:text-red-500 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Item Card */}
      <form
        onSubmit={handleAddItem}
        className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center gap-3"
      >
        <select
          value={selectedCategoryIdx}
          onChange={(e) => setSelectedCategoryIdx(Number(e.target.value))}
          className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900"
        >
          {categories.map((c, i) => (
            <option key={c.name} value={i}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add custom item (e.g. Scuba Snorkel Mask or Drone Batteries)..."
          className="flex-1 w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </form>
    </div>
  );
}
