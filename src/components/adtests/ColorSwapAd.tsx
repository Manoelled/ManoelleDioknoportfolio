import React, { useState } from 'react';
import { AdSize } from './adTypes';

interface ColorSwapAdProps {
  size: AdSize;
  accentColor?: string;
  onAccentChange?: (color: string) => void;
}

const PRESET_COLORS = [
  { name: 'Lime Green', hex: '#84CC16' },
  { name: 'International Orange', hex: '#FF3300' },
  { name: 'Cyan Blue', hex: '#00B2FF' },
  { name: 'Violet', hex: '#A855F7' },
];

export default function ColorSwapAd({ size }: ColorSwapAdProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeColor = PRESET_COLORS[selectedIdx].hex;

  const handleNextColor = () => {
    setSelectedIdx((prev) => (prev + 1) % PRESET_COLORS.length);
  };

  const fontStyle = { fontFamily: '"Manrope", "Inter", system-ui, sans-serif' };

  // Compact 320x50 variant
  if (size === '320x50') {
    return (
      <div
        data-size="320x50"
        className="w-[320px] h-[50px] bg-white text-neutral-900 flex items-center justify-between px-3 border border-neutral-200 select-none relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Subtle accent bar indicator */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 transition-colors duration-200"
          style={{ backgroundColor: activeColor }}
        />

        <div className="flex flex-col justify-center pl-1 min-w-[100px]">
          <span className="text-[11px] font-extrabold tracking-tight text-neutral-900 truncate max-w-[100px] uppercase">
            LOREM IPSUM
          </span>
          <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-tight">
            {PRESET_COLORS[selectedIdx].name.split(' ')[0]}
          </span>
        </div>

        {/* Center: Actual Interactive Color Dots Selector */}
        <div className="flex items-center gap-1.5 bg-neutral-100 px-2 py-1 border border-neutral-200 rounded-full">
          {PRESET_COLORS.map((c, i) => (
            <button
              key={c.hex}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx(i);
              }}
              className="w-3.5 h-3.5 transition-all duration-200 cursor-pointer rounded-full relative flex items-center justify-center border-0"
              style={{
                backgroundColor: c.hex,
                transform: selectedIdx === i ? 'scale(1.2)' : 'scale(1)',
                boxShadow: selectedIdx === i ? `0 0 0 1.5px #171717` : 'none',
              }}
              title={c.name}
            />
          ))}
        </div>

        {/* Text-only CTA link */}
        <button
          className="text-[9px] font-extrabold tracking-widest uppercase cursor-pointer"
          style={{ color: activeColor, ...fontStyle }}
        >
          GO →
        </button>
      </div>
    );
  }

  // 320x100 variant
  if (size === '320x100') {
    return (
      <div
        data-size="320x100"
        className="w-[320px] h-[100px] bg-white text-neutral-900 flex flex-col justify-between p-2.5 border border-neutral-200 select-none relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[12px] font-extrabold text-neutral-900 leading-tight uppercase tracking-tight">
              LOREM IPSUM SIT AMET
            </span>
            <span className="text-[10px] font-semibold text-neutral-500 mt-0.5">
              Consectetur adipiscing elit
            </span>
          </div>

          {/* Color Dots */}
          <div className="flex items-center gap-1.5 bg-neutral-100 p-1 border border-neutral-200">
            {PRESET_COLORS.map((c, i) => (
              <button
                key={c.hex}
                onClick={() => setSelectedIdx(i)}
                className="w-3 h-3 transition-transform duration-150 cursor-pointer"
                style={{
                  backgroundColor: c.hex,
                  borderRadius: '50%',
                  transform: selectedIdx === i ? 'scale(1.25)' : 'scale(1)',
                  boxShadow: selectedIdx === i ? `0 0 6px ${c.hex}` : 'none',
                }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Center-Bottom Fixed CTA */}
        <button
          className="w-full py-1.5 px-3 text-[10px] font-extrabold tracking-widest uppercase border transition-colors duration-200 flex items-center justify-center gap-1 cursor-pointer"
          style={{
            borderRadius: 0,
            borderColor: '#171717',
            color: '#171717',
            backgroundColor: 'transparent',
            ...fontStyle,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = activeColor;
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = activeColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#171717';
            e.currentTarget.style.borderColor = '#171717';
          }}
        >
          <span>LEARN MORE</span>
        </button>
      </div>
    );
  }

  // 728x90 Horizontal Leaderboard variant
  if (size === '728x90') {
    return (
      <div
        data-size="728x90"
        className="w-[728px] h-[90px] bg-white text-neutral-900 flex items-center justify-between px-6 border border-neutral-200 select-none relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Background glow field */}
        <div
          className="absolute inset-0 opacity-10 transition-colors duration-200 pointer-events-none"
          style={{ backgroundColor: activeColor }}
        />

        <div className="flex flex-col max-w-[320px]">
          <span className="text-base font-extrabold tracking-tight text-neutral-900 leading-tight truncate uppercase">
            LOREM IPSUM DOLOR SIT AMET
          </span>
          <span className="text-xs font-semibold text-neutral-500 truncate mt-0.5">
            Interactive color preview customization
          </span>
        </div>

        {/* Horizontal controls and CTA side by side */}
        <div className="flex items-center gap-6 z-10">
          <div className="flex items-center gap-2.5 bg-neutral-100 px-3 py-1.5 border border-neutral-200">
            <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider mr-1">COLOR:</span>
            {PRESET_COLORS.map((c, i) => (
              <button
                key={c.hex}
                onClick={() => setSelectedIdx(i)}
                className="w-4 h-4 transition-all duration-150 cursor-pointer"
                style={{
                  backgroundColor: c.hex,
                  borderRadius: '50%',
                  transform: selectedIdx === i ? 'scale(1.25)' : 'scale(1)',
                  boxShadow: selectedIdx === i ? `0 0 8px ${c.hex}` : 'none',
                }}
                title={c.name}
              />
            ))}
          </div>

          <button
            className="py-2 px-5 text-xs font-extrabold tracking-widest uppercase border transition-colors duration-200 cursor-pointer"
            style={{
              borderRadius: 0,
              borderColor: '#171717',
              color: '#171717',
              ...fontStyle,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = activeColor;
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = activeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#171717';
              e.currentTarget.style.borderColor = '#171717';
            }}
          >
            DISCOVER NOW
          </button>
        </div>
      </div>
    );
  }

  // Vertical & Rectangle formats: 300x250, 336x280, 300x600
  if (size === '300x600') {
    return (
      <div
        data-size="300x600"
        className="w-[300px] h-[600px] bg-white text-neutral-900 flex flex-col justify-between p-5 border border-neutral-200 select-none relative overflow-hidden"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Central Color Shape / Field */}
        <div
          className="absolute inset-0 transition-all duration-200 pointer-events-none opacity-10"
          style={{ backgroundColor: activeColor }}
        />

        {/* Dynamic Central Visual Element */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-2 my-auto">
          <div
            className="w-20 h-20 border-2 transition-all duration-200 flex items-center justify-center mb-6 bg-white"
            style={{
              borderColor: activeColor,
              boxShadow: `0 4px 16px ${activeColor}33`,
              borderRadius: 0,
            }}
          >
            <span className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
              {PRESET_COLORS[selectedIdx].name.toUpperCase()}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 leading-snug uppercase">
            LOREM IPSUM DOLOR
          </h3>
          <p className="text-xs font-semibold text-neutral-600 mt-2 max-w-[240px] leading-relaxed">
            Select an accent hue below to dynamic test the background field.
          </p>
        </div>

        {/* Bottom Controls + Fixed CTA underneath color selector */}
        <div className="z-10 flex flex-col items-center gap-4 mt-auto">
          {/* Color Dots Row */}
          <div className="flex items-center gap-3 bg-neutral-100 px-4 py-2 border border-neutral-200">
            {PRESET_COLORS.map((c, i) => (
              <button
                key={c.hex}
                onClick={() => setSelectedIdx(i)}
                className="w-5 h-5 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: c.hex,
                  borderRadius: '50%',
                  transform: selectedIdx === i ? 'scale(1.25)' : 'scale(1)',
                  boxShadow: selectedIdx === i ? `0 0 10px ${c.hex}` : 'none',
                }}
                title={c.name}
              />
            ))}
          </div>

          {/* CTA Underneath Color Selector */}
          <button
            className="w-full py-2.5 px-4 text-xs font-extrabold tracking-widest uppercase border transition-all duration-200 cursor-pointer"
            style={{
              borderRadius: 0,
              borderColor: '#171717',
              color: '#171717',
              backgroundColor: 'transparent',
              ...fontStyle,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = activeColor;
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = activeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#171717';
              e.currentTarget.style.borderColor = '#171717';
            }}
          >
            DISCOVER COLLECTION
          </button>
        </div>
      </div>
    );
  }

  const width = size === '336x280' ? 336 : 300;
  const height = size === '336x280' ? 280 : 250;


  return (
    <div
      data-size={size}
      className="bg-white text-neutral-900 flex flex-col justify-between p-5 border border-neutral-200 select-none relative overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px`, borderRadius: 0, ...fontStyle }}
    >
      {/* Central Color Shape / Field */}
      <div
        className="absolute inset-0 transition-all duration-200 pointer-events-none opacity-10"
        style={{ backgroundColor: activeColor }}
      />

      {/* Dynamic Central Visual Element */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-2 my-auto">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 border-2 transition-all duration-200 flex items-center justify-center mb-4 bg-white"
          style={{
            borderColor: activeColor,
            boxShadow: `0 4px 16px ${activeColor}33`,
            borderRadius: 0,
          }}
        >
          <span className="text-xs font-bold tracking-widest text-neutral-900 uppercase">
            {PRESET_COLORS[selectedIdx].name.toUpperCase()}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900 leading-snug uppercase">
          LOREM IPSUM DOLOR
        </h3>
        <p className="text-xs font-semibold text-neutral-600 mt-2 max-w-[240px] leading-relaxed">
          Select an accent hue below to dynamic test the background field.
        </p>
      </div>

      {/* Bottom Controls + Fixed CTA */}
      <div className="z-10 flex flex-col items-center gap-4 mt-auto">
        {/* Color Dots Row */}
        <div className="flex items-center gap-3 bg-neutral-100 px-4 py-2 border border-neutral-200">
          {PRESET_COLORS.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => setSelectedIdx(i)}
              className="w-5 h-5 transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: c.hex,
                borderRadius: '50%',
                transform: selectedIdx === i ? 'scale(1.25)' : 'scale(1)',
                boxShadow: selectedIdx === i ? `0 0 10px ${c.hex}` : 'none',
              }}
              title={c.name}
            />
          ))}
        </div>

        {/* CTA Center-Bottom */}
        <button
          className="w-full py-2.5 px-4 text-xs font-extrabold tracking-widest uppercase border transition-all duration-200 cursor-pointer"
          style={{
            borderRadius: 0,
            borderColor: '#171717',
            color: '#171717',
            backgroundColor: 'transparent',
            ...fontStyle,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = activeColor;
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.borderColor = activeColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#171717';
            e.currentTarget.style.borderColor = '#171717';
          }}
        >
          EXPLORE COLLECTION
        </button>
      </div>
    </div>
  );
}
