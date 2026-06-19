import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, Mail, Monitor, Smartphone, MessageCircle, Send, Bookmark } from 'lucide-react';

import { useProjectStats } from '../../../lib/stats';

interface RamngoPageProps {
  onBack: () => void;
}

export default function RamngoPage({ onBack }: RamngoPageProps) {
  const project = {
    title: 'RAMNGO',
    subtitle: 'High-Velocity Brand Identity',
    description: 'RAMNGO is engineered for a life in motion, merging high-speed utility with elevated aesthetics. The system is built on sharp, modern foundations punctuated by raw visual breaks—designed to arrest attention and maintain recall in the world\'s most fast-moving digital environments.',
    tags: ['Identity', 'UI/UX Design', 'Interactive Concept'],
    role: 'Creative Lead & UI/UX Designer',
    bio: 'I pioneered the brand identity, interactive web concepts, and frontend strategy for RAMNGO. By fusing traditional culinary appeal with high-velocity digital experiences, we transformed the simple act of choosing a meal into a playful divination-inspired digital ritual. From custom social grids to interactive choice engines, every touchpoint was built to stop the scroll.',
    responsibilities: [
      'Brand Identity & System',
      'UI/UX Web Design & Creation',
      'Interactive Concept Dev',
      'Social Media Art Direction'
    ]
  };

  const squarePosts = [
    { src: '/assets/images/RamngoSocmed.png', label: 'Rhythm in Red', aspect: '1/1' as const },
    { src: '/assets/images/RamngoSocmed2.png', label: 'Grid Precision Collection', aspect: '1/1' as const },
    { src: '/assets/images/Socmed44.png', label: 'High-Velocity Focus Grid', aspect: '1/1' as const },
    { src: '/assets/images/RamngoSquare4.png', label: 'Tactile Brand Frame', aspect: '1/1' as const }
  ];

  const verticalPosts = [
    { src: '/assets/images/Ramngo ReelAd.png', label: 'Velocity Highlight Reel', aspect: '9/16' as const },
    { src: '/assets/images/RamngoArtboard 8.png', label: 'Artboard 8 Specs', aspect: '9/16' as const }
  ];

  const [isInstaLiked, setIsInstaLiked] = React.useState(false);
  const [instaLikeCount, setInstaLikeCount] = React.useState(342);

  const handleInstaLike = () => {
    if (isInstaLiked) {
      setIsInstaLiked(false);
      setInstaLikeCount(prev => prev - 1);
    } else {
      setIsInstaLiked(true);
      setInstaLikeCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E]">
      <div className="noise-overlay opacity-25" />
      
      {/* Refined Minimalist Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 justify-between bg-[#F2F2F7]/80 backdrop-blur-md border-b border-[#D1D1D6]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors cursor-pointer text-[#1C1C1E] flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-4 bg-[#D1D1D6]" />
          <span className="font-extrabold tracking-tight text-sm text-[#1C1C1E]">RAMNGO Showcase</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-900 border border-neutral-800 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer">
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
              
              <h1 className="text-[#1C1C1E] text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8 uppercase">
                {project.title}
              </h1>
              
              <div className="space-y-6 mb-10">
                <p className="text-xl text-[#3A3A3C] font-semibold leading-tight font-sans">
                  {project.description}
                </p>
                <p className="text-base text-[#6D6D72] leading-relaxed">
                  {project.bio}
                </p>
              </div>
 
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E] border-b border-[#D1D1D6] pb-2 inline-block">
                  Core Involvement
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-semibold">
                  {project.responsibilities.map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs sm:text-sm text-[#3A3A3C]">
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
              className="w-full aspect-square max-w-[440px] flex items-center justify-center p-0 select-none transition-all duration-700 hover:scale-[1.01]"
            >
              <img 
                src="/assets/images/RamngoMainLogo.png" 
                alt="RAMNGO Main Logo" 
                className="w-full h-full object-contain rounded-2xl" 
              />
            </motion.div>
          </div>
        </div>
        {/* SECTION 1: SOCIAL MEDIA APPROACH */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase text-center">SOCIAL MEDIA APPROACH</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold text-center">
              To support the brand's playful personality, I developed a social media system built around bold visuals, straightforward messaging, and humor.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed text-center">
              The content focuses on short, easy-to-read copy that can be understood at a glance. One-liners, visual jokes, and surreal graphic compositions help capture attention in fast-moving social feeds while keeping the content approachable and shareable.
            </p>
          </div>

          {/* Two rows of two squares */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {squarePosts.map((post) => (
              <GalleryItem 
                key={post.src + post.label}
                src={post.src}
                span="col-span-1" 
                label={post.label} 
                aspect={post.aspect}
              />
            ))}
          </div>

          {/* Centered Single Fake Instagram Post (RamngoPackaging.png.png) */}
          <div className="pt-12 pb-4 flex flex-col items-center">
            <div className="border-t border-[#D1D1D6] w-full pt-12 text-center max-w-xl mx-auto space-y-3 mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E]">PACKAGING INTEGRATION</h3>
              <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
                To capture the tactile look of our custom containers, we created a dedicated single-post layout highlighting the premium street-food packaging system on social channels.
              </p>
            </div>

            <div className="w-full max-w-[825px] bg-white border border-[#D1D1D6] rounded-2ios shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-[#E5E5EA]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-neutral-200 overflow-hidden bg-neutral-50 flex items-center justify-center p-0.5">
                    <img 
                      src="/assets/images/RamngoMainLogo.png" 
                      alt="RAMNGO Mini Logo" 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-neutral-900 tracking-tight leading-none">RamnGo</span>
                  </div>
                </div>
                <div className="flex gap-1.5 items-center px-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                </div>
              </div>

              {/* Single Square Post Image */}
              <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden group">
                <img 
                  src="/assets/images/RamngoPackaging.png.png" 
                  alt="RAMNGO Packaging Post" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Interaction Bar */}
              <div className="px-4 py-3 flex justify-between items-center bg-white">
                <div className="flex gap-4 items-center">
                  <button 
                    onClick={handleInstaLike}
                    className="cursor-pointer transition-transform duration-200 active:scale-125 focus:outline-hidden"
                  >
                    <Heart 
                      size={18} 
                      fill={isInstaLiked ? "#FF2D55" : "none"} 
                      className={isInstaLiked ? "text-[#FF2D55]" : "text-neutral-800 hover:text-[#FF2D55]"} 
                    />
                  </button>
                  <MessageCircle size={18} className="text-[#1C1C1E] cursor-pointer" />
                  <Send size={18} className="text-[#1C1C1E] cursor-pointer" />
                </div>

                <Bookmark size={18} className="text-[#1C1C1E] cursor-pointer" />
              </div>

              {/* Caption */}
              <div className="px-5 pb-5 pt-2.5 bg-white border-t border-[#F2F2F7] text-left">
                <p className="text-[9px] font-bold text-neutral-400 tracking-wide uppercase mt-1">JUNE 4, 2026</p>
              </div>
            </div>
          </div>

          {/* Two 9 by 16 vertical slots filling the space side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8">
            {verticalPosts.map((post) => (
              <GalleryItem 
                key={post.src + post.label}
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
              Many of the visuals take a literal approach to communication. For example, a post promoting online ordering features a phone serving ramen directly into a bowl, instantly communicating the message without requiring lengthy explanations.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              The result is a content system that feels energetic, memorable, and aligned with the habits of highly online audiences.
            </p>
          </div>

          {/* Extra Big Square: Occupies the whole column as a single full-width screen square */}
          <div className="pt-8 md:pt-12 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <GalleryItem 
                src="/assets/images/RamngoSocmed3.png" 
                span="w-full" 
                label="The Extra Big Ramen Showcase" 
                aspect="1/1"
              />
            </motion.div>
          </div>

          {/* Widescreen Banner Showcase */}
          <div className="pt-8 md:pt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-full rounded-2ios overflow-hidden group transition-all duration-500 hover:shadow-2xl border border-[#D1D1D6]/60 bg-neutral-100">
                <img 
                  src="/assets/images/Ramngo Banner.png" 
                  alt="RAMNGO Brand Banner" 
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]" 
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: EMBEDDED WEB EXPERIENCE OR IFRAME WEBSITE */}
        <section className="mb-32 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase text-center">WEBSITE EXPERIENCE</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold text-center">
              The website serves as the central digital hub for the brand, bringing together the visual identity, interactive features, and customer experience into a single platform.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed text-center">
              Built to be fully responsive across desktop and mobile devices, the site extends the same design language found throughout the social media content and brand materials. Consistent typography, visuals, and interactions create a cohesive experience regardless of where customers encounter the brand.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BrowserWindow iframeSrc="https://ramngo-website.vercel.app/" title="RAMNGO Live Website" />
          </motion.div>

          {/* Additional insights under the browser showcase */}
          <div className="max-w-2xl mx-auto space-y-4 text-center pt-8">
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              The tarot selection feature is fully integrated into the website, allowing visitors to engage with the brand in a way that feels distinctive, interactive, and true to its personality.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              By maintaining a unified digital identity across all touchpoints, the website reinforces the brand while providing a seamless experience for both new and returning customers.
            </p>
          </div>
        </section>

        {/* SECTION 3: TAROT SELECTION FEATURE */}
        <section className="mb-32 space-y-20">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase text-center">TAROT SELECTION FEATURE</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold text-center">
              Choosing what to order can be overwhelming, especially when faced with a large menu. To make the experience more engaging, I designed an interactive tarot-inspired selection feature that helps customers discover their next bowl of ramen through a playful card-drawing experience.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed text-center">
              Rather than browsing through a traditional menu, users can draw and reveal cards that recommend different ramen options. The feature acts as a fun bridge between the brand and potential customers, encouraging interaction even before an order is placed.
            </p>
          </div>

          {/* Feature 1: Main Flow Image (Full Width) */}
          <div className="space-y-4">
            <div className="w-full">
              <FeatMockupImage 
                src="/assets/images/RamngoFeat1.png" 
                alt="Ramen Oracle Concept Flow" 
                stepLabel="EXPERIMENTAL FLOW — 01"
                fallbackTitle="Tarot Divination Design"
                fallbackDesc="An experimental workflow designed to alleviate decision anxiety by tapping into traditional street divination culture. Users shuffle and draw their ramen bowl using an oracle-like mobile layout design, transforming choices into play."
              />
            </div>
            
            {/* Explainer / Write-up under it */}
            <div className="max-w-2xl mx-auto space-y-4 text-center pt-2">
              <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
                Designed for both desktop and mobile, the experience is intentionally simple and intuitive. Users can reveal cards with a single click or tap, creating a lightweight and enjoyable experience that adds personality to the ordering journey.
              </p>
            </div>
          </div>

          {/* Feature 2: Cards Mockup Image (Full Width) */}
          <div className="space-y-4">
            <div className="w-full">
              <FeatMockupImage 
                src="/assets/images/RamngoFeat2.png" 
                alt="Interactive Ramen Selector Grid" 
                stepLabel="PRODUCTION ASSET — 02"
                fallbackTitle="Interactive Menu Cards"
                fallbackDesc="A high-fidelity layout showcasing the custom tarot-inspired cards. Each dish represents a cosmic archetype with tactile details, standard ratios, and highly readable menu items matching the physical packages."
              />
            </div>
            
            {/* Explainer / Write-up under it */}
            <div className="max-w-2xl mx-auto space-y-4 text-center pt-2">
              <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
                Each card combines bold visuals, custom descriptions, and distinct ramen offerings, transforming a simple recommendation tool into an interactive brand experience.
              </p>
            </div>
          </div>
        </section>

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
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all shadow-lg whitespace-nowrap cursor-pointer animate-none"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I saw your project Ramngo'}
        >
          I want something like this
        </button>
        
        <button 
          className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full border border-neutral-250 text-[#1C1C1E] transition-all cursor-pointer flex items-center justify-center"
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

// Custom featured image card handler with gorgeous CSS fallback for empty PNGs
function FeatMockupImage({ 
  src, 
  alt, 
  fallbackTitle, 
  fallbackDesc,
  stepLabel
}: { 
  src: string; 
  alt: string; 
  fallbackTitle: string; 
  fallbackDesc: string;
  stepLabel: string;
}) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div className="w-full aspect-video md:aspect-[16/10] bg-[#0E0E10] text-white font-sans p-6 sm:p-8 flex flex-col justify-between select-none overflow-hidden text-left rounded-2ios border border-[#D1D1D6] shadow-sm relative group">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-650/10 rounded-full blur-3xl" />
        
        <div className="flex justify-between items-start z-10 relative">
          <div className="space-y-1">
            <span className="font-mono text-[9px] tracking-widest text-[#EF4444] font-extrabold uppercase bg-red-950/40 border border-red-900/40 px-2.5 py-0.5 rounded-full">{stepLabel}</span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-[#F2F2F7] pt-2">{fallbackTitle}</h3>
          </div>
          <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-black text-xs text-white">R</div>
        </div>

        <div className="my-auto max-w-lg z-10 space-y-4 relative">
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-semibold">
            {fallbackDesc}
          </p>
          <div className="flex gap-4 font-mono text-[9px] text-neutral-500 uppercase tracking-widest border-t border-neutral-800/65 pt-4">
            <div>
              <span className="text-[#EF4444] block">SYSTEM LAYER</span>
              <span>DECIDER.PROTOTYPE_v0.9</span>
            </div>
            <div className="border-l border-neutral-800 pl-4">
              <span className="text-[#EF4444] block">INTERFACE PATH</span>
              <span>/brand/divination-deck</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 border-t border-neutral-900 pt-2.5 z-10 relative">
          <span>RAMNGO CULINARY LABS ©2026</span>
          <span>PREVIEW LAYOUT MODE</span>
        </div>
      </div>
    );
  }

  const encodedSrc = encodeURI(src);

  return (
    <div className="w-full flex justify-center items-center py-6 relative group">
      <img 
        src={encodedSrc} 
        alt={alt} 
        onError={() => setHasError(true)}
        className="w-full max-w-[680px] md:max-w-[75%] lg:max-w-[80%] h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-transform duration-700 group-hover:scale-[1.01]" 
      />
    </div>
  );
}

