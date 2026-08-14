import React, { useState } from 'react';
import { AdSize } from './adTypes';

interface FlipbookAdProps {
  size: AdSize;
  accentColor?: string;
}

interface FlipPage {
  title: string;
  subtitle: string;
  badge: string;
}

const PAGES: FlipPage[] = [
  {
    title: 'CHAPTER ONE',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    badge: 'VOLUME I',
  },
  {
    title: 'CHAPTER TWO',
    subtitle: 'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
    badge: 'VOLUME II',
  },
  {
    title: 'CHAPTER THREE',
    subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    badge: 'VOLUME III',
  },
];

export default function FlipbookAd({ size, accentColor = '#EC4899' }: FlipbookAdProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [targetPage, setTargetPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const fontStyle = { fontFamily: '"Manrope", "Inter", system-ui, sans-serif' };

  const flipToNext = () => {
    if (isFlipping) return;
    const nextIndex = (currentPage + 1) % PAGES.length;
    setTargetPage(nextIndex);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentPage(nextIndex);
      setIsFlipping(false);
    }, 600);
  };

  const flipToPrev = () => {
    if (isFlipping) return;
    const prevIndex = (currentPage - 1 + PAGES.length) % PAGES.length;
    setTargetPage(prevIndex);
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentPage(prevIndex);
      setIsFlipping(false);
    }, 600);
  };

  // 320x50 variant
  if (size === '320x50') {
    return (
      <div
        data-size="320x50"
        onClick={flipToNext}
        className="w-[320px] h-[50px] bg-white text-neutral-900 flex items-center justify-between px-3 border border-neutral-200 select-none cursor-pointer relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: accentColor }} />

        <div key={currentPage} className="flex items-center gap-2 transition-all duration-300">
          <span className="text-[12px] font-extrabold text-neutral-900 truncate max-w-[210px] uppercase tracking-tight">
            {PAGES[currentPage].title}
          </span>
        </div>

        <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: accentColor }}>
          NEXT →
        </span>
      </div>
    );
  }

  // 320x100 variant
  if (size === '320x100') {
    return (
      <div
        data-size="320x100"
        onClick={flipToNext}
        className="w-[320px] h-[100px] bg-white text-neutral-900 flex flex-col justify-between p-3 border border-neutral-200 select-none relative cursor-pointer overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div key={currentPage} className="my-auto transition-all duration-300">
          <span className="text-[9px] font-extrabold tracking-widest uppercase block" style={{ color: accentColor }}>
            {PAGES[currentPage].badge}
          </span>
          <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-tight">
            {PAGES[currentPage].title}
          </h4>
          <p className="text-[10px] font-semibold text-neutral-600 line-clamp-1 leading-tight mt-0.5">
            {PAGES[currentPage].subtitle}
          </p>
        </div>
      </div>
    );
  }

  // 728x90 Leaderboard variant
  if (size === '728x90') {
    const activePageData = PAGES[isFlipping ? targetPage : currentPage];
    return (
      <div
        data-size="728x90"
        className="w-[728px] h-[90px] bg-white text-neutral-900 flex items-center justify-between px-6 border border-neutral-200 select-none relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-extrabold uppercase tracking-widest" style={{ color: accentColor }}>
            {activePageData.badge}
          </span>

          <div key={currentPage} className="flex flex-col max-w-[400px] transition-all duration-300">
            <h4 className="text-sm font-extrabold text-neutral-900 leading-tight uppercase tracking-tight">
              {activePageData.title}
            </h4>
            <p className="text-xs font-semibold text-neutral-600 truncate mt-0.5">
              {activePageData.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={flipToPrev}
            className="p-2 border border-neutral-300 text-xs font-bold uppercase text-neutral-700 hover:border-black hover:text-black transition-colors cursor-pointer tracking-wider"
            style={{ borderRadius: 0, ...fontStyle }}
          >
            ← PREV
          </button>
          <button
            onClick={flipToNext}
            className="py-2 px-4 border text-xs font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
            style={{
              borderRadius: 0,
              borderColor: accentColor,
              backgroundColor: accentColor,
              color: '#FFFFFF',
              ...fontStyle,
            }}
          >
            NEXT PAGE →
          </button>
        </div>
      </div>
    );
  }

  // Vertical & Rectangle formats: 300x250, 336x280, 300x600 (Real 3D 2-Layer Flipbook)
  const isTall = size === '300x600';
  const width = size === '336x280' ? 336 : 300;
  const height = size === '336x280' ? 280 : isTall ? 600 : 250;

  const coverPageData = PAGES[currentPage];
  const basePageData = PAGES[isFlipping ? targetPage : (currentPage + 1) % PAGES.length];

  return (
    <div
      data-size={size}
      className="bg-white text-neutral-900 flex flex-col justify-between p-4 border border-neutral-200 select-none relative overflow-hidden"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: 0,
        ...fontStyle,
      }}
    >
      {/* 2-Layer 3D Book Page Viewport */}
      <div
        className="flex-1 my-1 relative"
        style={{ perspective: '1000px' }}
      >
        {/* BASE LAYER (Underneath): Renders page being turned TO */}
        <div
          className="absolute inset-0 bg-neutral-50 p-4 border border-neutral-200 flex flex-col justify-between z-0"
          style={{ borderRadius: 0 }}
        >
          <div className="my-auto">
            <span className="text-[10px] font-extrabold tracking-widest uppercase mb-1 block" style={{ color: accentColor }}>
              {basePageData.badge}
            </span>
            <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight uppercase">
              {basePageData.title}
            </h3>
            <p className="text-xs font-semibold text-neutral-600 mt-2 leading-relaxed">
              {basePageData.subtitle}
            </p>
          </div>
        </div>

        {/* COVER LAYER (On Top): Renders page being turned FROM, animates rotateY from 0 to -178deg */}
        <div
          onClick={flipToNext}
          className="absolute inset-0 bg-neutral-50 p-4 border border-neutral-300 flex flex-col justify-between cursor-pointer z-10"
          style={{
            borderRadius: 0,
            transformOrigin: 'left center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transition: isFlipping ? 'transform 600ms cubic-bezier(0.4, 0.0, 0.2, 1)' : 'none',
            transform: isFlipping ? 'rotateY(-178deg)' : 'rotateY(0deg)',
            boxShadow: isFlipping ? '-12px 0 24px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          <div className="my-auto">
            <span className="text-[10px] font-extrabold tracking-widest uppercase mb-1 block" style={{ color: accentColor }}>
              {coverPageData.badge}
            </span>
            <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight uppercase">
              {coverPageData.title}
            </h3>
            <p className="text-xs font-semibold text-neutral-600 mt-2 leading-relaxed">
              {coverPageData.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between z-20 pt-2 border-t border-neutral-200 mt-1">
        <button
          onClick={flipToPrev}
          className="px-3 py-1.5 border border-neutral-300 text-xs font-bold text-neutral-700 hover:border-black hover:text-black transition-colors cursor-pointer uppercase tracking-wider"
          style={{ borderRadius: 0, ...fontStyle }}
        >
          ← PREV
        </button>

        <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest">
          {currentPage + 1} / {PAGES.length}
        </span>

        <button
          onClick={flipToNext}
          className="px-3 py-1.5 border text-xs font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
          style={{
            borderRadius: 0,
            borderColor: accentColor,
            color: '#FFFFFF',
            backgroundColor: accentColor,
            ...fontStyle,
          }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
