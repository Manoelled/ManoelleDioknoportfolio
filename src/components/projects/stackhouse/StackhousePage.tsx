import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, Mail, Monitor, Smartphone, ZoomIn, ChevronLeft, ChevronRight, MessageCircle, Send, Bookmark } from 'lucide-react';

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
                src={desktopSrc}
                className="w-full h-auto block"
                alt={title}
                referrerPolicy="no-referrer"
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
            src={mobileSrc || desktopSrc}
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
                src={desktopSrc}
                className="absolute inset-0 w-full h-full object-cover"
                alt={title}
              />
            </div>
          ) : (
            <div className="w-full max-w-[325px] aspect-[9/16] bg-neutral-100 relative rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-xl hover:border-neutral-400 transition-all duration-500 my-4">
              <img
                src={mobileSrc || desktopSrc}
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

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`${span}`}
    >
      <div className={`group relative ${aspectClass} ${borderRadiusClass} overflow-hidden border border-[#D1D1D6] shadow-sm bg-neutral-100 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-400`}>
        {hasError ? (
          <div className="absolute inset-0 bg-[#F9F9FB] flex flex-col items-center justify-center p-6 text-center select-none min-h-[140px]">
            <p className="font-sans text-[11px] text-[#1C1C1E] font-black uppercase tracking-wider">{label}</p>
          </div>
        ) : isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={src} 
            alt={label} 
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={aspect === 'original' ? "w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]" : "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"} 
          />
        )}
      </div>
    </motion.div>
  );
}

interface StackhousePageProps {
  onBack: () => void;
}

