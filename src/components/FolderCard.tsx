import React, { useState, useRef } from 'react';
import AppImage from './ui/AppImage';
import { Project, tagColors } from '../app/components/portfolioData';

interface FolderCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export default function FolderCard({ project, index, onClick }: FolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const hasNoContent = project.id === 'dc-business-solutions';
  const rotateX = isHovered && !hasNoContent ? (mousePos.y - 0.5) * -8 : 0;
  const rotateY = isHovered && !hasNoContent ? (mousePos.x - 0.5) * 8 : 0;

  return (
    <article
      ref={cardRef}
      className={hasNoContent ? "cursor-default" : "folder-card group cursor-pointer"}
      onMouseEnter={hasNoContent ? undefined : () => setIsHovered(true)}
      onMouseLeave={hasNoContent ? undefined : () => { setIsHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      onMouseMove={hasNoContent ? undefined : handleMouseMove}
      onClick={hasNoContent ? undefined : onClick}
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-label={`${project.title} — ${project.tags.join(', ')}`}
    >
      <div
        className={`relative rounded-[24px] overflow-hidden mb-4 ${hasNoContent ? "" : "card-shine"}`}
        style={hasNoContent ? {
          aspectRatio: '4/3',
          background: project.bgColor,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        } : {
          aspectRatio: '4/3',
          background: project.bgColor,
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
          boxShadow: isHovered
            ? '0 24px 60px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.12)'
            : '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(${project.accentColor}40 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
          aria-hidden="true"
        />



        <div
          className="folder-inner-images absolute inset-0"
          style={{
            opacity: 1,
          }}
        >
          <AppImage
            src={project.coverImage}
            alt={`${project.title} cover`}
            className={
              project.id === 'crumb'
                ? "w-full h-full scale-[2.1] translate-x-[5%] object-contain mx-auto my-auto absolute inset-0 p-0"
                : project.id === 'ramngo'
                  ? "w-full h-full scale-[1.55] object-contain mx-auto my-auto absolute inset-0 p-0" 
                  : "w-full h-full object-cover"
            }
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)',
              opacity: isHovered ? 1 : 0,
            }}
            aria-hidden="true"
          />
        </div>

        {isHovered && !hasNoContent && (
          <div
            className="absolute bottom-3 left-3 right-3 flex gap-1.5 z-30"
            style={{
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease',
            }}
            aria-hidden="true"
          >
            {project.previewImages.slice(0, 3).map((img, i) => (
              <div
                key={i}
                className="flex-1 rounded-lg overflow-hidden border border-white/30"
                style={{
                  height: '44px',
                  transform: `translateY(${isHovered ? 0 : 20}px) rotate(${(i - 1) * 3}deg)`,
                  transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                <AppImage
                  src={img}
                  alt={`${project.title} preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div
          className="absolute inset-0 z-10 flex items-start justify-end p-3 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300"
            style={{
              background: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
              color: '#1C1C1E',
              backdropFilter: 'blur(8px)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {project.tags.length} disciplines
          </div>
        </div>
      </div>

      <div className="px-1">
        <h3
          className={`text-xl font-bold text-foreground tracking-tight mb-2 transition-colors ${hasNoContent ? "" : "group-hover:text-foreground/85"}`}
          style={{ letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => {
            const colors = tagColors[tag];
            if (!colors) return null;
            return (
              <span
                key={tag}
                className="tag-pill"
                style={{
                  background: colors.lightBg,
                  color: colors.darkText,
                  fontSize: '11px',
                  padding: '3px 9px',
                  cursor: 'default',
                  transform: 'none',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: colors.bg }}
                />
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
