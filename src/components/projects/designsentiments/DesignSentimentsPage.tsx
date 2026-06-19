import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Share2, Heart, MessageCircle, Send, Bookmark, Monitor, Smartphone, ExternalLink, Mail, Play, Pause } from 'lucide-react';
import { useProjectStats } from '../../../lib/stats';
import AppImage from '../../ui/AppImage';

// Import Carousel 2 Images
// @ts-ignore
import carousel2_1 from './Carousel2/1.png';
// @ts-ignore
import carousel2_2 from './Carousel2/2.png';
// @ts-ignore
import carousel2_3 from './Carousel2/3.png';
// @ts-ignore
import carousel2_4 from './Carousel2/4.png';
// @ts-ignore
import carousel2_5 from './Carousel2/5.png';
// @ts-ignore
import carousel2_6 from './Carousel2/6.png';

// Import Carousel 7 Images
// @ts-ignore
import carousel7_1 from './dscarousel7/1.png';
// @ts-ignore
import carousel7_2 from './dscarousel7/2.png';
// @ts-ignore
import carousel7_3 from './dscarousel7/3.png';
// @ts-ignore
import carousel7_4 from './dscarousel7/4.png';

interface DesignSentimentsPageProps {
  onBack: () => void;
}

export default function DesignSentimentsPage({ onBack }: DesignSentimentsPageProps) {
  const [activeVolume, setActiveVolume] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const carousels = [
    {
      id: 'volume1',
      title: 'The Evolution of AI Generated Content Happened Faster Than Most People Expected',
      caption: '',
      slides: [
        { src: '/assets/images/DesignSentiments/DesignSentimentsCarousel1.png', label: 'Art Direction Slide 1' },
         { src: '/assets/images/DesignSentiments/DesignSentimentsCarousel2.png', label: 'Layout Composition Slide 2' },
        { src: '/assets/images/DesignSentiments/DesignSentimentsCarousel3.png', label: 'Visual Archetype Slide 3' },
        { src: '/assets/images/DesignSentiments/DesignSentimentsCarousel4.png', label: 'Editorial Grid Slide 4' },
        { src: '/assets/images/DesignSentiments/DesignSentimentsCarousel5.png', label: 'Print Texture Slide 5' },
        { src: '/assets/images/DesignSentiments/DesignSentimentsCarousel6.png', label: 'Copywriting Slide 6' }
      ]
    },
    {
      id: 'volume2',
      title: 'Why Coffee Shops Became the Office of the Creative Class',
      caption: '',
      slides: [
        { src: carousel2_1, label: 'Interface Craft Slide 1' },
        { src: carousel2_2, label: 'Interface Craft Slide 2' },
        { src: carousel2_3, label: 'Interface Craft Slide 3' },
        { src: carousel2_4, label: 'Interface Craft Slide 4' },
        { src: carousel2_5, label: 'Interface Craft Slide 5' },
        { src: carousel2_6, label: 'Interface Craft Slide 6' }
      ]
    },
    {
      id: 'volume3',
      title: 'Why Film Photography Refuses to Die',
      caption: '',
      slides: [
        { src: '/assets/images/DesignSentiments/1_carousel3.png', label: 'Tactile Ephemera Slide 1' },
        { src: '/assets/images/DesignSentiments/2_carousel3.png', label: 'Tactile Ephemera Slide 2' },
        { src: '/assets/images/DesignSentiments/3_carousel3.png', label: 'Tactile Ephemera Slide 3' },
        { src: '/assets/images/DesignSentiments/4_carousel3.png', label: 'Tactile Ephemera Slide 4' },
        { src: '/assets/images/DesignSentiments/5_carousel3.png', label: 'Tactile Ephemera Slide 5' }
      ]
    },
    {
      id: 'volume4',
      title: 'Design is More Than Just Aesthetics',
      caption: '',
      slides: [
        { src: '/assets/images/DesignSentiments/DSCarousel6/1.png', label: 'Design is More Than Just Aesthetics Slide 1' },
        { src: '/assets/images/DesignSentiments/DSCarousel6/2.png', label: 'Design is More Than Just Aesthetics Slide 2' },
        { src: '/assets/images/DesignSentiments/DSCarousel6/3.png', label: 'Design is More Than Just Aesthetics Slide 3' },
        { src: '/assets/images/DesignSentiments/DSCarousel6/4.png', label: 'Design is More Than Just Aesthetics Slide 4' },
        { src: '/assets/images/DesignSentiments/DSCarousel6/5.png', label: 'Design is More Than Just Aesthetics Slide 5' },
        { src: '/assets/images/DesignSentiments/DSCarousel6/6.png', label: 'Design is More Than Just Aesthetics Slide 6' }
      ]
    },
    {
      id: 'volume5',
      title: 'Big Tech is Looksmaxxing',
      caption: '',
      slides: [
        { src: carousel7_1, label: 'Big Tech is Looksmaxxing Slide 1' },
        { src: carousel7_2, label: 'Big Tech is Looksmaxxing Slide 2' },
        { src: carousel7_3, label: 'Big Tech is Looksmaxxing Slide 3' },
        { src: carousel7_4, label: 'Big Tech is Looksmaxxing Slide 4' }
      ]
    }
  ];

  const currentSlides = carousels[activeVolume].slides;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % currentSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1E] selection:bg-[#FF3B30]/10 tracking-tight pb-32">
      {/* Editorial Header Noise and subtle ambient feel */}
      <div className="noise-overlay opacity-[0.25]" />
      
      {/* Clean Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 justify-between bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E5E5E0]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors cursor-pointer text-[#1C1C1E]"
            aria-label="Back to main page"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-4 bg-[#E5E5E0]" />
          <span className="font-sans text-xs tracking-wider uppercase text-neutral-500 font-bold">Design Sentiments</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Design Sentiments — Brand Identity',
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#E5E5E0] text-[#1C1C1E] rounded-full text-xs font-bold hover:bg-neutral-50 transition-all cursor-pointer shadow-2xs"
          >
            <Share2 size={13} />
            Share Portfolio
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="pt-24 sm:pt-32 max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* HERO SECTION: Design Details & Pristine Main Logo Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-center">
          {/* Left Column: Context Details */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div className="flex flex-wrap gap-2">
              {[
                'Website UI/UX',
                'Branding',
                'Graphic Design',
                'Social Media',
                'Digital Marketing',
                'Creative Direction',
                'Copywriting'
              ].map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold rounded-full border border-neutral-250/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-black text-[#1C1C1E] uppercase tracking-tighter leading-none">
                Design Sentiments
              </h1>
              <p className="font-sans text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
                Design Sentiments is my editorial blog and design diary. It's where I put my reactions to what's happening in design right now, and honestly, design and technology have become so intertwined that you can't really talk about one without the other anymore.
              </p>
              <div className="pt-2">
                <a 
                  href="https://designsentiments.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1C1E] hover:bg-neutral-800 text-[#FAF9F6] rounded-full text-xs font-bold tracking-wider transition-all shadow-3xs hover:shadow-2xs uppercase font-sans cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div className="space-y-6 text-neutral-500 text-sm leading-relaxed border-t border-[#E5E5E0] pt-6">
              <p>
                I'm a multimedia arts graduate. I've been working with AI tools for the past two years across design, photography, writing, web development, all of it. I watched AI go from something we used to draft scripts to something that's now genuinely threatening to replace product photographers. That shift happened fast. Faster than most people were ready for.
              </p>
              <p>
                Design Sentiments is me processing that out loud. What these tools are doing to the industry, what we're quietly giving up, what's actually worth getting excited about. I use AI in my own work so I'm not writing from the outside looking in. I'm in it. And I think that perspective matters.
              </p>
              <p>
                I also just genuinely believe that designers who understand technology are going to have a real edge going forward. Build your own tools, build your own software, that's where this is heading. It's not something to be afraid of. It's just the industry evolving and you either move with it or you don't.
              </p>
              <p>
                The name says it all really. Design Sentiments. My sentiments. As a designer reacting to all of this in real time.
              </p>
            </div>

            {/* Visual Role Specifications Block */}
            <div className="space-y-4 pt-6 border-t border-[#E5E5E0]">
              <h3 className="text-sm font-extrabold uppercase tracking-tight text-[#1C1C1E] font-sans">
                Disciplines & Roles
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Brand Identity Designer',
                  'Creative Director',
                  'UI/UX Designer',
                  'Content Strategist',
                  'Commentary Writer'
                ].map((role) => (
                  <span 
                    key={role} 
                    className="px-3.5 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full text-xs text-neutral-700 font-semibold leading-none"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400 font-sans tracking-tight">
                  Email / Newsletter Designer (Soon)
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Standard 1:1 Brand Logo block (matching other sites) */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="w-full aspect-square max-w-[440px] flex items-center justify-center p-0 select-none relative group hover:scale-[1.01] transition-all duration-500">
              <AppImage 
                src="/assets/images/DesignSentiments/DesignSentiments_logo.png"
                alt="Design Sentiments Brand Logo"
                className="w-full h-full object-contain rounded-[24px]"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: Design sentiments thumbnail (Horizontal: Widescreen presentation 16:9 - No Cropping) */}
        <section className="space-y-4">
          <div className="w-full bg-white rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-2xs">
            <AppImage 
              src="/assets/images/DesignSentiments/DesignSentiments_Thumbnail.png"
              alt="Design Sentiments Launch Spec Sheet"
              className="w-full h-auto block object-contain"
            />
          </div>
        </section>

        {/* SECTION 3: Sequential brand showcases */}
        <section className="space-y-16">
          <div className="w-full bg-white rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-2xs">
            <AppImage 
              src="/assets/images/DesignSentiments/DesignSentiments_logofeature2.png"
              alt="Design Sentiments Logo Composition V2"
              className="w-full h-auto block object-contain"
            />
          </div>

          <div className="w-full bg-white rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-2xs">
            <AppImage 
              src="/assets/images/DesignSentiments/DesignSentiments_logofeature.png"
              alt="Design Sentiments Logo Feature Sheet"
              className="w-full h-auto block object-contain"
            />
          </div>
        </section>

        {/* SECTION 4: Dual vertical columns (9:16 layouts) */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">
              Typography & Content Guidelines
            </h2>
            <p className="text-neutral-500 text-sm">
              Establishing clean typography combinations and rigorous editorial standards for digital publication.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-[#E5E5E0] shadow-2xs bg-white">
              <AppImage 
                src="/assets/images/DesignSentiments/DesignSentimentsTypography.png"
                alt="Design Sentiments Typography Spec"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-[#E5E5E0] shadow-2xs bg-white">
              <AppImage 
                src="/assets/images/DesignSentiments/DesignSentimentsGuidelines.png"
                alt="Design Sentiments Editorial Guidelines"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: Color Palette (Widescreen - No Top/Bottom Cropping) */}
        <section className="space-y-4">
          <div className="w-full bg-white rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-2xs">
            <AppImage 
              src="/assets/images/DesignSentiments/DesignSentimentsColorPalette.png"
              alt="Design Sentiments Editorial Color Palette"
              className="w-full h-auto block object-contain"
            />
          </div>
        </section>

        {/* SECTION 5.5: Cinematic Brand Video Showcase */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto border-t border-[#E5E5E0] pt-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase font-sans">
              Cinematic Infographic Video
            </h2>
            <p className="text-neutral-600 text-sm max-w-xl mx-auto font-sans leading-relaxed">
              Watch this short video connected to this{" "}
              <a 
                href="https://www.designsentiments.com/article.html?id=0261226" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-neutral-900 underline font-semibold hover:text-neutral-600 transition-colors"
              >
                observational essay
              </a>{" "}
              which showcases writing, motion graphics, and use of personalised toolset
            </p>
          </div>
          <div className="relative mx-auto max-w-6xl aspect-[16/9] bg-black rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-2xl transition-all duration-500 hover:scale-[1.01] group cursor-pointer">
            <video 
              ref={videoRef}
              src="/assets/images/DesignSentiments/designsentiments.mp4"
              controls={isVideoPlaying}
              playsInline
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
            
            {!isVideoPlaying && (
              <div 
                className="absolute inset-0 bg-black/35 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-3 transition-all duration-300"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                }}
              >
                <div className="w-20 h-20 bg-[#FAF9F6] text-[#1C1C1E] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </div>
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FAF9F6] uppercase">
                  PLAY FILM
                </span>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 6: Elegant Instagram Mockup Carousel (Fully fills container!) */}
        <section className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">Design Sentiments</h2>
          </div>

          {/* Side-by-side Grid Frame: Left places the mockup carousel, Right places everything else */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto pt-4">
            
            {/* Left Column: The Mockup Carousel itself */}
            <div className="lg:col-span-6 w-full max-w-[480px] mx-auto bg-white border border-[#E5E5E0] rounded-[24px] shadow-lg overflow-hidden">
              {/* Mock Header */}
              <div className="px-4 py-3.5 flex items-center justify-between border-b border-[#E5E5E0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-neutral-900 overflow-hidden bg-neutral-950 flex items-center justify-center p-0.5">
                    <span className="text-[8px] font-black text-white leading-none">DS</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-900 tracking-tight leading-none text-left">design sentiments</p>
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
                  {currentSlides.map((slide, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 relative">
                      <img 
                        src={slide.src} 
                        alt={slide.label} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Slider Left Arrow */}
                {activeSlide > 0 && (
                  <button 
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#E5E5E0] flex items-center justify-center text-neutral-900 shadow-md cursor-pointer hover:bg-white hover:scale-105 transition-all scale-100 z-10"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                {/* Slider Right Arrow */}
                {activeSlide < currentSlides.length - 1 && (
                  <button 
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#E5E5E0] flex items-center justify-center text-neutral-900 shadow-md cursor-pointer hover:bg-white hover:scale-105 transition-all scale-100 z-10"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {/* Post Interaction Row */}
              <div className="px-4 py-3 flex justify-between items-center bg-white">
                <div className="flex gap-4 items-center">
                  <Heart size={18} className="text-neutral-850 hover:text-red-500 cursor-pointer transition-colors" />
                  <MessageCircle size={18} className="text-neutral-85" />
                  <Send size={18} className="text-neutral-85" />
                </div>
                
                {/* Dots indicator */}
                <div className="flex gap-1.5">
                  {currentSlides.map((_, i) => (
                    <button
                      key={i} 
                      onClick={() => setActiveSlide(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === activeSlide ? "bg-neutral-800 w-3" : "bg-[#E5E5E0]"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <Bookmark size={18} className="text-neutral-85" />
              </div>
            </div>

            {/* Right Column: Title info, volume selections, slide thumbnails, and descriptions */}
            <div className="lg:col-span-6 space-y-6 text-left self-stretch flex flex-col justify-between">
              <div className="space-y-6">
                
                {/* Title Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-sans uppercase tracking-wider text-neutral-505 font-bold block">
                    Select Topic
                  </span>
                  <div className="space-y-2.5">
                    {carousels.map((vol, index) => {
                      const isActive = index === activeVolume;
                      return (
                        <button
                          key={vol.id}
                          onClick={() => {
                            setActiveVolume(index);
                            setActiveSlide(0);
                          }}
                          className={`w-full text-left p-4.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/50'
                          }`}
                        >
                          <span className={`text-sm md:text-base font-bold leading-normal tracking-tight font-sans ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                            {vol.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Thumbnails of the volume */}
                <div className="space-y-3">
                  <span className="text-xs font-sans uppercase tracking-wider text-neutral-505 font-bold block">
                    Slides ({currentSlides.length} &times; frames)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentSlides.map((slide, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActiveSlide(i)}
                        className={`w-12 h-12 md:w-14 md:h-14 aspect-square rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-3xs ${
                          i === activeSlide ? "border-neutral-900 scale-105 ring-2 ring-neutral-900/10" : "border-[#E5E5E0] hover:scale-[1.01]"
                        }`}
                      >
                        <img 
                          src={slide.src} 
                          alt={slide.label} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 7: Guidelines Mockup (Editorial presentation) */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">
              Mockups & Tactile Print
            </h2>
            <p className="text-neutral-500 text-sm">
              Physical print translations, booklet layouts, and tangible representations of our digital design system.
            </p>
          </div>
          <div className="w-full bg-white rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-2xs">
            <AppImage 
              src="/assets/images/DesignSentiments/DesignSentimentsGuidelinesMockup.png"
              alt="Design Sentiments Booklets Mockup Sheet"
              className="w-full h-auto block object-contain"
            />
          </div>
        </section>

        {/* SECTION 8: Live Production Website Viewport */}
        <section className="space-y-8 pb-12">
          <div className="space-y-4 max-w-4xl text-left border-t border-[#E5E5E0] pt-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase font-sans">Website View</h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-sans">
              Visit the home of design sentiments where the blogs are posted
            </p>
          </div>
          <BrowserWindow iframeSrc="https://designsentiments.com" title="Design Sentiments Live Website Preview" />
          <p className="text-center text-xs font-bold tracking-widest text-[#6D6D72] uppercase font-sans">
            Live Domain Node: <a href="https://designsentiments.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 underline">HTTPS://DESIGNSENTIMENTS.COM</a>
          </p>
        </section>

        {/* FOOTER: Standard Return Navigation (matches other sites) */}
        <div className="mt-24 pb-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-8 py-4 rounded-full border border-[#E5E5E0] bg-white hover:bg-neutral-50 text-[#1C1C1E] text-sm font-semibold tracking-wide shadow-xs hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
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
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I saw your project Design Sentiments'}
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
  const { likes, views, isLiked, toggleLike } = useProjectStats('designsentiments', 284, 3084);

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

function BrowserWindow({ 
  children, 
  iframeSrc, 
  title = "Interactive Experience" 
}: { 
  children?: React.ReactNode; 
  iframeSrc?: string; 
  title?: string;
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

  if (iframeSrc) {
    if (isMobileDevice) {
      return (
        <div className="w-full aspect-[9/16] bg-neutral-950 relative rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-xl">
          <iframe
            src={iframeSrc}
            className="absolute inset-0 w-full h-full border-0"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      );
    }

    return (
      <div className="bg-white border border-[#E5E5E0] rounded-[24px] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:shadow-neutral-400/10">
        <div className="bg-neutral-100/40 border-b border-[#E5E5E0] px-4 py-3 flex justify-between items-center">
          <div className="flex gap-1.5 items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          
          <div className="flex items-center bg-neutral-200/50 p-0.5 rounded-lg border border-[#E5E5E0]/60">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[10px] font-bold tracking-wider transition-all cursor-pointer uppercase ${
                viewMode === 'desktop'
                  ? "bg-[#1C1C1E] text-white shadow-3xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Monitor size={10} />
              <span className="font-mono">DESKTOP 16:9</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[10px] font-bold tracking-wider transition-all cursor-pointer uppercase ${
                viewMode === 'mobile'
                  ? "bg-[#1C1C1E] text-white shadow-3xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Smartphone size={10} />
              <span className="font-mono">MOBILE 9:16</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-neutral-450 uppercase tracking-widest hidden sm:block">
            {viewMode === 'desktop' ? 'WIDESCREEN' : 'PORTRAIT'}
          </div>
        </div>

        <div className="bg-neutral-50 transition-all duration-500 flex items-center justify-center p-4">
          {viewMode === 'desktop' ? (
            <div className="w-full aspect-[16/9] bg-neutral-950 relative rounded-lg overflow-hidden border border-[#E5E5E0] shadow-sm">
              <iframe
                src={iframeSrc}
                className="absolute inset-0 w-full h-full border-0"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          ) : (
            <div className="w-full max-w-[325px] aspect-[9/16] bg-neutral-950 relative rounded-[24px] overflow-hidden border border-[#E5E5E0] shadow-xl hover:border-neutral-400 transition-all duration-500 my-4">
              <iframe
                src={iframeSrc}
                className="absolute inset-0 w-full h-full border-0"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
