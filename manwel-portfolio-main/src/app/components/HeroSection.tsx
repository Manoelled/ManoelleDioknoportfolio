'use client';

import React, { useEffect, useRef, useState } from 'react';

import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 pb-16 z-10"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 max-w-7xl mx-auto w-full transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-2 mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-green-400"
            style={{ boxShadow: '0 0 8px rgba(52,211,153,0.6)' }}
          />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground font-sans">
            Available for projects
          </span>
        </div>

        {/* Main title */}
        <div className="overflow-hidden mb-2">
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.04em] scan-text"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            Manoelle
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-foreground/20"
            style={{
              paddingLeft: 'clamp(1rem, 6vw, 8rem)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
            }}
          >
            Diokno
          </h1>
        </div>

        {/* Sub info row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
          }}
        >
          <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-md leading-relaxed">
            Creative director crafting brand identities, digital campaigns, and visual stories that
            leave a mark.
          </p>
        </div>

        {/* Discipline tags row */}
        <div
          className="flex flex-wrap gap-2 mt-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          }}
        >
          {[
            'Branding',
            'Digital Marketing',
            'Graphic Design',
            'Social Media',
            'Video Production',
          ]?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground/5 text-foreground/60 border border-foreground/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1s',
          }}
        >
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background text-sm font-bold tracking-tight hover:scale-105 hover:shadow-xl transition-all duration-300 text-center"
            style={{ boxShadow: '0 8px 24px rgba(28,28,30,0.2)' }}
          >
            View Project
          </a>
          <a
            href="#social-feed"
            className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-foreground/20 text-foreground text-sm font-bold tracking-tight hover:border-foreground/60 hover:bg-foreground/5 hover:scale-105 transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            <span>View Social Media Work</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
