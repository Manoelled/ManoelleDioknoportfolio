import React, { useState, useRef, useEffect } from 'react';
import { AdSize } from './adTypes';

interface CylinderScrollAdProps {
  size: AdSize;
  accentColor?: string;
}

interface CylinderFace {
  id: number;
  headline: string;
  copy: string;
  tag: string;
}

const CYLINDER_FACES: CylinderFace[] = [
  {
    id: 1,
    headline: 'FIRST DIMENSION',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit cylinder model.',
    tag: 'FACE 01',
  },
  {
    id: 2,
    headline: 'SECOND DIMENSION',
    copy: 'Sed do eiusmod tempor incididunt ut labore et dolore magna align.',
    tag: 'FACE 02',
  },
  {
    id: 3,
    headline: 'THIRD DIMENSION',
    copy: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    tag: 'FACE 03',
  },
  {
    id: 4,
    headline: 'FOURTH DIMENSION',
    copy: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
    tag: 'FACE 04',
  },
];

export default function CylinderScrollAd({ size, accentColor = '#D97706' }: CylinderScrollAdProps) {
  const [rotationAngle, setRotationAngle] = useState(0); // continuous angle in degrees
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const fontStyle = { fontFamily: '"Manrope", "Inter", system-ui, sans-serif' };

  const snapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active face index derived from angle
  const activeFaceIndex = ((Math.round(rotationAngle / 90) % 4) + 4) % 4;

  const clearSnapTimer = () => {
    if (snapTimerRef.current) {
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
  };

  // Magnetic Snap Helper
  const snapToNearestFace = (currentAngle: number) => {
    const nearestAngle = Math.round(currentAngle / 90) * 90;
    setRotationAngle(nearestAngle);
    setIsDragging(false);
  };

  // Schedule magnetic snap if user stays put for 1.2s while holding/dragging
  const schedulePauseSnap = (currentAngle: number) => {
    clearSnapTimer();
    snapTimerRef.current = setTimeout(() => {
      snapToNearestFace(currentAngle);
    }, 1200);
  };

  // Pointer Down (Drag Start)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, isHorizontal = false) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}

    clearSnapTimer();
    setIsDragging(true);
    setDragStartPos(isHorizontal ? e.clientX : e.clientY);
    setStartAngle(rotationAngle);
  };

  // Pointer Move (Active Dragging)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, isHorizontal = false) => {
    if (!isDragging) return;

    const currentPos = isHorizontal ? e.clientX : e.clientY;
    const delta = currentPos - dragStartPos;
    const sensitivity = 0.85; // Degree multiplier per pixel
    const newAngle = startAngle + delta * sensitivity;

    setRotationAngle(newAngle);
    schedulePauseSnap(newAngle);
  };

  // Pointer Up / Leave (Magnetic Snap)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    clearSnapTimer();
    snapToNearestFace(rotationAngle);
  };

  const rotateToStep = (index: number) => {
    clearSnapTimer();
    setIsDragging(false);
    setRotationAngle(index * 90);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearSnapTimer();
  }, []);

  // 320x50 compact variant with cylindrical gradient lighting
  if (size === '320x50') {
    return (
      <div
        data-size="320x50"
        onPointerDown={(e) => handlePointerDown(e, true)}
        onPointerMove={(e) => handlePointerMove(e, true)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-[320px] h-[50px] bg-white text-neutral-900 flex items-center justify-between px-3 border border-neutral-200 select-none cursor-grab active:cursor-grabbing relative overflow-hidden touch-none"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Horizontal Cylindrical Edge Shadows */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.85)_0%,transparent_12%,transparent_88%,rgba(255,255,255,0.85)_100%)]" />

        <div className="flex items-center gap-3 pointer-events-none z-0">
          <span className="text-[12px] font-extrabold text-neutral-900 truncate max-w-[200px] uppercase tracking-tight">
            {CYLINDER_FACES[activeFaceIndex].headline}
          </span>
        </div>

        <span className="text-[10px] font-extrabold tracking-widest uppercase pointer-events-none z-20" style={{ color: accentColor }}>
          DRAG TO SPIN ↔
        </span>
      </div>
    );
  }

  // 320x100 variant with vertical cylindrical shading
  if (size === '320x100') {
    return (
      <div
        data-size="320x100"
        onPointerDown={(e) => handlePointerDown(e, false)}
        onPointerMove={(e) => handlePointerMove(e, false)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-[320px] h-[100px] bg-white text-neutral-900 flex flex-col justify-between p-3 border border-neutral-200 select-none relative cursor-grab active:cursor-grabbing overflow-hidden touch-none"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Vertical Cylindrical Shading Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.85)_0%,transparent_20%,transparent_80%,rgba(255,255,255,0.85)_100%)]" />

        <div key={activeFaceIndex} className="my-auto pointer-events-none z-0">
          <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-tight">
            {CYLINDER_FACES[activeFaceIndex].headline}
          </h4>
          <p className="text-[10px] font-semibold text-neutral-600 line-clamp-1 mt-0.5">
            {CYLINDER_FACES[activeFaceIndex].copy}
          </p>
        </div>

        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider self-end pointer-events-none z-20">
          DRAG VERTICALLY ↕
        </span>
      </div>
    );
  }

  // 728x90 Horizontal Leaderboard
  if (size === '728x90') {
    return (
      <div
        data-size="728x90"
        onPointerDown={(e) => handlePointerDown(e, true)}
        onPointerMove={(e) => handlePointerMove(e, true)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-[728px] h-[90px] bg-white text-neutral-900 flex items-center justify-between px-6 border border-neutral-200 select-none relative cursor-grab active:cursor-grabbing overflow-hidden touch-none"
        style={{ borderRadius: 0, ...fontStyle }}
      >
        {/* Horizontal Cylindrical Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.85)_0%,transparent_10%,transparent_90%,rgba(255,255,255,0.85)_100%)]" />

        <div className="flex flex-col max-w-[420px] pointer-events-none z-0">
          <h4 className="text-sm font-extrabold text-neutral-900 uppercase tracking-tight">
            {CYLINDER_FACES[activeFaceIndex].headline}
          </h4>
          <p className="text-xs font-semibold text-neutral-600 truncate mt-0.5">
            {CYLINDER_FACES[activeFaceIndex].copy}
          </p>
        </div>

        <div className="flex items-center gap-4 z-20">
          <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 border border-neutral-200">
            {CYLINDER_FACES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => rotateToStep(i)}
                className="w-2.5 h-2.5 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: activeFaceIndex === i ? accentColor : 'rgba(0,0,0,0.2)',
                  borderRadius: 0,
                  transform: activeFaceIndex === i ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 pointer-events-none">
            DRAG TO SPIN ↔
          </span>
        </div>
      </div>
    );
  }

  // Vertical & Rectangle formats: 300x250, 336x280, 300x600 (Real Drag 3D Cylinder with Geometric Lighting & Shadows)
  const isTall = size === '300x600';
  const width = size === '336x280' ? 336 : 300;
  const height = size === '336x280' ? 280 : isTall ? 600 : 250;

  const drumHeight = isTall ? 460 : height - 70;
  const radius = Math.round(drumHeight / 2);

  return (
    <div
      data-size={size}
      className="bg-white text-neutral-900 flex flex-col justify-between p-4 border border-neutral-200 select-none relative overflow-hidden"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: 0,
        ...fontStyle,
      }}
    >
      {/* 3D Drum Viewport with Drag Handler */}
      <div
        onPointerDown={(e) => handlePointerDown(e, false)}
        onPointerMove={(e) => handlePointerMove(e, false)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="flex-1 my-1 relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing touch-none"
        style={{ perspective: '900px' }}
      >
        {/* Top Cylindrical Occlusion & Rim Lighting Mask */}
        <div className="absolute top-0 inset-x-0 h-10 pointer-events-none z-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.6)_40%,transparent_100%)]" />

        {/* Bottom Cylindrical Occlusion & Cast Shadow Mask */}
        <div className="absolute bottom-0 inset-x-0 h-10 pointer-events-none z-20 bg-[linear-gradient(to_top,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.6)_40%,transparent_100%)]" />

        {/* Grounding Ambient Drop Shadow Behind Cylinder */}
        <div
          className="absolute inset-x-6 bottom-2 h-8 bg-black/15 blur-lg rounded-full pointer-events-none z-0 transition-opacity duration-300"
          style={{ opacity: isDragging ? 0.8 : 0.5 }}
        />

        {/* Rotating 4-Face Drum Container */}
        <div
          className="w-full relative z-10"
          style={{
            height: `${drumHeight}px`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            transform: `rotateX(${-rotationAngle}deg)`,
          }}
        >
          {CYLINDER_FACES.map((face, index) => {
            const faceAngle = index * 90;

            // Calculate precise 3D light intensity & shadow angle relative to camera
            let diffAngle = (faceAngle - rotationAngle) % 360;
            if (diffAngle > 180) diffAngle -= 360;
            if (diffAngle < -180) diffAngle += 360;

            const absDiff = Math.abs(diffAngle);
            // Light intensity (1 at front 0 deg, 0 at 90 deg)
            const lightIntensity = Math.max(0, Math.cos((absDiff * Math.PI) / 180));
            const shadowOpacity = Math.min(0.85, 1 - lightIntensity);

            return (
              <div
                key={face.id}
                className="absolute inset-0 bg-white p-4 flex flex-col justify-center pointer-events-none transition-shadow duration-150"
                style={{
                  borderRadius: 0,
                  transform: `rotateX(${faceAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow: `
                    inset 0 1px 0 0 rgba(255,255,255,0.8),
                    inset 0 -1px 0 0 rgba(0,0,0,0.05),
                    0 ${Math.round(10 * lightIntensity)}px ${Math.round(20 * lightIntensity)}px rgba(0,0,0,${0.12 * lightIntensity})
                  `,
                }}
              >
                {/* Surface Specular & Curvature Lighting Gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 30%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.08) 100%)`,
                  }}
                />

                {/* Angle-driven Shadow Overlay (darkens face as it turns away into depth) */}
                <div
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                  style={{ opacity: shadowOpacity * 0.35 }}
                />

                {/* Face Content */}
                <div className="my-auto relative z-10">
                  <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight uppercase">
                    {face.headline}
                  </h3>
                  <p className="text-xs font-semibold text-neutral-600 mt-2 leading-relaxed">
                    {face.copy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Square Face Indicators */}
        <div className="absolute right-2 top-0 bottom-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none z-30">
          {CYLINDER_FACES.map((f, i) => (
            <div
              key={f.id}
              className="w-1.5 h-1.5 transition-all duration-300"
              style={{
                borderRadius: 0,
                backgroundColor: activeFaceIndex === i ? accentColor : 'rgba(0,0,0,0.2)',
                transform: activeFaceIndex === i ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between z-20 pt-2 border-t border-neutral-200 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
        <span>DRAG TO ROTATE ↕</span>
        <span style={{ color: accentColor }} className="font-extrabold">
          FACE 0{activeFaceIndex + 1} / 04
        </span>
      </div>
    </div>
  );
}
