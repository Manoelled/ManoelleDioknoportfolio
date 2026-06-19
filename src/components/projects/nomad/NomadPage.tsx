import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, Mail, Compass, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Monitor, Smartphone } from 'lucide-react';

import { useProjectStats } from '../../../lib/stats';

function BrowserWindow({ 
  children, 
  desktopSrc, 
  mobileSrc, 
  title = "Interactive Experience",
  showFull = false
}: { 
  children?: React.ReactNode; 
  desktopSrc?: string; 
  mobileSrc?: string; 
  title?: string;
  showFull?: boolean;
}) {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const [isMobileDevice, setIsMobileDevice] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const encodedDesktop = desktopSrc ? encodeURI(desktopSrc) : '';
  const encodedMobile = mobileSrc ? encodeURI(mobileSrc) : '';

  if (desktopSrc) {
    if (showFull) {
      return (
        <div className="bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:shadow-neutral-400/10">
          <div className="bg-[#F2F2F7] border-b border-[#D1D1D6] px-4 py-3 flex justify-between items-center">
            <div className="flex gap-1.5 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            </div>
            
            <div className="text-[10px] font-mono text-[#6D6D72] uppercase tracking-widest font-bold">
              {title}
            </div>

            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:block">
              FULL LAYOUT
            </div>
          </div>

          <div className="bg-[#F2F2F7]/40 p-2 sm:p-4">
            <div className="w-full bg-white rounded-lg overflow-hidden border border-[#D1D1D6] shadow-sm">
              <img
                src={encodedDesktop}
                className="w-full h-auto block"
                alt={title}
              />
            </div>
          </div>
        </div>
      );
    }

    if (isMobileDevice) {
      return (
        <div className="w-full aspect-[9/16] bg-neutral-950 relative rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-xl">
          <img
            src={encodedMobile || encodedDesktop}
            className="absolute inset-0 w-full h-full object-cover"
            alt={title}
          />
        </div>
      );
    }

    return (
      <div className="bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:shadow-neutral-400/10">
        <div className="bg-neutral-100/40 border-b border-[#D1D1D6] px-4 py-3 flex justify-between items-center">
          <div className="flex gap-1.5 items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          
          <div className="flex items-center bg-neutral-200/50 p-0.5 rounded-lg border border-[#D1D1D6]/60">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[10px] font-bold tracking-wider transition-all cursor-pointer uppercase ${
                viewMode === 'desktop'
                  ? "bg-white text-[#1C1C1E] shadow-3xs"
                  : "text-[#6D6D72] hover:text-[#1C1C1E]"
              }`}
            >
              <Monitor size={10} />
              <span className="font-mono">DESKTOP 16:9</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[10px] font-bold tracking-wider transition-all cursor-pointer uppercase ${
                viewMode === 'mobile'
                  ? "bg-white text-[#1C1C1E] shadow-3xs"
                  : "text-[#6D6D72] hover:text-[#1C1C1E]"
              }`}
            >
              <Smartphone size={10} />
              <span className="font-mono">MOBILE 9:16</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:block">
            {viewMode === 'desktop' ? 'WIDESCREEN' : 'PORTRAIT'}
          </div>
        </div>

        <div className="bg-neutral-55 transition-all duration-500 flex items-center justify-center p-4">
          {viewMode === 'desktop' ? (
            <div className="w-full aspect-[16/9] bg-neutral-100 relative rounded-lg overflow-hidden border border-[#D1D1D6] shadow-sm">
              <img
                src={encodedDesktop}
                className="absolute inset-0 w-full h-full object-cover"
                alt={title}
              />
            </div>
          ) : (
            <div className="w-full max-w-[325px] aspect-[9/16] bg-neutral-100 relative rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-xl hover:border-neutral-400 transition-all duration-500 my-4">
              <img
                src={encodedMobile || encodedDesktop}
                className="absolute inset-0 w-full h-full object-cover"
                alt={title}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-neutral-400/5">
      <div className="bg-neutral-100/40 border-b border-[#D1D1D6] px-4 py-3 flex gap-1.5 items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </div>
      <div>{children}</div>
    </div>
  );
}

function GalleryItem({ 
  src, 
  span, 
  label, 
  aspect = '1/1',
  borderRadiusClass = 'rounded-2ios'
}: { 
  src: string; 
  span: string; 
  label: string; 
  aspect?: '1/1' | '16/9' | '9/16' | '4/3' | 'original'; 
  key?: string;
  borderRadiusClass?: string;
}) {
  const [hasError, setHasError] = React.useState(false);

  let aspectClass = "aspect-square"; // Default 1:1
  let aspectLabel = "STD 1:1";
  
  if (aspect === '9/16') {
    aspectClass = "aspect-[9/16]";
    aspectLabel = "REEL 9:16";
  } else if (aspect === '16/9') {
    aspectClass = "aspect-[16/9]";
    aspectLabel = "WIDESCREEN 16:9";
  } else if (aspect === '4/3') {
    aspectClass = "aspect-[4/3]";
    aspectLabel = "TACTILE 4:3";
  } else if (aspect === 'original') {
    aspectClass = "w-full h-auto min-h-[50px] bg-white";
    aspectLabel = "ORIGINAL SPEC";
  }

  const isVideo = src.endsWith('.mp4');
  const encodedSrc = encodeURI(src);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`${span} space-y-3`}
    >
      <div className={`group relative ${aspectClass} ${borderRadiusClass} overflow-hidden border border-[#D1D1D6] shadow-sm bg-neutral-100 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-400`}>
        {hasError ? (
          <div className="absolute inset-0 bg-[#F9F9FB] flex flex-col items-center justify-center p-6 text-center select-none min-h-[140px]">
            <p className="font-sans text-[11px] text-[#1C1C1E] font-black uppercase tracking-wider">{label}</p>
          </div>
        ) : isVideo ? (
          <video
            src={encodedSrc}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={encodedSrc} 
            alt={label} 
            onError={() => setHasError(true)}
            className={aspect === 'original' ? "w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]" : "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"} 
          />
        )}
      </div>
    </motion.div>
  );
}

