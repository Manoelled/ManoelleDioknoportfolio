/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { IOSNav } from './components/IOSNav';
import { ArrowLeft, Share2, Globe, ArrowRight, Tag, Heart, Mail } from 'lucide-react';

export default function App() {
  const project = {
    title: 'Rramngo',
    subtitle: 'High-Velocity Brand Identity',
    description: 'Rramngo is engineered for a life in motion, merging high-speed utility with elevated aesthetics. The system is built on sharp, modern foundations punctuated by surreal visual breaks—designed to arrest attention and maintain recall in the worlds most fast-moving digital environments.',
    tags: ['Identity', 'Creative Direction', 'Motion'],
    role: 'Creative Lead',
    bio: 'I pioneered the brand identity and visual strategy, forging a language that balances technical efficiency with premium artistry. From guiding high-concept photography to architecting a scroll-stopping social media ecosystem, every touchpoint was designed for maximum impact and rhythmic consistency.',
    responsibilities: [
      'Brand Identity',
      'Photography Direction',
      'Social Media Kit',
      'Reels & Motion',
      'Creative Direction'
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/20">
      <div className="noise-overlay" />
      
      {/* Refined Minimalist Nav */}
      <nav className="ios-nav fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-4 bg-border" />
          <span className="font-bold tracking-tight text-sm">Rramngo Showcase</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-card border border-border rounded-full text-xs font-bold hover:bg-secondary transition-all">
            <Share2 size={14} />
            Share Project
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-40 px-6 md:px-12 max-w-7xl mx-auto">
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
                  <span key={tag} className="tag-pill text-[10px] py-1">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="scan-text text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8">
                {project.title}
              </h1>
              
              <div className="space-y-6 mb-10">
                <p className="text-xl text-primary font-semibold leading-tight">
                  {project.description}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.bio}
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 inline-block">
                  Core Involvement
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-semibold">
                  {project.responsibilities.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-primary">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
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
              className="folder-card h-[500px] md:h-[600px] group cursor-default relative transition-all duration-700"
            >
              <div className="folder-lid absolute inset-0 flex items-center justify-center p-12 z-20">
                <img 
                  src="/MainLogo.png" 
                  alt="Rramngo Main Logo" 
                  onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?q=80&w=2000&auto=format&fit=crop"}
                  className="w-full max-w-sm object-contain transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              
              {/* Secondary Shots peeking through */}
              <div className="folder-inner-images absolute inset-0 z-10 flex items-center justify-center -translate-y-4">
                <div className="w-[85%] h-[85%] bg-secondary/40 rounded-3ios transform -rotate-3 transition-transform" />
                <div className="absolute w-[80%] h-[80%] bg-secondary/60 rounded-3ios transform rotate-3 transition-transform" />
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
             <img 
               src="/Banner.png" 
               alt="Website Banner" 
               onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"}
               className="w-full object-cover min-h-[400px] bg-secondary/10" 
             />
          </BrowserWindow>
          <p className="text-center mt-6 text-xs font-bold tracking-widest text-muted-foreground uppercase text-shadow-sm">Digital Platform Experience</p>
        </motion.div>

        {/* Gallery Grid: Social & Graphics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <GalleryItem 
            src="/Socmed.png" 
            span="col-span-1" 
            label="Visual Rhythm & Grid Layout" 
            fallback="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop"
          />
          <GalleryItem 
            src="/Socmed2.png" 
            span="col-span-1" 
            label="Rhythmic Brand Narrative" 
            fallback="https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?q=80&w=2000&auto=format&fit=crop"
          />
          <GalleryItem 
            src="/Socmed3.png" 
            span="col-span-1" 
            label="Conceptual Imagery & Type" 
            fallback="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop"
          />
          
          <GalleryItem 
            src="/ReelAd.png" 
            span="md:col-span-3" 
            label="High-Velocity Motion Direction" 
            fallback="https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2000&auto=format&fit=crop"
          />
          
          <GalleryItem 
            src="/Artboard 8.png" 
            span="md:col-span-3" 
            label="Photography Style & Creative Focus" 
            fallback="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop"
          />
          
          <GalleryItem 
            src="/Socmed44.png" 
            span="md:col-span-3" 
            label="Extended Visual Heritage" 
            fallback="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop"
          />
        </div>

        {/* Simple End Statement */}
        <div className="mt-40 text-center space-y-4">
           <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">— End of Rramngo Identity Study —</p>
           <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">LET'S DRIVE THE FUTURE OF STYLE.</h2>
        </div>
      </main>

      {/* Action Dock (Fixed at bottom center) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-full shadow-2xl scale-100 hover:scale-105 transition-all duration-500 w-max max-w-[95vw]">
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-xs font-bold hover:bg-black transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
          onClick={() => alert('Thanks for your interest!')}
        >
          I want something like this
        </button>
        
        <button 
          className="p-3 bg-secondary/80 hover:bg-secondary rounded-full border border-border/50 text-primary transition-all"
          title="Inquire"
          onClick={() => window.location.href = 'mailto:hello@example.com'}
        >
          <Mail size={18} />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <LikeButton />
      </div>
    </div>
  );
}

function LikeButton() {
  const [likes, setLikes] = React.useState(124);
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
      className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs transition-all ${
        isLiked ? "bg-red-50 text-red-500 border border-red-100 shadow-sm" : "bg-transparent text-primary hover:bg-secondary/50"
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
    <div className="bg-card border border-border rounded-2ios overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-primary/5">
      <div className="bg-secondary/30 border-b border-border px-4 py-3 flex gap-1.5 items-center">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-amber-400" />
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
      </div>
      <div>{children}</div>
    </div>
  );
}

function GalleryItem({ src, span, label, fallback }: { src: string, span: string, label: string, fallback?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`${span} space-y-4`}
    >
      <div className="group relative aspect-video md:aspect-auto rounded-2ios overflow-hidden border border-border shadow-sm card-shine min-h-[300px] bg-secondary/20 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl hover:border-accent/20">
        <img 
          src={src} 
          alt={label} 
          onError={(e) => {
             if (fallback) (e.target as HTMLImageElement).src = fallback;
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
      <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase px-2">{label}</p>
    </motion.div>
  );
}

