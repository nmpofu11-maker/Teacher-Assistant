import React, { useState } from 'react';
import { Download, Sparkles, X, Share2, PlusSquare, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-button-desktop"
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <Download className="w-4 h-4" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-install-button-ios"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 transition"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div 
            id="pwa-ios-guide-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          >
            <div className="w-full max-w-sm rounded-3xl bg-[#FCFDFB] dark:bg-[#1C2024] p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Add to Home Screen</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Get instant access, beautiful full-screen teaching experience, and offline capabilities on your iPhone or iPad in two quick steps:
                </p>

                <div className="space-y-3.5">
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                      1
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      Tap the <strong className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">Share icon <Share2 className="w-3.5 h-3.5 inline text-blue-500" /></strong> in your Safari browser navigation bar.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                      2
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">
                      Scroll down the menu and choose <strong className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1">Add to Home Screen <PlusSquare className="w-3.5 h-3.5 inline text-slate-700 dark:text-slate-300" /></strong>.
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-500/5 dark:bg-emerald-400/5 p-3.5 border border-emerald-500/10 dark:border-emerald-400/10 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-normal">
                    This launches the app as a standalone web app without address bars, giving you maximum screen estate for slide decks and planning.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 py-3 text-xs font-semibold text-white shadow-md transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Optional: For other devices or desktop Safari that doesn't trigger beforeinstallprompt natively, 
  // we can show a subtle manual prompt button to guide the user on installing via browser menu!
  return null;
};
export default PWAInstallButton;
