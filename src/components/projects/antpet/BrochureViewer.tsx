import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
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

  // Fold angles & local Z offsets:
  // Right panel folds underneath first (-178deg)
  // Left panel folds over on top (175deg)
  const rightAngle = rightOpen ? 0 : -178;
  const leftAngle = leftOpen ? 0 : 175;

  // Boosted local Z-offsets when folded:
  // In local panel coordinates after rotateY(~180deg), negative translateZ pushes the panel forward toward the camera.
  // Right panel sits at -8px (in front of center panel).
  // Left panel sits at -16px (in front of right panel).
  const rightZ = rightOpen ? '0px' : '-8px';
  const leftZ = leftOpen ? '0px' : (rightOpen ? '-8px' : '-16px');

  // Dynamic zIndex ensures proper compositing order during 3D transforms
  const rightZIndex = rightOpen ? 2 : 10;
  const leftZIndex = leftOpen ? 2 : (rightOpen ? 12 : 20);

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
              className="absolute w-[240px] h-[556px] border border-neutral-300 shadow-2xl transition-all duration-500 select-none cursor-default bg-white"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(0px)',
                zIndex: 1,
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.18)'
              }}
            >
              {/* Front of Center Panel (Inside Center) */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-white"
                style={{
                  backgroundImage: `url("/flyer_in_center.png")`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(2px)'
                }}
              />

              {/* Back of Center Panel (Outside Center) */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat border border-neutral-300/50 bg-white"
                style={{
                  backgroundImage: `url("/flyer_out_center.png")`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(2px)'
                }}
              />

              {/* =======================================================
                  LEFT PANEL (Left Hinge Fold)
                  ======================================================= */}
              <div 
                onClick={toggleLeft}
                className="absolute top-[-1px] -left-[240px] w-[240px] h-[558px] origin-right transition-all duration-700 ease-out cursor-pointer select-none group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${leftAngle}deg) translateZ(${leftZ})`,
                  zIndex: leftZIndex
                }}
              >
                {/* Visual hinge shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-black/15 z-10 pointer-events-none" />

                {/* Left Panel FRONT (Inside Left spread) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat border border-neutral-300/50 bg-white"
                  style={{
                    backgroundImage: `url("/flyer_in_left.png")`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(2px)'
                  }}
                />

                {/* Left Panel BACK (Outside Left - MAIN COVER ARTWORK) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat border border-neutral-300/50 bg-white"
                  style={{
                    backgroundImage: `url("/flyer_out_left.png")`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(2px)'
                  }}
                />
              </div>


              {/* =======================================================
                  RIGHT PANEL (Right Hinge Fold)
                  ======================================================= */}
              <div 
                onClick={toggleRight}
                className="absolute top-[-1px] -right-[240px] w-[240px] h-[558px] origin-left transition-all duration-700 ease-out cursor-pointer select-none group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rightAngle}deg) translateZ(${rightZ})`,
                  zIndex: rightZIndex
                }}
              >
                {/* Visual hinge shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-l from-transparent to-black/15 z-10 pointer-events-none" />

                {/* Right Panel FRONT (Inside Right spread) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat border border-neutral-300/50 bg-white"
                  style={{
                    backgroundImage: `url("/flyer_in_right.png")`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(2px)'
                  }}
                />

                {/* Right Panel BACK (Outside Right) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat border border-neutral-300/50 bg-white"
                  style={{
                    backgroundImage: `url("/flyer_out_right.png")`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(2px)'
                  }}
                />
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