interface NomadPageProps {
  onBack: () => void;
}

export default function NomadPage({ onBack }: NomadPageProps) {
  const [logoError, setLogoError] = React.useState(false);
  const project = {
    title: 'NOMAD',
    subtitle: 'Adventure Lifestyle & Editorial Campaign',
    description: 'NOMAD is a conceptual premium travel brand designed around raw natural exploration and cinematic storytelling. It is defined by editorial layout structures, bold typography, and a deliberate focus on high-contrast landscape photography.',
    tags: ['Identity', 'Editorial Layout', 'Art Direction'],
    role: 'Creative Director',
    bio: 'I directed the visual identity and brand launch campaign for NOMAD. By combining Swiss-inspired grotesque typography with airy editorial compositions, we built a premium, immersive narrative system that translates the warmth of physical travel logbooks into the digital space.',
    responsibilities: [
      'Visual Identity & System',
      'Editorial Layout Design',
      'Campaign Art Direction',
      'Social Media Curation',
      'Digital Concept Development'
    ]
  };

  const squarePosts = [
    { src: '/assets/images/NOMAD/Socmed.png', label: 'Tactile Log Book', aspect: '1/1' as const },
    { src: '/assets/images/NOMAD/SocmedAction.png', label: 'Field Navigation Guide', aspect: '1/1' as const },
    { src: '/assets/images/NOMAD/SocmedAction (2).png', label: 'Weather Resistant Spec', aspect: '1/1' as const },
    { src: '/assets/images/NOMAD/SocmedAction (3).png', label: 'Dynamic Coordinates Grid', aspect: '1/1' as const }
  ];

  const verticalPosts = [
    { src: '/assets/images/NOMAD/Nomad_LoopReel.mp4', label: 'Wanderlust Kinetic Reel', aspect: '9/16' as const },
    { src: '/assets/images/NOMAD/ReelAD.png', label: 'Expedition Campaign Ad', aspect: '9/16' as const }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E]">
      <div className="noise-overlay opacity-25" />
      
      {/* Refined Minimalist Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 justify-between bg-[#F2F2F7]/80 backdrop-blur-md border-b border-[#D1D1D6]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors cursor-pointer text-[#1C1C1E]"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-4 bg-[#D1D1D6]" />
          <span className="font-extrabold tracking-tight text-sm text-[#1C1C1E]">NOMAD EDITORIAL PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-900 border border-neutral-850 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer">
            <Share2 size={14} />
            Share Project
          </button>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Top Feature: Title & Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-center mb-32">
          {/* Left Column: Context */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white text-neutral-700 text-[10px] font-bold rounded-full border border-neutral-300 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-[#101820] text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8 uppercase">
                {project.title}
              </h1>
              
              <div className="space-y-6 mb-10">
                <p className="text-xl text-[#3A3A3C] font-semibold leading-tight">
                  {project.description}
                </p>
                <p className="text-base text-[#6D6D72] leading-relaxed">
                  {project.bio}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E] border-b border-[#D1D1D6] pb-2 inline-block">
                  CREATIVE RESPONSIBILITIES
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs font-bold">
                  {project.responsibilities.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#3A3A3C]">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Main Logo - Borderless and transparent to safeguard brand */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-square max-w-[440px] flex items-center justify-center p-0 select-none transition-all duration-700 hover:scale-[1.01] border-0 border-transparent outline-none ring-0 shadow-none"
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            >
              {logoError ? (
                <div className="w-full aspect-square max-w-[440px] bg-white border border-[#D1D1D6] rounded-2ios font-sans flex items-center justify-center p-8 select-none shadow-lg relative group">
                  <div className="text-center font-sans">
                    <span className="text-8xl font-black text-neutral-900 tracking-tighter select-none block">N</span>
                    <span className="text-xs font-bold tracking-widest text-[#1C1C1E] uppercase block mt-2">NOMAD</span>
                  </div>
                </div>
              ) : (
                <img 
                  src="/assets/images/NOMAD/NomadFinalLogo.png" 
                  alt="NOMAD Main Logo" 
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain rounded-2xl border-0 border-transparent outline-none ring-0 shadow-none" 
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* SECTION 1: BRAND PLATFORM & VISUAL COMMUNICATION SYSTEM */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">SOCIAL MEDIA SYSTEM</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              To communicate the spirit of exploration and endurance, I developed a social media system built around powerful landscape photography, bold typography, and minimal graphic intervention.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              Rather than relying on complex visual effects, the content allows the imagery to lead. Rugged terrain, remote environments, and moments of physical challenge become the primary storytelling elements, reinforcing the brand's connection to adventure and the outdoors.
            </p>
          </div>

          {/* Grid Layout: 2x2 of 1:1 Aspect ratio posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {squarePosts.map((post, idx) => (
              <GalleryItem 
                key={`${post.src}-${idx}`}
                src={post.src}
                span="col-span-1"
                label={post.label}
                aspect={post.aspect}
              />
            ))}
          </div>

          {/* Grid Layout: Two 9:16 aspect ratio vertical reels/ads side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto pt-8">
            {verticalPosts.map((post, idx) => (
              <GalleryItem 
                key={`${post.src}-${idx}`}
                src={post.src}
                span="col-span-1"
                label={post.label}
                aspect={post.aspect}
              />
            ))}
          </div>

          {/* Editorial transition breaking down the conceptual approach */}
          <div className="max-w-2xl mx-auto space-y-4 text-center py-8">
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              The layouts are intentionally clean and structured, providing consistency across both static posts and short-form video content while allowing each visual to maintain its impact.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              This approach creates a confident and modern presence that speaks to individuals who value exploration, resilience, and the pursuit of experiences beyond their comfort zone.
            </p>
          </div>

          {/* Banners and Large Print Banners Showcase (Completely uncropped, showing full original aspect ratio) */}
          <div className="pt-12 space-y-12">
            <div className="border-t border-[#D1D1D6] pt-12 text-center max-w-xl mx-auto space-y-3">
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#1C1C1E]">EDITORIAL CAMPAIGN BANNERS</h3>
              <p className="text-[#3A3A3C] text-xs leading-relaxed font-semibold">
                The campaign banners were designed to emphasize scale, atmosphere, and human achievement within natural environments. Wide-format compositions position individuals against expansive landscapes, highlighting both the challenge and beauty of exploration. Large photography, restrained typography, and generous spacing ensure that every message remains clear without competing with the imagery.
              </p>
              <p className="text-[#6D6D72] text-[11px] leading-relaxed">
                The result is a visual system that feels premium, contemporary, and deeply connected to the outdoor lifestyle the brand represents.
              </p>
            </div>

            {/* Banner List rendered in Original Aspect Ratio (un-cropped) */}
            <div className="space-y-12">
              <GalleryItem 
                src="/assets/images/NOMAD/LargePrintBanner.png"
                span="w-full"
                label="LARGE FORMAT CAMPAIGN BANNER"
                aspect="original"
                borderRadiusClass="rounded-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <GalleryItem 
                  src="/assets/images/NOMAD/Banner.png"
                  span="col-span-1"
                  label="NOMAD HORIZON SPLASH"
                  aspect="original"
                />
                <GalleryItem 
                  src="/assets/images/NOMAD/Banner (2).png"
                  span="col-span-1"
                  label="NOMAD OUTDOOR EDITORIAL COMPOSITION"
                  aspect="original"
                />
                <GalleryItem 
                  src="/assets/images/NOMAD/Banner (3).png"
                  span="col-span-1"
                  label="NOMAD BRAND ARTWORK DIRECTION"
                  aspect="original"
                />
                <GalleryItem 
                  src="/assets/images/NOMAD/Banner (4).png"
                  span="col-span-1"
                  label="NOMAD EDITORIAL LAYOUT CONCEPT"
                  aspect="original"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: DIGITAL EXPERIENCE (LAST SECTION) */}
        <section className="mb-32 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">RESPONSIVE WEBSITE DESIGN</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              The website was designed as a digital extension of the brand, combining strong visual storytelling with a clean and highly functional user experience.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              Multiple interface directions were explored to demonstrate the flexibility of the identity system. One approach prioritizes structure, product information, and navigation clarity, while another leans into immersive photography and editorial-style storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <BrowserWindow 
                desktopSrc="/assets/images/NOMAD/UI Concept.png"
                title="NOMAD Digital Terminal — Style Alpha"
                showFull={true}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <BrowserWindow 
                desktopSrc="/assets/images/NOMAD/UIConcept2.png"
                title="NOMAD Splash Page — Style Beta"
                showFull={true}
              />
            </motion.div>
          </div>

          {/* Additional insights under website experience */}
          <div className="max-w-2xl mx-auto space-y-4 text-center pt-8">
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              Across both directions, the design remains focused on simplicity, legibility, and visual impact. Large imagery, disciplined typography, and spacious layouts create an experience that feels modern, capable, and aligned with the adventurous character of the brand.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              The result is a cohesive digital platform that reinforces the brand identity while showcasing the landscapes, stories, and experiences that define NOMAD.
            </p>
          </div>
        </section>

        {/* Gallery Grid Deleted since Section 2 now houses the beautiful grid */}

        {/* Simple End Statement - Replaced with minimal Continue Exploring button */}
        <div className="mt-32 pb-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-8 py-4 rounded-full border border-[#D1D1D6] bg-white hover:bg-neutral-50 text-[#1C1C1E] text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Continue Exploring
            <ArrowLeft size={16} className="rotate-180" />
          </motion.button>
        </div>
        
        {/* Bottom spacer to prevent fixed Action Dock coverage on mobile */}
        <div className="h-24 sm:h-32" />
      </main>

      {/* Action Dock (Fixed at bottom center) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 bg-white/85 backdrop-blur-2xl border border-[#D1D1D6] rounded-full shadow-2xl scale-100 hover:scale-105 transition-all duration-500 w-max max-w-[95vw]">
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all shadow-lg whitespace-nowrap cursor-pointer"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I saw your project Nomad'}
        >
          I want something like this
        </button>
        
        <button 
          className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full border border-neutral-255 text-[#1C1C1E] transition-all cursor-pointer"
          title="Inquire"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com'}
        >
          <Mail size={18} />
        </button>

        <div className="w-px h-6 bg-[#D1D1D6] mx-1" />

        <LikeButton />
      </div>
    </div>
  );
}

function LikeButton() {
  const { likes, views, isLiked, toggleLike } = useProjectStats('nomad', 310, 1390);

  return (
    <div className="flex items-center gap-1">
      {/* Views Counter */}
      <div className="flex items-center gap-1.5 px-3 py-3 text-[#8E8E93] font-medium text-xs select-none">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="font-mono">{views}</span>
      </div>

      <div className="w-px h-4 bg-[#E5E5EA]" />

      {/* Like Button */}
      <button 
        onClick={toggleLike}
        className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs transition-with-cursor cursor-pointer ${
          isLiked ? "bg-red-50 text-red-500 border border-red-200 shadow-sm" : "bg-transparent text-[#6D6D72] hover:bg-neutral-100"
        }`}
      >
        <Heart 
          size={18} 
          fill={isLiked ? "currentColor" : "none"} 
          className={`transition-transform ${isLiked ? "scale-110" : ""}`} 
        />
        <span className="font-mono">{likes}</span>
      </button>
    </div>
  );
}


