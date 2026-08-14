import React, { useState } from 'react';
import { AdSize } from './adTypes';

interface HoverRevealAdProps {
  size: AdSize;
  accentColor?: string;
}

export default function HoverRevealAd({ size, accentColor = '#EA580C' }: HoverRevealAdProps) {
  const [isHovered, setIsHovered] = useState(false);
  const fontStyle = { fontFamily: '"Manrope", "Inter", system-ui, sans-serif' };

  // Hover triggers for both mouse and mobile touch
  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onTouchStart: () => setIsHovered(true),
    onTouchEnd: () => setIsHovered(false),
  };

  // 320x50 variant
  if (size === '320x50') {
    return (
      <div
        data-size="320x50"
        {...hoverProps}
        className="w-[320px] h-[50px] bg-white text-neutral-900 flex items-center justify-between px-4 border border-neutral-200 select-none relative overflow-hidden cursor-pointer"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Left-to-Right Sweeping Color Backdrop Shape */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-out z-0"
          style={{
            backgroundColor: accentColor,
            width: isHovered ? '100%' : '0%',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Text elements that slide and fade based on hover state */}
        <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
          <div className="flex items-center gap-2 overflow-hidden">
            <span
              className="w-1.5 h-1.5 flex-shrink-0 transition-all duration-300"
              style={{
                backgroundColor: isHovered ? '#FFFFFF' : accentColor,
                transform: isHovered ? 'scale(1.5) rotate(45deg)' : 'scale(1)',
              }}
            />
            <div className="relative h-5 w-44 overflow-hidden">
              <span
                className="absolute inset-0 text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center"
                style={{
                  color: '#171717',
                  transform: isHovered ? 'translateX(100%)' : 'translateX(0)',
                  opacity: isHovered ? 0 : 1,
                }}
              >
                HOVER ON ME
              </span>
              <span
                className="absolute inset-0 text-[11px] font-extrabold uppercase tracking-widest transition-all duration-500 flex items-center"
                style={{
                  color: '#FFFFFF',
                  transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                  opacity: isHovered ? 1 : 0,
                }}
              >
                EXPLORE NOW →
              </span>
            </div>
          </div>

          <span
            className="text-[9px] font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? '#FFFFFF' : '#737373' }}
          >
            REVEAL MOTION
          </span>
        </div>
      </div>
    );
  }

  // 320x100 variant
  if (size === '320x100') {
    return (
      <div
        data-size="320x100"
        {...hoverProps}
        className="w-[320px] h-[100px] bg-white text-neutral-900 flex flex-col justify-between p-3 border border-neutral-200 select-none relative overflow-hidden cursor-pointer"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Slanted Sweeping Background Curtain */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-in-out z-0"
          style={{
            backgroundColor: accentColor,
            width: isHovered ? '100%' : '4px',
            transform: isHovered ? 'skewX(0deg)' : 'skewX(-15deg) translateX(-10px)',
          }}
        />

        <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
          <span
            className="text-[9px] font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? '#FFFFFF' : '#737373' }}
          >
            ACTIVE LAB 07
          </span>
          <span
            className="text-[9px] font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? '#FFFFFF' : accentColor }}
          >
            INTERACTIVE
          </span>
        </div>

        {/* Dynamic sliding text area */}
        <div className="relative z-10 flex-1 flex flex-col justify-center pointer-events-none mt-1">
          <div className="relative h-7 w-full overflow-hidden">
            <h4
              className="absolute inset-0 text-sm font-extrabold text-neutral-900 uppercase tracking-tight transition-all duration-300 flex items-center"
              style={{
                transform: isHovered ? 'translateX(100%)' : 'translateX(0)',
                opacity: isHovered ? 0 : 1,
              }}
            >
              HOVER ON ME
            </h4>
            <h4
              className="absolute inset-0 text-sm font-extrabold text-white uppercase tracking-widest transition-all duration-500 flex items-center"
              style={{
                transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                opacity: isHovered ? 1 : 0,
              }}
            >
              EXPLORE COLLECTION
            </h4>
          </div>
          <p
            className="text-[10px] font-semibold transition-colors duration-300 mt-0.5 line-clamp-1"
            style={{ color: isHovered ? 'rgba(255,255,255,0.8)' : '#525252' }}
          >
            {isHovered ? 'CLICK TO ACCESS PRIVATE PREVIEW' : 'A sweep-reveal motion system experiment.'}
          </p>
        </div>
      </div>
    );
  }

  // 728x90 variant
  if (size === '728x90') {
    return (
      <div
        data-size="728x90"
        {...hoverProps}
        className="w-[728px] h-[90px] bg-white text-neutral-900 flex items-center justify-between px-6 border border-neutral-200 select-none relative overflow-hidden cursor-pointer"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Full sweep from left to right */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-500 ease-out z-0"
          style={{
            backgroundColor: accentColor,
            width: isHovered ? '100%' : '0%',
          }}
        />

        {/* Decorative sliding geometric grid dots on hover */}
        <div
          className="absolute inset-y-0 right-0 w-32 bg-[radial-gradient(rgba(255,255,255,0.15)_1.5px,transparent_1.5px)] [background-size:8px_8px] transition-all duration-500 z-10 pointer-events-none"
          style={{
            transform: isHovered ? 'translateX(0)' : 'translateX(100%)',
            opacity: isHovered ? 0.8 : 0,
          }}
        />

        <div className="relative z-20 flex items-center justify-between w-full pointer-events-none">
          <div className="flex flex-col gap-0.5 max-w-[400px]">
            <span
              className="text-[9px] font-mono tracking-widest transition-colors duration-300"
              style={{ color: isHovered ? 'rgba(255,255,255,0.7)' : '#737373' }}
            >
              AESTHETIC PHYSICS
            </span>
            <div className="relative h-6 w-[360px] overflow-hidden">
              <h4
                className="absolute inset-0 text-sm sm:text-base font-extrabold text-neutral-900 uppercase tracking-tight transition-all duration-300 flex items-center"
                style={{
                  transform: isHovered ? 'translateX(100%)' : 'translateX(0)',
                  opacity: isHovered ? 0 : 1,
                }}
              >
                HOVER ON ME TO INITIATE SEQUENCE
              </h4>
              <h4
                className="absolute inset-0 text-sm sm:text-base font-extrabold text-white uppercase tracking-widest transition-all duration-500 flex items-center"
                style={{
                  transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                  opacity: isHovered ? 1 : 0,
                }}
              >
                EXPLORE CORE PORTFOLIO
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-xs font-mono tracking-widest transition-colors duration-300"
              style={{ color: isHovered ? '#FFFFFF' : '#171717' }}
            >
              [ MOTION 07 ]
            </span>
            <div
              className="px-4 py-2 border transition-all duration-300 flex items-center justify-center font-extrabold text-xs uppercase tracking-widest"
              style={{
                borderRadius: 0,
                borderColor: isHovered ? '#FFFFFF' : '#171717',
                color: isHovered ? '#FFFFFF' : '#171717',
                backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
              }}
            >
              {isHovered ? 'DISCOVER →' : 'HOVER ON ME'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 300x250 and 336x280 Rectangles
  const width = size === '336x280' ? 336 : 300;
  const height = size === '336x280' ? 280 : 250;

  if (size === '300x250' || size === '336x280') {
    return (
      <div
        data-size={size}
        {...hoverProps}
        className="bg-white text-neutral-900 flex flex-col justify-between p-5 border border-neutral-200 select-none relative overflow-hidden cursor-pointer"
        style={{ width: `${width}px`, height: `${height}px`, borderRadius: 0, ...fontStyle }}
      >
        {/* Dynamic Diagonal Ribbon Reveal Backdrop */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out z-0 origin-left"
          style={{
            backgroundColor: accentColor,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span
            className="text-[10px] font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? 'rgba(255,255,255,0.8)' : '#737373' }}
          >
            MOTION COMPONENT
          </span>
          <span
            className="text-[10px] font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? '#FFFFFF' : accentColor }}
          >
            SYS_07
          </span>
        </div>

        {/* Central sliding display message */}
        <div className="relative z-10 my-auto flex flex-col justify-center py-2">
          <div className="relative h-10 w-full overflow-hidden">
            <h3
              className="absolute inset-0 text-xl font-extrabold text-neutral-900 uppercase tracking-tight leading-none transition-all duration-300 flex items-center"
              style={{
                transform: isHovered ? 'translateX(100%)' : 'translateX(0)',
                opacity: isHovered ? 0 : 1,
              }}
            >
              HOVER ON ME
            </h3>
            <h3
              className="absolute inset-0 text-xl font-extrabold text-white uppercase tracking-widest leading-none transition-all duration-500 flex items-center"
              style={{
                transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                opacity: isHovered ? 1 : 0,
              }}
            >
              EXPLORE
            </h3>
          </div>

          <p
            className="text-xs font-semibold leading-relaxed mt-2 transition-colors duration-300"
            style={{ color: isHovered ? 'rgba(255,255,255,0.85)' : '#525252' }}
          >
            {isHovered
              ? 'Tactile cursor sensors detected. Slide-reveal layout complete and fully optimized.'
              : 'Hover above this frame to initiate a left-to-right sweeping geometry transformation.'}
          </p>
        </div>

        {/* Interactive Bottom Accent Indicator */}
        <div
          className="relative z-10 h-10 border transition-all duration-300 flex items-center justify-center text-xs font-extrabold uppercase tracking-widest mt-2"
          style={{
            borderRadius: 0,
            borderColor: isHovered ? '#FFFFFF' : '#171717',
            color: isHovered ? '#FFFFFF' : '#171717',
            backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
          }}
        >
          {isHovered ? 'ACCESS PORTFOLIO NOW →' : 'SWIPE TO UNLOCK'}
        </div>
      </div>
    );
  }

  // 300x600 Half Page Skyscraper Variant (Staggered multi-slice sweep animation)
  if (size === '300x600') {
    return (
      <div
        data-size="300x600"
        {...hoverProps}
        className="w-[300px] h-[600px] bg-white text-neutral-900 flex flex-col justify-between p-6 border border-neutral-200 select-none relative overflow-hidden cursor-pointer"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Three Staggered Sweeping Slices for High-End Skyscraper Feel */}
        <div
          className="absolute left-0 top-0 w-full h-[33.3%] transition-all duration-500 ease-out z-0 origin-left"
          style={{
            backgroundColor: accentColor,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />
        <div
          className="absolute left-0 top-[33.3%] w-full h-[33.4%] transition-all duration-500 ease-out z-0 origin-left"
          style={{
            backgroundColor: accentColor,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transitionDelay: isHovered ? '100ms' : '50ms',
          }}
        />
        <div
          className="absolute left-0 top-[66.7%] w-full h-[33.3%] transition-all duration-500 ease-out z-0 origin-left"
          style={{
            backgroundColor: accentColor,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transitionDelay: isHovered ? '200ms' : '100ms',
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span
            className="text-xs font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? 'rgba(255,255,255,0.8)' : '#737373' }}
          >
            SKYSCRAPER AD
          </span>
          <span
            className="text-xs font-mono tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? '#FFFFFF' : accentColor }}
          >
            REVEAL_07
          </span>
        </div>

        {/* Central Display Area with Staggered Text Revelations */}
        <div className="relative z-10 my-auto flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 border-2 transition-all duration-500 flex items-center justify-center bg-white mb-8"
            style={{
              borderColor: isHovered ? '#FFFFFF' : accentColor,
              backgroundColor: isHovered ? 'transparent' : '#FFFFFF',
              transform: isHovered ? 'rotate(135deg) scale(1.15)' : 'rotate(0deg)',
              boxShadow: isHovered ? 'none' : `0 4px 16px ${accentColor}25`,
              borderRadius: 0,
            }}
          >
            <span
              className="text-xs font-mono tracking-widest font-extrabold text-neutral-900 transition-all duration-500"
              style={{
                transform: isHovered ? 'rotate(-135deg)' : 'rotate(0deg)',
                color: isHovered ? '#FFFFFF' : '#171717',
              }}
            >
              M7
            </span>
          </div>

          <div className="relative h-12 w-full overflow-hidden">
            <h3
              className="absolute inset-0 text-2xl font-extrabold text-neutral-900 uppercase tracking-tight leading-none transition-all duration-300 flex items-center justify-center"
              style={{
                transform: isHovered ? 'translateY(100%)' : 'translateY(0)',
                opacity: isHovered ? 0 : 1,
              }}
            >
              HOVER ON ME
            </h3>
            <h3
              className="absolute inset-0 text-2xl font-extrabold text-white uppercase tracking-widest leading-none transition-all duration-500 flex items-center justify-center"
              style={{
                transform: isHovered ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isHovered ? 1 : 0,
              }}
            >
              EXPLORE
            </h3>
          </div>

          <p
            className="text-xs font-semibold leading-relaxed mt-4 max-w-[220px] transition-colors duration-300"
            style={{ color: isHovered ? 'rgba(255,255,255,0.85)' : '#525252' }}
          >
            {isHovered
              ? 'Multi-slice visual stagger activated. Full system canvas compiled under pixel-perfect constraints.'
              : 'Staggered horizontal curtains will sweep left-to-right on pointer hover trigger.'}
          </p>
        </div>

        {/* Call to Action Pin-Bottom */}
        <div className="relative z-10 flex flex-col gap-3">
          <div
            className="w-full py-3 px-4 border transition-all duration-300 flex items-center justify-center text-xs font-extrabold uppercase tracking-widest"
            style={{
              borderRadius: 0,
              borderColor: isHovered ? '#FFFFFF' : '#171717',
              color: isHovered ? '#FFFFFF' : '#171717',
              backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            {isHovered ? 'CLAIM PRIVATE KEY →' : 'HOVER TO TRIGGER'}
          </div>

          <span
            className="text-[9px] font-mono tracking-widest transition-colors duration-300 text-center"
            style={{ color: isHovered ? 'rgba(255,255,255,0.6)' : '#a3a3a3' }}
          >
            SECURE PORTFOLIO PROTOTYPE
          </span>
        </div>
      </div>
    );
  }

  return null;
}
