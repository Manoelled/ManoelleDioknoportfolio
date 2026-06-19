import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AppImage from './ui/AppImage';
import { Project } from '../app/components/portfolioData';

interface FeaturedSpotlightCardProps {
  project: Project;
  onClick: () => void;
}

export default function FeaturedSpotlightCard({ project, onClick }: FeaturedSpotlightCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Combine cover and preview images into a full gallery pool
  const gallery = [
    project.coverImage,
    ...project.previewImages
  ].filter(Boolean);

  // Auto-advance slide every 6 seconds (6000ms) for an elegant, slower transition
  useEffect(() => {
    if (gallery.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [gallery.length]);

  return (
    <div 
      onClick={onClick}
      className="group relative w-full bg-white border border-neutral-200 rounded-[32px] overflow-hidden hover:border-neutral-900 transition-all duration-500 cursor-pointer shadow-xs hover:shadow-xl hover:scale-[1.002] select-none"
      id="featured-spotlight-card"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Brand Details Column: Placed first so it appears on the left */}
        <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between bg-white text-left relative min-h-[380px] lg:h-full">
          <div className="space-y-6 pt-2">
            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none">
                {project.title}
              </h3>
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                {project.category}
              </p>
            </div>

            {/* Description content with gradient fade-out */}
            <div className="relative h-[180px] lg:h-[220px] overflow-hidden">
              <div className="space-y-4 pr-1 text-base text-neutral-600 leading-relaxed font-normal">
                <p>
                  {project.description}
                </p>
                <p>
                  RAMNGO redefines street culture dining by marrying traditional culinary mastery with highly energetic street style design. Every component—from neon-fluid visual systems to raw, bold typographic expressions—is carefully engineered to engage a culture-first audience.
                </p>
                <p>
                  The strategy balances disruptive graphic language with refined premium assets, ensuring a seamless journey across product packaging, digital touchpoints, and real-time physical space experiences.
                </p>
              </div>
              {/* Fade out gradient at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
            </div>

            {/* Disciplines tags showcase */}
            <div className="pt-4 border-t border-neutral-150">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-neutral-500 bg-neutral-100 border border-neutral-250/30 rounded-full px-3 py-1 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer banner containing the button */}
          <div className="pt-6 border-t border-neutral-100 flex items-center justify-end">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="flex items-center gap-2 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md cursor-pointer group/btn"
            >
              <span>See more</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Carousel Image Column: Placed second to sit on the right side - aspect-square matches the 1:1 image format perfectly! */}
        <div className="relative bg-neutral-50 overflow-hidden aspect-square h-auto w-full">
          {/* Continuous sliding representation */}
          <div className="absolute inset-0 w-full h-full">
            {gallery.map((image, index) => (
              <div
                key={image}
                className="absolute inset-0 transition-opacity ease-in-out"
                style={{
                  opacity: index === currentSlide ? 1 : 0,
                  zIndex: index === currentSlide ? 5 : 1,
                  transitionDuration: '1500ms' // luxurious slow fade transitions
                }}
              >
                <AppImage
                  src={image}
                  alt={`${project.title} slide ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out"
                  style={{
                    transform: index === currentSlide ? 'scale(1.03)' : 'scale(1.0)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Carousel Pagination dots inside folder card */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-2 bg-neutral-900/10 backdrop-blur-md px-3 py-2 rounded-full border border-black/5">
            {gallery.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-neutral-900 scale-125' : 'bg-neutral-900/30 hover:bg-neutral-900/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
