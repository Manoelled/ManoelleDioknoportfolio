import React, { useEffect, useState, useRef } from 'react';
import AppImage from './ui/AppImage';

interface HeroCard {
  id: string;
  name: string;
  src: string;
}

const HERO_CARDS: HeroCard[] = [
  {
    id: 'queen',
    name: 'Queen of Hearts',
    src: '/assets/images/cards/CardsectionQueen.png',
  },
  {
    id: 'king',
    name: 'King of Spades',
    src: '/assets/images/cards/CardsectionKing.png',
  },
  {
    id: 'ace',
    name: 'Ace of Clubs',
    src: '/assets/images/cards/CardsectionAce.png',
  },
  {
    id: 'jack',
    name: 'Jack of Diamonds',
    src: '/assets/images/cards/CardsectionJack.png',
  },
  {
    id: 'joker',
    name: 'Joker',
    src: '/assets/images/cards/CardsectionJoker.png',
  },
];

// 3D stacked layout positions arranged in an expansive left-to-right line with field-of-view depth layering
interface PositionStyle {
  translateX: number;
  translateY: number;
  scale: number;
  rotate: number;
  translateZ: number;
  zIndex: number;
  filter: string;
  opacity: number;
  boxShadow: string;
}

const POSITIONS: PositionStyle[] = [
  // Slot 0 (Active Front-Left): Sharp, largest scale, spaced beautifully
  {
    translateX: -95,
    translateY: -15,
    scale: 1.22,
    rotate: 1,
    translateZ: 100,
    zIndex: 50,
    filter: 'blur(0px) saturate(1.08)',
    opacity: 1,
    boxShadow: '0 34px 75px -10px rgba(0,0,0,0.22), 0 15px 35px -15px rgba(0,0,0,0.18)',
  },
  // Slot 1 (Next Active): Spaced tightly to the right
  {
    translateX: 10,
    translateY: 5,
    scale: 1.02,
    rotate: -2,
    translateZ: 40,
    zIndex: 40,
    filter: 'blur(1.5px) saturate(0.96)',
    opacity: 0.90,
    boxShadow: '0 20px 48px -12px rgba(0,0,0,0.16)',
  },
  // Slot 2: Tighter mid-right alignment
  {
    translateX: 95,
    translateY: 20,
    scale: 0.88,
    rotate: 3,
    translateZ: -20,
    zIndex: 30,
    filter: 'blur(3px) saturate(0.88)',
    opacity: 0.74,
    boxShadow: '0 12px 32px -10px rgba(0,0,0,0.12)',
  },
  // Slot 3: Tighter far-right group
  {
    translateX: 170,
    translateY: 35,
    scale: 0.76,
    rotate: -4,
    translateZ: -60,
    zIndex: 20,
    filter: 'blur(5px) saturate(0.80)',
    opacity: 0.58,
    boxShadow: '0 8px 22px -8px rgba(0,0,0,0.09)',
  },
  // Slot 4: Elegant distant deck tail sitting far right
  {
    translateX: 240,
    translateY: 50,
    scale: 0.66,
    rotate: 6,
    translateZ: -100,
    zIndex: 10,
    filter: 'blur(7px) saturate(0.70)',
    opacity: 0.38,
    boxShadow: '0 4px 14px -6px rgba(0,0,0,0.07)',
  },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoShuffleTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Continuous linear shuffling intervals of 5 seconds
  useEffect(() => {
    if (!isHovered) {
      autoShuffleTimer.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % HERO_CARDS.length);
      }, 5000);
    }
    return () => {
      if (autoShuffleTimer.current) {
        clearInterval(autoShuffleTimer.current);
      }
    };
  }, [isHovered]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      className="relative min-h-[96vh] flex flex-col justify-between px-6 lg:px-16 pt-32 pb-12 z-10 w-full overflow-hidden bg-[#fafafa]"
      style={{
        boxShadow: 'inset 0 -120px 140px -90px rgba(0,0,0,0.06)',
      }}
      aria-label="Manoelle Diokno portfolio welcome"
    >
      {/* Subtle bottom-to-top custom gradient overlay simulation inside shadow */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/[0.02] to-transparent pointer-events-none z-0" />

      {/* Dynamic responsive styles for perfect deck offset variable */}
      <style>{`
        :root {
          --card-offset-x: -30px;
          --slot-x-0: 0px;
          --slot-x-1: 72px;
          --slot-x-2: 135px;
          --slot-x-3: -135px;
          --slot-x-4: -72px;
          
          --slot-y-0: -15px;
          --slot-y-1: 5px;
          --slot-y-2: 18px;
          --slot-y-3: 18px;
          --slot-y-4: 5px;
          
          --slot-scale-0: 1.16;
          --slot-scale-1: 0.95;
          --slot-scale-2: 0.76;
          --slot-scale-3: 0.76;
          --slot-scale-4: 0.95;
          
          --slot-rotate-0: 0deg;
          --slot-rotate-1: 4deg;
          --slot-rotate-2: 8deg;
          --slot-rotate-3: -8deg;
          --slot-rotate-4: -4deg;
        }
        @media (min-width: 640px) {
          :root {
            --card-offset-x: 0px;
            --slot-x-0: 0px;
            --slot-x-1: 105px;
            --slot-x-2: 200px;
            --slot-x-3: -200px;
            --slot-x-4: -105px;
            
            --slot-y-0: -20px;
            --slot-y-1: 5px;
            --slot-y-2: 22px;
            --slot-y-3: 22px;
            --slot-y-4: 5px;
            
            --slot-scale-0: 1.22;
            --slot-scale-1: 0.98;
            --slot-scale-2: 0.78;
            --slot-scale-3: 0.78;
            --slot-scale-4: 0.98;
            
            --slot-rotate-0: 0deg;
            --slot-rotate-1: 4deg;
            --slot-rotate-2: 8deg;
            --slot-rotate-3: -8deg;
            --slot-rotate-4: -4deg;
          }
        }
        @media (min-width: 1024px) {
          :root {
            --card-offset-x: 230px;
            --slot-x-0: -95px;
            --slot-x-1: 10px;
            --slot-x-2: 95px;
            --slot-x-3: 170px;
            --slot-x-4: 240px;
            
            --slot-y-0: -15px;
            --slot-y-1: 5px;
            --slot-y-2: 20px;
            --slot-y-3: 35px;
            --slot-y-4: 50px;
            
            --slot-scale-0: 1.22;
            --slot-scale-1: 1.02;
            --slot-scale-2: 0.88;
            --slot-scale-3: 0.76;
            --slot-scale-4: 0.66;
            
            --slot-rotate-0: 1deg;
            --slot-rotate-1: -2deg;
            --slot-rotate-2: 3deg;
            --slot-rotate-3: -4deg;
            --slot-rotate-4: 6deg;
          }
        }
        @media (min-width: 1280px) {
          :root {
            --card-offset-x: 290px;
          }
        }
      `}</style>

      {/* Grid container configured with left-aligned typographic column and expansive cards canvas */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative overflow-visible">
        
        {/* Left Side: All Caps High-Contrast Helvetica Typography */}
        <div 
          className="lg:col-span-3 flex flex-col text-left select-none relative z-10 lg:-ml-16 xl:-ml-32 order-2 lg:order-1"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <div className="flex flex-col">
            <h1
              className="text-[clamp(2.8rem,14vw,10.5rem)] font-normal uppercase text-black select-none tracking-[-0.08em]"
              style={{
                lineHeight: '0.8',
                fontFamily: '"Helvetica Neue", Helvetica, "SF Pro Display", -apple-system, sans-serif',
              }}
            >
              MANOELLE
            </h1>
            <h1
              className="text-[clamp(2.8rem,14vw,10.5rem)] font-normal uppercase text-black select-none tracking-[-0.08em] mt-[0.02em]"
              style={{
                lineHeight: '0.8',
                fontFamily: '"Helvetica Neue", Helvetica, "SF Pro Display", -apple-system, sans-serif',
              }}
            >
              DIOKNO
            </h1>
          </div>
        </div>

        {/* Right Side: Vast 3D Left-to-Right Horizontal Card Queue Canvas */}
        <div 
          className="lg:col-span-9 w-full h-[400px] sm:h-[480px] lg:h-[540px] relative overflow-visible flex items-center justify-center select-none order-1 lg:order-2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.96)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ambient organic background drop shadow to neutralize white-on-white structures */}
          <div className="absolute w-[95%] max-w-[620px] h-[360px] bg-neutral-900/[0.06] rounded-full blur-[72px] pointer-events-none -translate-y-4 z-0" />

          {/* Perspective wrapping viewport supporting wide horizontal translations */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-visible"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {HERO_CARDS.map((card, i) => {
              // Calculate specific slot sequence alignment in the left-to-right horizontal pipeline
              const slot = (i - activeIndex + HERO_CARDS.length) % HERO_CARDS.length;
              const slotStyle = POSITIONS[slot];

              const isFront = slot === 0;

              return (
                <div
                  key={card.id}
                  id={`hero-card-${card.id}`}
                  onClick={() => handleCardClick(i)}
                  className="absolute cursor-pointer select-none transition-all duration-[1350ms] ease-[cubic-bezier(0.16,1,0.25,1)]"
                  style={{
                    width: 'clamp(170px, 21vw, 225px)',
                    aspectRatio: '130/182',
                    zIndex: slotStyle.zIndex,
                    transform: `translateX(calc(var(--slot-x-${slot}) + var(--card-offset-x))) translateY(var(--slot-y-${slot})) scale(var(--slot-scale-${slot})) rotate(var(--slot-rotate-${slot})) translateZ(${slotStyle.translateZ}px)`,
                    opacity: slotStyle.opacity,
                    filter: slotStyle.filter,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="w-full h-full rounded-[14px] bg-white border border-neutral-200/45 select-none overflow-hidden transition-all duration-500"
                    style={{ 
                      boxShadow: slotStyle.boxShadow,
                    }}
                  >
                    <AppImage
                      src={card.src}
                      alt={card.name}
                      className={`w-full h-full object-cover pointer-events-none select-none rounded-[14px] transition-transform duration-500 ${
                        isFront ? 'hover:scale-[1.04]' : ''
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Button footer elements */}
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 mb-2 z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
        }}
      >
        <a
          href="#portfolio"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white text-sm font-semibold tracking-tight hover:scale-105 active:scale-98 shadow-xs transition-all duration-300 text-center"
        >
          View Projects
        </a>
        <a
          href="#social-feed"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 text-neutral-800 text-sm font-semibold tracking-tight hover:border-neutral-900 hover:bg-neutral-50 hover:scale-105 active:scale-98 transition-all duration-300 text-center flex items-center justify-center gap-2"
        >
          <span>View Social Media Work</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-700"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
