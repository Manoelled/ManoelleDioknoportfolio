import React, { useState } from 'react';
import { AdSize } from './adTypes';

interface MultiPanelHoverAdProps {
  size: AdSize;
  accentColor?: string;
}

export default function MultiPanelHoverAd({ size, accentColor = '#FF3B30' }: MultiPanelHoverAdProps) {
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const fontStyle = { fontFamily: '"Manrope", "Inter", system-ui, sans-serif' };

  // 320x50 variant - Single element with subtle shimmer / tap response
  if (size === '320x50') {
    return (
      <div
        data-size="320x50"
        onMouseEnter={() => setActivePanel(0)}
        onMouseLeave={() => setActivePanel(null)}
        onClick={() => setActivePanel(activePanel === 0 ? null : 0)}
        className="w-[320px] h-[50px] bg-white text-neutral-900 flex items-center justify-between px-3 border border-neutral-200 select-none cursor-pointer relative overflow-hidden transition-colors duration-200"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: accentColor,
            opacity: activePanel === 0 ? 0.12 : 0,
          }}
        />
        <div className="flex items-center gap-2 z-10">
          <div
            className="w-2 h-2 transition-transform duration-300"
            style={{
              backgroundColor: accentColor,
              transform: activePanel === 0 ? 'scale(1.5)' : 'scale(1)',
            }}
          />
          <span className="text-[12px] font-extrabold text-neutral-900 tracking-tight uppercase">
            LOREM HOVER SHIMMER
          </span>
        </div>
        <span
          className="text-[10px] font-extrabold tracking-widest uppercase z-10 transition-colors duration-200"
          style={{ color: activePanel === 0 ? accentColor : '#171717' }}
        >
          {activePanel === 0 ? 'EXPLORE NOW →' : 'TOUCH TO REVEAL'}
        </span>
      </div>
    );
  }

  // 320x100 variant - 2 panels side by side, color shift reveal
  if (size === '320x100') {
    return (
      <div
        data-size="320x100"
        className="w-[320px] h-[100px] bg-white text-neutral-900 grid grid-cols-2 gap-1 border border-neutral-200 select-none p-1"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {[0, 1].map((idx) => {
          const isHovered = activePanel === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActivePanel(idx)}
              onMouseLeave={() => setActivePanel(null)}
              onClick={() => setActivePanel(activePanel === idx ? null : idx)}
              className="bg-neutral-50 p-2.5 flex flex-col justify-between border transition-all duration-200 cursor-pointer relative overflow-hidden"
              style={{
                borderRadius: 0,
                borderColor: isHovered ? accentColor : 'rgba(0,0,0,0.12)',
              }}
            >
              <div
                className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
                style={{
                  backgroundColor: accentColor,
                  opacity: isHovered ? 0.12 : 0,
                }}
              />
              <span className="text-[9px] font-bold uppercase text-neutral-500 z-10 tracking-wider">
                PANEL 0{idx + 1}
              </span>
              <span className="text-[11px] font-extrabold text-neutral-900 z-10 leading-tight uppercase tracking-tight">
                {idx === 0 ? 'LOREM IPSUM' : 'DOLOR SIT'}
              </span>
              <span
                className="text-[9px] font-extrabold uppercase z-10 self-end transition-colors tracking-widest"
                style={{ color: isHovered ? accentColor : 'rgba(0,0,0,0.4)' }}
              >
                {isHovered ? 'ACTIVE' : 'HOVER'}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // 728x90 variant - 4 panels in a single horizontal row, minimal reveal
  if (size === '728x90') {
    return (
      <div
        data-size="728x90"
        className="w-[728px] h-[90px] bg-white text-neutral-900 grid grid-cols-4 gap-1 border border-neutral-200 select-none p-1"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {[0, 1, 2, 3].map((idx) => {
          const isHovered = activePanel === idx;
          const panelTitles = ['STRATEGY', 'CREATIVE', 'DIGITAL', 'ANALYTICS'];
          return (
            <div
              key={idx}
              onMouseEnter={() => setActivePanel(idx)}
              onMouseLeave={() => setActivePanel(null)}
              onClick={() => setActivePanel(activePanel === idx ? null : idx)}
              className="bg-neutral-50 px-3 py-2 flex flex-col justify-between border transition-all duration-200 cursor-pointer relative overflow-hidden"
              style={{
                borderRadius: 0,
                borderColor: isHovered ? accentColor : 'rgba(0,0,0,0.1)',
              }}
            >
              <div className="flex justify-between items-center text-[9px] font-bold text-neutral-500 uppercase tracking-wider">
                <span>0{idx + 1}</span>
                <span style={{ color: isHovered ? accentColor : 'transparent' }}>
                  ●
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-neutral-900 tracking-tight uppercase">
                  {panelTitles[idx]}
                </span>
                <div
                  className="h-0.5 w-full mt-1 transition-all duration-200"
                  style={{
                    backgroundColor: isHovered ? accentColor : 'transparent',
                  }}
                />
              </div>
              <span className="text-[9px] font-bold text-neutral-500 truncate uppercase tracking-wider">
                {isHovered ? 'VIEW DETAILS →' : 'HOVER TO REVEAL'}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // 300x600 Vertical Stack of 4 panels
  if (size === '300x600') {
    return (
      <div
        data-size="300x600"
        className="w-[300px] h-[600px] bg-white text-neutral-900 flex flex-col p-3 border border-neutral-200 select-none gap-2"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div className="mb-1 text-center py-2 border-b border-neutral-200">
          <span className="text-xs font-bold uppercase text-neutral-500 tracking-widest">
            FEATURED CAPABILITIES
          </span>
        </div>

        <div className="flex-1 grid grid-rows-4 gap-2">
          {[0, 1, 2, 3].map((idx) => {
            const isHovered = activePanel === idx;
            const titles = ['CONCEPT DESIGN', 'PROTOTYPING', 'SYSTEM ARCHITECTURE', 'DEPLYS & OPTIMIZE'];
            const descriptions = [
              'Lorem ipsum dolor sit amet, consectetur elit.',
              'Sed do eiusmod tempor incididunt ut labore.',
              'Ut enim ad minim veniam, quis nostrud.',
              'Duis aute irure dolor in reprehenderit.',
            ];
            return (
              <div
                key={idx}
                onMouseEnter={() => setActivePanel(idx)}
                onMouseLeave={() => setActivePanel(null)}
                onClick={() => setActivePanel(activePanel === idx ? null : idx)}
                className="bg-neutral-50 p-4 border transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden group"
                style={{
                  borderRadius: 0,
                  borderColor: isHovered ? accentColor : 'rgba(0,0,0,0.12)',
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundColor: accentColor,
                    opacity: isHovered ? 0.08 : 0,
                  }}
                />
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">0{idx + 1}</span>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase transition-colors"
                    style={{ color: isHovered ? accentColor : '#171717' }}
                  >
                    {isHovered ? 'REVEALED' : 'HOVER'}
                  </span>
                </div>

                <div className="z-10 my-1">
                  <h4 className="text-sm font-extrabold text-neutral-900 tracking-tight uppercase">
                    {titles[idx]}
                  </h4>
                  <p className="text-xs font-semibold text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                    {descriptions[idx]}
                  </p>
                </div>

                <div
                  className="h-0.5 w-full transition-all duration-300 z-10"
                  style={{
                    backgroundColor: isHovered ? accentColor : 'rgba(0,0,0,0.08)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Fixed CTA at bottom */}
        <button
          className="w-full py-2.5 text-xs font-extrabold tracking-widest uppercase border border-neutral-900 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white cursor-pointer"
          style={{ borderRadius: 0, ...fontStyle }}
        >
          VIEW ALL PANELS →
        </button>
      </div>
    );
  }

  // Standard 300x250 & 336x280 (2x2 Grid)
  const width = size === '336x280' ? 336 : 300;
  const height = size === '336x280' ? 280 : 250;

  return (
    <div
      data-size={size}
      className="bg-white text-neutral-900 grid grid-cols-2 grid-rows-2 gap-1.5 p-2 border border-neutral-200 select-none"
      style={{ width: `${width}px`, height: `${height}px`, borderRadius: 0, ...fontStyle }}
    >
      {[0, 1, 2, 3].map((idx) => {
        const isHovered = activePanel === idx;
        const titles = ['DESIGN', 'DEVELOP', 'DEPLOY', 'SCALE'];
        return (
          <div
            key={idx}
            onMouseEnter={() => setActivePanel(idx)}
            onMouseLeave={() => setActivePanel(null)}
            onClick={() => setActivePanel(activePanel === idx ? null : idx)}
            className="bg-neutral-50 p-3 flex flex-col justify-between border transition-all duration-200 cursor-pointer relative overflow-hidden"
            style={{
              borderRadius: 0,
              borderColor: isHovered ? accentColor : 'rgba(0,0,0,0.12)',
            }}
          >
            <div
              className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
              style={{
                backgroundColor: accentColor,
                opacity: isHovered ? 0.12 : 0,
              }}
            />

            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-500 tracking-wider z-10">
              <span>0{idx + 1}</span>
              <span style={{ color: isHovered ? accentColor : 'rgba(0,0,0,0.3)' }}>
                {isHovered ? '●' : '○'}
              </span>
            </div>

            <div className="z-10 my-auto">
              <h4 className="text-sm font-extrabold text-neutral-900 leading-snug uppercase tracking-tight">
                {titles[idx]}
              </h4>
              <p className="text-[10px] font-semibold text-neutral-600 mt-0.5 line-clamp-2 leading-tight">
                Lorem ipsum dolor sit amet, consectetur.
              </p>
            </div>

            <div className="flex items-center justify-between text-[9px] font-extrabold uppercase z-10 tracking-widest">
              <span style={{ color: isHovered ? accentColor : 'rgba(0,0,0,0.5)' }}>
                {isHovered ? 'EXPLORE' : 'HOVER/TAP'}
              </span>
              <span className="text-neutral-900">→</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
