'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { socialPosts, SocialPost } from './socialFeedData';

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

// ── Program badge colors ──────────────────────────────────────────────────────
const programColors: Record<string, { bg: string; text: string }> = {
  Ai: { bg: '#FF7C00', text: '#fff' },
  Ps: { bg: '#31A8FF', text: '#fff' },
  Ae: { bg: '#9999FF', text: '#fff' },
  Pr: { bg: '#EA77FF', text: '#fff' },
  Fig: { bg: '#F24E1E', text: '#fff' },
};

// ── Story bubbles ─────────────────────────────────────────────────────────────
const stories = [
  {
    label: 'Crumb',
    img: 'https://img.rocket.new/generatedImages/rocket_gen_img_1be3f33ca-1777598873128.png',
  },
  {
    label: "Ramn'go",
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=80&q=70',
  },
  {
    label: 'NOMAD',
    img: 'https://img.rocket.new/generatedImages/rocket_gen_img_18ee41cb4-1764832558067.png',
  },
  {
    label: 'Bloom',
    img: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b5377add-1777598886168.png',
  },
];

// ── Carousel sub-component ────────────────────────────────────────────────────
function CarouselMedia({ media, alt }: { media: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    dragging.current = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = e.clientX - startX.current;
    if (diff < -40 && idx < media.length - 1) setIdx((i) => i + 1);
    if (diff > 40 && idx > 0) setIdx((i) => i - 1);
  };

  return (
    <div
      className="relative w-full aspect-square overflow-hidden select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${idx * 100}%)`, width: `${media.length * 100}%` }}
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
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* Dot indicators */}
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
      {/* Slide counter */}
      {media.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {idx + 1}/{media.length}
        </div>
      )}
    </div>
  );
}

// ── Reel sub-component ────────────────────────────────────────────────────────
function ReelMedia({ post }: { post: SocialPost }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="relative w-full aspect-square overflow-hidden bg-black cursor-pointer"
      onClick={() => setPlaying((p) => !p)}
    >
      <AppImage
        src={post.videoThumbnail || post.media[0]}
        alt={`${post.projectTitle} reel thumbnail`}
        width={400}
        height={400}
        className="w-full h-full object-cover"
        style={{ opacity: playing ? 0.6 : 1, transition: 'opacity 0.3s' }}
      />

      {/* Play/pause overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!playing ? (
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
        )}
      </div>
      {/* Duration badge */}
      {post.duration && (
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          {post.duration}
        </div>
      )}
      {/* Reel label */}
      <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
        REEL
      </div>
    </div>
  );
}

