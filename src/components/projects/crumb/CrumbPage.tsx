import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, Mail, ChevronLeft, ChevronRight, MessageCircle, Send, Bookmark, Monitor, Smartphone } from 'lucide-react';

interface CrumbPageProps {
  onBack: () => void;
}

export default function CrumbPage({ onBack }: CrumbPageProps) {
  const project = {
    title: 'Crumb Cookies',
    subtitle: 'Premium Presentation. Playful Personality.',
    description: 'Crumb Cookies is a conceptual cookie brand built around bold visuals, sharp humor, and premium presentation. Inspired by the confidence of larger consumer brands, the identity combines polished art direction, memorable campaigns, and an unapologetically playful tone to create a brand that feels both aspirational and approachable.',
    tags: ['Identity', 'Creative Direction', 'Packaging Design', 'Social Campaign'],
    role: 'Lead Visual Architect',
    bio: 'I developed the visual identity, social media direction, and digital experience for Crumb. The project explores how smaller brands can achieve the same level of polish and marketing presence often associated with major household names while maintaining a distinct personality of their own.',
    responsibilities: [
      'Brand Identity & Guidelines',
      'Social Media Campaign Logic',
      'Swipeable Interactive Carousels',
      'Vertical Feed Ad Campaigns',
      'Website Copy & Design Setup'
    ]
  };

  // Real uploaded carousel images for the swipable campaign series
  const carouselSlides = [
    { image: "/assets/images/CRUMB/carousell 1.png" },
    { image: "/assets/images/CRUMB/Carousell2.png" },
    { image: "/assets/images/CRUMB/carousell 3.png" },
    { image: "/assets/images/CRUMB/carousell 4.png" },
    { image: "/assets/images/CRUMB/Carousell5.png" },
    { image: "/assets/images/CRUMB/Carousell6.png" }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] selection:bg-[#007AFF]/10">
      <div className="noise-overlay opacity-35" />
      
      {/* Refined Minimalist Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 justify-between bg-[#F2F2F7]/80 backdrop-blur-md border-b border-[#D1D1D6]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-neutral-150 rounded-full transition-colors cursor-pointer text-[#1C1C1E]"
            aria-label="Back to main page"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-4 bg-[#D1D1D6]" />
          <span className="font-extrabold tracking-tight text-sm text-[#1C1C1E]">Crumb Cookies</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#D1D1D6] text-[#1C1C1E] rounded-full text-xs font-bold hover:bg-neutral-50 transition-all cursor-pointer">
            <Share2 size={14} />
            Share Project
          </button>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* HERO SECTION: Brand Details & Pristine Main Logo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-center mb-32">
          {/* Left Column: Context Details */}
          <div className="lg:col-span-5 space-y-12 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white text-[#6D6D72] text-[10px] font-bold rounded-full border border-[#D1D1D6] uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="space-y-4">
                <h1 className="text-[#1C1C1E] text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] uppercase">
                  {project.title}
                </h1>
                <p className="text-lg text-[#3A3A3C] font-semibold leading-tight">
                  {project.subtitle}
                </p>
              </div>
              
              <div className="space-y-6 text-[#6D6D72] text-sm leading-relaxed">
                <p>{project.description}</p>
                <p>{project.bio}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#D1D1D6]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1C1C1E]">
                  Involvement
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 text-xs text-[#3A3A3C] font-semibold">
                  {project.responsibilities.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-neutral-900" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Pristine Main Logo Showcase (Uncompounded Center Box) */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full aspect-square max-w-[440px] flex items-center justify-center p-0 select-none transition-all duration-700 hover:scale-[1.01] border-0 border-transparent outline-none ring-0 shadow-none"
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            >
              <img 
                src="/assets/images/CRUMB/CrumbCookieLogo.png" 
                alt="CRUMB Bakery Cookie Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-2xl border-0 border-transparent outline-none ring-0 shadow-none" 
                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
              />
            </motion.div>
          </div>
        </div>

        {/* SECTION 1: SOCIAL MEDIA SYSTEM (2x2 GRID OF FOUR POSTS) */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">SOCIAL MEDIA SYSTEM</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              The social media system was designed to make the brand instantly recognizable while maintaining flexibility across product launches, promotions, and everyday content.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              Humor serves as a core communication tool throughout the campaign. Rather than relying solely on product photography, many of the visuals use literal interpretations, visual jokes, and unexpected concepts—like showing nothing but crumbs after the marketing team supposedly ate the cookies—to create memorable, scroll-stopping brand moments backed by bold typography.
            </p>
          </div>

          {/* Social media grid of 4 items in 2 rows by 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Post 1: Original Socmed Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-square rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-white transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-neutral-400"
            >
              <img 
                src="/assets/images/CRUMB/SocmedBanner.png" 
                alt="CRUMB Social Media Banner" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Post 2: Placeholder 1 - Fresh Artisan Cookies */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-white transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-neutral-400"
            >
              <img 
                src="/assets/images/CRUMB/Crumb3.png" 
                alt="CRUMB Craft Cookies" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Post 3: Placeholder 2 - Cookie Dough & Flour */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-square rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-white transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-[#D1D1D6]"
            >
              <img 
                src="/assets/images/CRUMB/Crumb4.png" 
                alt="CRUMB Sourdough Bakers Lab" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Post 4: Placeholder 3 - Warm Fired Hearth */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="aspect-square rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-white transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-[#D1D1D6]"
            >
              <img 
                src="/assets/images/CRUMB/Crumb2.png" 
                alt="CRUMB Flour Mill Textures" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>


        {/* SECTION 2: INTERACTIVE SOCIAL CAROUSELS */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">INTERACTIVE SOCIAL CAROUSELS</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              To encourage engagement and increase time spent with the content, I designed a series of swipeable social carousel experiences inspired by personality quizzes and preference-based funnels.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              The content invites users to identify their favorite flavors, compare choices, and discover cookie profiles that align with their preferences. By leaning into personal bias and playful self-identification, the carousels transform product discovery into an interactive experience rather than a traditional advertisement.
            </p>
          </div>

          {/* Interactive Social Media Carousel Screen Mockup made 40% wider */}
          <div className="max-w-[910px] mx-auto bg-white border border-[#D1D1D6] rounded-2ios shadow-2xl overflow-hidden">
            {/* Social Header Mock (Neutral Profile) */}
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-[#E5E5EA]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-neutral-200 overflow-hidden bg-neutral-50 flex items-center justify-center p-0.5">
                  <img 
                    src="/assets/images/CRUMB/CrumbCookieLogo.png" 
                    alt="Crumb Mini Logo" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <p className="text-xs font-black text-neutral-900 tracking-tight leading-none">crumb.cookies</p>
                </div>
              </div>
              <div className="flex gap-1.5 items-center px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              </div>
            </div>

            {/* Carousel Inner View Box (Swipable Sliding Shift) */}
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#D1D1D6] flex items-center justify-center text-neutral-900 shadow-md cursor-pointer hover:bg-white hover:scale-105 transition-all scale-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
              )}

              {/* Slider Right Arrow */}
              {activeSlide < carouselSlides.length - 1 && (
                <button 
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#D1D1D6] flex items-center justify-center text-neutral-900 shadow-md cursor-pointer hover:bg-white hover:scale-105 transition-all scale-100"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Post Interaction Row */}
            <div className="px-4 py-3 flex justify-between items-center bg-white">
              <div className="flex gap-4 items-center">
                <Heart size={18} className="text-neutral-800 hover:text-red-500 cursor-pointer transition-colors animate-pulse" />
                <MessageCircle size={18} className="text-neutral-800 cursor-pointer" />
                <Send size={18} className="text-neutral-800 cursor-pointer" />
              </div>
              
              {/* Dots indicator */}
              <div className="flex gap-1.5">
                {carouselSlides.map((_, i) => (
                  <button
                    key={i} 
                    onClick={() => setActiveSlide(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === activeSlide ? "bg-[#007AFF] w-3 rounded-md" : "bg-[#D1D1D6]"
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
                <span className="font-extrabold mr-1.5 text-neutral-950">crumb.cookies</span>
                Our slow-proved sourdough loaves are hand kneaded, slow fermented for 36 hours for rich gluten structure and deep toasted crust profiles. Fired fresh mornings.
              </p>
              <p className="text-[9px] font-bold text-neutral-400 tracking-wide uppercase mt-2">JUNE 4, 2026</p>
            </div>
          </div>
        </section>


        {/* SECTION 3: VERTICAL AD CAMPAIGNS */}
        <section className="mb-32 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">VERTICAL AD CAMPAIGNS</h2>
            <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
              Designed specifically for mobile-first platforms, these portrait-format advertisements were created to capture attention in fast-moving feeds across Instagram, TikTok, and YouTube Shorts.
            </p>
            <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
              Large typography, bold compositions, and high-contrast visuals ensure immediate readability while scrolling. Each layout is built to communicate a single idea quickly, allowing the imagery and copy to work together as a scroll-stopping visual statement—all while maintaining a highly distinct and recognizable identity.
            </p>
          </div>

          {/* Grid with left and right reel ads under 9:16 frames */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {/* Left Reel */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="aspect-[9/16] rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-neutral-100 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-neutral-400">
                <img 
                  src="/assets/images/CRUMB/Crumbreelad.png" 
                  alt="Crumb Reel Ad Left" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Right Reel */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="aspect-[9/16] rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-neutral-100 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:border-neutral-400">
                <img 
                  src="/assets/images/CRUMB/CrumbReelad2.png" 
                  alt="Crumb Reel Ad Right" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </section>


        {/* SECTION 4: WEBSITE & UI DESIGN */}
        <section className="mb-32 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Website & UI Design copy aligned to the left */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <h2 className="text-3.5xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase leading-tight">
                WEBSITE & UI DESIGN
              </h2>
              <p className="text-[#3A3A3C] text-sm md:text-base leading-relaxed font-semibold">
                The website extends the brand's personality beyond visual design and into the language itself with playful headlines, opinionated descriptions, and self-aware brand character.
              </p>
              <p className="text-[#6D6D72] text-xs sm:text-sm leading-relaxed">
                The interface remains clean and straightforward, allowing bold copywriting and strong visuals to take center stage. By combining premium presentation with sharp brand humor, it creates a cohesive digital experience that proves smaller brands can achieve the presence, confidence, and memorability associated with much larger consumer brands.
              </p>
            </div>

            {/* Right Column: Concept Presentation Screenshot */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <BrowserWindow>
                  <div className="w-full aspect-video md:aspect-[16/10] overflow-hidden bg-white">
                    <img 
                      src="/assets/images/CRUMB/LandingPageConcept.png" 
                      alt="CRUMB Cookies Digital Landing Page Concept" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain bg-white hover:scale-[1.02] transition-transform duration-700" 
                    />
                  </div>
                </BrowserWindow>
              </motion.div>
            </div>
          </div>

          {/* Under it will be the iframe for the website. That's basically it. */}
          <div className="space-y-6 pt-12 border-t border-[#D1D1D6]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full"
            >
              <BrowserWindow 
                iframeSrc="https://crumbcookies.vercel.app/" 
                title="Crumb Cookies Live Flagship Site" 
              />
            </motion.div>
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
        
        {/* Prevent floating button interference */}
        <div className="h-24 sm:h-32" />
      </main>

      {/* Action Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-2xl border border-[#D1D1D6] rounded-full shadow-2xl scale-100 hover:scale-[1.03] transition-all duration-500 w-max max-w-[95vw]">
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all shadow-lg whitespace-nowrap cursor-pointer"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I saw your project Crumb'}
        >
          I want something like this
        </button>
        
        <button 
          className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full border border-[#D1D1D6] text-[#1C1C1E] transition-all cursor-pointer"
          title="Send an Email"
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
  const [likes, setLikes] = React.useState(210);
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
      className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs transition-colors cursor-pointer ${
        isLiked ? "bg-red-50 text-red-500 border border-red-100 shadow-sm" : "bg-transparent text-[#6D6D72] hover:bg-[#F2F2F7]"
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
            className="absolute inset-0 w-full h-full border-0 bg-white"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            referrerPolicy="no-referrer"
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
                  ? "bg-white text-[#1C1C1E] shadow-3xs font-extrabold"
                  : "text-[#6D6D72] hover:text-[#1C1C1E] font-medium"
              }`}
            >
              <Monitor size={10} />
              <span className="font-mono">DESKTOP 16:9</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-[10px] font-bold tracking-wider transition-all cursor-pointer uppercase ${
                viewMode === 'mobile'
                  ? "bg-white text-[#1C1C1E] shadow-3xs font-extrabold"
                  : "text-[#6D6D72] hover:text-[#1C1C1E] font-medium"
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
            <div className="w-full aspect-[16/9] bg-white relative rounded-lg overflow-hidden border border-[#D1D1D6] shadow-sm">
              <iframe
                src={iframeSrc}
                className="absolute inset-0 w-full h-full border-0 bg-white"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-full max-w-[325px] aspect-[9/16] bg-white relative rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-xl hover:border-neutral-400 transition-all duration-500 my-4">
              <iframe
                src={iframeSrc}
                className="absolute inset-0 w-full h-full border-0 bg-white"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-black/5">
      <div className="bg-neutral-150 border-b border-[#D1D1D6] px-4 py-3 flex gap-1.5 items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </div>
      <div>{children}</div>
    </div>
  );
}
