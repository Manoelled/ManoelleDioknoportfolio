import React, { useState } from 'react';
import { AD_SIZES, AD_TYPES, AdTypeMetadata } from './adTypes';
import ColorSwapAd from './ColorSwapAd';
import MultiPanelHoverAd from './MultiPanelHoverAd';
import ChatboxAd from './ChatboxAd';
import QuizFunnelAd from './QuizFunnelAd';
import FlipbookAd from './FlipbookAd';
import CylinderScrollAd from './CylinderScrollAd';
import HoverRevealAd from './HoverRevealAd';
import { ArrowLeft, RotateCcw } from 'lucide-react';

const ORDERED_TYPES = [
  'color-swap',
  'multi-panel',
  'chatbox',
  'quiz-funnel',
  'flipbook',
  'cylinder-scroll',
  'hover-reveal',
];

export default function AdTestsPage() {
  const [resetKeys, setResetKeys] = useState<Record<string, number>>({});

  const handleBack = () => {
    window.location.hash = '';
    window.location.pathname = '/';
  };

  const handleResetSection = (typeId: string) => {
    setResetKeys((prev) => ({
      ...prev,
      [typeId]: (prev[typeId] || 0) + 1,
    }));
  };

  // Sort ad types according to the required vertical order
  const sortedAdTypes = ORDERED_TYPES.map((id) =>
    AD_TYPES.find((t) => t.id === id)
  ).filter((t): t is AdTypeMetadata => Boolean(t));

  const renderAdComponent = (typeId: string, size: any, key: string) => {
    switch (typeId) {
      case 'color-swap':
        return <ColorSwapAd key={key} size={size} />;
      case 'multi-panel':
        return <MultiPanelHoverAd key={key} size={size} />;
      case 'chatbox':
        return <ChatboxAd key={key} size={size} />;
      case 'quiz-funnel':
        return <QuizFunnelAd key={key} size={size} />;
      case 'flipbook':
        return <FlipbookAd key={key} size={size} />;
      case 'cylinder-scroll':
        return <CylinderScrollAd key={key} size={size} />;
      case 'hover-reveal':
        return <HoverRevealAd key={key} size={size} />;
      default:
        return null;
    }
  };

  // Group sizes to fit side-by-side without empty gaps next to 300x600
  const rectSizes = AD_SIZES.filter((s) => ['300x250', '336x280'].includes(s.size));
  const leaderboardSizes = AD_SIZES.filter((s) => s.size === '728x90');
  const mobileSizes = AD_SIZES.filter((s) => ['320x100', '320x50'].includes(s.size));
  const tallSizes = AD_SIZES.filter((s) => s.size === '300x600');

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white p-4 sm:p-8 md:p-12">
      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="flex flex-col gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-1.5 border border-neutral-300 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black hover:border-black transition-colors cursor-pointer w-fit"
            style={{ borderRadius: 0 }}
          >
            <ArrowLeft size={13} />
            <span>PORTFOLIO</span>
          </button>

          <h1
            className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-neutral-900 mt-1"
            style={{
              fontFamily: '"Helvetica Neue", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.03em',
            }}
          >
            INTERACTIVE AD PLACEHOLDERS
          </h1>
        </div>
      </header>

      {/* Main Vertically Stacked Sections */}
      <main className="max-w-7xl mx-auto flex flex-col gap-16 mt-10">
        {sortedAdTypes.map((ad) => {
          const resetCount = resetKeys[ad.id] || 0;

          return (
            <section key={ad.id} className="flex flex-col gap-6 border-b border-neutral-200 pb-12">
              {/* Section Header: Title + Reset */}
              <div className="flex items-center justify-between gap-4">
                <h2
                  className="text-lg sm:text-xl font-bold uppercase text-neutral-900"
                  style={{
                    fontFamily: '"Helvetica Neue", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {ad.title}
                </h2>

                <button
                  onClick={() => handleResetSection(ad.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 text-[11px] font-mono uppercase text-neutral-600 hover:text-black hover:border-neutral-800 transition-colors cursor-pointer"
                  style={{ borderRadius: 0 }}
                >
                  <RotateCcw size={12} />
                  <span>RESET SECTION</span>
                </button>
              </div>

              {/* Side-by-Side Layout Grid (Left Stack + Right 300x600) */}
              <div className="flex flex-wrap items-start gap-8 w-full">
                {/* LEFT STACK: Rectangles, Leaderboard, Mobile Banners */}
                <div className="flex flex-col gap-6 max-w-full">
                  {/* Row 1: Rectangles (300x250, 336x280) */}
                  <div className="flex flex-wrap items-start gap-6">
                    {rectSizes.map((s) => {
                      const instanceKey = `${ad.id}-${s.size}-${resetCount}`;
                      return (
                        <div key={s.size} className="bg-white border border-neutral-200 p-0 overflow-hidden shadow-xs">
                          {renderAdComponent(ad.id, s.size, instanceKey)}
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 2: Horizontal Leaderboard (728x90) */}
                  <div className="flex flex-wrap items-start gap-6">
                    {leaderboardSizes.map((s) => {
                      const instanceKey = `${ad.id}-${s.size}-${resetCount}`;
                      return (
                        <div key={s.size} className="max-w-full overflow-x-auto">
                          <div className="bg-white border border-neutral-200 p-0 overflow-hidden min-w-[728px] shadow-xs">
                            {renderAdComponent(ad.id, s.size, instanceKey)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 3: Mobile Banners (320x100, 320x50) */}
                  <div className="flex flex-wrap items-start gap-6">
                    {mobileSizes.map((s) => {
                      const instanceKey = `${ad.id}-${s.size}-${resetCount}`;
                      return (
                        <div key={s.size} className="bg-white border border-neutral-200 p-0 overflow-hidden shadow-xs">
                          {renderAdComponent(ad.id, s.size, instanceKey)}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT TALL BLOCK: 300x600 Half Page Ad */}
                <div className="flex flex-col gap-6">
                  {tallSizes.map((s) => {
                    const instanceKey = `${ad.id}-${s.size}-${resetCount}`;
                    return (
                      <div key={s.size} className="bg-white border border-neutral-200 p-0 overflow-hidden shadow-xs">
                        {renderAdComponent(ad.id, s.size, instanceKey)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
        <span>SHARED VISUAL SYSTEM • LIGHT CANVAS (#FFF) • CHARCOAL (#171717) • ZERO RADIUS</span>
        <span>MANOELLE DIOKNO LABS / #ADTESTS</span>
      </footer>
    </div>
  );
}
