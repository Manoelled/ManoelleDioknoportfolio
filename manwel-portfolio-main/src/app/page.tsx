'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import PortfolioSection from '@/app/components/PortfolioSection';

// ─────────────────────────────────────────────────────────────────────────────
// TAG TYPES & COLORS
// ─────────────────────────────────────────────────────────────────────────────
type Tag =
  | 'Branding'
  | 'Digital Marketing'
  | 'Graphic Design'
  | 'Social Media'
  | 'Post-Processing'
  | 'Art Direction'
  | 'Photography'
  | 'Video Production';

const TAG_COLORS: Record<Tag, { bg: string; text: string; dot: string }> = {
  Branding: { bg: '#D1F5E0', text: '#1A7A3C', dot: '#34C759' },
  'Digital Marketing': { bg: '#D6E8FF', text: '#0050A0', dot: '#007AFF' },
  'Graphic Design': { bg: '#FFD6D6', text: '#9B1B1B', dot: '#FF3B30' },
  'Social Media': { bg: '#EDD6FF', text: '#6B0FA8', dot: '#AF52DE' },
  'Post-Processing': { bg: '#FFD6EE', text: '#9B1B6E', dot: '#FF2D78' },
  'Art Direction': { bg: '#FFE0D6', text: '#9B3B1B', dot: '#FF6B35' },
  Photography: { bg: '#FFF3D6', text: '#9B7B1B', dot: '#FF9500' },
  'Video Production': { bg: '#FFFBD6', text: '#9B9B1B', dot: '#FFCC00' },
};

type PostType = 'image' | 'carousel' | 'reel';

