import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import PortfolioSection from './PortfolioSection';
import { Project } from '../app/components/portfolioData';

interface FeaturedWorksPageProps {
  onBack: () => void;
  onProjectClick: (project: Project) => void;
}

export default function FeaturedWorksPage({ onBack, onProjectClick }: FeaturedWorksPageProps) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] select-none pb-32">
      {/* Top Banner Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 justify-between bg-[#F2F2F7]/80 backdrop-blur-md border-b border-[#D1D1D6]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-200/50 rounded-full transition-all text-xs font-bold text-[#1C1C1E] cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
        <span className="font-extrabold tracking-tight text-xs text-[#6D6D72]">Featured Archive</span>
      </nav>

      {/* Featured Header Cover */}
      <header className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#007AFF] uppercase block">
            Archived Portfolios
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-none text-[#1C1C1E]">
            Featured Works
          </h1>
          <p className="text-sm sm:text-base text-[#6D6D72] max-w-xl leading-relaxed font-semibold">
            A curated showcase of bespoke brand experiences designed from the ground up—including custom typography, core logos, structural layout systems, websites, and interactive digital directions.
          </p>
        </motion.div>
      </header>

      {/* Reusable Portfolio Grid with all elements */}
      <PortfolioSection onProjectClick={onProjectClick} />
    </div>
  );
}
