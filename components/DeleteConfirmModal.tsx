'use client';

import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isLoading = false,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-40 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-cream rounded-card p-6 border border-light-cream space-y-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-charcoal-4 text-charcoal shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-charcoal">{title}</h3>
            <p className="text-xs font-normal text-muted leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-light-cream flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4 disabled:opacity-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal disabled:opacity-50 flex items-center gap-1.5 active:opacity-80 transition-opacity"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
