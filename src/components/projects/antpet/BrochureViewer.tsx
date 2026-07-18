import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import { RotateCw, ArrowRightLeft, ZoomIn, ZoomOut, Maximize2, Eye } from 'lucide-react';

export default function BrochureViewer() {
  // Fold states: true = open/unfolded (0deg), false = closed/folded (110deg or -110deg)
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrontView, setIsFrontView] = useState(false);

  // Sizing & Zoom states
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(720);
  const [userZoom, setUserZoom] = useState(1);

  // Pan states using framer motion value for high performance & buttery-smooth dragging
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const [hasPanned, setHasPanned] = useState(false);

  // Measure container width for dynamic automatic fitting
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width || 720);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute dynamic automatic scale to perfectly fit the flyer's physical width inside the container
  // Baseline Center panel width = 240px.
  // Left Panel adds 240px if fully open, or 0px if folded completely closed.
  // Right Panel adds 240px if fully open, or 0px if folded completely closed.
  const leftSpan = leftOpen ? 240 : 0;
  const rightSpan = rightOpen ? 240 : 0;
  const brochureSpan = 240 + leftSpan + rightSpan;

  // Baseline open fit scale & dynamic scale
  const fitUnfoldedScale = Math.min(1.8, Math.max(0.45, (containerWidth - 48) / 720));
  const autoScale = Math.min(2.2, Math.max(0.35, (containerWidth - 48) / brochureSpan));

  // If the user has manually zoomed, preserve their zoom and lock the baseline scale to avoid jumps
  const isManualZoom = Math.abs(userZoom - 1) > 0.01;
  const currentScale = isManualZoom ? (fitUnfoldedScale * userZoom) : autoScale;

  // Wheel zoom (PC) and Pinch zoom (Mobile)
  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;

    // Track user zoom ref to allow reading inside standard events without rebuilds
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomIntensity = 0.05;
      const delta = e.deltaY < 0 ? 1 : -1;
      setUserZoom((prev) => Math.min(3.0, Math.max(0.5, prev + delta * zoomIntensity)));
    };

    let initialDist = 0;
    let initialZoom = 1;

    const getTouchDist = (touches: TouchList) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDist = getTouchDist(e.touches);
        initialZoom = userZoom;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDist > 0) {
        e.preventDefault();
        const dist = getTouchDist(e.touches);
        if (dist > 0) {
          const ratio = dist / initialDist;
          setUserZoom(Math.min(3.0, Math.max(0.5, initialZoom * ratio)));
        }
      }
    };

    const handleTouchEnd = () => {
      initialDist = 0;
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [userZoom]);

  // Toggle helpers
  const toggleLeft = () => setLeftOpen(!leftOpen);
  const toggleRight = () => setRightOpen(!rightOpen);
  
  const unfoldAll = () => {
    setLeftOpen(true);
    setRightOpen(true);
  };

  const foldAll = () => {
    setLeftOpen(false);
    setRightOpen(false);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const resetManualZoom = () => {
    setUserZoom(1);
    animate(panX, 0, { type: "spring", stiffness: 200, damping: 25 });
    animate(panY, 0, { type: "spring", stiffness: 200, damping: 25 });
    setHasPanned(false);
  };

  // Fold all the way in: Right panel folds flat first (-178deg), Left panel folds flat over it (174deg) to sit on the front
  const leftAngle = leftOpen ? 0 : 174;
  const rightAngle = rightOpen ? 0 : -178;

  // Perfect 3D visibility gating to eliminate bleed-through and overlap artifacts
  const isCenterFrontVisible = !isFlipped;
  const isCenterBackVisible = isFlipped;

  const isLeftFrontVisible = !isFlipped && leftOpen;
  const isLeftBackVisible = isFlipped ? leftOpen : !leftOpen;

  const isRightFrontVisible = !isFlipped && rightOpen;
  const isRightBackVisible = isFlipped ? rightOpen : !rightOpen;

  // Dynamic z-index and pointer-events to prevent click blocking when folded
  const leftZIndex = (!leftOpen && !rightOpen && !isFlipped) ? 20 : 10;
  const rightZIndex = (!leftOpen && !rightOpen && !isFlipped) ? 5 : (!rightOpen ? 12 : 10);
  
  const leftPointerEvents = (isFlipped && !leftOpen) ? 'none' : 'auto';
  const rightPointerEvents = (!leftOpen && !rightOpen && !isFlipped) ? 'none' : 'auto';

  return (
    <div ref={containerRef} className="flex-1 flex flex-col bg-white text-neutral-800 font-sans select-none min-h-[500px] relative justify-between py-8 sm:py-12 px-4">
      {/* Zoom HUD Reset Indicator */}
      {(isManualZoom || hasPanned) && (
        <button
          onClick={resetManualZoom}
          className="absolute top-4 right-4 z-30 px-3 py-1.5 bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-500 border border-neutral-300 rounded-none font-mono text-[9px] uppercase tracking-widest transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Maximize2 className="w-2.5 h-2.5 text-neutral-400" />
          <span>Reset View & Zoom {isManualZoom ? `(${Math.round(userZoom * 100)}%)` : ''}</span>
        </button>
      )}

      {/* Centered 3D Simulator Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[380px] w-full overflow-hidden">
        
        {/* Panning Container */}
        <motion.div
          drag
          dragMomentum={true}
          dragElastic={0.15}
          style={{ x: panX, y: panY }}
          onDragEnd={() => {
            if (Math.abs(panX.get()) > 5 || Math.abs(panY.get()) > 5) {
              setHasPanned(true);
            }
          }}
          className="w-full h-full flex items-center justify-center absolute inset-0 cursor-grab active:cursor-grabbing select-none"
        >
          {/* CSS 3D PERSPECTIVE SCENE */}
          <div 
            ref={sceneRef}
            className="w-full max-w-4xl flex items-center justify-center z-1 transition-transform duration-500 ease-out"
            style={{ 
              perspective: '2000px',
              transform: `scale(${currentScale})`
            }}
          >
          {/* Main Rotatable Brochure Container */}
          <div 
            className="relative flex items-center justify-center transition-transform duration-1000 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFrontView
                ? `rotateX(0deg) rotateY(${isFlipped ? '180deg' : '0deg'}) rotateZ(0deg)`
                : `rotateX(14deg) rotateY(${isFlipped ? '180deg' : '0deg'}) rotateZ(-2deg)`,
              width: '260px',
              height: '586px'
            }}
          >
            
            {/* =======================================================
                CENTER PANEL (Stationary Base)
                ======================================================= */}
            <div 
              className="absolute w-[240px] h-[556px] bg-[#FAF9F6] border border-neutral-300 shadow-xl transition-all duration-500 select-none cursor-default"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.15), inset 0 0 12px rgba(0,0,0,0.02)'
              }}
            >
              {/* Corner alignment marks */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-300" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-300" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-300" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-300" />

              {/* Front of Center Panel (Interior Center) */}
              <div 
                className="absolute inset-0 flex flex-col justify-between p-5 text-neutral-800"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(1px)', // Small positive offset to eliminate all z-fighting
                  opacity: isCenterFrontVisible ? 1 : 0,
                  visibility: isCenterFrontVisible ? 'visible' : 'hidden',
                  transition: 'opacity 500ms ease-out, visibility 500ms ease-out'
                }}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 font-semibold block">[02 / CENTER SPREAD]</span>
                  <div className="w-full h-[1px] bg-neutral-200 mt-2" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold tracking-tight text-neutral-900 leading-tight uppercase">Center Segment</h3>
                  <p className="text-[10px] text-neutral-400 leading-relaxed font-mono">
                    This stationary panel provides the visual anchor for the 3-fold presentation. Folds on both left and right edges hinge outward to create a continuous flat spread.
                  </p>
                </div>
                <div className="font-mono text-[8px] text-neutral-400 flex justify-between items-center">
                  <span>SPEC: ANTPET</span>
                  <span>BASE GEOMETRY</span>
                </div>
              </div>

              {/* Back of Center Panel (Outside Center) */}
              <div 
                className="absolute inset-0 flex flex-col justify-between p-5 text-neutral-800 bg-[#FAF9F6] border border-neutral-300"
                style={{
                  transform: 'rotateY(180deg) translateZ(1px)', // Rotated & offset
                  backfaceVisibility: 'hidden',
                  opacity: isCenterBackVisible ? 1 : 0,
                  visibility: isCenterBackVisible ? 'visible' : 'hidden',
                  transition: 'opacity 500ms ease-out, visibility 500ms ease-out'
                }}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 font-semibold block">[BACKSIDE // CENTER]</span>
                  <div className="w-full h-[1px] bg-neutral-200 mt-2" />
                </div>
                <div className="text-center py-4">
                  <div className="w-10 h-10 rounded-full border border-neutral-300 mx-auto flex items-center justify-center font-mono text-xs text-neutral-500 font-bold mb-2">
                    ANP
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block text-neutral-800">Art Direction Lab</span>
                </div>
                <div className="font-mono text-[8px] text-neutral-450 flex justify-between items-center">
                  <span>OUTSIDE ADVERTISING</span>
                  <span>VOL. 042</span>
                </div>
              </div>


              {/* =======================================================
                  LEFT PANEL (Left Hinge Fold)
                  ======================================================= */}
              <div 
                onClick={toggleLeft}
                className="absolute top-[-1px] -left-[239px] w-[240px] h-[558px] origin-right transition-all duration-700 ease-out cursor-pointer select-none group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${leftAngle}deg)`,
                  backfaceVisibility: 'hidden',
                  left: '-239px',
                  zIndex: leftZIndex,
                  pointerEvents: leftPointerEvents as any
                }}
              >
                {/* Visual seam highlighting */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-r from-transparent to-neutral-200/30 pointer-events-none" />

                {/* Left Panel FRONT (Interior Left spread when unfolded) */}
                <div 
                  className="absolute inset-0 flex flex-col justify-between p-5 text-neutral-800 bg-[#FAF9F6] border border-neutral-300"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(1px)', // Small positive offset
                    opacity: isLeftFrontVisible ? 1 : 0,
                    visibility: isLeftFrontVisible ? 'visible' : 'hidden',
                    transition: 'opacity 700ms ease-out, visibility 700ms ease-out'
                  }}
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 font-semibold block">[01 / LEFT FLAP]</span>
                    <div className="w-full h-[1px] bg-neutral-200 mt-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-neutral-800 rounded-none" />
                      <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-900">Left Segment</h4>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-relaxed font-mono">
                      Interactive door hinge layout. Pressing this panel folds it completely flat to act as the primary front cover of the brochure.
                    </p>
                  </div>
                  <div className="font-mono text-[8px] text-neutral-400 flex justify-between items-center">
                    <span>SEAM 1A</span>
                    <span>CLICK TO CLOSE</span>
                  </div>
                </div>

                {/* Left Panel BACK (This forms the main OUTER COVER when brochure is folded!) */}
                <div 
                  className="absolute inset-0 flex flex-col justify-between p-5 text-neutral-800 bg-[#FAF9F6] border border-neutral-300"
                  style={{
                    transform: leftOpen ? 'rotateY(180deg) translateZ(1px)' : 'rotateY(180deg) translateZ(2px)',
                    backfaceVisibility: 'hidden',
                    opacity: isLeftBackVisible ? 1 : 0,
                    visibility: isLeftBackVisible ? 'visible' : 'hidden',
                    transition: 'opacity 700ms ease-out, visibility 700ms ease-out, transform 700ms ease-out'
                  }}
                >
                  {/* Left Fold Indicator when folded */}
                  <AnimatePresence>
                    {!leftOpen && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-neutral-900/[0.02] hover:bg-neutral-900/[0.05] transition-colors flex items-center justify-center z-10"
                      >
                        <div className="bg-white/95 border border-neutral-200 shadow-sm px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-neutral-800 font-bold pointer-events-none rounded-none flex items-center gap-1.5">
                          <span>Press to Unfold Left</span>
                          <span className="inline-block animate-bounce">→</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-x-4 top-1/4 h-[1px] bg-neutral-200/80" />
                  <div className="space-y-2">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-amber-600 font-bold block">[OUTSIDE COVER // FLAP]</span>
                    <h3 className="text-base font-bold text-neutral-900 leading-tight tracking-tight uppercase">
                      AntPet Flyer V.1
                    </h3>
                    <p className="text-[9px] text-neutral-450 leading-relaxed font-mono pt-1">
                      Designed with zero border-radius substrates and meticulous print proportions.
                    </p>
                  </div>
                  <div className="font-mono text-[8px] text-neutral-400 flex justify-between items-center pt-4 border-t border-neutral-100">
                    <span>ANTPET.COM</span>
                    <span>FLAP_OUT_COVER</span>
                  </div>
                </div>

              </div>


              {/* =======================================================
                  RIGHT PANEL (Right Hinge Fold)
                  ======================================================= */}
              <div 
                onClick={toggleRight}
                className="absolute top-[-1px] -right-[239px] w-[240px] h-[558px] origin-left transition-all duration-700 ease-out cursor-pointer select-none group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: rightOpen 
                    ? `rotateY(${rightAngle}deg)` 
                    : `rotateY(${rightAngle}deg) translateY(1.5px) translateX(-2px)`,
                  backfaceVisibility: 'hidden',
                  right: '-239px',
                  zIndex: rightZIndex,
                  pointerEvents: rightPointerEvents as any
                }}
              >
                {/* Visual seam highlighting */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-l from-transparent to-neutral-200/30 pointer-events-none" />

                {/* Right Panel FRONT (Interior Right spread when unfolded) */}
                <div 
                  className="absolute inset-0 flex flex-col justify-between p-5 text-neutral-800 bg-[#FAF9F6] border border-neutral-300"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(1px)', // Small positive offset
                    opacity: isRightFrontVisible ? 1 : 0,
                    visibility: isRightFrontVisible ? 'visible' : 'hidden',
                    transition: 'opacity 700ms ease-out, visibility 700ms ease-out'
                  }}
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 font-semibold block">[03 / RIGHT FLAP]</span>
                    <div className="w-full h-[1px] bg-neutral-200 mt-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 border border-neutral-800 rounded-none" />
                      <h4 className="text-xs font-bold tracking-wider uppercase text-neutral-900">Right Segment</h4>
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-relaxed font-mono">
                      Symmetrical door hinge alignment. Pressing this panel rotates it outwards. When both panels are open, the flyer displays the complete front panorama.
                    </p>
                  </div>
                  <div className="font-mono text-[8px] text-neutral-400 flex justify-between items-center">
                    <span>SEAM 1B</span>
                    <span>CLICK TO CLOSE</span>
                  </div>
                </div>

                {/* Right Panel BACK */}
                <div 
                  className="absolute inset-0 flex flex-col justify-between p-5 text-neutral-850 bg-[#FAF9F6] border border-neutral-300"
                  style={{
                    transform: rightOpen ? 'rotateY(180deg) translateZ(1px)' : 'rotateY(180deg) translateZ(-8px)',
                    backfaceVisibility: 'hidden',
                    opacity: isRightBackVisible ? 1 : 0,
                    visibility: isRightBackVisible ? 'visible' : 'hidden',
                    transition: 'opacity 700ms ease-out, visibility 700ms ease-out, transform 700ms ease-out'
                  }}
                >
                  {/* Right Fold Indicator when folded */}
                  <AnimatePresence>
                    {!rightOpen && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-neutral-900/[0.02] hover:bg-neutral-900/[0.05] transition-colors flex items-center justify-center z-10"
                      >
                        <div className="bg-white/95 border border-neutral-200 shadow-sm px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-neutral-800 font-bold pointer-events-none rounded-none flex items-center gap-1.5">
                          <span className="inline-block animate-bounce">←</span>
                          <span>Press to Unfold Right</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 font-semibold block">[OUTSIDE COVER // BACK FLAP]</span>
                    <div className="w-6 h-0.5 bg-amber-500 rounded-none" />
                    <p className="text-[9px] text-neutral-450 leading-relaxed font-mono pt-2">
                      Precision layout grid for architectural, catalog, and creative presentations. Press to unfold and inspect the internal details.
                    </p>
                  </div>
                  <div className="font-mono text-[8px] text-neutral-400 flex justify-between items-center pt-4 border-t border-neutral-100">
                    <span>ALIGN: PASSIVE</span>
                    <span>BACK_COVER_FOLD</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
        </motion.div>

      </div>

      {/* MINIMAL BOTTOM BAR FOR CONTROLS */}
      <div className="flex flex-col items-center justify-center gap-3 mt-6 z-10">
        <p className="text-[10px] text-neutral-400 font-mono tracking-wide text-center">
          ✨ Use Scroll Wheel or Pinch with 2 Fingers to Zoom • Drag or tap flaps to fold/unfold
        </p>

        <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
          {/* Zoom controls for convenience */}
          <div className="flex items-center border border-neutral-300 bg-white shadow-sm overflow-hidden divide-x divide-neutral-200">
            <button
              onClick={() => setUserZoom((prev) => Math.max(0.5, prev - 0.1))}
              className="p-2.5 hover:bg-neutral-50 text-neutral-600 transition-all cursor-pointer active:scale-95"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 font-mono text-[10px] text-neutral-500 font-bold min-w-[48px] text-center">
              {Math.round(userZoom * 100)}%
            </span>
            <button
              onClick={() => setUserZoom((prev) => Math.min(3.0, prev + 0.1))}
              className="p-2.5 hover:bg-neutral-50 text-neutral-600 transition-all cursor-pointer active:scale-95"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={toggleFlip}
            className="px-5 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 shadow-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5 text-neutral-500" />
            <span>{isFlipped ? "Show Interior View" : "Flip to Behind"}</span>
          </button>

          <button
            onClick={() => setIsFrontView(!isFrontView)}
            className={`px-5 py-2.5 shadow-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border ${
              isFrontView 
                ? "bg-neutral-100 border-neutral-400 text-neutral-900 font-extrabold" 
                : "bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-neutral-500" />
            <span>{isFrontView ? "Angled View" : "Front View"}</span>
          </button>

          <button
            onClick={leftOpen && rightOpen ? foldAll : unfoldAll}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-white shadow-md text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
            <span>{leftOpen && rightOpen ? "Fold All Panels" : "Unfold All Panels"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}