// ─────────────────────────────────────────────────────────────────────────────
// POST DATA TYPE
// ─────────────────────────────────────────────────────────────────────────────
interface FeedPost {
  id: string;
  projectId: string;
  type: PostType;
  images?: string[];
  videoColor?: string;
  caption: string;
  liked: boolean;
  tags: Tag[];
  projectName: string;
  projectDescription: string;
  madeWith: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// FEED POSTS
// ─────────────────────────────────────────────────────────────────────────────
const FEED_POSTS: FeedPost[] = [
  {
    id: 'p1',
    projectId: 'crumb',
    type: 'carousel',
    images: ['#F9C784', '#F4A261', '#E76F51'],
    caption:
      'Crumb Bakery brand identity — warm tones, artisan feel. Every detail tells a story. 🍞✨',
    liked: false,
    tags: ['Branding', 'Graphic Design'],
    projectName: 'Crumb Bakery',
    projectDescription:
      'Full brand identity for an artisan bakery in Manila — logo, packaging, and digital presence.',
    madeWith: ['Adobe Illustrator', 'Adobe Photoshop'],
  },
  {
    id: 'p2',
    projectId: 'ramngo',
    type: 'image',
    images: ['#FFBE0B'],
    caption: "Ramn'go — because mango deserves its own universe. 🥭 Brand identity drop.",
    liked: false,
    tags: ['Branding', 'Social Media', 'Digital Marketing'],
    projectName: "Ramn'go",
    projectDescription:
      'Vibrant brand identity and social media campaign for a Filipino mango dessert brand.',
    madeWith: ['Adobe Illustrator', 'Canva Pro'],
  },
  {
    id: 'p3',
    projectId: 'lumen',
    type: 'reel',
    videoColor: '#1A1A2E',
    caption: 'Lumen series — cinematic short-form. Shot & edited by me. 🎬',
    liked: false,
    tags: ['Video Production', 'Post-Processing', 'Art Direction'],
    projectName: 'Lumen',
    projectDescription:
      'Video production and post-processing for a cinematic short-form content series.',
    madeWith: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects'],
  },
  {
    id: 'p4',
    projectId: 'nomad',
    type: 'carousel',
    images: ['#2D3A3A', '#4A6572', '#7A9E9F'],
    caption: 'NOMAD — stillness in motion. Art direction & photography. 🌿',
    liked: false,
    tags: ['Art Direction', 'Photography', 'Post-Processing'],
    projectName: 'NOMAD',
    projectDescription: 'Art direction and photography for a minimalist travel lifestyle brand.',
    madeWith: ['Adobe Lightroom', 'Adobe Photoshop', 'Capture One'],
  },
  {
    id: 'p5',
    projectId: 'bloom',
    type: 'image',
    images: ['#F7C5CC'],
    caption: 'Bloom — social content that feels like a warm hug. 🌸',
    liked: false,
    tags: ['Social Media', 'Graphic Design', 'Digital Marketing'],
    projectName: 'Bloom',
    projectDescription:
      'Social media content strategy and graphic design for a wellness and beauty brand.',
    madeWith: ['Adobe Illustrator', 'Adobe After Effects'],
  },
  {
    id: 'p6',
    projectId: 'terra',
    type: 'reel',
    videoColor: '#8B5E3C',
    caption: 'Terra skincare — rooted in Philippine botanicals. 🌱',
    liked: false,
    tags: ['Photography', 'Branding', 'Art Direction'],
    projectName: 'Terra',
    projectDescription:
      'Photography and branding for an organic skincare line rooted in Philippine botanicals.',
    madeWith: ['Adobe Lightroom', 'Adobe Illustrator'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STORIES
// ─────────────────────────────────────────────────────────────────────────────
const STORIES = [
  { name: 'Your story', color: '#007AFF', initials: 'M' },
  { name: 'Crumb', color: '#F4A261', initials: 'C' },
  { name: "Ramn'go", color: '#FFBE0B', initials: 'R' },
  { name: 'NOMAD', color: '#4A6572', initials: 'N' },
  { name: 'Bloom', color: '#E8789A', initials: 'B' },
];

// ─────────────────────────────────────────────────────────────────────────────
// TOOL COLORS & LETTERS
// ─────────────────────────────────────────────────────────────────────────────
const TOOL_COLORS: Record<string, string> = {
  'Adobe Illustrator': '#FF9A00',
  'Adobe Photoshop': '#31A8FF',
  'Adobe Lightroom': '#31A8FF',
  'Adobe Premiere Pro': '#9999FF',
  'Adobe After Effects': '#9999FF',
  'After Effects': '#9999FF',
  'DaVinci Resolve': '#E8B86D',
  'Canva Pro': '#00C4CC',
  'Capture One': '#1C1C1E',
};

const TOOL_LETTERS: Record<string, string> = {
  'Adobe Illustrator': 'Ai',
  'Adobe Photoshop': 'Ps',
  'Adobe Lightroom': 'Lr',
  'Adobe Premiere Pro': 'Pr',
  'Adobe After Effects': 'Ae',
  'After Effects': 'Ae',
  'DaVinci Resolve': 'Da',
  'Canva Pro': 'Cv',
  'Capture One': 'C1',
};

// ─────────────────────────────────────────────────────────────────────────────
// HEART ANIMATION
// ─────────────────────────────────────────────────────────────────────────────
function HeartAnimation({ x, y, onEnd }: { x: number; y: number; onEnd: () => void }) {
  useEffect(() => {
    const t = setTimeout(onEnd, 900);
    return () => clearTimeout(t);
  }, [onEnd]);

  return (
    <div
      className="pointer-events-none fixed animate-heart-pop"
      style={{ left: x - 40, top: y - 40, zIndex: 100 }}
    >
      <svg width="80" height="80" viewBox="0 0 24 24" fill="#FF3B30">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POST CARD
// ─────────────────────────────────────────────────────────────────────────────
function PostCard({
  post,
  isActive,
  onLike,
}: {
  post: FeedPost;
  isActive: boolean;
  onLike: (id: string) => void;
}) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [heartPos, setHeartPos] = useState<{ x: number; y: number } | null>(null);
  const [localLiked, setLocalLiked] = useState(post.liked);
  const lastTapRef = useRef(0);

  const handleDoubleTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const now = Date.now();
      if (now - lastTapRef.current < 350) {
        const clientX =
          'touches' in e ? (e.touches[0]?.clientX ?? 0) : (e as React.MouseEvent).clientX;
        const clientY =
          'touches' in e ? (e.touches[0]?.clientY ?? 0) : (e as React.MouseEvent).clientY;
        setHeartPos({ x: clientX, y: clientY });
        if (!localLiked) {
          setLocalLiked(true);
          onLike(post.id);
        }
      }
      lastTapRef.current = now;
    },
    [localLiked, onLike, post.id]
  );

  const handleLikeBtn = () => {
    setLocalLiked((v) => !v);
    onLike(post.id);
  };

  const images = post.images ?? [];
  const totalImages = images.length;

  return (
    <div className="snap-item flex-shrink-0 w-full bg-white" style={{ height: '100%' }}>
      {/* Post header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#F2F2F7]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5AC8FA] flex items-center justify-center text-white text-xs font-bold">
            M
          </div>
          <div>
            <div className="text-xs font-bold text-[#1C1C1E] flex items-center gap-1">
              manoelle.diokno
              <svg className="w-3 h-3 text-[#007AFF]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-[9px] text-[#8E8E93]">2h ago</div>
          </div>
        </div>
        <button className="text-[#1C1C1E] p-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>

      {/* Media area */}
      <div
        className="relative overflow-hidden"
        style={{ height: 220, userSelect: 'none' }}
        onClick={handleDoubleTap}
        onTouchStart={handleDoubleTap}
      >
        {post.type === 'reel' ? (
          <div
            className="w-full h-full flex items-center justify-center relative"
            style={{ backgroundColor: post.videoColor }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                {isActive ? (
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                ) : (
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              <span className="text-[9px] text-white font-bold">REEL</span>
            </div>
            <button
              className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
            >
              {muted ? (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072"
                  />
                </svg>
              )}
            </button>
          </div>
        ) : post.type === 'carousel' ? (
          <div className="relative w-full h-full">
            <div
              className="flex h-full transition-transform duration-300"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {images.map((color, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full h-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {totalImages > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all"
                    style={{
                      width: i === carouselIndex ? 16 : 5,
                      height: 5,
                      backgroundColor: i === carouselIndex ? '#007AFF' : 'rgba(255,255,255,0.7)',
                    }}
                  />
                ))}
              </div>
            )}
            {totalImages > 1 && (
              <>
                {carouselIndex > 0 && (
                  <button
                    className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/30 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarouselIndex((i) => i - 1);
                    }}
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}
                {carouselIndex < totalImages - 1 && (
                  <button
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/30 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarouselIndex((i) => i + 1);
                    }}
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: images[0] }} />
        )}
      </div>

      {/* Post actions */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button onClick={handleLikeBtn} className="transition-transform active:scale-90">
              <svg
                className="w-5 h-5 transition-colors"
                fill={localLiked ? '#FF3B30' : 'none'}
                stroke={localLiked ? '#FF3B30' : '#1C1C1E'}
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <button>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="#1C1C1E"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="#1C1C1E"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <button>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="#1C1C1E"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
        <div className="text-[10px] text-[#1C1C1E] leading-tight">
          <span className="font-bold">manoelle.diokno</span>{' '}
          <span className="text-[#3A3A3C]">{post.caption}</span>
        </div>
      </div>

      {heartPos && <HeartAnimation x={heartPos.x} y={heartPos.y} onEnd={() => setHeartPos(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL FEED SECTION
// ─────────────────────────────────────────────────────────────────────────────
function SocialFeedSection() {
  const [posts, setPosts] = useState<FeedPost[]>(FEED_POSTS);
  const [activePostIndex, setActivePostIndex] = useState(0);
  const phoneScrollRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollStartY = useRef(0);
  const dragMoved = useRef(false);

  const handleLike = useCallback((id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  }, []);

  useEffect(() => {
    const el = phoneScrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight);
      setActivePostIndex(Math.max(0, Math.min(idx, posts.length - 1)));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [posts.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragMoved.current = false;
    startY.current = e.clientY;
    scrollStartY.current = phoneScrollRef.current?.scrollTop ?? 0;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !phoneScrollRef.current) return;
    const dy = startY.current - e.clientY;
    if (Math.abs(dy) > 3) dragMoved.current = true;
    phoneScrollRef.current.scrollTop = scrollStartY.current + dy;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const activePost = posts[activePostIndex];

  return (
    <section
      id="social-feed"
      className="py-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #F2F2F7 0%, #E8F0FE 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
            <svg
              className="w-4 h-4 text-[#007AFF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-semibold text-[#3A3A3C] uppercase tracking-wider">
              Social Media Work
            </span>
          </div>
          <h2
            className="font-bold text-[#1C1C1E] mb-3"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-inter), "Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
          >
            Feed &amp; Content
          </h2>
          <p className="text-[#8E8E93] max-w-sm mx-auto text-sm">
            Click &amp; drag to scroll · Double tap to like
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* iPhone Frame */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative" style={{ width: 300, height: 620 }}>
              {/* Phone outer shell */}
              <div
                className="absolute inset-0 rounded-[44px] shadow-2xl"
                style={{
                  background: 'linear-gradient(145deg, #2A2A2A 0%, #1A1A1A 100%)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              />
              {/* Side buttons */}
              <div
                className="absolute rounded-full"
                style={{ width: 3, height: 32, background: '#3A3A3A', left: -3, top: 100 }}
              />
              <div
                className="absolute rounded-full"
                style={{ width: 3, height: 48, background: '#3A3A3A', left: -3, top: 148 }}
              />
              <div
                className="absolute rounded-full"
                style={{ width: 3, height: 48, background: '#3A3A3A', left: -3, top: 208 }}
              />
              <div
                className="absolute rounded-full"
                style={{ width: 3, height: 64, background: '#3A3A3A', right: -3, top: 160 }}
              />

              {/* Screen bezel */}
              <div
                className="absolute rounded-[38px] overflow-hidden"
                style={{ inset: 6, background: '#000' }}
              >
                {/* Status bar */}
                <div
                  className="flex items-center justify-between px-5 pt-3 pb-1 bg-white"
                  style={{ height: 36 }}
                >
                  <span className="text-[11px] font-bold text-[#1C1C1E]">9:41</span>
                  <div
                    className="absolute rounded-full bg-black"
                    style={{
                      width: 100,
                      height: 26,
                      top: 5,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-[#1C1C1E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1 6l4 4 7-7 7 7 4-4" />
                    </svg>
                    <svg
                      className="w-3.5 h-3 text-[#1C1C1E]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="1"
                        y="6"
                        width="16"
                        height="12"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <rect x="18" y="10" width="5" height="5" rx="1" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* App content */}
                <div className="bg-white" style={{ height: 'calc(100% - 36px)' }}>
                  {/* Stories row */}
                  <div
                    className="flex gap-3 px-3 py-2 border-b border-[#F2F2F7] overflow-x-auto"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {STORIES.map((s, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div
                          className="rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            width: 44,
                            height: 44,
                            background:
                              i === 0
                                ? `linear-gradient(135deg, ${s.color}, #5AC8FA)`
                                : `linear-gradient(135deg, #FF6B35, #FF3B30)`,
                            padding: 2,
                          }}
                        >
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{
                              background:
                                i === 0 ? 'linear-gradient(135deg, #007AFF, #5AC8FA)' : s.color,
                            }}
                          >
                            {s.initials}
                          </div>
                        </div>
                        <span
                          className="text-[8px] text-[#1C1C1E] text-center leading-none"
                          style={{ maxWidth: 44 }}
                        >
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Feed scroll area */}
                  <div
                    ref={phoneScrollRef}
                    className="overflow-y-auto"
                    style={{
                      height: 'calc(100% - 90px - 44px)',
                      cursor: isDragging.current ? 'grabbing' : 'grab',
                      scrollbarWidth: 'none',
                      overflowX: 'hidden',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {posts.map((post, i) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        isActive={i === activePostIndex}
                        onLike={handleLike}
                      />
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div
                    className="flex items-center justify-around border-t border-[#F2F2F7] bg-white"
                    style={{ height: 44 }}
                  >
                    {[
                      <path
                        key="home"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />,
                      <path
                        key="search"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />,
                      <path
                        key="add"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />,
                      <path
                        key="reel"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                      />,
                      <circle key="profile" cx="12" cy="8" r="4" strokeWidth={1.5} />,
                    ].map((icon, i) => (
                      <button key={i} className="flex items-center justify-center w-10 h-10">
                        <svg
                          className="w-5 h-5 text-[#1C1C1E]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {icon}
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Panel */}
          {activePost && (
            <div
              className="flex-1 max-w-sm lg:max-w-none glass rounded-3xl p-6 shadow-xl"
              key={activePost.id}
              style={{ minWidth: 280 }}
            >
              <div className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#007AFF] rounded-full" />
                Project Details
              </div>

              {/* Thumbnail */}
              <div className="rounded-2xl mb-4 overflow-hidden relative" style={{ height: 160 }}>
                {activePost.images ? (
                  <div className="flex h-full">
                    {activePost.images.map((c, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: activePost.videoColor }}
                  >
                    <svg
                      className="w-12 h-12 text-white/50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                    </svg>
                  </div>
                )}
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase text-white"
                  style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                >
                  {activePost.type === 'reel'
                    ? 'REEL'
                    : activePost.type === 'carousel'
                      ? 'CAROUSEL'
                      : 'IMAGE'}
                </div>
              </div>

              <h3
                className="font-bold text-xl text-[#1C1C1E] mb-1"
                style={{
                  fontFamily: 'var(--font-inter), "Helvetica Neue", Helvetica, Arial, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                {activePost.projectName}
              </h3>
              <p className="text-sm text-[#3A3A3C] leading-relaxed mb-5">
                {activePost.projectDescription}
              </p>

              {/* Tools */}
              <div className="mb-4">
                <div className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest mb-2">
                  Made With
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePost.madeWith.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl"
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                        style={{ backgroundColor: TOOL_COLORS[tool] ?? '#8E8E93' }}
                      >
                        {TOOL_LETTERS[tool] ?? tool[0]}
                      </div>
                      <span className="text-xs font-medium text-[#1C1C1E]">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-5">
                <div className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest mb-2">
                  Disciplines
                </div>
                <div className="flex flex-wrap gap-1">
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill"
                      style={{ backgroundColor: TAG_COLORS[tag].bg, color: TAG_COLORS[tag].text }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-1 inline-block"
                        style={{ backgroundColor: TAG_COLORS[tag].dot }}
                      />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-full py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: '#1C1C1E' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                View in Portfolio
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-background overflow-x-hidden"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="noise-overlay" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 animate-blob-drift"
          style={{
            background: 'radial-gradient(circle, #BFD7FF 0%, #E8F0FF 40%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full opacity-15 animate-blob-drift"
          style={{
            background: 'radial-gradient(circle, #FFD6E8 0%, #FFF0F6 40%, transparent 70%)',
            animationDelay: '-6s',
          }}
        />
      </div>

      <Header />
      <HeroSection />
      <PortfolioSection />
      <SocialFeedSection />
      <Footer />
    </main>
  );
}
