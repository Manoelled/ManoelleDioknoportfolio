import React, { useState, useRef, useEffect, useCallback } from 'react';
import FolderCard from './FolderCard';
import FeaturedSpotlightCard from './FeaturedSpotlightCard';
import { projects, allTags, tagColors, Project } from '../app/components/portfolioData';

interface PortfolioSectionProps {
  onProjectClick?: (project: Project) => void;
  onViewMoreClick?: () => void;
  limit?: number;
}

export default function PortfolioSection({ onProjectClick, onViewMoreClick, limit }: PortfolioSectionProps) {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  const ramngoProject = projects.find(p => p.id === 'ramngo');
  const isHomeAll = !!limit && activeTag === 'All';

  const gridProjects = isHomeAll
    ? ['crumb', 'nomad', 'designsentiments']
        .map(id => projects.find(p => p.id === id))
        .filter((p): p is Project => p !== undefined)
    : visibleProjects.slice(0, limit || visibleProjects.length);

  useEffect(() => {
    // Reset visible projects if projects array updates (e.g. from brand name edits)
    setVisibleProjects(
      activeTag === 'All' 
        ? projects 
        : projects.filter(p => p.tags.includes(activeTag))
    );
  }, [projects, activeTag]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTagFilter = useCallback((tag: string) => {
    if (tag === activeTag) return;
    setIsAnimating(true);
    setActiveTag(tag);
    setTimeout(() => {
      if (tag === 'All') {
        setVisibleProjects(projects);
      } else {
        setVisibleProjects(projects.filter(p => p.tags.includes(tag)));
      }
      setIsAnimating(false);
    }, 200);
  }, [activeTag]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative z-10 px-6 lg:px-16 py-16 pb-32 bg-white/20 border-y border-neutral-200/50"
      aria-label="Portfolio works"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="mb-12"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.0]">
                The Folder
              </h2>
            </div>
            {limit && onViewMoreClick ? (
              <button
                onClick={onViewMoreClick}
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-850 active:scale-[0.98] text-white font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 self-start sm:self-center font-sans"
              >
                View more works
              </button>
            ) : (
              <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
                Explore our full catalog of brand identities, design systems, and digital assets.
              </p>
            )}
          </div>
        </div>

        {/* Tag filter bar */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <button
            onClick={() => handleTagFilter('All')}
            className={`tag-pill ${activeTag === 'All' ? 'active' : ''}`}
            style={{
              background: activeTag === 'All' ? '#1C1C1E' : 'rgba(28,28,30,0.06)',
              color: activeTag === 'All' ? '#FFFFFF' : '#3A3A3C',
              borderColor: activeTag === 'All' ? '#1C1C1E' : 'transparent',
            }}
            aria-pressed={activeTag === 'All'}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: activeTag === 'All' ? '#FFFFFF' : '#6D6D72' }}
            />
            All
          </button>
          {allTags.map((tag) => {
            const colors = tagColors[tag];
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`tag-pill ${isActive ? 'active' : ''}`}
                style={{
                  background: isActive ? colors.bg : colors.lightBg,
                  color: isActive ? colors.text : colors.darkText,
                  borderColor: isActive ? colors.bg : 'transparent',
                }}
                aria-pressed={isActive}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: isActive ? colors.text : colors.bg }}
                />
                {tag}
              </button>
            );
          })}
        </div>

        {/* Portfolio grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-8"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {gridProjects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-item transition-all duration-300"
              style={{
                animationDelay: `${index * 0.07}s`,
                opacity: sectionVisible ? 1 : 0,
              }}
            >
              <FolderCard 
                project={project} 
                index={index} 
                onClick={() => onProjectClick?.(project)}
              />
            </div>
          ))}
        </div>

        {/* Featured Spotlight Section - Placed Below the Grid in a sleeker, larger presentation */}
        {isHomeAll && ramngoProject && (
          <div
            className="mt-6 border-t border-neutral-200/40 pt-8"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="flex flex-col items-center justify-center mb-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 uppercase">
                Featured Work
              </h2>
            </div>
            <FeaturedSpotlightCard 
              project={ramngoProject} 
              onClick={() => onProjectClick?.(ramngoProject)}
            />
          </div>
        )}

        {/* Empty state */}
        {visibleProjects.length === 0 && !isAnimating && (
          <div className="text-center py-24">
            <p className="text-3xl mb-3">📁</p>
            <p className="text-neutral-500 font-medium">No projects in this category yet.</p>
          </div>
        )}

        {/* Dynamic View More Works Button */}
        {limit && visibleProjects.length > limit && onViewMoreClick && (
          <div className="mt-16 text-center">
            <button
              onClick={onViewMoreClick}
              className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              View more works
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
