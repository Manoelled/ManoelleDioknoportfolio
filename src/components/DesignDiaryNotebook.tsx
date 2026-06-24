import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Square } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'motion/react';

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  position: 'left' | 'right';
  bgClass?: string;
}

const Page = React.forwardRef<HTMLDivElement, PageProps & { children?: React.ReactNode }>((props, ref) => {
  const { position, bgClass, children, ...rest } = props;
  const textureClass = bgClass || (position === 'left' ? 'page-left-texture' : 'page-right-texture');

  return (
    <div 
      ref={ref} 
      {...rest}
      className={`relative h-full w-full select-none overflow-hidden bg-transparent ${rest.className || ''}`}
      style={rest.style}
    >
      {/* Inner container shifted slightly toward the center spine to ensure a seamless seam with absolute zero gap */}
      <div 
        className={`absolute inset-y-0 w-[calc(100%+1.5px)] ${textureClass} overflow-hidden`}
        style={{
          left: position === 'left' ? '0' : '-1.5px',
        }}
      >
        {children}
        {position === 'left' ? (
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-r from-transparent to-black/[0.035] pointer-events-none z-30" />
        ) : (
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-l from-transparent to-black/[0.035] pointer-events-none z-30" />
        )}
      </div>
    </div>
  );
});
Page.displayName = 'Page';

const clampToEllipse = (
  dx: number,
  dy: number,
  rx: number,
  ry: number
) => {
  const nx = dx / rx;
  const ny = dy / ry;
  const dist = Math.sqrt(nx * nx + ny * ny);
  if (dist <= 1) return { x: dx, y: dy };
  return { x: (nx / dist) * rx, y: (ny / dist) * ry };
};

