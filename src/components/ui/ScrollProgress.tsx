import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ScrollProgressProps {
  currentView: string;
}

interface SectionIndicator {
  label: string;
  topPercent: number;
  absoluteTop: number;
  element: HTMLElement;
}

const PROJECT_VIEWS = [
  'ramngo',
  'crumb',
  'nomad',
  'stackhouse',
  'creativeworks',
  'designsentiments'
];

const cleanLabel = (text: string): string => {
  let cleaned = text.trim();
  
  // Custom replacements for clean labels
  cleaned = cleaned.replace(/INTERACTIVE\s+/i, '');
  cleaned = cleaned.replace(/\s+SYSTEM/i, '');
  cleaned = cleaned.replace(/\s+APPROACH/i, '');
  cleaned = cleaned.replace(/\s+FEATURE/i, '');
  cleaned = cleaned.replace(/\s+EXPERIENCE/i, '');
  cleaned = cleaned.replace(/\s+DESIGN/i, '');
  
  const lower = cleaned.toLowerCase();
  if (lower.includes('social media') || lower.includes('social approach')) return 'Social';
  if (lower.includes('website') || lower.includes('web')) return 'Website';
  if (lower.includes('tarot') || lower.includes('oracle')) return 'Tarot Oracle';
  if (lower.includes('carousel')) return 'Carousels';
  if (lower.includes('vertical ad') || lower.includes('ad campaigns') || lower.includes('ad campaign')) return 'Vertical Ads';
  if (lower.includes('cinematic')) return 'Fragments';
  if (lower.includes('live portal')) return 'Live Portal';
  if (lower.includes('sensory')) return 'Sensory Tools';
  if (lower.includes('aligned')) return 'Reservations';
  if (lower.includes('creative campaign') || lower.includes('campaign hub')) return 'Campaigns';
  if (lower.includes('print journal')) return 'Journals';
  if (lower.includes('creative element') || lower.includes('elements')) return 'Elements';
  if (lower.includes('studio ecosystem')) return 'Ecosystem';
  if (lower.includes('reel frame')) return 'Reels Index';
  if (lower.includes('absolute presence')) return 'Brand Attitude';
  if (lower.includes('refract') || lower.includes('view, empower')) return 'Refract';
  
  return cleaned
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ScrollProgress({ currentView }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [sections, setSections] = useState<SectionIndicator[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    const isProject = PROJECT_VIEWS.includes(currentView);
    setIsVisible(isProject);

    if (!isProject) {
      setProgress(0);
      setSections([]);
      return;
    }

    const calculateScrollAndSections = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollHeight = docHeight - winHeight;

      if (scrollHeight > 0) {
        const percent = (scrollTop / scrollHeight) * 100;
        setProgress(Math.min(Math.max(percent, 0), 100));
      } else {
        setProgress(0);
      }

      // 1. DYNAMICALLY SCAN FOR SECTIONS ON PAGE
      const detected: SectionIndicator[] = [];
      
      detected.push({
        label: 'Intro',
        topPercent: 0,
        absoluteTop: 0,
        element: document.body
      });

      if (scrollHeight > 0) {
        // Look for sections with h2 headers inside them
        const sectionElements = Array.from(document.querySelectorAll('section'));
        
        sectionElements.forEach((sec) => {
          const h2 = sec.querySelector('h2');
          if (!h2) return;
          
          let label = h2.textContent || '';
          label = cleanLabel(label);
          
          const rect = sec.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const topPercent = (absoluteTop / scrollHeight) * 100;
          
          const isTooClose = detected.some((d) => Math.abs(d.topPercent - topPercent) < 3);
          if (!isTooClose) {
            detected.push({
              label,
              topPercent: Math.min(Math.max(topPercent, 0), 100),
              absoluteTop,
              element: sec as HTMLElement
            });
          }
        });

        // If no sections were found (or only introduction), look for primary content h2 elements directly
        if (detected.length <= 1) {
          const h2Elements = Array.from(document.querySelectorAll('main h2'));
          h2Elements.forEach((h2) => {
            let label = h2.textContent || '';
            label = cleanLabel(label);
            
            const rect = h2.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            const topPercent = (absoluteTop / scrollHeight) * 100;
            
            const isTooClose = detected.some((d) => Math.abs(d.topPercent - topPercent) < 3);
            if (!isTooClose) {
              detected.push({
                label,
                topPercent: Math.min(Math.max(topPercent, 0), 100),
                absoluteTop,
                element: h2 as HTMLElement
              });
            }
          });
        }
      }

      detected.sort((a, b) => a.topPercent - b.topPercent);
      setSections(detected);

      // 2. DETERMINE ACTIVE SECTION BASED ON VIEWPORT
      const viewportPoint = scrollTop + winHeight * 0.25; // 25% down the viewport as the trigger point
      let activeIndex = 0;
      for (let i = 0; i < detected.length; i++) {
        if (viewportPoint >= detected[i].absoluteTop) {
          activeIndex = i;
        }
      }
      setActiveSectionIndex(activeIndex);
    };

    // Run initially
    calculateScrollAndSections();

    // Setup Event Listeners
    window.addEventListener('scroll', calculateScrollAndSections, { passive: true });
    window.addEventListener('resize', calculateScrollAndSections);

    // Watch for DOM tree updates to adapt dynamically
    const observer = new MutationObserver(calculateScrollAndSections);
    observer.observe(document.body, { childList: true, subtree: true });

    // Extra safeguard delay run in case of fonts or dynamic images shifts
    const timer = setTimeout(calculateScrollAndSections, 300);

    return () => {
      window.removeEventListener('scroll', calculateScrollAndSections);
      window.removeEventListener('resize', calculateScrollAndSections);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [currentView]);

  const scrollToPreviousSection = () => {
    if (sections.length === 0) return;
    
    const targetIndex = activeSectionIndex - 1;
    if (targetIndex < 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const targetSection = sections[targetIndex];
    window.scrollTo({
      top: targetSection.absoluteTop === 0 ? 0 : targetSection.absoluteTop - 80,
      behavior: 'smooth'
    });
  };

  const scrollToNextSection = () => {
    if (sections.length === 0) return;
    
    const targetIndex = activeSectionIndex + 1;
    if (targetIndex >= sections.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }
    
    const targetSection = sections[targetIndex];
    window.scrollTo({
      top: targetSection.absoluteTop === 0 ? 0 : targetSection.absoluteTop - 80,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* 1. TOP HORIZONTAL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 right-0 h-[4px] bg-neutral-200/50 z-[100] pointer-events-none"
        id="scroll-progress-top-container"
      >
        <div 
          className="h-full bg-neutral-900 transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
          id="scroll-progress-top-fill"
        />
      </div>

      {/* 2. RIGHT-SIDE EXQUISITE VERTICAL INDICATOR WITH SECTION TICK MARKS */}
      <div 
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-5 pointer-events-auto select-none"
        id="scroll-progress-sidebar"
      >
        {/* Previous Section scroll control (above the track) */}
        <button
          onClick={scrollToPreviousSection}
          className="w-7 h-7 rounded-full bg-white/85 border border-[#D1D1D6]/40 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-2xs"
          title="Previous Section"
          aria-label="Previous Section"
        >
          <ChevronUp size={14} />
        </button>

        {/* Vertical Track container with Section ticks */}
        <div className="relative flex flex-row items-center gap-3 py-2 h-48 w-full justify-center" id="scroll-progress-section-container">
          
          {/* Active section label text - Swapped to Left position, aligned vertically in the center */}
          <div className="w-[84px] flex items-center justify-end text-right select-none h-full pr-1.5">
            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-850 font-sans leading-snug">
              {sections[activeSectionIndex]?.label || 'Intro'}
            </span>
          </div>

          {/* Vertical scroll bar line - Swapped to Right position */}
          <div 
            className="relative w-[3px] h-full rounded-full bg-neutral-300 pointer-events-auto cursor-pointer flex-shrink-0"
            title="Jump to position"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickY = e.clientY - rect.top;
              const clickPercent = clickY / rect.height;
              window.scrollTo({
                top: (document.documentElement.scrollHeight - window.innerHeight) * clickPercent,
                behavior: 'smooth'
              });
            }}
          >
            {/* Smooth height progress bar fill */}
            <div 
              className="absolute top-0 left-0 w-full bg-neutral-950 origin-top rounded-full transition-all duration-75 ease-out"
              style={{ height: `${progress}%` }}
            />

            {/* Floating Editorial Section Indicators along the tracker line */}
            {sections.map((sec, idx) => {
              const isActive = idx === activeSectionIndex;
              return (
                <div
                  key={idx}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                  style={{ top: `${sec.topPercent}%` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.scrollTo({
                      top: sec.absoluteTop === 0 ? 0 : sec.absoluteTop - 80,
                      behavior: 'smooth'
                    });
                  }}
                >
                  {/* Circle dot tracker node */}
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div 
                      className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                        isActive 
                          ? 'bg-neutral-950 border-neutral-950 scale-125 shadow-sm' 
                          : 'bg-white border-neutral-400 group-hover:border-neutral-900 group-hover:scale-110'
                      }`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Section scroll control (below the track) */}
        <button
          onClick={scrollToNextSection}
          className="w-7 h-7 rounded-full bg-white/85 border border-[#D1D1D6]/40 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-2xs"
          title="Next Section"
          aria-label="Next Section"
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </>
  );
}
