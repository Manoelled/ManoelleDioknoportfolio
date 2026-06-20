import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, Mail } from 'lucide-react';

interface CreativeWorksPageProps {
  onBack: () => void;
}

export default function CreativeWorksPage({ onBack }: CreativeWorksPageProps) {
  const project = {
    title: 'Creative Works',
    subtitle: 'Industrial Chromatic Campaign Studio',
    description: 'Creative Works is a premium digital campaign studio pairing bold black structural borders with brilliant chromatographic refraction gradients. Engineered to elevate digital marketing into fine-art precise layouts.',
    tags: ['Marketing Strategy', 'Art Direction', 'Digital Campaigns'],
    role: 'Lead Creative Strategist',
    bio: 'I engineered the brand overhaul and creative launch grids for Creative Works. Piling heavy grotesque typography columns over fluid, vibrant light blurs and physical printed booklet specifications, we forged a digital marketing campaign language of structural refraction.',
    responsibilities: [
      'Industrial Grids & Layouts',
      'Chromatic Fluid Assets Guide',
      'Editorial Print Series Posters',
      'Dynamic Web Dashboard UI',
      'Refraction Color Specs Booklet'
    ]
  };

  const marketingCampaigns = [
    {
      name: 'Refraction Risograph Print Series 01',
      label: 'Risograph Print',
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
      description: 'A physically printed corporate branding poster series experimenting with colorful light dispersion and dot matrix patterns.'
    },
    {
      name: 'Creative Works Regional Asset App',
      label: 'Campaign Hub',
      src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80',
      description: 'An editorial design asset repository enabling global creative teams to download fluid gradient swatches and layout guides.'
    },
    {
      name: 'Structure & Prism Design Manual',
      label: 'Booklet Manual',
      src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=600&q=80',
      description: 'Our physical hand-bound spec booklet laying out hexadecimal values for our custom pigments and paper weights.'
    },
    {
      name: 'Chromatic Social launch system',
      label: 'Reel Elements',
      src: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?auto=format&fit=crop&w=600&q=80',
      description: 'A comprehensive Instagram scroll-stopping series combining bold sans statements with floating gradient prisms.'
    },
    {
      name: 'Spectropix Creative Deck Manual',
      label: 'Print Spec',
      src: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
      description: 'Heavy duty art-paper booklet highlighting fine color gamuts, ink absorption variables, and brand grid codes.'
    }
  ];

  const socialAestheticPosts = [
    { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80', label: 'Chromatic Spectrum Print Study', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80', label: 'Regional Asset Interface Coding', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=600&q=80', label: 'Modular Refraction Grids Layout', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?auto=format&fit=crop&w=600&q=80', label: 'Vibrant Light Dispersion Video Logs', span: 'col-span-1 md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80', label: 'Spec Booklet Paper Texture Closeup', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=600&q=80', label: 'Industrial Grid alignment specs', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80', label: 'Prismatic Acrylic Block Focus', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', label: 'Digital Billboard Campaign Demos', span: 'col-span-1 md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80', label: 'Refraction Risograph Test Setup', span: 'col-span-1' },
    { src: 'https://img.rocket.new/generatedImages/rocket_gen_img_17cfe0820-1772171210250.png', label: 'Master Adobe Illustrator Spec Grid Feed', span: 'col-span-1 md:col-span-3' }
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
          <span className="font-extrabold tracking-tight text-sm text-[#1C1C1E]">Creative Works</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-900 border border-neutral-850 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer">
            <Share2 size={14} />
            Share Work
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
                  Industrial Campaign Coverage
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-semibold">
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
                    CW
                  </div>
                  <h3 className="text-xl font-bold text-[#1C1C1E] tracking-widest uppercase">CREATIVE WORKS</h3>
                  <span className="text-xs text-[#6D6D72] font-mono tracking-widest uppercase block">— CHROMATIC ACCELERATION —</span>
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
                 src="https://img.rocket.new/generatedImages/rocket_gen_img_17cfe0820-1772171210250.png" 
                 alt="Creative Works Spec Banner" 
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover" 
               />
             </div>
          </BrowserWindow>
          <p className="text-center mt-6 text-xs font-bold tracking-widest text-[#6D6D72] uppercase">Creative Works Chromatic Prisms Grid Screen</p>
        </motion.div>

        {/* CAMPAIGNS COLLECTION */}
        <section className="mb-32 space-y-12">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-[#1C1C1E] uppercase">Reflected Pigments & Grids</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E]">CREATIVE ELEMENTS</h2>
            <p className="text-[#6D6D72] max-w-2xl text-sm md:text-base">
              Rigorously aligned digital campaign assets, spectrum poster prints, and layout design systems engineered with chromatic light blends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingCampaigns.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2ios border border-[#D1D1D6] overflow-hidden group hover:border-[#007AFF]/20 transition-all duration-300 shadow-3xs hover:shadow-xl hover:-translate-y-1.5"
              >
                <div className="aspect-square relative overflow-hidden bg-neutral-100 flex items-center justify-center">
                  <div className="absolute top-4 left-4 bg-neutral-900 text-white font-mono text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase z-10">
                    {p.label}
                  </div>
                  <img
                    src={p.src}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#6D6D72] uppercase font-bold">Creative Works Spec</span>
                  <h3 className="text-lg font-bold tracking-tight text-[#1C1C1E]">{p.name}</h3>
                  <p className="text-xs text-[#6D6D72] leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Digital Mobile App UI Strategy Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-[#1C1C1E] uppercase">Marketing Matrix</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E]">CREATIVE CAMPAIGN HUB</h2>
            <p className="text-[#6D6D72] text-sm md:text-base leading-relaxed">
              We engineered the local design asset distribution hub, giving global visual directors immediate access to custom gradient spectrum maps, rigid grid formats, and print-ready risograph presets.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D1D1D6]">
              <div>
                <h4 className="text-sm font-bold text-[#1C1C1E]">Gradient Spectrum</h4>
                <p className="text-xs text-[#6D6D72] mt-1">High-fidelity assets map across monitors.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1C1C1E]">Preprint Codes</h4>
                <p className="text-xs text-[#6D6D72] mt-1">Sizing bounds details are synced.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <BrowserWindow>
              <div className="w-full aspect-[16/9] overflow-hidden bg-neutral-100">
                <img 
                  src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80" 
                  alt="Creative Works Hub App Mock" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </BrowserWindow>
          </div>
        </section>

        {/* Gallery Grid: Social & Graphics */}
        <div className="space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto mb-16">
            <span className="text-xs font-extrabold tracking-[0.25em] text-[#1C1C1E] uppercase">Chromatic Feed</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E]">REFRACTED PRINT JOURNALS</h2>
            <p className="text-[#6D6D72] text-sm">
              Our campaign showcase grids combine industrial black framing, risograph dots, vibrant glowing light blurs, and grotesque sans labels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {socialAestheticPosts.map((post) => (
              <GalleryItem 
                key={post.src}
                src={post.src}
                span={post.span} 
                label={post.label} 
                fallback="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"
              />
            ))}
          </div>
        </div>

        {/* Simple End Statement */}
        <div className="mt-40 text-center space-y-4">
           <p className="text-xs font-bold tracking-[0.2em] text-[#6D6D72] uppercase">— End of Creative Works study —</p>
           <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#1C1C1E]">REFRACT THE VIEW, EMPOWER THE MESSAGE.</h2>
        </div>
        
        {/* Bottom spacer to prevent fixed Action Dock coverage on mobile */}
        <div className="h-24 sm:h-32" />
      </main>

      {/* Action Dock (Fixed at bottom center) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 bg-white/85 backdrop-blur-2xl border border-[#D1D1D6] rounded-full shadow-2xl scale-100 hover:scale-105 transition-all duration-500 w-max max-w-[95vw]">
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all shadow-lg whitespace-nowrap cursor-pointer"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I saw your project Creative Works'}
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
  const [likes, setLikes] = React.useState(280);
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

function BrowserWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-neutral-400/5">
      <div className="bg-neutral-100/40 border-b border-[#D1D1D6] px-4 py-3 flex gap-1.5 items-center">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>
      <div>{children}</div>
    </div>
  );
}

function GalleryItem({ src, span, label, fallback }: { src: string; span: string; label: string; fallback?: string; key?: string }) {
  const isReel = /reel|video|stories|loop/i.test(label);
  const isPresentation = /presentation|slide|screen|banner|figma|showcase/i.test(label);
  const isPrintRecord = /print|study|closeup|specs|setup|card|swatches/i.test(label);
  
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
