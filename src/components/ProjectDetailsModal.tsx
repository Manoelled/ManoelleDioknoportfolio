import React from 'react';
import AppImage from './ui/AppImage';
import { Project, tagColors } from '../app/components/portfolioData';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet / Panel */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden z-10 transition-transform duration-300 transform translate-y-0"
      >
        {/* Grab handle for mobile */}
        <div className="flex justify-center py-3 sm:hidden shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-neutral-300" />
        </div>

        {/* Close Button (Hidden on Mobile header, visible in corner) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none"
          aria-label="Close details"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Gallery Column */}
            <div className="space-y-4">
              <div 
                className="rounded-[20px] overflow-hidden border border-neutral-100 shadow-md aspect-video md:aspect-[4/3] bg-neutral-55 relative"
                style={{ background: project.bgColor }}
              >
                <AppImage 
                  src={project.coverImage} 
                  alt={project.title}
                  className={
                    project.id === 'crumb'
                      ? "w-full h-full scale-[2.1] translate-x-[5%] object-contain mx-auto my-auto absolute inset-0 p-0"
                      : project.id === 'ramngo'
                        ? "w-full h-full scale-[1.55] object-contain mx-auto my-auto absolute inset-0 p-0"
                        : "w-full h-full object-cover"
                  }
                />
              </div>

              {/* Sub Gallery */}
              <div className="grid grid-cols-3 gap-3">
                {project.previewImages.map((src, idx) => (
                  <div 
                    key={idx}
                    className="rounded-xl overflow-hidden border border-neutral-100 shadow-sm aspect-square bg-neutral-100"
                  >
                    <AppImage 
                      src={src} 
                      alt={`${project.title} gallery thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info Column */}
            <div className="flex flex-col justify-between">
              <div>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ background: project.bgColor, color: project.accentColor }}
                >
                  {project.category}
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-none mb-4">
                  {project.title}
                </h2>

                <p className="text-sm text-neutral-500 font-mono mb-6">
                  Year · {project.year}
                </p>

                <div className="h-px bg-neutral-200/60 mb-6" />

                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  About Project
                </h3>
                <p className="text-base text-neutral-700 leading-relaxed font-sans mb-8">
                  {project.description}
                </p>

                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Disciplines Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => {
                    const colors = tagColors[tag];
                    if (!colors) return null;
                    return (
                      <span
                        key={tag}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border border-transparent shadow-xs"
                        style={{
                          background: colors.lightBg,
                          color: colors.darkText,
                        }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ background: colors.bg }}
                        />
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-neutral-200/50">
                <button 
                  onClick={onClose}
                  className="w-full py-4 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-all text-center text-sm shadow-lg"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
