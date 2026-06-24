import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import AppImage from './ui/AppImage';
import { socialPosts, SocialPost } from '../data/socialFeedData';
import { projects } from '../app/components/portfolioData';

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

const programColors: Record<string, { bg: string; text: string; image?: string }> = {
  Ai: { bg: '#FF7C00', text: '#fff' },
  Ps: { bg: '#31A8FF', text: '#fff' },
  Ae: { bg: '#9999FF', text: '#fff' },
  Pr: { bg: '#001A33', text: '#fff' },
  Fig: { bg: '#F24E1E', text: '#fff' },
  C2G: { bg: '#10B981', text: '#fff', image: '/assets/images/CliptographicWIcon.png' },
  Cliptographic: { bg: '#10B981', text: '#fff', image: '/assets/images/CliptographicWIcon.png' },
  Sora: { bg: '#F1C40F', text: '#000' },
};

function parsePrograms(programString: string): { name: string; short: string; bg: string; text: string; image?: string; iconType?: 'chatgpt' }[] {
  if (!programString) return [];
  const rawParts = programString.split(',').map(s => s.trim()).filter(Boolean);
  
  return rawParts.map(name => {
    let short = '';
    let bg = '#737373';
    let text = '#ffffff';
    let image: string | undefined = undefined;
    let iconType: 'chatgpt' | undefined = undefined;
    let finalName = name;
    
    const lower = name.toLowerCase();
    
    if (lower.includes('photoshop')) {
      finalName = 'Adobe Photoshop';
      short = 'Ps';
      bg = '#007DF6'; // Vibrant Photoshop blue
    } else if (lower.includes('premiere')) {
      finalName = 'Adobe Premiere Pro';
      short = 'Pr';
      bg = '#9066FF'; // Vibrant Premiere violet
    } else if (lower.includes('after effects')) {
      finalName = 'Adobe After Effects';
      short = 'Ae';
      bg = '#1F1133'; // After effects custom deep violet
    } else if (lower.includes('illustrator')) {
      finalName = 'Adobe Illustrator';
      short = 'Ai';
      bg = '#331B00'; // Illustrator orange accent
    } else if (lower.includes('figma')) {
      finalName = 'Figma';
      short = 'Fig';
      bg = '#F24E1E';
    } else if (lower.includes('cliptographic') || lower.includes('clip2graphic')) {
      finalName = 'Cliptographic';
      short = 'C2G';
      bg = '#000000'; // Pure glossy black for Cliptographic badge
      image = '/assets/images/CliptographicWIcon.png';
    } else if (lower.includes('nanobanana')) {
      finalName = 'Google NanoBanana Pro';
      short = 'Nb';
      bg = '#F4B400';
      text = '#000000';
    } else if (lower.includes('sora')) {
      finalName = 'Sora Image Generation';
      short = 'Sr';
      bg = '#10A37F'; // ChatGPT green
      text = '#ffffff';
      iconType = 'chatgpt';
    } else {
      finalName = name;
      short = name.substring(0, 3);
    }
    
    return { name: finalName, short, bg, text, image, iconType };
  });
}

const mapUsernameToBrand = (username: string): string => {
  const norm = username.toLowerCase().trim();
  if (norm.includes('crumb')) return 'Crumb Cookies';
  if (norm.includes('ramngo')) return 'RAMNGO';
  if (norm.includes('nomad')) return 'NOMAD';
  if (norm.includes('stackhouse')) return 'Stackhouse';
  if (norm.includes('designsentiments')) return 'Design Sentiments';
  return username;
};

const stories = [
  {
    label: 'Crumb',
    img: '/assets/images/CRUMB/CrumbCookieLogo.png',
  },
  {
    label: 'Design Sentiments',
    img: '/assets/images/DesignSentiments/DesignSentiments_logo.png',
  },
  {
    label: "RAMNGO",
    img: '/assets/images/RamngoMainLogo.png',
  },
  {
    label: 'NOMAD',
    img: '/assets/images/NOMAD/NomadFinalLogo.png',
  },
  {
    label: 'Stackhouse',
    img: '/assets/images/Stackhouse/StackhouseLogo.png',
  },
];

const getAspectClass = (aspect?: string) => {
  if (aspect === '9/16') return 'aspect-[9/16]';
  if (aspect === '16/9') return 'aspect-[16/9]';
  if (aspect === '4/3') return 'aspect-[4/3]';
  if (aspect === '3/2') return 'aspect-[3/2]';
  return 'aspect-square';
};

