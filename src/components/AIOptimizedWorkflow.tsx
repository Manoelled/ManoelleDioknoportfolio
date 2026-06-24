import React, { useState, useEffect, useRef } from 'react';

export default function AIOptimizedWorkflow() {
  const [inView, setInView] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [reveal1, setReveal1] = useState(false);
  const [reveal2, setReveal2] = useState(false);
  const [reveal3, setReveal3] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const containerRef = useRef<HTMLElement>(null);

  const getStepStyle = (stepId: number) => {
    if (activeStep === stepId) {
      return {
        opacity: 1,
        transform: 'rotateX(0deg) translateY(0px) translateZ(0px)',
        pointerEvents: 'auto' as const,
      };
    }
    
    // Check if it is PAST (the old one that rolls down on a cube)
    let isPast = false;
    if (activeStep === 1 && stepId === 3) isPast = true;
    if (activeStep === 2 && stepId === 1) isPast = true;
    if (activeStep === 3 && stepId === 2) isPast = true;
    
    if (isPast) {
      return {
        opacity: 0,
        transform: 'rotateX(-95deg) translateY(45px) translateZ(-30px)',
        pointerEvents: 'none' as const,
      };
    } else {
      // UPCOMING (the new one that is on top of the rolling cube waiting to flip down)
      return {
        opacity: 0,
        transform: 'rotateX(95deg) translateY(-45px) translateZ(-30px)',
        pointerEvents: 'none' as const,
      };
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 } // Trigger when 40% of the component is in view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView) {
      // Pause/Reset when scrolled out of view
      setIsDrawing(false);
      setReveal1(false);
      setReveal2(false);
      setReveal3(false);
      setActiveStep(1);
      return;
    }

    let timeouts: NodeJS.Timeout[] = [];

    const runCycle = () => {
      // Reset state for loop restarting, keeping Step 1 active instantly from start
      setIsDrawing(false);
      setReveal1(false);
      setReveal2(false);
      setReveal3(false);
      setActiveStep(1);

      // Start drawing lines on next frame
      const startDraw = setTimeout(() => {
        setIsDrawing(true);
      }, 50);
      timeouts.push(startDraw);

      // Highlight step 1 (x = 70, 17.5%) at 1000ms
      const t1 = setTimeout(() => {
        setReveal1(true);
      }, 1000);
      timeouts.push(t1);

      // Reveal step 2 (x = 180, 45%) at 4500ms (direct transition from Step 1)
      const t2 = setTimeout(() => {
        setReveal2(true);
        setActiveStep(2);
      }, 4500);
      timeouts.push(t2);

      // Reveal step 3 (x = 290, 72.5%) at 8000ms (direct transition from Step 2)
      const t3 = setTimeout(() => {
        setReveal3(true);
        setActiveStep(3);
      }, 8000);
      timeouts.push(t3);

      // Seamlessly loop every 12 seconds
      const loop = setTimeout(() => {
        runCycle();
      }, 12000);
      timeouts.push(loop);
    };

    runCycle();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [inView]);

  return (
    <section 
      id="workflow-evolution" 
      ref={containerRef} 
      className="relative z-10 px-4 sm:px-8 lg:px-16 py-12 sm:py-20 pb-16 sm:pb-32 bg-white/20 border-t border-neutral-200/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* 2-Column Responsive Layout: clean typography on left, square glass graph on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Main Title (with style cohesive with 'The Folder'), and first person story */}
          <div id="workflow-text-col" className="flex flex-col lg:col-span-5 text-left items-start">
            <h2 id="workflow-main-title" className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.1] font-sans mb-6 sm:mb-8">
              AI Optimized Workflow
            </h2>
            
            <p id="workflow-narrative" className="font-sans text-sm sm:text-lg text-[#6D6D72] leading-relaxed font-normal mb-6 sm:mb-8 max-w-xl">
              I optimize creative workflows through <strong className="font-bold text-neutral-900">AI prompt engineering</strong>, <strong className="font-bold text-neutral-900">AI workflow design</strong>, and <strong className="font-bold text-neutral-900">personally built vibe coded tools</strong>. By turning repetitive production tasks into modular tools, I reduce friction and accelerate execution without compromising creative control. One example is <a href="https://cliptographic.com" target="_blank" rel="noopener noreferrer" className="text-[#0F6E56] font-semibold hover:underline underline-offset-4 inline-flex items-center gap-0.5">Cliptographic<span className="text-[10px] sm:text-xs">↗</span></a>, a SaaS tool I built for motion graphics that evolved from a personal workflow into an open-source solution for other editors.
            </p>

            {/* Aesthetic Quiet Legends Placement */}
            <div id="workflow-legend" className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm text-[#6D6D72] font-sans select-none my-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[rgba(20,60,50,0.22)] rounded-full inline-block" />
                <span className="font-semibold text-neutral-800">Manual flow</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-[3px] bg-gradient-to-r from-[#0F6E56] to-[#1D9E75] rounded-full inline-block" />
                <span className="text-[#0F6E56] font-bold">Optimized path</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Square Glass Card containing the chart, axis lines, and labels */}
          <div id="workflow-card-col" className="flex justify-center lg:col-span-7 w-full">
            {/* Glass Card formatted as a pristine 1:1 Square - wider container max-width */}
            <div 
              id="workflow-glass-card"
              className="w-full aspect-square max-w-[540px] select-none transition-all duration-500 rounded-[28px] relative overflow-hidden flex flex-col justify-between p-4 xs:p-5 sm:p-9"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.18))',
                backdropFilter: 'blur(20px) saturate(160%)',
                WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.03)',
              }}
            >
              {/* Ambient Top-Left Teal Glow */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-15%',
                  left: '-15%',
                  width: '70%',
                  height: '70%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(20, 200, 160, 0.14) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Dynamic Explanation Header (Top left region visually overlaid above SVG with custom 3D cube-flip transitions) */}
              <div 
                className="absolute top-4 left-4 right-4 xs:top-5 xs:left-5 xs:right-5 sm:top-9 sm:left-9 sm:right-9 z-20 h-16 xs:h-20 sm:h-28 select-none pointer-events-none"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Section 1 Text */}
                <div 
                  className="absolute inset-0 flex flex-col items-start justify-start text-left"
                  style={{
                    ...getStepStyle(1),
                    transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-in-out',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <h3 className="font-sans font-extrabold text-[#0D5C46] tracking-tight text-xl xs:text-2xl sm:text-3xl leading-none">
                    Custom tools
                  </h3>
                  <p className="text-[11px] xs:text-xs sm:text-sm text-[#56565A] font-sans mt-1 sm:mt-2 leading-relaxed font-normal">
                    Eliminates repetitive layouts & manual steps
                  </p>
                </div>

                {/* Section 2 Text */}
                <div 
                  className="absolute inset-0 flex flex-col items-start justify-start text-left"
                  style={{
                    ...getStepStyle(2),
                    transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-in-out',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <h3 className="font-sans font-extrabold text-[#0D5C46] tracking-tight text-xl xs:text-2xl sm:text-3xl leading-none">
                    Personalized automation
                  </h3>
                  <p className="text-[11px] xs:text-xs sm:text-sm text-[#56565A] font-sans mt-1 sm:mt-2 leading-relaxed font-normal">
                    Automates modular asset compilation
                  </p>
                </div>

                {/* Section 3 Text */}
                <div 
                  className="absolute inset-0 flex flex-col items-start justify-start text-left"
                  style={{
                    ...getStepStyle(3),
                    transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-in-out',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <h3 className="font-sans font-extrabold text-[#0D5C46] tracking-tight text-xl xs:text-2xl sm:text-3xl leading-none">
                    AI pattern generation
                  </h3>
                  <p className="text-[11px] xs:text-xs sm:text-sm text-[#56565A] font-sans mt-1 sm:mt-2 leading-relaxed font-normal">
                    Expedites complex design iteration
                  </p>
                </div>
              </div>

              {/* SVG Line Chart scaled inside a 1:1 format (viewBox 0 0 400 380) */}
              <div className="relative z-10 w-full flex-grow flex items-center justify-center">
                <svg 
                  viewBox="0 0 400 380" 
                  className="w-full h-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="tealGradientSquare" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0F6E56" />
                      <stop offset="100%" stopColor="#1D9E75" />
                    </linearGradient>
                  </defs>

                  {/* Base Timeline Line (y=330) */}
                  <line x1="15" y1="330" x2="385" y2="330" stroke="rgba(10,46,38,0.12)" strokeWidth="1" strokeLinecap="round" />

                  {/* Curve 1: Manual Workflow Line (Slow wave line starting at (15, 300) with gentle downward drift to highlight efficiency contrast without overlapping) */}
                  <path
                    d="M 15,300 C 100,300 180,310 240,312 C 290,314 340,318 385,320"
                    stroke="rgba(20,60,50,0.22)"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    style={{
                      strokeDashoffset: isDrawing ? 0 : 1000,
                      transition: 'stroke-dashoffset 2800ms linear',
                    }}
                  />

                  {/* Curve 2: Optimized Workflow Line (Solid gradient line climbing in 3 phases with elegant plateaus) */}
                  <path
                    d="M 15,300 L 70,300 C 100,300 130,200 160,200 L 180,200 C 210,200 240,115 270,115 L 290,115 C 330,115 360,35 385,35"
                    stroke="url(#tealGradientSquare)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    style={{
                      strokeDashoffset: isDrawing ? 0 : 1000,
                      transition: 'stroke-dashoffset 2800ms cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                  />

                  {/* Sequential Dotted Gridlines & Glowing Markers placed at the start of each path increase */}
                  {/* Boost step 1: x = 70 (17.5%), y = 300 */}
                  <line 
                    x1="70" y1="300" x2="70" y2="10" 
                    stroke="#1D9E75" 
                    strokeWidth="1.25" 
                    strokeDasharray="3,3" 
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity: reveal1 ? 0.35 : 0,
                    }}
                  />
                  {/* Outer blinking wave when active */}
                  {reveal1 && activeStep === 1 && (
                    <circle 
                      cx="70" cy="300" r="14" 
                      stroke="#1D9E75" 
                      strokeWidth="1.5"
                      fill="none" 
                      className="animate-ping"
                      style={{
                        transformOrigin: '70px 300px',
                        opacity: 0.6,
                      }}
                    />
                  )}
                  <circle 
                    cx="70" cy="300" r={activeStep === 1 ? "7" : "5"} 
                    fill={activeStep === 1 ? "#1D9E75" : "#0F6E56"} 
                    className={`transition-all duration-300 ease-out ${activeStep === 1 ? "animate-pulse" : ""}`}
                    style={{
                      opacity: reveal1 ? 1 : 0,
                      transform: reveal1 ? 'scale(1)' : 'scale(0)',
                      transformOrigin: '70px 300px',
                      boxShadow: activeStep === 1 ? '0 0 10px #1D9E75' : 'none',
                    }}
                  />

                  {/* Boost step 2: x = 180 (45%), y = 200 */}
                  <line 
                    x1="180" y1="200" x2="180" y2="10" 
                    stroke="#1D9E75" 
                    strokeWidth="1.25" 
                    strokeDasharray="3,3" 
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity: reveal2 ? 0.35 : 0,
                    }}
                  />
                  {/* Outer blinking wave when active */}
                  {reveal2 && activeStep === 2 && (
                    <circle 
                      cx="180" cy="200" r="14" 
                      stroke="#1D9E75" 
                      strokeWidth="1.5"
                      fill="none" 
                      className="animate-ping"
                      style={{
                        transformOrigin: '180px 200px',
                        opacity: 0.6,
                      }}
                    />
                  )}
                  <circle 
                    cx="180" cy="200" r={activeStep === 2 ? "7" : "5"} 
                    fill={activeStep === 2 ? "#1D9E75" : "#0F6E56"} 
                    className={`transition-all duration-300 ease-out ${activeStep === 2 ? "animate-pulse" : ""}`}
                    style={{
                      opacity: reveal2 ? 1 : 0,
                      transform: reveal2 ? 'scale(1)' : 'scale(0)',
                      transformOrigin: '180px 200px',
                    }}
                  />

                  {/* Boost step 3: x = 290 (72.5%), y = 115 */}
                  <line 
                    x1="290" y1="115" x2="290" y2="10" 
                    stroke="#1D9E75" 
                    strokeWidth="1.25" 
                    strokeDasharray="3,3" 
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity: reveal3 ? 0.35 : 0,
                    }}
                  />
                  {/* Outer blinking wave when active */}
                  {reveal3 && activeStep === 3 && (
                    <circle 
                      cx="290" cy="115" r="14" 
                      stroke="#1D9E75" 
                      strokeWidth="1.5"
                      fill="none" 
                      className="animate-ping"
                      style={{
                        transformOrigin: '290px 115px',
                        opacity: 0.6,
                      }}
                    />
                  )}
                  <circle 
                    cx="290" cy="115" r={activeStep === 3 ? "7" : "5"} 
                    fill={activeStep === 3 ? "#1D9E75" : "#0F6E56"} 
                    className={`transition-all duration-300 ease-out ${activeStep === 3 ? "animate-pulse" : ""}`}
                    style={{
                      opacity: reveal3 ? 1 : 0,
                      transform: reveal3 ? 'scale(1)' : 'scale(0)',
                      transformOrigin: '290px 115px',
                    }}
                  />
                </svg>
              </div>

              {/* Grid space spacer */}
              <div className="h-4" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