function LikeButton() {
  const { likes, views, isLiked, toggleLike } = useProjectStats('ramngo', 124, 1085);

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
        <div className="w-full aspect-[9/16] bg-neutral-950 relative rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-xl">
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

        <div className="bg-neutral-50 transition-all duration-500 flex items-center justify-center p-4">
          {viewMode === 'desktop' ? (
            <div className="w-full aspect-[16/9] bg-neutral-950 relative rounded-lg overflow-hidden border border-[#D1D1D6] shadow-sm">
              <iframe
                src={iframeSrc}
                className="absolute inset-0 w-full h-full border-0"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups opacity-100"
              />
            </div>
          ) : (
            <div className="w-full max-w-[325px] aspect-[9/16] bg-neutral-950 relative rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-xl hover:border-neutral-400 transition-all duration-500 my-4">
              <iframe
                src={iframeSrc}
                className="absolute inset-0 w-full h-full border-0"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups opacity-100"
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
  aspect = '1/1' 
}: { 
  src: string; 
  span: string; 
  label: string; 
  aspect?: '1/1' | '16/9' | '9/16' | '4/3'; 
  key?: React.Key;
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
  }

  const encodedSrc = encodeURI(src);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`${span} space-y-3`}
    >
      <div className={`group relative ${aspectClass} rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-neutral-100 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-400`}>
        {hasError ? (
          <div className="absolute inset-0 bg-[#F9F9FB] flex flex-col items-center justify-center p-6 text-center select-none">
            <span className="font-mono text-[9px] text-[#8E8E93] tracking-widest uppercase mb-1.5">RAMNGO STUDY</span>
            <p className="font-sans text-[11px] text-[#1C1C1E] font-black uppercase tracking-wider">{label}</p>
          </div>
        ) : (
          <img 
            src={encodedSrc} 
            alt={label} 
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        )}
      </div>
    </motion.div>
  );
}