function CarouselMedia({ media, alt, aspectRatio }: { media: string[]; alt: string; aspectRatio?: string }) {
  const [idx, setIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    // If clicking a button, don't capture or drag!
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    // Prevent the parent feed scroller from catching this down event and capturing the pointer
    e.stopPropagation();
    startX.current = e.clientX;
    dragging.current = true;
    setDragOffset(0);
    if (elementRef.current) {
      try {
        elementRef.current.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    e.stopPropagation();
    const diff = e.clientX - startX.current;
    
    // Dampened resistance if swiping past limits
    if (idx === 0 && diff > 0) {
      setDragOffset(diff * 0.3);
    } else if (idx === media.length - 1 && diff < 0) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    e.stopPropagation();

    if (elementRef.current) {
      try {
        elementRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe play
      }
    }

    const diff = e.clientX - startX.current;
    if (diff < -50 && idx < media.length - 1) {
      setIdx((i) => i + 1);
    } else if (diff > 50 && idx > 0) {
      setIdx((i) => i - 1);
    }
    setDragOffset(0);
  };

  return (
    <div
      ref={elementRef}
      className={`relative w-full ${getAspectClass(aspectRatio)} overflow-hidden select-none group/carousel`}
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div
        className={`flex h-full ${dragging.current ? '' : 'transition-transform duration-300 ease-out'}`}
        style={{
          transform: `translateX(calc(-${(idx * 100) / media.length}% + ${dragOffset}px))`,
          width: `${media.length * 100}%`
        }}
      >
        {media.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0"
            style={{ width: `${100 / media.length}%` }}
          >
            <AppImage
              src={src}
              alt={`${alt} slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Carousel Navigation Controller Arrows */}
      {media.length > 1 && idx > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIdx((i) => i - 1);
          }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 flex items-center justify-center text-white text-xs font-bold transition-all z-10 cursor-pointer shadow-md active:scale-90"
          aria-label="Previous image"
        >
          &larr;
        </button>
      )}
      {media.length > 1 && idx < media.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIdx((i) => i + 1);
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 flex items-center justify-center text-white text-xs font-bold transition-all z-10 cursor-pointer shadow-md active:scale-90"
          aria-label="Next image"
        >
          &rarr;
        </button>
      )}

      {media.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {media.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{ background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)' }}
            />
          ))}
        </div>
      )}
      {media.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          {idx + 1}/{media.length}
        </div>
      )}
    </div>
  );
}

function ReelMedia({ post }: { post: SocialPost }) {
  const isMp4 = post.media[0]?.toLowerCase().endsWith('.mp4');
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync play/pause state
  useEffect(() => {
    if (!videoRef.current || !isMp4) return;
    videoRef.current.volume = 0.5; // Always ensure starting volume is 50%
    if (playing) {
      videoRef.current.play().catch((err) => {
        console.error("Video play failed:", err);
      });
    } else {
      videoRef.current.pause();
    }
  }, [playing, isMp4]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(!playing);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const [durationDisplay, setDurationDisplay] = useState(post.duration || '0:30');
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    videoRef.current.volume = 0.5; // Ensure start volume at 50%
    const dur = videoRef.current.duration;
    if (dur && !isNaN(dur)) {
      const minutes = Math.floor(dur / 60);
      const seconds = Math.floor(dur % 60);
      setDurationDisplay(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }
  };

  const elapsedSecs = videoRef.current ? Math.floor(videoRef.current.currentTime) : 0;
  const formattedSeconds = elapsedSecs < 10 ? `0${elapsedSecs}` : String(elapsedSecs);

  return (
    <div
      className={`relative w-full ${getAspectClass(post.aspectRatio)} overflow-hidden bg-black ${isMp4 ? 'cursor-pointer' : ''} group/reel`}
      onClick={isMp4 ? handleVideoClick : undefined}
    >
      {isMp4 ? (
        <video
          ref={videoRef}
          src={post.media[0]}
          poster={post.videoThumbnail || post.media[0]}
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover"
        />
      ) : (
        <AppImage
          src={post.videoThumbnail || post.media[0]}
          alt={`${post.projectTitle} reel thumbnail`}
          className="w-full h-full object-cover"
        />
      )}

      {/* Sound / Mute Toggle Button */}
      {isMp4 && (
        <button
          onClick={handleMuteToggle}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-20 backdrop-blur-xs border border-white/10 shadow-md transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="22" y1="9" x2="16" y2="15"/>
              <line x1="16" y1="9" x2="22" y2="15"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>
      )}

      {/* Central Play/Pause Assistive HUD overlay */}
      {isMp4 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {!playing ? (
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-3xs flex items-center justify-center border border-white/10 shadow-md opacity-0 group-hover/reel:opacity-100 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </div>
          )}
        </div>
      )}

      {isMp4 && post.duration && (
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          <span>{playing ? `0:${formattedSeconds}` : '0:00'}</span>
          <span className="opacity-40">/</span>
          <span>{durationDisplay}</span>
        </div>
      )}

      {/* Simulated Live Audio Spectrum nodes in bottom left corner */}
      {isMp4 && playing && (
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-xs rounded-full px-2.5 py-0.5 flex items-center gap-1.5 z-10 border border-white/10 shadow-sm">
          <div className="flex gap-0.5 items-end h-2 w-3">
            <span className="w-0.5 h-full bg-white rounded-full animate-pulse" style={{ animationDuration: '0.4s' }} />
            <span className="w-0.5 h-full bg-white rounded-full animate-pulse" style={{ animationDuration: '0.6s', animationDelay: '100ms' }} />
            <span className="w-0.5 h-full bg-white rounded-full animate-pulse" style={{ animationDuration: '0.5s', animationDelay: '200ms' }} />
          </div>
          <span className="text-[7.5px] text-white font-extrabold tracking-wider uppercase">AUDIO LIVE</span>
        </div>
      )}

      <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
        REEL
      </div>

      {/* Simulated progressive timeline frame strip at the bottom edge */}
      {isMp4 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-10">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

function PostCard({
  post,
  onSelect,
}: {
  post: SocialPost;
  isActive: boolean;
  onSelect: (p: SocialPost) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likeAnim, setLikeAnim] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      setLikeAnim(true);
      setTimeout(() => setLikeAnim(false), 600);
    } else {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      setLikeAnim(true);
      setTimeout(() => setLikeAnim(false), 600);
    }
    setShowHeartPop(true);
    setTimeout(() => {
      setShowHeartPop(false);
    }, 850);
  };

  return (
    <div
      className="w-full flex-shrink-0 cursor-pointer"
      onClick={() => onSelect(post)}
      style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}
    >
      {/* Post header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div
            className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-neutral-200/60 bg-white flex items-center justify-center"
          >
            <AppImage
              src={post.avatar}
              alt={`${mapUsernameToBrand(post.username)} profile`}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-gray-900 leading-none">
                {mapUsernameToBrand(post.username)}
              </span>
              {post.verified && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#3897f0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </div>
          </div>
        </div>
        <button className="text-gray-400 p-1" aria-label="More options">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>

      {/* Media wrapper supporting double clicking / tap heart gesture bubbles */}
      <div className="relative overflow-hidden" onDoubleClick={handleDoubleTap}>
        {post.type === 'carousel' ? (
          <CarouselMedia media={post.media} alt={post.projectTitle || post.username} aspectRatio={post.aspectRatio} />
        ) : post.type === 'reel' ? (
          <ReelMedia post={post} />
        ) : (
          <div className={`w-full ${getAspectClass(post.aspectRatio)} relative overflow-hidden`}>
            <AppImage
              src={post.media[0]}
              alt={`${post.projectTitle}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Double click heart explosion pop */}
        {showHeartPop && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-20 pointer-events-none">
            <svg
              width="76"
              height="76"
              viewBox="0 0 24 24"
              fill="#ED4956"
              style={{
                filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.45))',
                animation: 'heartPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 pt-2.5 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="relative flex items-center transition-transform duration-150 active:scale-90"
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={liked ? '#ED4956' : 'none'}
                  stroke={liked ? '#ED4956' : '#262626'}
                  strokeWidth="1.8"
                  style={{
                    transform: likeAnim ? 'scale(1.4)' : 'scale(1)',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
            </button>
            <button className="flex items-center" aria-label="Comment">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#262626"
                strokeWidth="1.8"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="flex items-center" aria-label="Share">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#262626"
                strokeWidth="1.8"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <button aria-label="Save">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#262626"
              strokeWidth="1.8"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ post, onBackToPortfolio, onProjectClick }: { post: SocialPost | null, onBackToPortfolio?: () => void, onProjectClick?: (projectId: string) => void }) {
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-500">Select a post</p>
        <p className="text-xs text-gray-400 mt-1">Tap any post inside the phone to inspect tools & descriptors</p>
      </div>
    );
  }

  const project = projects.find((p) => p.id === post.projectId);
  
  // Showcase the official uncropped project portfolio cover/thumbnail in sync with the H3 title
  const projectThumbnail = project?.coverImage || post.media[0];

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1">
      {/* Project Portfolio Thumbnail Container */}
      <div 
        className="relative w-full aspect-video overflow-hidden rounded-xl mb-4 flex-shrink-0 border border-neutral-200/50 shadow-xs"
      >
        <div className="absolute inset-0 w-full h-full">
          <AppImage
            src={projectThumbnail}
            alt={`${post.projectTitle} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent pointer-events-none" />
      </div>

      {/* Brand Header containing the original uncropped portfolio thumbnail */}
      <div className="flex items-center gap-3 mb-2.5 mt-1 border-b border-neutral-100 pb-3">
        {project?.coverImage && (
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-200/50 flex-shrink-0 bg-white p-1 flex items-center justify-center shadow-2xs">
            <AppImage
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-base font-extrabold text-neutral-900 leading-tight">
            {post.projectTitle}
          </h3>
          <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase font-sans">
            {project?.category || 'Project'}
          </span>
        </div>
      </div>

      <p className="text-xs text-neutral-500 leading-relaxed mb-4">{post.projectDescription}</p>

      {/* Made with program */}
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
          Made with
        </p>
        <div className="flex flex-wrap gap-2">
          {parsePrograms(post.program).map((prog, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-neutral-200/55 bg-neutral-50/50 shadow-3xs"
            >
              {prog.image ? (
                <div 
                  className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{ background: prog.bg || 'transparent' }}
                >
                  <AppImage
                    src={prog.image}
                    alt={`${prog.name} logo`}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
              ) : prog.iconType === 'chatgpt' ? (
                <div 
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: prog.bg }}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-3.5 h-3.5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.74 11.23a4.88 4.88 0 0 0-.16-4.59 4.96 4.96 0 0 0-3.32-2.58 5.09 5.09 0 0 0-4.63.88 5 5 0 0 0-4.63-.88c-.9.25-1.74.72-2.45 1.37a4.91 4.91 0 0 0-1.83 5c-.75.64-1.32 1.48-1.63 2.42a4.91 4.91 0 0 0 1.1 5.06 4.88 4.88 0 0 0 4.59.16 4.96 4.96 0 0 0 2.58 3.32c.9.23 1.84.23 2.74 0a4.98 4.98 0 0 0 3.31-2.58 4.91 4.91 0 0 0 4.88-4.16zM18.08 16.1l-3-1.73 1.79-1a2.86 2.86 0 0 0 1.42-2.47V6.44c1.6 1 2.4 2.8 2 4.7-.3 1.9-1.5 3.5-3.2 4.2zm-6.1-11.3l1.79 1.04v4.11L12 9.4 10.21 8.36V4.25c1.6-1 3.5-1 5.1 0 1.6.9 2.4 2.8 2.1 4.7l-4.11-2.38V4.79v.01zm-3.58 3.48l3 1.73-1.79 1A2.86 2.86 0 0 0 10.21 15v4.54c-1.6-1-2.4-2.8-2-4.7s1.5-3.5 3.2-4.2zm3.58 11.13l-1.79-1.04v-4.11L12 13l1.79 1.04v4.11c-1.6 1-3.5 1-5.1 0-1.6-.9-2.4-2.8-2.1-4.7l4.11 2.38V19.1z" />
                  </svg>
                </div>
              ) : (
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black flex-shrink-0 tracking-tight"
                  style={{ background: prog.bg, color: prog.text }}
                >
                  {prog.short}
                </div>
              )}
              <span className="text-xs font-semibold text-neutral-700 font-sans">{prog.name}</span>
            </div>
          ))}
        </div>
      </div>

      {(onProjectClick || onBackToPortfolio) && (
        <button
          onClick={() => {
            if (post.projectId && onProjectClick) {
              onProjectClick(post.projectId);
            } else if (onBackToPortfolio) {
              onBackToPortfolio();
            }
          }}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold text-white transition-all hover:bg-neutral-800 active:scale-95 mt-auto cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #1c1c1e, #3a3a3c)' }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          View in Portfolio
        </button>
      )}
    </div>
  );
}

function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex-shrink-0" style={{ width: 300, height: 600 }}>
      {/* Phone shell */}
      <div
        className="absolute inset-0 rounded-[44px] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%)',
          boxShadow:
            '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      />

      {/* Side buttons */}
      <div className="absolute left-[-3px] top-[100px] w-[3px] h-8 rounded-l-full bg-gray-600" />
      <div className="absolute left-[-3px] top-[148px] w-[3px] h-12 rounded-l-full bg-gray-600" />
      <div className="absolute left-[-3px] top-[210px] w-[3px] h-12 rounded-l-full bg-gray-600" />
      <div className="absolute right-[-3px] top-[140px] w-[3px] h-16 rounded-r-full bg-gray-600" />

      {/* Screen bezel */}
      <div className="absolute rounded-[38px] overflow-hidden bg-white" style={{ inset: 6 }}>
        {/* Dynamic island */}
        <div
          className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black"
          style={{ width: 90, height: 26 }}
        />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-11 z-10 flex items-end justify-between px-5 pb-1">
          <span className="text-[10px] font-bold text-gray-900">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="12" height="10" viewBox="0 0 24 20" fill="#1c1c1e">
              <path d="M1 7C5.5 2.5 18.5 2.5 23 7L21 9C17 5 7 5 3 9L1 7Z" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 24 16" fill="#1c1c1e">
              <rect x="0" y="3" width="18" height="10" rx="2" />
              <rect x="19" y="5" width="3" height="6" rx="1" />
            </svg>
          </div>
        </div>

        {/* Scrollable feed content */}
        <div className="absolute inset-0 top-11 overflow-hidden">{children}</div>

        {/* Bottom nav bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-white/95 backdrop-blur-sm flex items-center justify-around px-4 z-10"
          style={{ borderTop: '0.5px solid rgba(0,0,0,0.1)' }}
        >
          {[
            <svg key="home" width="20" height="20" viewBox="0 0 24 24" fill="#262626">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>,
            <svg key="search" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>,
            <svg key="add" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
            </svg>,
            <svg key="reels" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
            </svg>,
            <div key="profile" className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-neutral-300">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1d4782540-1767446179525.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          ].map((icon, i) => (
            <button key={i} className="p-1 rounded-sm hover:bg-neutral-150 transition-colors">
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedScroller({
  posts,
  onSelect,
  activeId,
  selectedBrand,
  onBrandSelect,
}: {
  posts: SocialPost[];
  onSelect: (p: SocialPost) => void;
  activeId: string | null;
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    // Don't intercept clicks on buttons or interactive anchors
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
      return;
    }
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = containerRef.current.scrollTop;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const dy = startY.current - e.clientY;
    
    // Only capture pointer if the user has actually started dragging a bit (above 4px)
    if (Math.abs(dy) > 4) {
      try {
        if (!containerRef.current.hasPointerCapture(e.pointerId)) {
          containerRef.current.setPointerCapture(e.pointerId);
        }
      } catch (err) {}
    }
    
    containerRef.current.scrollTop = startScrollTop.current + dy;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  }, []);

  // Auto-scroll back to top when the brand selection / filter changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [selectedBrand]);

  // Update selected post based on which post is currently closest to the vertical center of the phone viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const children = container.querySelectorAll('[data-post-id]');
        if (!children.length) return;

        const containerRect = container.getBoundingClientRect();
        // Target slightly above absolute center for ideal reading focal point
        const containerCenter = containerRect.top + containerRect.height / 2.2;

        let closestPostId: string | null = null;
        let minDistance = Infinity;

        children.forEach((child) => {
          const rect = child.getBoundingClientRect();
          const childCenter = rect.top + rect.height / 2;
          const distance = Math.abs(childCenter - containerCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestPostId = child.getAttribute('data-post-id');
          }
        });

        if (closestPostId && closestPostId !== activeId) {
          const found = posts.find((p) => p.id === closestPostId);
          if (found) {
            onSelect(found);
          }
        }
      }, 15);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeId, onSelect, posts]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto"
      style={{ scrollbarWidth: 'none', cursor: 'grab', userSelect: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Stories row */}
      <div className="flex gap-3 px-3 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <button
          onClick={() => onBrandSelect(null)}
          className="flex flex-col items-center gap-1 flex-shrink-0 focus:outline-none cursor-pointer"
        >
          <div className={`relative w-12 h-12 rounded-full overflow-hidden ring-2 ${!selectedBrand ? 'ring-blue-500' : 'ring-neutral-200'}`}>
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1d4782540-1767446179525.png"
              alt="Manoelle story"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <span className={`text-[9px] font-medium ${!selectedBrand ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>All Feed</span>
        </button>
        {stories.map((s) => {
          const isSelected = selectedBrand === s.label;
          return (
            <button
              key={s.label}
              onClick={() => onBrandSelect(isSelected ? null : s.label)}
              className="flex flex-col items-center gap-1 flex-shrink-0 focus:outline-none cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-full overflow-hidden p-0.5 transition-transform active:scale-95"
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, #0095f6, #007aff)'
                    : 'linear-gradient(135deg, #e5e5e0, #f5f5f5)',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5 flex items-center justify-center">
                  <AppImage
                    src={s.img}
                    alt={`${s.label} story`}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              <span className={`text-[9px] font-medium truncate max-w-[48px] text-center ${isSelected ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
      {/* Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          data-post-id={post.id}
          style={{
            outline: activeId === post.id ? '2px solid #0095f6' : 'none',
            outlineOffset: -2,
          }}
        >
          <PostCard post={post} isActive={activeId === post.id} onSelect={onSelect} />
        </div>
      ))}
      <div className="h-16" />
    </div>
  );
}

interface SocialFeedProps {
  onBackToPortfolio?: () => void;
  onProjectClick?: (projectId: string) => void;
}

export default function SocialFeedPage({ onBackToPortfolio, onProjectClick }: SocialFeedProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<SocialPost | null>(socialPosts[0]);

  const filteredPosts = useMemo(() => {
    if (!selectedBrand) return socialPosts;
    return socialPosts.filter((p) =>
      p.projectTitle?.toLowerCase().includes(selectedBrand.toLowerCase())
    );
  }, [selectedBrand]);

  // Sync activePost on brand filter change
  useEffect(() => {
    if (filteredPosts.length > 0) {
      const isStillAvailable = filteredPosts.some((p) => p.id === activePost?.id);
      if (!isStillAvailable) {
        setActivePost(filteredPosts[0]);
      }
    } else {
      setActivePost(null);
    }
  }, [filteredPosts, activePost?.id]);

  return (
    <section id="social-feed" className="bg-[#F2F2F7] relative z-20 px-4 md:px-8 py-20 border-t border-neutral-200/50">
      {/* Embedded Heart animations keyframe styles */}
      <style>{`
        @keyframes heartPop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          12% { transform: scale(1.3) rotate(8deg); opacity: 1; }
          25% { transform: scale(0.9) rotate(-4deg); opacity: 1; }
          80% { transform: scale(1) rotate(0); opacity: 0.8; }
          100% { transform: scale(1.4) rotate(0); opacity: 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto w-full">
        {/* Header text */}
        <div className="text-center mb-10">

          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight mb-3 font-sans">
            Social Media Content
          </h2>
          <p className="text-base text-[#6D6D72] leading-relaxed max-w-xl mx-auto font-sans font-normal">
            A curated feed showcasing social media content, campaigns, and creative experiments. Every post was designed and produced by me.
          </p>
        </div>

        {/* Dynamic view layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-16">
          {/* iPhone */}
          <IPhoneMockup>
            <FeedScroller
              posts={filteredPosts}
              onSelect={setActivePost}
              activeId={activePost?.id ?? null}
              selectedBrand={selectedBrand}
              onBrandSelect={setSelectedBrand}
            />
          </IPhoneMockup>

          {/* Details Column */}
          <div
            className="w-full max-w-sm bg-white rounded-[28px] shadow-xl border border-neutral-200/60 p-6 flex-shrink-0"
            style={{ minHeight: 480, maxHeight: 600 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-5 rounded-full bg-neutral-900" />
              <h2 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                Inspector
              </h2>
            </div>
            <DetailPanel post={activePost} onBackToPortfolio={onBackToPortfolio} onProjectClick={onProjectClick} />
          </div>
        </div>


      </div>
    </section>
  );
}