const ChameleonSticker = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [leftOff, setLeftOff] = useState({ x: 0, y: 0 });
  const [rightOff, setRightOff] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();

      // Eye socket centers in screen space (adjusted for 227px display width - 40% larger)
      // = component rect origin + resting center + half iris size
      const eyes = {
        left:  { x: rect.left + 23.8, y: rect.top + 114.7, rx: 6.3, ry: 10.1 },
        right: { x: rect.left + 205.1, y: rect.top + 114.2, rx: 6.3, ry: 10.1 },
      };

      const calc = (eye: typeof eyes.left) => {
        const rawDx = e.clientX - eye.x;
        const rawDy = e.clientY - eye.y;
        // Soften: scale input so the iris doesn't slam to the edge immediately (timid movement)
        const softFactor = 0.16;
        return clampToEllipse(rawDx * softFactor, rawDy * softFactor, eye.rx, eye.ry);
      };

      setLeftOff(calc(eyes.left));
      setRightOff(calc(eyes.right));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%", rotate: 3 }}
      animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: 3 }}
      exit={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%", rotate: 3 }}
      transition={{ 
        opacity: { duration: 0.15, ease: "easeOut" },
        scale: { type: "spring", stiffness: 350, damping: 20 }
      }}
      style={{
        position: 'absolute',
        width: 227,
        left: '50%',
        top: '59.5%',
        filter: 'drop-shadow(2px 6px 14px rgba(0,0,0,0.22))',
        zIndex: 25,
      }}
    >
      <img
        src="/assets/images/Head.png"
        alt=""
        draggable={false}
        referrerPolicy="no-referrer"
        className="chameleon-head"
        style={{ width: 227, display: 'block' }}
      />
      <img
        src="/assets/images/Iris_L.png"
        alt=""
        draggable={false}
        referrerPolicy="no-referrer"
        style={{
          position: 'absolute',
          left: 11.2,
          top: 102.0,
          width: 25,
          height: 25,
          transform: `translate(${leftOff.x.toFixed(2)}px, ${leftOff.y.toFixed(2)}px)`,
          transition: 'transform 0.12s ease-out',
          pointerEvents: 'none',
        }}
      />
      <img
        src="/assets/images/Iris_R.png"
        alt=""
        draggable={false}
        referrerPolicy="no-referrer"
        style={{
          position: 'absolute',
          left: 191.8,
          top: 101.0,
          width: 27,
          height: 27,
          transform: `translate(${rightOff.x.toFixed(2)}px, ${rightOff.y.toFixed(2)}px)`,
          transition: 'transform 0.12s ease-out',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
};

export default function DesignDiaryNotebook() {
  const [currentSpread, setCurrentSpread] = useState(1);
  const [scale, setScale] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);

  // Responsive scaling to fit small screens without breaking 3D proportions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const targetWidth = 1118; // Expanded bounding box spacing (860 * 1.3)
        if (containerWidth < targetWidth) {
          setScale(containerWidth / targetWidth);
        } else {
          setScale(1);
        }
      }
    };
    handleResize();
    const timer = setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const totalSpreads = 5;

  const handleNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleJumpToSpread = (spreadNum: number) => {
    if (bookRef.current) {
      const pageIndex = (spreadNum - 1) * 2;
      bookRef.current.pageFlip().flip(pageIndex);
    }
  };

  const onFlip = (e: { data: number }) => {
    setCurrentSpread(Math.floor(e.data / 2) + 1);
  };

  const onChangeState = (e: { data: string }) => {
    if (e.data === 'flipping' || e.data === 'user_fold') {
      setIsFlipping(true);
    } else if (e.data === 'read') {
      setIsFlipping(false);
    }
  };

  // Helper custom items
  const Tape: React.FC<{ className?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ className = '', style, children }) => (
    <div 
      className={`absolute px-3 py-1 bg-white/45 backdrop-blur-[1.5px] border border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-[9px] uppercase font-mono tracking-wider text-neutral-600/80 z-[10] select-none tape-texture ${className}`}
      style={style}
    >
      {children}
    </div>
  );

  const Sticky: React.FC<{ 
    color?: string; 
    className?: string; 
    style?: React.CSSProperties; 
    children: React.ReactNode 
  }> = ({ color = '#FFF9C4', className = '', style, children }) => (
    <div 
      className={`absolute p-4 shadow-[2px_10px_16px_-4px_rgba(0,0,0,0.12),_0_2px_5px_-1px_rgba(0,0,0,0.06)] select-none sticky-preserve-3d ${className}`}
      style={{
        backgroundColor: color,
        ...style
      }}
    >
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 bg-black/5 sticky-corner-bg"
      />
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 shadow-[-2px_-2px_4px_rgba(0,0,0,0.08)] sticky-corner-fold"
        style={{
          backgroundColor: color,
          filter: 'brightness(0.92)',
        }}
      />
      <div className="font-sans text-[11px] leading-relaxed text-neutral-800 font-normal">
        {children}
      </div>
    </div>
  );

  const Polaroid: React.FC<{ 
    className?: string; 
    style?: React.CSSProperties; 
    title: string; 
    children?: React.ReactNode 
  }> = ({ className = '', style, title, children }) => (
    <div 
      className={`absolute p-3 pb-5 bg-[#FFFFFC] border border-neutral-200/60 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] select-none ${className}`}
      style={style}
    >
      <div className="w-full aspect-square bg-[#EAE8E2] border border-neutral-300/40 overflow-hidden relative flex items-center justify-center">
        {children}
      </div>
      <p className="font-serif italic text-[10px] text-neutral-600/90 text-center mt-3 tracking-wider">
        {title}
      </p>
    </div>
  );

  const NotepadChecklist: React.FC<{ 
    className?: string; 
    style?: React.CSSProperties; 
    title: string; 
    items: { label: string; checked: boolean }[] 
  }> = ({ className = '', style, title, items }) => (
    <div 
      className={`absolute bg-white border border-neutral-200 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12)] overflow-hidden select-none w-[190px] ${className}`}
      style={style}
    >
      <div className="h-4 bg-[#C23B3B] w-full border-b border-[#A62727] relative">
        <div className="absolute inset-x-0 bottom-[1px] h-[1px] bg-white/20" />
        <div className="absolute inset-x-0 bottom-[-3px] flex justify-around px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-neutral-300 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]" />
          ))}
        </div>
      </div>
      <div 
        className="p-3 pt-5 relative min-h-[145px] notepad-lines" 
      >
        <div className="absolute left-[24px] top-0 bottom-0 w-[1px] bg-red-300/40" />
        <div className="pl-4">
          <p className="font-mono font-bold text-[10px] text-neutral-400 tracking-wider mb-2 uppercase">{title}</p>
          <div className="space-y-1">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 py-0.5">
                {item.checked ? (
                  <Check className="w-3 h-3 text-[#1C6A4F] stroke-[3]" />
                ) : (
                  <Square className="w-3 h-3 text-neutral-400 stroke-[2]" />
                )}
                <span className={`font-sans text-[11px] leading-none ${item.checked ? 'text-neutral-400 line-through' : 'text-neutral-700'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Content rendering based on absolute page number
  const renderPageContent = (pageNum: number) => {
    switch (pageNum) {
      // SPREAD 1 (Pages 1 & 2)
      case 1:
        return (
          <div className="relative w-full h-full select-none" />
        );
      case 2:
        return (
          <div className="relative w-full h-full select-none">
            {/* Invisible overlap interactive button over the baked-in blue arrow button in NotebookPage2.png */}
            <button 
              onClick={handleNext}
              className="absolute bottom-[4.2rem] right-[2.2rem] w-[170px] h-[48px] bg-transparent border-0 opacity-0 cursor-pointer rounded-lg focus:outline-none z-10"
              title="Next spread"
            />
          </div>
        );

      // SPREAD 2 (Pages 3 & 4) - Architectural Grid Layouts (Clean page assets)
      case 3:
        return (
          <div className="relative w-full h-full select-none" />
        );
      case 4:
        return (
          <div className="relative w-full h-full select-none" />
        );

      // SPREAD 3 (Pages 5 & 6) - Clean page assets
      case 5:
        return (
          <div className="relative w-full h-full select-none" />
        );
      case 6:
        return (
          <div className="relative w-full h-full select-none" />
        );

      // SPREAD 4 (Pages 7 & 8) - Deliverables blueprint & tactical logs (Clean page assets)
      case 7:
        return (
          <div className="relative w-full h-full select-none" />
        );
      case 8:
        return (
          <div className="relative w-full h-full select-none" />
        );

      // SPREAD 5 (Pages 9 & 10) - New tactile exploration pages (Clean page assets)
      case 9:
        return (
          <div className="relative w-full h-full select-none" />
        );
      case 10:
        return (
          <div className="relative w-full h-full select-none" />
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="design-diary"
      className="relative w-full py-20 px-4 flex flex-col justify-center items-center bg-[#F5F5FA] border-t border-neutral-200 overflow-x-hidden"
    >
      {/* Decorative Blueprint Background Grid markings */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#2C2217 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-4xl w-full text-center mb-12 relative z-10 px-4">
        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-none mb-4 uppercase">
          DESIGN MANIFESTO
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed font-normal">
          A collection of ideas, principles, experiments, and observations that shape the way I approach creative work. Explore my thought process, design philosophies, and studies across different visual styles and disciplines.
        </p>
      </div>

      {/* Main scaling context wrapper */}
      <div 
        ref={containerRef}
        className="w-full max-w-[1118px] flex justify-center items-center select-none transition-all duration-300"
        style={{ minHeight: `${593.6 * scale}px`, height: `${593.6 * scale}px` }}
      >
        <div 
          className="relative transition-transform duration-300 ease-out origin-center flex-shrink-0"
          style={{
            width: '1092px',
            minWidth: '1092px',
            maxWidth: '1092px',
            aspectRatio: '2789 / 1516',
            transform: `scale(${scale})`,
          }}
        >
          {/* Ambient Rectangular Gradient Shadow behind the notebook cover */}
          <div 
            className="absolute -inset-y-5 -inset-x-10 rounded-[30px] pointer-events-none z-[-1]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(20, 20, 25, 0.12) 0%, rgba(20, 20, 25, 0.08) 60%, rgba(20, 20, 25, 0.01) 90%, transparent 100%)',
              filter: 'blur(20px)',
            }}
          />
          <div 
            className="absolute inset-[3%] rounded-[12px] pointer-events-none z-[-2]"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.18) 100%)',
              filter: 'blur(30px)',
              transform: 'translateY(12px)',
            }}
          />

          {/* Cover layer with realistic user-uploaded NotebookCover.png as the cover texture behind the pages */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: 'url("/assets/images/NotebookCover.png")',
              backgroundPosition: 'center',
            }}
          />

          {/* Opened Pages Area Container (Z-INDEX: 5) - Configured with percentage-based bounds aligned precisely to the real NotebookCover.png layout constraints */}
          <div 
            className="absolute z-[5] bg-transparent"
            style={{
              left: '2.9%',
              right: '4.9%',
              top: '2.2%',
              bottom: '1.8%',
            }}
          >
            <HTMLFlipBook
              ref={bookRef}
              width={503}
              height={569}
              size="stretch"
              minWidth={503}
              maxWidth={503}
              minHeight={569}
              maxHeight={569}
              drawShadow={true}
              flippingTime={600}
              useMouseEvents={true}
              swipeDistance={30}
              showCover={false}
              usePortrait={false}
              onFlip={onFlip}
              onChangeState={onChangeState}
              style={{
                width: '100%',
                height: '100%',
              }}
              className="bg-transparent"
            >
              <Page position="left" bgClass="page-1-texture">
                {renderPageContent(1)}
              </Page>
              <Page position="right" bgClass="page-2-texture">
                {renderPageContent(2)}
              </Page>
              <Page position="left" bgClass="page-3-texture">
                {renderPageContent(3)}
              </Page>
              <Page position="right" bgClass="page-4-texture">
                {renderPageContent(4)}
              </Page>
              <Page position="left" bgClass="page-5-texture">
                {renderPageContent(5)}
              </Page>
              <Page position="right" bgClass="page-6-texture">
                {renderPageContent(6)}
              </Page>
              <Page position="left" bgClass="page-7-texture">
                {renderPageContent(7)}
              </Page>
              <Page position="right" bgClass="page-8-texture">
                {renderPageContent(8)}
              </Page>
              <Page position="left" bgClass="page-9-texture">
                {renderPageContent(9)}
              </Page>
              <Page position="right" bgClass="page-10-texture">
                {renderPageContent(10)}
              </Page>
            </HTMLFlipBook>

            {/* Chameleon Sticker centered on the spine - only visible when currentSpread === 1 and not flipping */}
            <AnimatePresence>
              {!isFlipping && currentSpread === 1 && (
                <ChameleonSticker />
              )}
            </AnimatePresence>

            {/* Center spine division and crease overlay (above contents) */}
            <div className="absolute inset-y-0 left-[50%] w-[1px] bg-black/[0.06] z-20 pointer-events-none" />
            <div className="absolute inset-y-0 left-[50%] -translate-x-1/2 w-[16px] bg-gradient-to-r from-black/[0.035] via-transparent to-black/[0.035] z-20 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Style Selector Buttons - Reworked with rounded pills, Inter (font-sans), and elegant hover states */}
      <div className="flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto mt-10 relative z-10 px-4">
        {[
          { label: 'Core Principles', spread: 1 },
          { label: 'Modern Journalism', spread: 2 },
          { label: 'Grunge Print', spread: 3 },
          { label: 'Liquid Morphism', spread: 4 },
          { label: 'Cybercigilism', spread: 5 },
          { label: 'Asian Core', spread: null, status: 'Not yet there' },
        ].map((item, index) => {
          const isActive = item.spread !== null && currentSpread === item.spread;
          const isComingSoon = item.spread === null;
          
          return (
            <button
              key={index}
              disabled={isComingSoon}
              onClick={() => item.spread && handleJumpToSpread(item.spread)}
              className={`
                px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-300 flex items-center gap-2 border
                ${isActive 
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-105' 
                  : isComingSoon
                    ? 'bg-neutral-100/50 text-neutral-400 border-neutral-200/40 cursor-not-allowed opacity-50 border-dashed'
                    : 'bg-white text-neutral-600 border-neutral-200/80 hover:border-neutral-400 hover:text-neutral-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                }
              `}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              <span>{item.label}</span>
              {isComingSoon && (
                <span className="text-[9px] uppercase tracking-wider bg-neutral-200/60 text-neutral-500 px-1.5 py-0.5 rounded-full scale-[0.85] font-bold">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tactile page navigation controls with spread indicator */}
      <div className="flex items-center gap-6 mt-6 bg-white px-5 py-2.5 rounded-full border border-neutral-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.03)] relative z-10">
        <button
          onClick={handlePrev}
          disabled={currentSpread === 1}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-neutral-200 text-neutral-600 hover:bg-neutral-50 active:scale-95 disabled:opacity-35 disabled:hover:bg-transparent disabled:active:scale-100 transition-all duration-200 cursor-pointer"
          aria-label="Previous Page"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        <span className="font-mono text-xs text-neutral-400 font-bold tracking-wider select-none">
          SPREAD <span className="text-[#0D5C46]">{currentSpread}</span> / {totalSpreads}
        </span>

        <button
          onClick={handleNext}
          disabled={currentSpread === totalSpreads}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-neutral-200 text-neutral-600 hover:bg-neutral-50 active:scale-95 disabled:opacity-35 disabled:hover:bg-transparent disabled:active:scale-100 transition-all duration-200 cursor-pointer"
          aria-label="Next Page"
        >
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}
