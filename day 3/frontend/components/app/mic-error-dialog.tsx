'use client';

import React from 'react';
import { MicrophoneSlash, ShieldWarning, ArrowClockwise, XCircle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface MicErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export function MicErrorDialog({ isOpen, onClose, onRetry }: MicErrorDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl space-y-5 text-card-foreground">
        
        {/* Header with Icon */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-destructive/10 text-destructive shrink-0">
            <MicrophoneSlash size={28} weight="bold" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Microphone Access Blocked
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              माइक्रोफ़ोन एक्सेस की अनुमति नहीं मिली
            </p>
          </div>
        </div>

        {/* Warning Explanation */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldWarning size={16} weight="fill" />
            <span>Why is this required?</span>
          </div>
          <p className="leading-relaxed">
            KiranaBot needs microphone access so you can speak your order or grocery questions directly in Hindi or English.
          </p>
        </div>

        {/* Instructions Steps */}
        <div className="space-y-2 text-xs">
          <p className="font-semibold text-foreground">How to enable microphone in browser:</p>
          <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground pl-1 leading-relaxed">
            <li>
              Look for the <span className="font-semibold text-foreground">lock icon 🔒</span> or <span className="font-semibold text-foreground">tune icon 🎛️</span> in your browser address bar.
            </li>
            <li>
              Locate <span className="font-semibold text-foreground">Microphone</span> settings.
            </li>
            <li>
              Change permission to <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-bold">Allow</span>.
            </li>
            <li>
              Click <span className="font-semibold text-foreground">&quot;Try Again&quot;</span> below.
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={onClose} className="rounded-xl">
            <XCircle className="mr-1.5" size={16} />
            Close
          </Button>
          <Button
            size="sm"
            onClick={onRetry}
            className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium shadow-md transition-all"
          >
            <ArrowClockwise className="mr-1.5" size={16} weight="bold" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
