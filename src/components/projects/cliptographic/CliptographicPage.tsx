import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, Mail, ExternalLink, Monitor, Smartphone } from 'lucide-react';

import { useProjectStats } from '../../../lib/stats';

interface CliptographicPageProps {
  onBack: () => void;
}

export default function CliptographicPage({ onBack }: CliptographicPageProps) {
  const project = {
    title: 'Cliptographic',
    subtitle: 'Kinetic Motion and Short-form Video House',
    description: 'Cliptographic is a content-first film and animation studio designed to capture raw focus on fast-moving feeds. Marrying extreme high-contrast layouts with dense metadata annotations and fast timeline edits, it delivers visual energy.',
    tags: ['Video Production', 'Concept Design', 'Motion Graphics'],
    role: 'Lead Cinema Director & Video Editor',
    bio: 'I structured the aesthetic manual and kinetic video flow for Cliptographic. By integrating dark terminal backdrops, stark white hairline grids, hyper-exposed orange accents, and sound wave telemetry, we constructed a visual platform optimized for rapid scroll-stopping narratives.',
    responsibilities: [
      'Logo & Graphic Guidelines',
      'High-energy Timeline Layouts',
      'Audio Wave Design Schemes',
      'Short-form Cinema Reels',
      'High-Contrast Interface Direct'
    ]
  };

  const projectReels = [
    {
      name: 'Cliptographic Flagship Master Reel',
      label: 'FILM REEL',
      src: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?auto=format&fit=crop&w=600&q=80',
      description: 'The master cut compiling our top agency commercials, soundscapes, and digital visual assets.'
    },
    {
      name: 'Velocity Street Narrative Study',
      label: 'PRESET GRADIENTS',
      src: 'https://images.unsplash.com/photo-1542204172-e7052809a937?auto=format&fit=crop&w=600&q=80',
      description: 'A neon-lit nocturne cinematography exercise exploring urban drift speed and low light sensor range.'
    },
    {
      name: 'Sound Bites Mechanical Library',
      label: 'AUDIO WAVEFORM',
      src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80',
      description: 'A curated synthesizer SFX library comprising heavy sub-drops, mechanics clicks, and kinetic hums.'
    },
    {
      name: 'Modern Swiss Title Asset Kit',
      label: 'MOTION GRAPHICS',
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      description: 'A pack of pre-rendered modular titles featuring tight letters, hairline boundaries, and quick layout entries.'
    },
    {
      name: 'Forest Slate Cinematic LUT Package',
      label: 'COLOR PRESETS',
      src: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=80',
      description: 'Color lookup tables tuned specifically for forest tones, raw charcoal skin tones, and deep slate shadows.'
    }
  ];

  const socialAestheticPosts = [
    { src: 'https://images.unsplash.com/photo-1536240478700-b869ad10e128?auto=format&fit=crop&w=600&q=80', label: 'Timeline Camera Setup Test', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80', label: 'Timeline Sequence Scratch', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80', label: 'Mechanical Audio Synthesis', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1542204172-e7052809a937?auto=format&fit=crop&w=600&q=80', label: 'Nocturnal Velocity Stories', span: 'col-span-1 md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80', label: 'Typographic Hairline Templates', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=80', label: 'Color Contrast Calibration Loop', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80', label: 'Vibrant Light Leak Artifacts', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80', label: 'High-Altitude Cinematic Cuts', span: 'col-span-1 md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80', label: 'Sound Waves Studio Terminal', span: 'col-span-1' },
    { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_107b83ddc-1777556420511.png', label: 'Master Premiere Rig Showcase Feed', span: 'col-span-1 md:col-span-3' }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E]">
      <div className="noise-overlay opacity-30" />
      
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
          <span className="font-extrabold tracking-tight text-sm text-[#1C1C1E]">Cliptographic Core</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-900 border border-neutral-850 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer">
            <Share2 size={14} />
            Share Timeline
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
                <p className="text-xl text-[#3A3A3C] font-semibold leading-tight">
                  {project.description}
                </p>
                <p className="text-base text-[#6D6D72] leading-relaxed">
                  {project.bio}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#6D6D72] border-b border-[#D1D1D6] pb-2 inline-block">
                  Timeline Configurations
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-semibold text-xs">
                  {project.responsibilities.map(item => (
                    <li key={item} className="flex items-center gap-3 text-[#3A3A3C]">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Main Logo Feature with Folder Effect */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="bg-white rounded-3ios border border-[#D1D1D6] h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] group cursor-default relative transition-all duration-700 hover:border-neutral-400"
            >
              <div className="absolute inset-0 flex items-center justify-center p-12 z-20">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 aspect-square rounded-lg bg-[#1C1C1E] text-white font-extrabold text-4xl flex items-center justify-center shadow-lg mx-auto transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
                    C
                  </div>
                  <h3 className="text-2xl font-black text-[#1C1C1E] tracking-widest">CLIPTOGRAPHIC</h3>
                  <span className="text-xs text-[#6D6D72] uppercase tracking-widest block font-bold">— 24 FPS SHIELD —</span>
                </div>
              </div>
              
              {/* Secondary Shots peeking through */}
              <div className="absolute inset-0 z-10 flex items-center justify-center -translate-y-4">
                <div className="w-[85%] h-[85%] bg-neutral-100 rounded-3ios transform -rotate-3 border border-[#D1D1D6] transition-transform group-hover:-rotate-6" />
                <div className="absolute w-[80%] h-[80%] bg-neutral-200/40 rounded-3ios transform rotate-3 border border-[#D1D1D6] transition-transform group-hover:rotate-6" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Banner Section: Browser Window */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <BrowserWindow>
             <div className="w-full aspect-[16/9] overflow-hidden bg-neutral-100">
               <img 
                 src="https://img.rocket.new/generatedImages/rocket_gen_img_107b83ddc-1777556420511.png" 
                 alt="Cliptographic Launch App" 
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover" 
               />
             </div>
          </BrowserWindow>
          <p className="text-center mt-6 text-xs font-bold tracking-widest text-[#6D6D72] uppercase">Cliptographic Cinematic Frame Render View</p>
        </motion.div>

        {/* REELS COLLECTION */}
        <section className="mb-32 space-y-12">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-extrabold tracking-[0.25em] text-[#1C1C1E] uppercase">Active Masters Specs</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">CINEMATIC FRAGMENTS</h2>
            <p className="text-[#6D6D72] max-w-2xl text-sm md:text-base">
              High-octane commercial segments, ambient audio loops, and customizable metadata layouts compiled with rigorous visual grade scales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectReels.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2ios border border-[#D1D1D6] overflow-hidden group hover:border-[#007AFF]/20 transition-all duration-300 shadow-3xs hover:shadow-xl hover:-translate-y-1.5"
              >
                <div className="aspect-[9/16] relative overflow-hidden bg-neutral-950 flex items-center justify-center">
                  <div className="absolute top-4 left-4 bg-orange-600/95 text-white font-mono text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase z-10 border border-white/20">
                    {p.label}
                  </div>
                  <img
                    src={p.src}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 to-transparent p-3 rounded z-10">
                    <p className="text-[10px] text-white font-mono font-bold tracking-tight uppercase">TIMELINE SYNC</p>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#6D6D72] uppercase">CLIPTOGRAPHIC MASTER</span>
                  <h3 className="text-lg font-bold tracking-tight text-[#1C1C1E]">{p.name}</h3>
                  <p className="text-xs text-[#6D6D72] leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live Digital Domain Portfolio Section */}
        <section className="space-y-8 mb-32">
          <div className="space-y-4 max-w-4xl">
            <span className="text-xs font-bold tracking-[0.25em] text-[#007AFF] uppercase block">LIVE PRODUCTION INSTANCE</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">CLIPTOGRAPHIC LIVE PORTAL</h2>
            <p className="text-[#6D6D72] text-sm md:text-base leading-relaxed">
              Interact with the live production environment of Cliptographic in real-time. Explore our core timeline alignments, cinematography presets, and high-energy video arrays directly inside this high-contrast browser frame.
            </p>
          </div>
           <BrowserWindow iframeSrc="https://cliptographic.com" title="Cliptographic Live Website Preview" />
          <p className="text-center text-xs font-bold tracking-widest text-[#6D6D72] uppercase">Live Domain Node: HTTPS://CLIPTOGRAPHIC.COM</p>
        </section>

        {/* Gallery Grid: Social & Graphics */}
        <div className="space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto mb-16">
            <span className="text-xs font-extrabold tracking-[0.25em] text-[#1C1C1E] uppercase">High Contrast Grid</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1C1C1E] text-center uppercase">REEL FRAME INDEX</h2>
            <p className="text-[#6D6D72] text-sm font-sans">
              Our cinematic layouts employ dark fields, high-energy lighting bursts, soundboards, and tech telemetry guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {socialAestheticPosts.map((post) => (
              <GalleryItem 
                key={post.src}
                src={post.src}
                span={post.span} 
                label={post.label} 
                fallback="https://images.unsplash.com/photo-1536240478700-b869ad10e128?auto=format&fit=crop&w=1200&q=80"
              />
            ))}
          </div>
        </div>

        {/* Simple End Statement */}
        <div className="mt-40 text-center space-y-4">
           <p className="text-xs font-bold tracking-[0.2em] text-[#6D6D72] uppercase">— End of Cliptographic Spec study —</p>
           <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#1C1C1E]">FAST ENERGY. ABSOLUTE PRESENCE.</h2>
        </div>
        
        {/* Bottom spacer to prevent fixed Action Dock coverage on mobile */}
        <div className="h-24 sm:h-32" />
      </main>

      {/* Action Dock (Fixed at bottom center) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 bg-white/85 backdrop-blur-2xl border border-[#D1D1D6] rounded-full shadow-2xl scale-100 hover:scale-105 transition-all duration-500 w-max max-w-[95vw]">
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-extrabold hover:bg-neutral-800 transition-all shadow-lg whitespace-nowrap cursor-pointer uppercase"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I saw your project Cliptographic'}
        >
          I want something like this
        </button>
        
        <button 
          className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full border border-[#D1D1D6] text-[#1C1C1E] transition-all cursor-pointer"
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
  const { likes, views, isLiked, toggleLike } = useProjectStats('cliptographic', 420, 1420);

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
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          ) : (
            <div className="w-full max-w-[325px] aspect-[9/16] bg-neutral-950 relative rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-xl hover:border-neutral-400 transition-all duration-500 my-4">
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
 
function GalleryItem({ src, span, label, fallback }: { src: string; span: string; label: string; fallback?: string; key?: string }) {
  const isReel = /reel|video|stories|loop/i.test(label);
  const isPresentation = /presentation|slide|screen|banner|figma|showcase/i.test(label);
  const isPrintRecord = /print|study|closeup|specs|setup|card/i.test(label);
  
  let aspectClass = "aspect-square"; // Standard Shot: 1:1
  let aspectLabel = "STD 1:1";
  
  if (isReel) {
    aspectClass = "aspect-[9/16]";
    aspectLabel = "REEL 9:16";
  } else if (isPresentation) {
    aspectClass = "aspect-[16/9]";
    aspectLabel = "WIDESCREEN 16:9";
  } else if (isPrintRecord) {
    aspectClass = "aspect-[4/3]";
    aspectLabel = "TACTILE 4:3";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`${span} space-y-3`}
    >
      <div className={`group relative ${aspectClass} rounded-2ios overflow-hidden border border-[#D1D1D6] shadow-sm bg-white transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-400`}>
        <img 
          src={src} 
          alt={label} 
          referrerPolicy="no-referrer"
          onError={(e) => {
             if (fallback) (e.target as HTMLImageElement).src = fallback;
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
      <div className="flex items-center justify-between px-1">
        <p className="text-[10px] font-extrabold tracking-widest text-[#1C1C1E] uppercase">{label}</p>
      </div>
    </motion.div>
  );
}


