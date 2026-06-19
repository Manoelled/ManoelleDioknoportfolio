import React, { useState, useEffect } from 'react';
import AppLogo from './ui/AppLogo';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Header({ currentView, setCurrentView }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('portfolio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section for indicator highlighting
      const sections = ['portfolio', 'social-feed'];
      const scrollPosition = window.scrollY + 120; // offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'client-portal') {
      setCurrentView('client-portal');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
      // Delay slightly for render cycles
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // approximate header height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else if (id === 'top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  const activeSec = currentView === 'client-portal' ? 'client-portal' : activeSection;

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
      <nav className="max-w-7xl mx-auto px-6 lg:px-16 h-16 sm:h-20 flex items-center justify-end md:justify-end">
        {/* Navigation Tabs / CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeSec === 'portfolio' 
                ? 'bg-neutral-900 text-white' 
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            Works
          </button>

          <button
            onClick={() => scrollToSection('social-feed')}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer text-xs sm:text-sm font-bold transition-all duration-300 ${
              activeSec === 'social-feed' 
                ? 'bg-neutral-900 text-white' 
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            Social Media Content
          </button>

          <button
            onClick={() => scrollToSection('client-portal')}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
              activeSec === 'client-portal' 
                ? 'bg-neutral-900 text-white' 
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="hidden xs:inline">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
            Client Portal
          </button>

          <a
            href="mailto:manoelle.diokno00@gmail.com?subject=Inquiry from Portfolio"
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-bold hover:scale-105 hover:shadow-md transition-all duration-300"
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