// ── Single Post Card ──────────────────────────────────────────────────────────
function PostCard({
  post,
  isActive,
  onSelect,
}: {
  post: SocialPost;
  isActive: boolean;
  onSelect: (p: SocialPost) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likeAnim, setLikeAnim] = useState(false);

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
            className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-offset-1"
            style={{ ringColor: '#E1306C' }}
          >
            <AppImage
              src={post.avatar}
              alt={`${post.username} profile photo`}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                opacity: 0.7,
                mixBlendMode: 'multiply',
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-gray-900 leading-none">
                {post.username}
              </span>
              {post.verified && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#3897f0">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </div>
            <span className="text-[9px] text-gray-400">{post.timeAgo}</span>
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

      {/* Media */}
      {post.type === 'carousel' ? (
        <CarouselMedia media={post.media} alt={post.projectTitle || post.username} />
      ) : post.type === 'reel' ? (
        <ReelMedia post={post} />
      ) : (
        <div className="w-full aspect-square relative overflow-hidden">
          <AppImage
            src={post.media[0]}
            alt={`${post.projectTitle} — ${post.caption}`}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-3 pt-2.5 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-3">
            {/* Like button */}
            <button
              onClick={handleLike}
              className="relative flex items-center gap-1 transition-transform duration-150 active:scale-90"
              aria-label={liked ? 'Unlike post' : 'Like post'}
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
                {likeAnim && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-red-400"
                        style={{
                          transform: `rotate(${i * 60}deg) translateY(-12px)`,
                          animation: 'like-burst 0.5s ease-out forwards',
                          animationDelay: `${i * 0.04}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[11px] font-semibold text-gray-700">
                {formatCount(likeCount)}
              </span>
            </button>
            {/* Comment */}
            <button className="flex items-center gap-1" aria-label="Comment">
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
              <span className="text-[11px] font-semibold text-gray-700">
                {formatCount(post.comments)}
              </span>
            </button>
            {/* Share */}
            <button className="flex items-center gap-1" aria-label="Share">
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
              <span className="text-[11px] font-semibold text-gray-700">
                {formatCount(post.shares)}
              </span>
            </button>
          </div>
          <button aria-label="Save post">
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
        {/* Caption */}
        <p className="text-[10px] text-gray-800 leading-relaxed line-clamp-2">
          <span className="font-bold">{post.username} </span>
          {post.caption}
        </p>
      </div>
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────────
function DetailPanel({ post }: { post: SocialPost | null }) {
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
        <p className="text-xs text-gray-400 mt-1">Tap any post to see project details</p>
      </div>
    );
  }

  const pc = programColors[post.programIcon] || { bg: '#6b7280', text: '#fff' };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Preview image */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-4 flex-shrink-0">
        <AppImage
          src={post.media[0]}
          alt={`${post.projectTitle} project preview`}
          width={400}
          height={225}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span
            className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white"
            style={{
              background:
                post.type === 'reel'
                  ? 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)'
                  : post.type === 'carousel'
                    ? '#0095f6'
                    : '#262626',
            }}
          >
            {post.type}
          </span>
        </div>
      </div>

      {/* Project title */}
      <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-1">
        {post.projectTitle}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-4">{post.projectDescription}</p>

      {/* Program badge */}
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
          Made with
        </p>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black"
            style={{ background: pc.bg, color: pc.text }}
          >
            {post.programIcon}
          </div>
          <span className="text-sm font-semibold text-gray-800">{post.program}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
          Disciplines
        </p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Likes', val: formatCount(post.likes), icon: '♥' },
          { label: 'Comments', val: formatCount(post.comments), icon: '💬' },
          { label: 'Shares', val: formatCount(post.shares), icon: '↗' },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100"
          >
            <p className="text-base font-extrabold text-gray-900">{s.val}</p>
            <p className="text-[9px] text-gray-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Link to portfolio */}
      {post.projectId && (
        <Link
          href={`/#portfolio`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
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
        </Link>
      )}
    </div>
  );
}

// ── iPhone Mockup ─────────────────────────────────────────────────────────────
function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex-shrink-0" style={{ width: 300, height: 620 }}>
      {/* Phone shell */}
      <div
        className="absolute inset-0 rounded-[44px] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%)',
          boxShadow:
            '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)',
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
          className="absolute top-3 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black"
          style={{ width: 100, height: 28 }}
        />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-12 z-10 flex items-end justify-between px-5 pb-1.5">
          <span className="text-[10px] font-bold text-gray-900">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="12" height="10" viewBox="0 0 24 20" fill="#1c1c1e">
              <path d="M1 7C5.5 2.5 18.5 2.5 23 7L21 9C17 5 7 5 3 9L1 7Z" />
              <path d="M5 11C8 8 16 8 19 11L17 13C15 11 9 11 7 13L5 11Z" />
              <path d="M9 15C10.5 13.5 13.5 13.5 15 15L13 17C12.5 16.5 11.5 16.5 11 17L9 15Z" />
              <circle cx="12" cy="19" r="2" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 24 16" fill="#1c1c1e">
              <rect x="0" y="3" width="18" height="10" rx="2" />
              <rect x="19" y="5" width="3" height="6" rx="1" />
              <rect x="1" y="4" width="14" height="8" rx="1" fill="white" />
            </svg>
          </div>
        </div>
        {/* Scrollable feed content */}
        <div className="absolute inset-0 top-12 overflow-hidden">{children}</div>
        {/* Bottom nav bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-sm flex items-center justify-around px-4 z-10"
          style={{ borderTop: '0.5px solid rgba(0,0,0,0.1)' }}
        >
          {[
            <svg key="home" width="22" height="22" viewBox="0 0 24 24" fill="#262626">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" fill="white" />
            </svg>,
            <svg
              key="search"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#262626"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>,
            <svg
              key="add"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#262626"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>,
            <svg
              key="reels"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#262626"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>,
            <div
              key="profile"
              className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-gray-300"
            >
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1d4782540-1767446179525.png"
                alt="Profile"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>,
          ].map((icon, i) => (
            <button
              key={i}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={`Nav item ${i + 1}`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Feed Scroller ─────────────────────────────────────────────────────────────
function FeedScroller({
  onSelect,
  activeId,
}: {
  onSelect: (p: SocialPost) => void;
  activeId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = containerRef.current.scrollTop;
    containerRef.current.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const dy = startY.current - e.clientY;
    containerRef.current.scrollTop = startScrollTop.current + dy;
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

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
        {/* Your story */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200">
            <AppImage
              src="https://images.unsplash.com/photo-1578761389912-5bd52bad74fe"
              alt="Your story"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
          <span className="text-[9px] text-gray-600 font-medium">Your story</span>
        </div>
        {stories.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full overflow-hidden p-0.5"
              style={{
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                <AppImage
                  src={s.img}
                  alt={`${s.label} story`}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="text-[9px] text-gray-600 font-medium truncate max-w-[48px] text-center">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
      {/* Posts */}
      {socialPosts.map((post) => (
        <div
          key={post.id}
          style={{
            outline: activeId === post.id ? '2px solid #0095f6' : 'none',
            outlineOffset: -2,
          }}
        >
          <PostCard post={post} isActive={activeId === post.id} onSelect={onSelect} />
        </div>
      ))}
      {/* Bottom padding */}
      <div className="h-16" />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SocialFeedPage() {
  const [activePost, setActivePost] = useState<SocialPost | null>(socialPosts[0]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-x-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Back nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 lg:px-16"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Portfolio
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            }}
          >
            <div className="w-full h-full p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-white p-px">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_192399cf2-1763294935907.png"
                  alt="Manoelle Diokno profile"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          <span className="text-sm font-bold text-gray-900">Social Media Work</span>
        </div>
      </div>

      {/* Page content */}
      <div className="pt-16 min-h-screen flex flex-col items-center justify-start lg:justify-center px-4 py-8 lg:py-12">
        {/* Header text */}
        <div className="text-center mb-8 lg:mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Social Media Work
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Scroll through the feed · Tap a post to see project details
          </p>
        </div>

        {/* Main layout: phone + detail panel */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 w-full max-w-4xl">
          {/* iPhone mockup */}
          <IPhoneMockup>
            <FeedScroller onSelect={setActivePost} activeId={activePost?.id ?? null} />
          </IPhoneMockup>

          {/* Detail panel */}
          <div
            className="w-full lg:w-80 xl:w-96 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex-shrink-0"
            style={{ minHeight: 480, maxHeight: 620 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-5 rounded-full bg-gray-900" />
              <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                Project Details
              </h2>
            </div>
            <DetailPanel post={activePost} />
          </div>
        </div>

        {/* Post type legend */}
        <div className="flex items-center gap-6 mt-10 flex-wrap justify-center">
          {[
            { label: 'Image', color: '#262626' },
            { label: 'Carousel', color: '#0095f6' },
            { label: 'Reel', color: '#833ab4' },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
              <span className="text-xs font-semibold text-gray-500">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes like-burst {
          0% {
            transform: rotate(var(--r)) translateY(-12px) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--r)) translateY(-20px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
