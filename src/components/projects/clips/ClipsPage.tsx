import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Mail, 
  ExternalLink, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Users, 
  Eye, 
  TrendingUp, 
  Smartphone,
  Sparkles,
  Tv,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface ClipsPageProps {
  onBack: () => void;
}

export default function ClipsPage({ onBack }: ClipsPageProps) {
  const [likes, setLikes] = useState(842);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'tiktok' | 'youtube' | 'twitch'>('all');
  
  // Custom video player states
  const [playingClipId, setPlayingClipId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const project = {
    title: 'manoellediokno.com/clips',
    subtitle: 'High-Velocity Clipping & Short-Form Audience Machinery.',
    description: 'A curated sandbox of professional streamer clips, viral vertical media, and multi-channel clipping accounts operated for major content creators. Every clip, frame, layout, and pacing scheme is engineered from the ground up to capture raw focus on rapid scroll feeds.',
    tags: ['Short-Form Media', 'Streamer Clipping', 'Viral Growth Systems', 'Timeline Editing'],
    role: 'Operations Director & Lead Media Designer',
    bio: 'I construct high-energy, high-retention short-form video strategies for elite streamers. By marrying tactical clip choices with dynamic typographic pop-ins, razor-sharp sound effect cues, and precise pacing, we turn hours of raw broadcast archives into hyper-addictive vertical loops that capture millions of views across TikTok, YouTube Shorts, and Twitch.',
    achievements: [
      { metric: '12M+', label: 'Combined Video Views' },
      { metric: '450K+', label: 'Total Subscribers/Followers' },
      { metric: '22%+', label: 'Average Watch Retention' },
      { metric: '3.4M', label: 'Highest Viral Single Clip' }
    ]
  };

  // Social accounts managed/run
  const socialAccounts = [
    {
      handle: '@TwitchVaultGG',
      platform: 'TikTok',
      niche: 'Esports & Variety Streamers',
      followers: '184.2K',
      views: '5.8M',
      engagement: '14.8%',
      url: 'https://tiktok.com',
      avatar: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=150&q=80',
      status: 'Active'
    },
    {
      handle: '@CreatorClipsHQ',
      platform: 'YouTube Shorts',
      niche: 'Just Chatting & Podcast Highlights',
      followers: '142.0K',
      views: '4.2M',
      engagement: '11.5%',
      url: 'https://youtube.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      status: 'Active'
    },
    {
      handle: '@StreamerSparks',
      platform: 'TikTok',
      niche: 'FPS & Battle Royale Clutch Moments',
      followers: '98.5K',
      views: '2.1M',
      engagement: '18.2%',
      url: 'https://tiktok.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      status: 'Active'
    },
    {
      handle: '@DailyLobbyCut',
      platform: 'Instagram Reels',
      niche: 'Streamer Rage & Funny Fails',
      followers: '32.1K',
      views: '840K',
      engagement: '9.2%',
      url: 'https://instagram.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      status: 'Growth Phase'
    }
  ];

  // Raw vertical clips (Actual high quality vertical royalty free video loops representing game clips/streamer setup)
  const curatedClips = [
    {
      id: 'clip-1',
      title: 'Challenger Rank Clutch Ace Moment',
      streamer: 'Shroud Vault',
      platform: 'tiktok',
      views: '1.2M',
      likes: '142K',
      duration: '0:22',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-controller-close-up-40431-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      style: 'Cyber-grid overlays, micro sound fx alerts'
    },
    {
      id: 'clip-2',
      title: 'The Funniest Lobby Rage of 2026',
      streamer: 'Kai Clips Channel',
      platform: 'tiktok',
      views: '842K',
      likes: '95K',
      duration: '0:18',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-playing-video-games-41710-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1618519764620-7403abdbfee9?auto=format&fit=crop&w=600&q=80',
      style: 'Dynamic Swiss font caption scaling'
    },
    {
      id: 'clip-3',
      title: 'Ultimate 300 IQ Grenade Prediction',
      streamer: 'Ninja Archives',
      platform: 'youtube',
      views: '620K',
      likes: '51K',
      duration: '0:15',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-with-a-controller-40432-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
      style: 'Kinetic zoom punches & highlight trackers'
    },
    {
      id: 'clip-4',
      title: 'Why Esports Pros Are Built Different',
      streamer: 'Lobby Cut',
      platform: 'youtube',
      views: '450K',
      likes: '38K',
      duration: '0:26',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-pc-interior-with-rgb-lights-40435-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80',
      style: 'Frame-by-frame subtitle accenting'
    },
    {
      id: 'clip-5',
      title: '1-HP Unbelievable Tournament Win',
      streamer: 'Valkyrae Fan Cut',
      platform: 'twitch',
      views: '320K',
      likes: '29K',
      duration: '0:20',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-keyboard-glow-close-up-in-the-dark-40427-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=600&q=80',
      style: 'Subtle retro camera scanlines & audio filters'
    },
    {
      id: 'clip-6',
      title: 'When Streamers Lose Their Minds Completely',
      streamer: 'Twitch Vault GG',
      platform: 'twitch',
      views: '290K',
      likes: '22K',
      duration: '0:14',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gamer-wearing-headphones-concentrating-on-game-41712-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      style: 'Sub-bass drop syncs & red alert glow'
    }
  ];

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const togglePlayClip = (clipId: string) => {
    if (playingClipId === clipId) {
      // Pause
      const video = videoRefs.current[clipId];
      if (video) {
        video.pause();
      }
      setPlayingClipId(null);
    } else {
      // Stop previously playing video if any
      if (playingClipId) {
        const prevVideo = videoRefs.current[playingClipId];
        if (prevVideo) {
          prevVideo.pause();
        }
      }
      // Play new video
      setPlayingClipId(clipId);
      const video = videoRefs.current[clipId];
      if (video) {
        video.play().catch(err => {
          console.warn("Autoplay block or playback interrupted: ", err);
        });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    // Apply mute to all videos
    for (const key in videoRefs.current) {
      const video = videoRefs.current[key];
      if (video) {
        video.muted = !isMuted;
      }
    }
  };

  // Sync mute state on video ref generation
  useEffect(() => {
    for (const key in videoRefs.current) {
      const video = videoRefs.current[key];
      if (video) {
        video.muted = isMuted;
      }
    }
  }, [isMuted, playingClipId]);

  const filteredClips = curatedClips.filter(c => {
    if (activeTab === 'all') return true;
    return c.platform === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] selection:bg-[#007AFF]/10">
      <div className="noise-overlay opacity-30" />
      
      {/* Refined Minimalist Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-12 justify-between bg-[#F2F2F7]/80 backdrop-blur-md border-b border-[#D1D1D6]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors cursor-pointer text-[#1C1C1E]"
            aria-label="Back to main page"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-px h-4 bg-[#D1D1D6]" />
          <span className="font-sans font-extrabold tracking-tight text-sm text-[#1C1C1E]">manoellediokno.com/clips</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Copied link to clipboard!');
            }}
            className="flex items-center gap-2 px-4 py-1.5 bg-white border border-[#D1D1D6] text-[#1C1C1E] rounded-full text-xs font-bold hover:bg-neutral-50 transition-all cursor-pointer"
          >
            <Share2 size={14} />
            Share Section
          </button>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-40 px-6 md:px-12 max-w-7xl mx-auto">
        {/* HERO SECTION: Design Philosophy & Main Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-center mb-24">
          {/* Left Column: Context Details */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white text-[#6D6D72] text-[10px] font-bold rounded-full border border-[#D1D1D6] uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-purple-600 font-bold tracking-widest uppercase block">
                  DIRECTORY INDEX // CLIPS
                </span>
                <h1 className="text-[#1C1C1E] text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.9] uppercase">
                  {project.title}
                </h1>
                <p className="text-lg text-[#3A3A3C] font-semibold leading-snug">
                  {project.subtitle}
                </p>
              </div>
              
              <div className="space-y-6 text-[#6D6D72] text-sm leading-relaxed max-w-xl">
                <p>{project.description}</p>
                <p>{project.bio}</p>
              </div>

              {/* Achievements Grid with strict 1px light borders and monospace overlays */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#D1D1D6]">
                {project.achievements.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[#D1D1D6] shadow-2xs">
                    <span className="font-sans font-extrabold text-2xl text-neutral-900 block tracking-tight">
                      {item.metric}
                    </span>
                    <span className="font-mono text-[9px] text-[#6D6D72] uppercase tracking-wider font-semibold block mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Terminal Frame showcasing Multi-Channel Stats */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full bg-white border border-[#D1D1D6] rounded-2ios overflow-hidden shadow-xl"
            >
              <div className="bg-neutral-100/40 border-b border-[#D1D1D6] px-4 py-3 flex justify-between items-center">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-[9px] text-[#6D6D72] uppercase tracking-widest font-bold">
                  MACHINERY.DOCK
                </span>
              </div>
              
              <div className="p-6 bg-white space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#AF52DE]/10 border border-[#AF52DE]/20 flex items-center justify-center text-[#AF52DE]">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-neutral-900 uppercase">Clipping Network Control</h3>
                    <p className="font-mono text-[10px] text-neutral-500">REAL-TIME REACH ESTIMATION</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-xs text-neutral-600 font-medium">Global Network Growth</span>
                    <span className="font-mono text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <TrendingUp size={12} />
                      +42.8% MoM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                    <span className="text-xs text-neutral-600 font-medium">Core Platform Nodes</span>
                    <span className="font-mono text-xs font-bold text-neutral-900">TikTok, YouTube, IG</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-neutral-600 font-medium">Daily Active Feeds</span>
                    <span className="font-mono text-xs font-bold text-[#AF52DE]">8 Synced Schedulers</span>
                  </div>
                </div>

                {/* Minimalist illustration representing stream metrics */}
                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Active Retention Pulse</span>
                    <span className="font-mono text-[9px] text-neutral-500 font-bold">WATCH TIME RATIO</span>
                  </div>
                  <div className="h-12 flex items-end gap-1.5 pt-2">
                    {[35, 60, 45, 80, 50, 95, 75, 40, 85, 100, 60, 80, 50, 90, 70].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h}%` }} 
                        className={`w-full rounded-t-sm transition-all duration-500 ${
                          i === 9 ? 'bg-[#AF52DE]' : 'bg-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 1: ACCOUNTS LISTING (Streamer accounts operated) */}
        <section className="mb-24 space-y-10">
          <div className="space-y-3 max-w-2xl text-left">
            <span className="font-mono text-[10px] text-[#AF52DE] font-bold tracking-[0.2em] uppercase block">
              NETWORK STRUCTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">
              ACCOUNTS OPERATED & ALIGNED
            </h2>
            <p className="text-[#6D6D72] text-sm md:text-base leading-relaxed">
              These are dedicated social clipping handles, archives, and fan hubs curated, styled, and updated regularly. Every account represents custom brand kits and automated social distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialAccounts.map((account, index) => (
              <motion.div
                key={account.handle}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2ios border border-[#D1D1D6] p-6 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={account.avatar} 
                      alt={account.handle} 
                      className="w-12 h-12 rounded-full object-cover border border-neutral-200" 
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-sans font-bold text-base text-neutral-900 group-hover:text-[#AF52DE] transition-colors">
                          {account.handle}
                        </h3>
                        <CheckCircle2 size={14} className="text-blue-500 fill-blue-500/10" />
                      </div>
                      <p className="text-xs text-neutral-500 font-mono tracking-tight">{account.platform}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-neutral-100 text-neutral-600 font-mono text-[9px] font-bold tracking-widest rounded uppercase">
                    {account.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-neutral-50 p-4 rounded-xl border border-neutral-100 mb-6">
                  <div>
                    <span className="font-mono text-[8px] text-neutral-400 font-extrabold uppercase block">Subscribers</span>
                    <span className="font-sans font-extrabold text-sm text-neutral-800">{account.followers}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-neutral-400 font-extrabold uppercase block">Monthly Views</span>
                    <span className="font-sans font-extrabold text-sm text-neutral-800">{account.views}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-neutral-400 font-extrabold uppercase block">Engagement</span>
                    <span className="font-sans font-extrabold text-sm text-neutral-800">{account.engagement}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <span className="text-xs font-mono text-neutral-500 font-semibold">{account.niche}</span>
                  <a 
                    href={account.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-bold text-[#AF52DE] flex items-center gap-1 hover:underline"
                  >
                    View Feed
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 2: STREAM CLIP SANDBOX GALLERY (Aspect Ratio 9:16) */}
        <section className="mb-24 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-left">
              <span className="font-mono text-[10px] text-[#AF52DE] font-bold tracking-[0.2em] uppercase block">
                PRODUCTION CATALOGUE
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1C1C1E] uppercase">
                CURATED STREAM CLIPS
              </h2>
              <p className="text-[#6D6D72] text-sm md:text-base leading-relaxed">
                Click any clip to play. Our vertical 9:16 layout structure is strictly maintained to maximize viewing potential and high-contrast typographic timing.
              </p>
            </div>

            {/* Platform filter tabs */}
            <div className="flex items-center bg-white border border-[#D1D1D6] p-1 rounded-full self-start shadow-2xs">
              {(['all', 'tiktok', 'youtube', 'twitch'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    // Pause active video if switching tabs
                    if (playingClipId) {
                      const video = videoRefs.current[playingClipId];
                      if (video) video.pause();
                      setPlayingClipId(null);
                    }
                    setActiveTab(tab);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Player Global Indicator Controls */}
          {playingClipId && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-900/10 border border-purple-200 rounded-xl p-4 flex items-center justify-between text-purple-950 font-sans text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#AF52DE] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#AF52DE]"></span>
                </span>
                <span>Playing Clip: <strong>{curatedClips.find(c => c.id === playingClipId)?.title}</strong></span>
              </div>
              <button 
                onClick={toggleMute}
                className="flex items-center gap-1.5 bg-white border border-purple-200 text-purple-900 px-3 py-1 rounded-full font-bold hover:bg-purple-50 transition-colors"
              >
                {isMuted ? (
                  <>
                    <VolumeX size={12} />
                    Unmute Sound
                  </>
                ) : (
                  <>
                    <Volume2 size={12} />
                    Muted
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* 9:16 Video Clips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredClips.map((clip, index) => {
              const isPlaying = playingClipId === clip.id;
              
              return (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-4"
                >
                  {/* Aspect Ratio 9:16 Container */}
                  <div 
                    onClick={() => togglePlayClip(clip.id)}
                    className="relative aspect-[9/16] rounded-2ios overflow-hidden border border-[#D1D1D6] bg-black shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.01] hover:border-neutral-400 group cursor-pointer"
                  >
                    {/* Cover image (shows when video is not playing) */}
                    <AnimatePresence initial={false}>
                      {!isPlaying && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 z-10"
                        >
                          <img 
                            src={clip.thumbnail} 
                            alt={clip.title} 
                            className="w-full h-full object-cover opacity-80" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actual HTML5 Video Tag with loop & controls hidden */}
                    <video
                      ref={el => { videoRefs.current[clip.id] = el; }}
                      src={clip.videoUrl}
                      loop
                      playsInline
                      muted={isMuted}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        isPlaying ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                      }`}
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-4 left-4 z-20 flex gap-1.5 items-center">
                      <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white font-mono text-[8px] font-extrabold tracking-wider rounded-full uppercase border border-white/10">
                        {clip.platform}
                      </span>
                      <span className="px-2.5 py-1 bg-purple-600 text-white font-mono text-[8px] font-extrabold tracking-wider rounded-full uppercase border border-purple-500/20">
                        {clip.duration}
                      </span>
                    </div>

                    {/* Play/Pause Large Center Overlay Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className={`w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-all duration-500 ${
                        isPlaying ? 'scale-75 opacity-0' : 'scale-100 opacity-100 group-hover:bg-white/25 group-hover:scale-105'
                      }`}>
                        {isPlaying ? <Pause size={24} className="fill-white" /> : <Play size={24} className="fill-white ml-1" />}
                      </div>
                    </div>

                    {/* Bottom Metadata Panel inside the Clip */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                      <p className="font-mono text-[8px] text-[#AF52DE] font-bold uppercase tracking-widest mb-1">
                        {clip.streamer}
                      </p>
                      <h3 className="font-sans font-extrabold text-sm text-white tracking-tight leading-snug line-clamp-2">
                        {clip.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-white/10 text-white/75 font-mono text-[9px]">
                        <span className="flex items-center gap-1">
                          <Eye size={10} />
                          {clip.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={10} className="fill-white/10" />
                          {clip.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Under Card Label/Style Specification */}
                  <div className="flex items-start justify-between px-1">
                    <div>
                      <p className="text-[10px] font-extrabold tracking-widest text-[#1C1C1E] uppercase">STYLE SPEC</p>
                      <p className="text-[11px] font-mono text-[#6D6D72] mt-0.5">{clip.style}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Minimal Bottom Statement / Navigate back */}
        <div className="mt-32 pb-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-8 py-4 rounded-full border border-[#D1D1D6] bg-white hover:bg-neutral-50 text-[#1C1C1E] text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Continue Exploring
            <ArrowLeft size={16} className="rotate-180" />
          </motion.button>
        </div>
        
        {/* Prevent floating action dock coverage */}
        <div className="h-24 sm:h-32" />
      </main>

      {/* Action Dock (Fixed at bottom center) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-2xl border border-[#D1D1D6] rounded-full shadow-2xl scale-100 hover:scale-[1.03] transition-all duration-500 w-max max-w-[95vw]">
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-850 transition-all shadow-lg whitespace-nowrap cursor-pointer uppercase font-sans tracking-wide"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com?subject=I am interested in Streamer Clips services'}
        >
          Request Clip Strategy
        </button>
        
        <button 
          className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full border border-[#D1D1D6] text-[#1C1C1E] transition-all cursor-pointer"
          title="Send an Email"
          onClick={() => window.location.href = 'mailto:manoelle.diokno00@gmail.com'}
        >
          <Mail size={18} />
        </button>

        <div className="w-px h-6 bg-[#D1D1D6] mx-1" />

        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs transition-colors cursor-pointer ${
            isLiked ? "bg-red-50 text-red-500 border border-red-100 shadow-sm" : "bg-transparent text-[#6D6D72] hover:bg-[#F2F2F7]"
          }`}
        >
          <Heart 
            size={18} 
            fill={isLiked ? "currentColor" : "none"} 
            className={`transition-transform ${isLiked ? "scale-110" : ""}`} 
          />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}