export default function StackhousePage({ onBack }: StackhousePageProps) {
  const [logoError, setLogoError] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const project = {
    title: 'Stackhouse',
    subtitle: 'Sculptural Gastronomy & Exaggerated Formats',
    description: 'Stackhouse is an avant-garde restaurant brand developed from the ground up focusing on a cohesive visual identity, modern aesthetic, and robust digital presence.',
    tags: ['Identity', 'Photography', 'Social Kit', 'Reels', 'Art Direction'],
    role: 'Creative Director',
    bio: 'I led the creative direction across all touchpoints, defining the visual language, guiding food and beverage photography to match the tone, and building a fully unified social media kit. We produced dramatic, high-contrast, short-form reels to align with current digital behaviors and drive massive audience engagement.',
    responsibilities: [
      'Comprehensive Brand Identity',
      'Exaggerated Culinary Styling',
      'Photography Art Direction',
      'Unified Social Media Kit',
      'Short-form Reels Production',
      'Digital Dining Portal UI'
    ]
  };

  const carouselSlides = [
    { image: "/assets/images/Stackhouse/StackhouseCarousel1.png" },
    { image: "/assets/images/Stackhouse/StackhouseCarousel2.png" },
    { image: "/assets/images/Stackhouse/StackhouseCarousel3.png" }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const socialSquarePosts = [
    { src: '/assets/images/Stackhouse/Post1.png', label: 'Basalt Plate Composition', aspect: '1/1' as const },
    { src: '/assets/images/Stackhouse/Post2.png', label: 'Prismatic Glassware Angle', aspect: '1/1' as const },
    { src: '/assets/images/Stackhouse/Post3.png', label: 'Geometric Course Plating', aspect: '1/1' as const },
    { src: '/assets/images/Stackhouse/Stackhousepost4.png', label: 'Monolithic Sourdough Hearth', aspect: '1/1' as const }
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
          <span className="font-extrabold tracking-tight text-sm text-[#1C1C1E]">STACKHOUSE BRAND PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-900 border border-neutral-850 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer">
            <Share2 size={14} />
            Share Brand
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
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 bg-white text-neutral-600 text-[10px] font-semibold rounded-full border border-neutral-200/85 uppercase tracking-widest font-sans">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-[#101820] text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8 uppercase">
                {project.title}
              </h1>
              
              <div className="space-y-6 mb-10">
                <p className="text-xl text-[#3A3A3C] font-semibold leading-tight">
                  {project.subtitle}
                </p>
                <p className="text-base text-[#6D6D72] leading-relaxed">
                  {project.bio}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E] border-b border-[#D1D1D6] pb-2 inline-block">
                  CREATIVE INVOLVEMENT
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

          {/* Right Column: Main Logo - Borderless typography block */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-square max-w-[440px] flex items-center justify-center p-0 select-none transition-all duration-700 hover:scale-[1.01] border-0 border-transparent outline-none ring-0 shadow-none"
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            >
              {!logoError ? (
                <img 
                  src="/assets/images/Stackhouse/StackhouseLogo.png"
                  alt="Stackhouse Logo"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-contain rounded-2xl border-0 border-transparent outline-none ring-0 shadow-none" 
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full aspect-square max-w-[440px] bg-white border border-[#D1D1D6] rounded-2ios font-sans flex items-center justify-center p-8 select-none shadow-lg relative group text-center space-y-4">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#6D6D72] block uppercase animate-pulse">ESTABLISHED 2024</span>
                    <span className="text-8.5xl font-black text-[#1C1C1E] tracking-tighter select-none block leading-none">STK<br/>HSE</span>
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.15em] text-[#3A3A3C] block pt-4 border-t border-[#D1D1D6]">BRUTALIST GASTRONOMY</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* SOCIAL MEDIA KIT */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">SOCIAL MEDIA KIT</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              To communicate the confidence and sculptural style of the brand, I developed a high-impact social media system built around dramatic food close ups, dark basalt tables, and crisp typography.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              Our layouts focus on texture and extreme scale rather than traditional lifestyle framing. Smoke, fire, linear glass structures, and seared culinary elements become structural art, reinforcing the brand's position as a memorable avant-garde culinary destination.
            </p>
          </div>

          {/* Grid Layout: 2x2 of 1:1 Aspect ratio posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {socialSquarePosts.map((post, idx) => (
              <GalleryItem 
                key={`${post.src}-${idx}`}
                src={post.src}
                span="col-span-1"
                label={post.label}
                aspect={post.aspect}
              />
            ))}
          </div>

          {/* Grid Layout: Two vertical reels side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto pt-8">
            {/* Single Reel Component */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <div className="group relative aspect-[9/16] rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-neutral-100 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-400">
                <video
                  src="/assets/images/Stackhouse/StackHouseReell.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Editorial Reel 2 - Plain Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <div className="group relative aspect-[9/16] rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-neutral-100 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-400">
                <img 
                  src="/assets/images/Stackhouse/StackhouseReel2.png" 
                  alt="Brutalist Dining Environment Reel" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CAROUSEL CAMPAIGN SERIES */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">CAROUSEL CAMPAIGN SERIES</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              To maximize engagement, we designed a campaign built entirely around swipeable architectural storytelling.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              Users scroll through monolithic layouts showcasing high-precision plating, tactile details, and raw volcanic stones. This interactive format transforms passive viewing into a sensory exploration of modern brutalist culinary art.
            </p>
          </div>

          {/* Row of three smaller carousel images side-by-side */}
          <div className="grid grid-cols-3 gap-4 max-w-[850px] mx-auto mb-8">
            {carouselSlides.map((slide, i) => (
              <div 
                key={i} 
                onClick={() => setActiveSlide(i)}
                className={`aspect-square rounded-2ios overflow-hidden border transition-all duration-300 cursor-pointer shadow-3xs hover:shadow-md ${
                  i === activeSlide ? "border-neutral-800 scale-102 ring-2 ring-neutral-900/10" : "border-[#D1D1D6] hover:scale-[1.01]"
                }`}
              >
                <img 
                  src={slide.image} 
                  alt={`Slide ${i + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          {/* Swipeable Instagram Mockup */}
          <div className="max-w-[850px] mx-auto bg-white border border-[#D1D1D6] rounded-2ios shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-[#E5E5EA]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-neutral-800 overflow-hidden bg-neutral-950 flex items-center justify-center p-0.5">
                  <span className="text-[8px] font-black text-white leading-none">STK</span>
                </div>
                <div>
                  <p className="text-xs font-black text-neutral-900 tracking-tight leading-none text-left">stackhouse.cuisine</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              </div>
            </div>

            {/* Slider View Window */}
            <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden group">
              <div 
                className="flex w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {carouselSlides.map((slide, i) => (
                  <div key={i} className="w-full h-full flex-shrink-0 relative">
                    <img 
                      src={slide.image} 
                      alt={`Carousel Slide ${i + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Slider Left Arrow */}
              {activeSlide > 0 && (
                <button 
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#D1D1D6] flex items-center justify-center text-neutral-900 shadow-md cursor-pointer hover:bg-white hover:scale-105 transition-all scale-100 z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
              )}

              {/* Slider Right Arrow */}
              {activeSlide < carouselSlides.length - 1 && (
                <button 
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#D1D1D6] flex items-center justify-center text-neutral-900 shadow-md cursor-pointer hover:bg-white hover:scale-105 transition-all scale-100 z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Post Interaction Row */}
            <div className="px-4 py-3 flex justify-between items-center bg-white">
              <div className="flex gap-4 items-center">
                <Heart size={18} className="text-neutral-800 hover:text-red-500 cursor-pointer transition-colors" />
                <MessageCircle size={18} className="text-neutral-800 cursor-pointer" />
                <Send size={18} className="text-neutral-800 cursor-pointer" />
              </div>
              
              {/* Dots indicator */}
              <div className="flex gap-1.5">
                {carouselSlides.map((_, i) => (
                  <button
                    key={i} 
                    onClick={() => setActiveSlide(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === activeSlide ? "bg-neutral-800 w-3" : "bg-[#D1D1D6]"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <Bookmark size={18} className="text-neutral-800 cursor-pointer" />
            </div>

            {/* Description Caption Block */}
            <div className="px-4 pb-4 pt-1 bg-white border-t border-[#F2F2F7] text-left">
              <p className="text-[11px] text-[#1C1C1E] leading-relaxed font-semibold">
                <span className="font-extrabold mr-1.5 text-neutral-950">stackhouse.cuisine</span>
                Cohesive structural gastronomy. Our presentation frames culinary design on raw physical matter—combining organic basalt plate pillars and crystalline liquid prisms for a truly monumental sensory narrative.
              </p>
              <p className="text-[9px] font-bold text-neutral-400 tracking-wide uppercase mt-2">JUNE 5, 2026</p>
            </div>
          </div>
        </section>

        {/* BRAND BANNERS */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">BRAND EDITORIAL BANNERS</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              Widescreen cinematic formats and tactile crop banners built to establish architectural scale and heavy visual direction.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              Designed as premium editorial banners, these multi-format assets anchor digital touchpoints with elegant compositions, minimal high-contrast borders, and rich surface textures.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Cinematic 16:9 Banner */}
            <div className="bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:shadow-neutral-400/10">
              <div className="bg-[#F2F2F7] border-b border-[#D1D1D6] px-4 py-3 flex items-center">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                </div>
              </div>

              <div className="bg-[#F2F2F7]/40 p-2 sm:p-4">
                <div className="w-full bg-white rounded-lg overflow-hidden border border-[#D1D1D6] shadow-sm aspect-[16/9] relative">
                  <img
                    src="/assets/images/Stackhouse/StackhouseThumbnailorBanner.png"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Stackhouse Cinematic Banner"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Tactile 4:3 Banner */}
            <div className="bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:shadow-neutral-400/10">
              <div className="bg-[#F2F2F7] border-b border-[#D1D1D6] px-4 py-3 flex items-center">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                </div>
              </div>

              <div className="bg-[#F2F2F7]/40 p-2 sm:p-4">
                <div className="w-full bg-white rounded-lg overflow-hidden border border-[#D1D1D6] shadow-sm aspect-[4/3] relative">
                  <img
                    src="/assets/images/Stackhouse/StackhouseBanner2.png"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Stackhouse Tactile Banner"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHOTOGRAPHY DIRECTION & modern photography style */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">PHOTOGRAPHY STYLE & DIRECTION</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              A modern photography style designed to focus purely on high texture, heavy directional light, and cold-toned ambient shadows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            {/* The photography image (Left, Span 7) */}
            <div className="md:col-span-7">
              <GalleryItem 
                src="/assets/images/Stackhouse/StackhousePhotographyStyle.png"
                span="w-full"
                label="STKHSE Core Photography Standard"
                aspect="1/1"
              />
            </div>

            {/* The style guidelines description block (Right, Span 5) */}
            <div className="md:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#1C1C1E] uppercase tracking-tight">TACTILE SPECIFICATION</h3>
                <p className="text-xs text-[#6D6D72] leading-relaxed">
                  Every food and beverage photograph must represent physical geometry and high contrast. Shadows are kept cold, sharp, and deep while key light highlights the raw glistening texture of ingredients. The visual standard relies on clean minimal framing of raw textures, metallic or volcanic backdrops, and precise geometry to focus attention on the form.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Simple End Statement - Continue Exploring button */}
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
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I saw your project Stackhouse'}
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
  const [likes, setLikes] = React.useState(215);
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs transition-with-cursor cursor-pointer ${
        isLiked ? "bg-red-50 text-red-500 border border-red-200 shadow-sm" : "bg-transparent text-[#6D6D72] hover:bg-neutral-100"
      }`}
    >
      <Heart 
        size={18} 
        fill={isLiked ? "currentColor" : "none"} 
        className={`transition-transform ${isLiked ? "scale-110" : ""}`} 
      />
      <span>{likes}</span>
    </button>
  );
}
