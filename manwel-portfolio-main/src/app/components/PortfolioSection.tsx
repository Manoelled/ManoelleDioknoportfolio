'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import FolderCard from './FolderCard';
import { projects, allTags, tagColors } from './portfolioData';

export default function PortfolioSection() {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

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
      className="relative z-10 px-6 lg:px-16 py-16 pb-32"
      aria-label="Portfolio works"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className="mb-12 reveal-on-scroll"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(32px)',
            filter: sectionVisible ? 'blur(0)' : 'blur(6px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Selected Works
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[0.9]">
                The Folder
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Hover over a project to peek inside the folder and see what&apos;s in it.
            </p>
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

        {/* Count indicator */}
        <div
          className="mb-6 text-xs font-semibold text-muted-foreground"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: 'opacity 0.4s ease 0.3s',
          }}
        >
          {visibleProjects.length} project{visibleProjects.length !== 1 ? 's' : ''}
          {activeTag !== 'All' && ` in ${activeTag}`}
        </div>

        {/* Portfolio grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-item"
              style={{
                animationDelay: `${index * 0.07}s`,
                opacity: sectionVisible ? 1 : 0,
              }}
            >
              <FolderCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {visibleProjects.length === 0 && !isAnimating && (
          <div className="text-center py-24">
            <p className="text-3xl mb-3">📁</p>
            <p className="text-muted-foreground font-medium">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}