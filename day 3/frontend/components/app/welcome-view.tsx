'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingCart, Storefront, Microphone, Spinner, Clock, CheckCircle, PhoneDisconnect } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { MicErrorDialog } from '@/components/app/mic-error-dialog';

function KiranaStoreLogo() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 mb-4 rounded-3xl bg-gradient-to-tr from-orange-600 via-amber-500 to-amber-400 p-0.5 shadow-xl shadow-orange-500/20">
      <div className="flex items-center justify-center w-full h-full bg-background rounded-[22px]">
        <Storefront size={44} weight="duotone" className="text-orange-600 dark:text-orange-400" />
      </div>
      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full shadow-md">
        <ShoppingCart size={14} weight="bold" />
      </div>
    </div>
  );
}

const SAMPLE_PROMPTS = [
  '🛒 "Atta 5kg ka rate kya hai?"',
  '🥛 "Doodh aur bread available hai?"',
  '⏰ "Dukaan kab tak khuli rhegi?"',
  '🍎 "Fresh fruits kab aayenge?"',
];

interface WelcomeViewProps {
  startButtonText: string;
  hasCallEnded?: boolean;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  hasCallEnded,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showMicError, setShowMicError] = useState(false);

  const handleStart = async () => {
    try {
      setIsConnecting(true);
      setShowMicError(false);
      await onStartCall();
    } catch (err: unknown) {
      const error = err as Error;
      setIsConnecting(false);
      
      const isMicDenied =
        error?.message?.includes('Permission') ||
        error?.message?.includes('NotAllowedError') ||
        error?.name === 'NotAllowedError';

      if (isMicDenied) {
        setShowMicError(true);
        toast.error('Microphone Access Blocked', {
          description: 'Please enable microphone access in your browser to talk to KiranaBot.',
          duration: 6000,
        });
      } else {
        toast.error('Could not connect to KiranaBot', {
          description: error?.message || 'Please check your connection and try again.',
        });
      }
    }
  };

  return (
    <div ref={ref} className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <MicErrorDialog
        isOpen={showMicError}
        onClose={() => setShowMicError(false)}
        onRetry={handleStart}
      />

      <section className="flex flex-col items-center justify-center text-center w-full space-y-6">
        <KiranaStoreLogo />

        {/* Store Title & Badges */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Murf Falcon TTS • LiveKit Voice Agent
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Mera Kirana AI
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Aapki Apni Dukaan Ka Voice Assistant. Ask questions about groceries, prices, and store timing in Hindi or English!
          </p>
        </div>

        {/* State Banner & Main Action Button */}
        <div className="w-full max-w-sm space-y-4 pt-2">
          {hasCallEnded && !isConnecting && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-medium animate-in fade-in">
              <PhoneDisconnect size={16} weight="bold" />
              <span>Call Ended • बात समाप्त हो गई</span>
            </div>
          )}

          {isConnecting && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold animate-pulse">
              <Spinner size={16} className="animate-spin" />
              <span>Connecting to KiranaBot... Please wait (दुकानदार से जुड़ रहे हैं...)</span>
            </div>
          )}

          <Button
            size="lg"
            onClick={handleStart}
            disabled={isConnecting}
            className="w-full h-13 rounded-2xl font-semibold text-sm shadow-lg shadow-orange-500/25 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white transition-all transform active:scale-95 disabled:opacity-75"
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                <Spinner size={18} className="animate-spin" />
                Connecting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Microphone size={18} weight="bold" />
                {hasCallEnded ? 'Start Again (फिर से बात करें)' : startButtonText}
              </span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <CheckCircle size={14} className="text-emerald-500" /> Free Voice Call
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle size={14} className="text-emerald-500" /> Hinglish / Hindi
            </span>
          </div>
        </div>

        {/* Sample Customer Prompts */}
        <div className="w-full pt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Try asking questions like:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs">
            {SAMPLE_PROMPTS.map((prompt, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-card border border-border/80 text-card-foreground/90 font-medium hover:border-orange-500/40 transition-colors"
              >
                {prompt}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-muted-foreground border-t border-border/50 pt-4 w-full">
        Powered by <span className="font-semibold text-foreground">Murf Falcon</span> & <span className="font-semibold text-foreground">LiveKit Agents</span> • Day 3 #VoiceForBharat
      </footer>
    </div>
  );
};
