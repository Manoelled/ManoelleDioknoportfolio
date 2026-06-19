'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(242,242,247,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Manoelle Diokno — Home">
          <AppLogo
            size={32}
            iconName="SparklesIcon"
            className="group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-bold text-base tracking-tight text-foreground hidden sm:block">
            ManoelleDiokno
          </span>
        </Link>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/client-portal"
            className="px-4 py-2 rounded-full border border-foreground/20 text-foreground text-sm font-bold hover:scale-105 hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 hidden sm:flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            Client Portal
          </Link>
          <a
            href="mailto:manoelle@example.com"
            className="px-5 py-2 rounded-full bg-foreground text-background text-sm font-bold hover:scale-105 hover:shadow-lg transition-all duration-300"
            style={{ boxShadow: '0 4px 16px rgba(28,28,30,0.15)' }}
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>
    </header>
  );
}