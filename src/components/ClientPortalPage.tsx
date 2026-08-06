import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import BrochureViewer from './projects/antpet/BrochureViewer';
import page1 from './projects/antpet/ant_site_page-0001.jpg';
import page2 from './projects/antpet/ant_site_page-0002.jpg';
import page3 from './projects/antpet/ant_site_page-0003.jpg';
import page4 from './projects/antpet/ant_site_page-0004.jpg';
import page5 from './projects/antpet/ant_site_page-0005.jpg';
import page6 from './projects/antpet/ant_site_page-0006.jpg';
import page7 from './projects/antpet/ant_site_page-0007.jpg';
import page8 from './projects/antpet/ant_site_page-0008.jpg';
import page9 from './projects/antpet/ant_site_page-0009.jpg';
import page10 from './projects/antpet/ant_site_page-0010.jpg';
import page11 from './projects/antpet/ant_site_page-0011.jpg';

const antPages = [
  page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11
];
import { 
  Lock, 
  Unlock, 
  ArrowLeft, 
  Check, 
  Plus, 
  Minus, 
  MapPin, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  Key, 
  Phone, 
  Calendar, 
  Users, 
  Heart, 
  Eye, 
  CheckCircle,
  ShoppingBag,
  Compass,
  CheckCircle2,
  LockKeyhole,
  Upload,
  Globe,
  FileCheck,
  FolderOpen,
  ExternalLink,
  Copy,
  ShieldAlert
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  codename: string;
  passwordKey: string; // The lookup key (lowercased)
  description: string;
  color: string;
  accentColor: string;
}

const clientDirectory: Client[] = [
  {
    id: 'antpet-client',
    name: 'Ant Pet Clinic',
    codename: 'Ant Pet Clinic',
    passwordKey: 'antpet',
    description: 'Pristine 3D fold-out bifold and trifold printed brochure configurations, brand guidelines PDF, and file directory resources.',
    color: '#0A0A0A',
    accentColor: '#FF9F0A'
  },
  {
    id: 'whitestone-client',
    name: 'Whitestone Animal Clinic',
    codename: 'Whitestone Animal Clinic',
    passwordKey: 'whitestonecl',
    description: 'Official Google Drive folder directories, brand assets, pitches, drafts, and typography resources.',
    color: '#0B2545',
    accentColor: '#134074'
  }
];

interface DriveFolderItem {
  id: string;
  name: string;
  url: string;
}

const clientDriveDirectories: Record<string, { clientName: string; folders: DriveFolderItem[] }> = {
  'antpet-client': {
    clientName: 'Ant Pet Clinic',
    folders: [
      {
        id: 'ant-logo',
        name: 'Logo',
        url: 'https://drive.google.com/drive/folders/10EJPAiTi1j74uQ39ZXhheX0VaRdKcuwj?usp=drive_link'
      },
      {
        id: 'ant-pitch',
        name: 'Pitch',
        url: 'https://drive.google.com/drive/folders/1EAQcW33PBjTj_Wv2632pSs-YjUVnA3Pr?usp=drive_link'
      },
      {
        id: 'ant-drafts',
        name: 'Drafts',
        url: 'https://drive.google.com/drive/folders/1Ri1Jj07anecFQ7Jua4iUcKarvwqGIGxG?usp=drive_link'
      },
      {
        id: 'ant-font',
        name: 'Font',
        url: 'https://drive.google.com/drive/folders/1Lt6DdjLlI5GZvdVJh2eHHMHXeToi8Ft-?usp=drive_link'
      }
    ]
  },
  'whitestone-client': {
    clientName: 'Whitestone Animal Clinic',
    folders: [
      {
        id: 'ws-logos',
        name: 'Logos',
        url: 'https://drive.google.com/drive/folders/1rqiegXzfiX9Vhtqd67vZuoJiZaBihKj1?usp=drive_link'
      },
      {
        id: 'ws-fonts',
        name: 'Fonts',
        url: 'https://drive.google.com/drive/folders/1pVveUNzoRuqzBpzmfl5UglzF1UHepv41?usp=drive_link'
      },
      {
        id: 'ws-billboard',
        name: 'Billboard',
        url: 'https://drive.google.com/drive/folders/1wh7mKorIllST49Y2MLiTx1cL1Vz_xZeh?usp=drive_link'
      },
      {
        id: 'ws-standee',
        name: 'Standee',
        url: 'https://drive.google.com/drive/folders/1FMikeZpkGL0wA6MdVVYosVhIVjDmziGJ?usp=drive_link'
      },
      {
        id: 'ws-vaccine-card',
        name: 'Vaccine Card',
        url: 'https://drive.google.com/drive/folders/1T_Ss5BIxQq4sI7Hw2QF8Pn5-b1j7S57D?usp=drive_link'
      }
    ]
  }
};

interface ClientBranding {
  logoSymbol: string;
  logoDescription: string;
  philosophy: string;
  colors: { name: string; hex: string; role: string }[];
  typography: { role: string; family: string; usage: string }[];
}

interface ClientSocialPost {
  id: string;
  title: string;
  date: string;
  views: string;
  likes: number;
  caption: string;
  accentBg: string;
}

interface ClientDeliverables {
  branding: ClientBranding;
  social: ClientSocialPost[];
}

const clientDeliverablesData: Record<string, ClientDeliverables> = {
  'antpet-client': {
    branding: {
      logoSymbol: "🐜",
      logoDescription: "A minimalist, structural ant insect geometry that represents microscopic, absolute alignment and zero-border design language.",
      philosophy: "Perfect structural discipline. Zero border-radius, pure black backdrops, high-contrast crisp text layers, and premium 3D real-time paper folding simulations.",
      colors: [
        { name: 'Pure Onyx', hex: '#000000', role: 'Durable background canvas surface' },
        { name: 'Bleached White', hex: '#FAF9F6', role: 'Editorial display headings and high-contrast labels' },
        { name: 'Ant Orange', hex: '#FF9F0A', role: 'Active alignment indicators and physical interactive seam dots' }
      ],
      typography: [
        { role: 'Display Headings', family: 'Playfair Display / Instrument Serif (Georgia)', usage: 'Classic typographic print editorial layouts' },
        { role: 'Body & Monospace', family: 'Geist / JetBrains Mono (Technical)', usage: 'Precision coordinates, label tags, and drag hints' }
      ]
    },
    social: [
      {
        id: 'ant-1',
        title: "ANTPET Fold-Out 3D Architecture Systems",
        date: "Today • 15.1k reach",
        views: "18.5k",
        likes: 3120,
        caption: "A new paradigm in print mockups. 🛠️ Symmetrical bifold and trifold folding mathematics simulated directly on a zero-border dark mode digital grid. Touch or drag to unfold physical paper hinges. #3DInteractive #PrintDesign #ArtDirection #TactileSystems",
        accentBg: "from-amber-950 to-neutral-900"
      }
    ]
  }
};

interface ClientPortalProps {
  onBackToPortfolio?: () => void;
}

export default function ClientPortalPage({ onBackToPortfolio }: ClientPortalProps) {
  const [password, setPassword] = useState('');
  const [unlockedClient, setUnlockedClient] = useState<Client | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [isSuccessfullyUnlocking, setIsSuccessfullyUnlocking] = useState(false);
  const [activeTab, setActiveTab] = useState<'file-directory' | 'logo' | 'social' | 'website'>('file-directory');
  
  // Track likes interactively for high-fidelity feel
  const [interactiveLikes, setInteractiveLikes] = useState<Record<string, number>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleLikeToggle = (postId: string, initialLikes: number) => {
    const wasLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !wasLiked }));
    setInteractiveLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] ?? initialLikes) + (wasLiked ? -1 : 1)
    }));
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = password.trim().replace(/'/g, '');
    const lowerInput = cleanInput.toLowerCase();
    
    const matched = clientDirectory.find(
      (c) => c.passwordKey.toLowerCase() === lowerInput || 
             c.codename.toLowerCase() === lowerInput || 
             c.id === lowerInput ||
             c.name.toLowerCase() === lowerInput
    );

    if (matched) {
      setErrorMsg('');
      setIsSuccessfullyUnlocking(true);
      setTimeout(() => {
        setUnlockedClient(matched);
        setIsSuccessfullyUnlocking(false);
        setPassword('');
        setActiveTab(matched.id === 'antpet-client' ? 'logo' : 'file-directory');
      }, 700);
    } else {
      setErrorMsg('Invalid client passkey code. Please try another code.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLockSession = () => {
    setUnlockedClient(null);
    setPassword('');
  };

  const currentDeliverables = unlockedClient ? clientDeliverablesData[unlockedClient.id] : null;

  return (
    <section id="client-portal" className={`bg-[#E5E5EA] relative z-20 px-4 md:px-8 border-t border-neutral-300 transition-all duration-300 flex items-center justify-center ${unlockedClient ? 'py-10 min-h-[850px]' : 'py-20 min-h-[720px]'}`}>
      <div className="max-w-7xl mx-auto w-full">
        
        {/* CONDITIONAL HEADER: Shrinks dramatically when client enters password */}
        {!unlockedClient ? (
          <div className="text-center mb-10 transition-all duration-300">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight mb-3 font-sans">
              Client Portal Viewer
            </h2>
            <p className="text-sm text-neutral-500 font-medium max-w-xl mx-auto">
              Clients access staging drafts of active web and branding deliverables using secure client codes. Type high-fidelity design keys to unlock viewports.
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 pb-2 border-b border-neutral-350 gap-2 transition-all duration-300">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500">
                Secure Client Portal
              </p>
              <h2 className="text-base sm:text-lg font-bold text-neutral-800 font-sans">
                Active Deliverables Draft: <span className="text-neutral-900 font-black">{unlockedClient.name}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-neutral-200/80 px-2.5 py-1 rounded-md border border-neutral-300">
                CLIENT ACCESS ENABLED
              </span>
            </div>
          </div>
        )}

        {!unlockedClient ? (
          /* PASSWORD GATEWAY LOCK SCREEN */
          <div className={`max-w-md mx-auto bg-white rounded-3xl border border-neutral-250 shadow-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${shake ? 'animate-shake' : ''}`}>
            {/* Ambient secure locks styling */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-900" />
            <div className="flex flex-col items-center text-center mt-4 mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${isSuccessfullyUnlocking ? 'bg-green-100 text-green-600 scale-110' : 'bg-neutral-100 text-neutral-800'}`}>
                {isSuccessfullyUnlocking ? (
                  <Unlock className="w-8 h-8" />
                ) : (
                  <Lock className="w-8 h-8" />
                )}
              </div>
              <h3 className="text-xl font-black text-neutral-900">Protected Client Space</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs font-medium">
                Enter your project passkey code provided by Manoelle Diokno to view current design deliverables or milestones.
              </p>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 px-1 font-sans">
                  Staging Code Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passkey"
                    className="block w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder-neutral-450 focus:bg-white focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900 outline-none transition-all font-semibold font-sans"
                    autoFocus
                    required
                  />
                </div>
                {errorMsg && (
                  <div className="flex items-center gap-1.5 text-red-600 text-[10.5px] font-bold mt-2 px-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center select-none"
              >
                {isSuccessfullyUnlocking ? (
                  <span className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Access Granted...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    <LockKeyhole className="w-4 h-4" />
                    <span>Verify Passkey & View Site</span>
                  </span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* LARGE/EXPANDED WORKSPACE VIEWPORT STAGING SIMULATOR */
          <div className="bg-white rounded-[24px] shadow-2xl overflow-hidden border border-neutral-300/80 flex flex-col h-[780px] sm:h-[840px] transition-all duration-300">
            {/* Simulation Header Bar */}
            <div className="h-16 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 bg-neutral-900 text-white justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLockSession}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-white transition-all cursor-pointer shadow-sm border border-white/5"
                  title="Lock workspace and back to credential screen"
                >
                  <Lock className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Lock Vault</span>
                </button>
              </div>

              {/* URL Address Status bar indicators */}
              <div className="flex-1 flex items-center gap-2 max-w-xl mx-auto bg-white/10 rounded-full px-4 py-1.5 border border-white/15 text-xs text-neutral-300 justify-center select-none font-medium font-mono truncate">
                <Unlock className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                <span className="text-green-400 font-bold uppercase text-[9px] tracking-wider bg-green-500/10 px-1.5 py-0.5 rounded-md flex-shrink-0">SECURE DRAFT</span>
                <span className="truncate">secured access</span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 py-1 px-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Active Draft</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Deliverables Navigation Sidebar on the Left (Desktop only) */}
              <aside className="hidden md:flex w-56 sm:w-64 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 flex-col overflow-y-auto">
                <div className="px-4 py-4 bg-neutral-100/60 border-b border-neutral-200">
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Project Deliverables</span>
                  <h3 className="text-xs font-black text-neutral-800 truncate leading-tight mt-0.5">
                    {unlockedClient.id === 'antpet-client' ? 'Ant Pet Clinic' : unlockedClient.name}
                  </h3>
                </div>
                
                {/* Active Tabs Controls */}
                <div className="flex-1 py-3 space-y-1.5 px-3">
                  {unlockedClient.id === 'antpet-client' ? (
                    <>
                      <button
                        onClick={() => setActiveTab('logo')}
                        className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                          activeTab === 'logo' 
                            ? 'bg-neutral-900 text-white shadow-md font-bold' 
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-xs'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-black ${activeTab === 'logo' ? 'bg-white/15' : 'bg-neutral-100'}`}>
                          📄
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">Branding PDF</p>
                          <p className="text-[9px] font-semibold text-neutral-450">Official Guidelines</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('website')}
                        className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                          activeTab === 'website' 
                            ? 'bg-neutral-900 text-white shadow-md font-bold' 
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-xs'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-black ${activeTab === 'website' ? 'bg-white/15' : 'bg-neutral-100'}`}>
                          📐
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">Flyer Mockup</p>
                          <p className="text-[9px] font-semibold text-neutral-450">Tactile Fold Geometry</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('file-directory')}
                        className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                          activeTab === 'file-directory' 
                            ? 'bg-neutral-900 text-white shadow-md font-bold' 
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-xs'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-black ${activeTab === 'file-directory' ? 'bg-white/15' : 'bg-neutral-100'}`}>
                          📁
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">File Directory</p>
                          <p className="text-[9px] font-semibold text-neutral-450">Google Drive Folders</p>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setActiveTab('file-directory')}
                        className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                          activeTab === 'file-directory' 
                            ? 'bg-neutral-900 text-white shadow-md font-bold' 
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-xs'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-black ${activeTab === 'file-directory' ? 'bg-white/15' : 'bg-neutral-100'}`}>
                          📁
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">File Directory</p>
                          <p className="text-[9px] font-semibold text-neutral-450">Google Drive Folders</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('website')}
                        className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                          activeTab === 'website' 
                            ? 'bg-neutral-900 text-white shadow-md font-bold' 
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-xs'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-black ${activeTab === 'website' ? 'bg-white/15' : 'bg-neutral-100'}`}>
                          💻
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold leading-tight truncate">Website Version 2 Update</p>
                          <span className={`text-[8.5px] font-black uppercase tracking-wider inline-block mt-0.5 px-1.5 py-0.2 rounded border ${
                            activeTab === 'website' 
                              ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' 
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            (PENDING)
                          </span>
                        </div>
                      </button>
                    </>
                  )}
                </div>

                {/* Info block */}
                <div className="p-4 border-t border-neutral-200 bg-neutral-100/30 text-[10px] text-neutral-500 leading-relaxed font-semibold">
                  <div className="flex items-center gap-1.5 mb-1 text-neutral-800 font-bold uppercase tracking-wider text-[8.5px]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Deliverable Feed</span>
                  </div>
                  Review your branding variables, test grids, and operational layout elements. Close vault to return to keys.
                </div>
              </aside>

              {/* Dynamic Interactive Render Frame Container based on activeTab */}
              <div className="flex-1 bg-neutral-100 overflow-y-auto flex flex-col relative select-none">
                
                {/* Mobile Tab Swapper (Horizontal bar visible only on small screens) */}
                <div className="md:hidden flex border-b border-neutral-200 bg-neutral-50 p-2.5 gap-2 shrink-0 overflow-x-auto scrollbar-none">
                  {unlockedClient.id === 'antpet-client' ? (
                    <>
                      <button
                        onClick={() => setActiveTab('logo')}
                        className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold border whitespace-nowrap ${
                          activeTab === 'logo'
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 shadow-3xs'
                        }`}
                      >
                        <span>📄</span>
                        <span>Branding PDF</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('website')}
                        className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold border whitespace-nowrap ${
                          activeTab === 'website'
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 shadow-3xs'
                        }`}
                      >
                        <span>📐</span>
                        <span>Flyer Mockup</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('file-directory')}
                        className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold border whitespace-nowrap ${
                          activeTab === 'file-directory'
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 shadow-3xs'
                        }`}
                      >
                        <span>📁</span>
                        <span>File Directory</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setActiveTab('file-directory')}
                        className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold border whitespace-nowrap ${
                          activeTab === 'file-directory'
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 shadow-3xs'
                        }`}
                      >
                        <span>📁</span>
                        <span>File Directory</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('website')}
                        className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold border whitespace-nowrap ${
                          activeTab === 'website'
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 shadow-3xs'
                        }`}
                      >
                        <span>💻</span>
                        <span>Website V2</span>
                        <span className="text-[8px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-1 py-0.2 rounded uppercase">(PENDING)</span>
                      </button>
                    </>
                  )}
                </div>
                
                {/* 0. FILE DIRECTORY TAB */}
                {activeTab === 'file-directory' && (
                  <FileDirectoryView clientId={unlockedClient.id} />
                )}
                
                {/* 1. LOGO & BRANDING TAB */}
                {activeTab === 'logo' && currentDeliverables && (
                  <div className="p-6 space-y-6 max-w-4xl mx-auto w-full">
                    {unlockedClient.id === 'antpet-client' ? (
                      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
                        {antPages.map((page, index) => (
                          <div key={index} className="w-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
                            <img 
                              src={page} 
                              alt={`Brand Guidelines Page ${index + 1}`} 
                              className="w-full h-auto object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {/* Brand Banner */}
                        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neutral-50 to-neutral-200 rounded-bl-full pointer-events-none" />
                          
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-3xl shadow-md border border-neutral-800">
                              {currentDeliverables.branding.logoSymbol}
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 block w-max">Active Corporate Mark</span>
                              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1 leading-tight">{unlockedClient.name}</h3>
                              <p className="text-xs text-neutral-500 mt-0.5">Primary brandmark, conceptual logic, and typography specifications.</p>
                            </div>
                          </div>
                        </div>

                        {/* Logo Spec Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Left: Concept Info */}
                          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 space-y-4">
                            <div>
                              <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Logo Emblem Concept</span>
                              <p className="text-sm font-semibold text-neutral-800 mt-1 leading-relaxed">
                                {currentDeliverables.branding.logoDescription}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-neutral-100">
                              <span className="text-[9px] font-bold text-neutral-455 uppercase tracking-widest block">Identity Philosophy</span>
                              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed font-medium">
                                {currentDeliverables.branding.philosophy}
                              </p>
                            </div>
                          </div>

                          {/* Right: Typography pairing */}
                          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5">
                            <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block mb-3">Typography Pairing Suite</span>
                            <div className="space-y-4">
                              {currentDeliverables.branding.typography.map((t, idx) => (
                                <div key={idx} className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-xl space-y-1">
                                  <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400">
                                    <span className="uppercase tracking-wider">{t.role}</span>
                                    <span className="font-mono text-[9px] bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-600">{t.family}</span>
                                  </div>
                                  <p className="text-xs font-bold text-neutral-800">{t.usage}</p>
                                  <div className="pt-1.5">
                                    <span className="text-xl font-black text-neutral-900 block tracking-tight">ABCDEFGHIJKLMnopqrstuvwxyz</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Colors Palette Specification */}
                        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Brand Color Palette</span>
                              <p className="text-xs text-neutral-500 font-semibold">Standard color variables loaded inside design files.</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {currentDeliverables.branding.colors.map((color, idx) => (
                              <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between">
                                <div className="h-20 w-full relative transition-all" style={{ backgroundColor: color.hex }}>
                                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-[9px] font-mono font-bold text-neutral-800 shadow-3xs uppercase">
                                    {color.hex}
                                  </div>
                                </div>
                                <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                                  <div>
                                    <h4 className="text-xs font-extrabold text-neutral-900">{color.name}</h4>
                                    <p className="text-[10px] text-neutral-500 leading-snug mt-0.5">{color.role}</p>
                                  </div>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(color.hex)}
                                    className="w-full text-center mt-3 py-1 bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-950 font-bold border border-neutral-200 rounded-lg text-[9px] tracking-wider uppercase transition-colors"
                                  >
                                    Copy HEX Code
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* 2. SOCIAL MEDIA CREATION TAB */}
                {activeTab === 'social' && currentDeliverables && (
                  <div className="p-6 space-y-6 max-w-4xl mx-auto w-full">
                    
                    {/* Channel Stats header bar */}
                    <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 text-white font-black text-center flex items-center justify-center text-lg shadow-sm border border-neutral-250">
                          {unlockedClient.codename.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-black text-neutral-900">{unlockedClient.codename.toLowerCase().replace(/ /g, '')}</h3>
                            <span className="inline-block w-3.5 h-3.5 bg-blue-500 rounded-full text-[8.5px] text-white font-black text-center line-height-3">✓</span>
                          </div>
                          <p className="text-[10px] text-neutral-400 font-bold block">Digital Presence Board • Verified Creator</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="text-center bg-neutral-50 border border-neutral-150 px-3 py-1.5 rounded-lg">
                          <span className="block text-xs font-extrabold text-neutral-900">2 Active Drafts</span>
                          <span className="text-[8px] text-neutral-450 uppercase font-black">Reels Staged</span>
                        </div>
                        <div className="text-center bg-neutral-50 border border-neutral-150 px-3 py-1.5 rounded-lg">
                          <span className="block text-xs font-extrabold text-neutral-900">14.2k</span>
                          <span className="text-[8px] text-neutral-450 uppercase font-black">Estimated Reach</span>
                        </div>
                      </div>
                    </div>

                    {/* Staged Reels/Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentDeliverables.social.map((post) => {
                        const currentLikes = interactiveLikes[post.id] ?? post.likes;
                        const isLiked = likedPosts[post.id] ?? false;

                        return (
                          <div key={post.id} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-md flex flex-col justify-between">
                            {/* Graphic Mock Block representing visual asset */}
                            <div className={`h-64 bg-gradient-to-tr ${post.accentBg} text-white p-6 flex flex-col justify-between relative`}>
                              <div className="flex justify-between items-start">
                                <span className="bg-black/25 backdrop-blur-sm rounded-full text-[8.5px] font-black uppercase text-white/90 px-2 py-0.5 tracking-wider">
                                  STAGING PREVIEW
                                </span>
                                <span className="text-[9px] font-bold text-white/70 font-mono">
                                  {post.date}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[20px] filter drop-shadow">🌟</span>
                                <h4 className="text-lg sm:text-xl font-black leading-tight tracking-tight text-white filter drop-shadow">
                                  {post.title}
                                </h4>
                                <div className="h-0.5 w-12 bg-white/40 mt-2" />
                              </div>

                              <div className="flex justify-between items-center text-[10px] font-mono text-white/80">
                                <span>Reach Index • Staged</span>
                                <span>{post.views} Views</span>
                              </div>
                            </div>

                            {/* Social Meta description bar */}
                            <div className="p-4 space-y-3">
                              {/* Interactive Like action triggers */}
                              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                                <button
                                  onClick={() => handleLikeToggle(post.id, post.likes)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold cursor-pointer transition-all ${isLiked ? 'bg-red-50 text-red-650' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'}`}
                                >
                                  <span className="text-sm">{isLiked ? '❤️' : '🤍'}</span>
                                  <span>{currentLikes.toLocaleString()} Likes</span>
                                </button>

                                <span className="text-[10px] text-neutral-400 font-bold">Instantly editable in source code</span>
                              </div>

                              {/* Caption text */}
                              <div>
                                <span className="text-[8.5px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Staged Social Copy</span>
                                <p className="text-xs text-neutral-700 leading-relaxed font-semibold font-sans">
                                  {post.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}

                {/* 3. INTERACTIVE WEBSITE TAB (loads corresponding client Sandbox & Uploader) */}
                {activeTab === 'website' && (
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {unlockedClient.id === 'antpet-client' ? (
                      <div className="flex-1 bg-white flex flex-col h-full overflow-y-auto">
                        <BrochureViewer />
                      </div>
                    ) : unlockedClient.id === 'whitestone-client' ? (
                      <div className="p-8 max-w-2xl mx-auto w-full my-auto text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 mx-auto flex items-center justify-center text-3xl shadow-sm">
                          💻
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full inline-block mb-2">
                            STATUS: PENDING
                          </span>
                          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Website Version 2 Update</h3>
                          <p className="text-xs text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed font-medium">
                            The Version 2 website update for Whitestone Animal Clinic is currently in progress and pending review. Access all active Drive assets under the File Directory tab.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <InteractiveWebSandbox unlockedClient={unlockedClient} />
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Global back link styling */}
        <div className="mt-8 flex items-center justify-between text-neutral-400 text-xs font-semibold">
          {onBackToPortfolio && (
            <button
              onClick={onBackToPortfolio}
              className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Master Portfolio</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-widest text-neutral-400 bg-neutral-200 px-3 py-1 rounded-full border border-neutral-300">
            <span>Secure TLS 1.3 Certified Session</span>
          </div>
        </div>
      </div>

      {/* Shake keyframes embedded style */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
}











/* ==========================================
   SANDBOX LIVE WEBSITE ZIP PREVIEWER UTILITY
   ========================================== */

interface InteractiveWebSandboxProps {
  unlockedClient: Client;
}

function InteractiveWebSandbox({ unlockedClient }: InteractiveWebSandboxProps) {
  const [tab, setTab] = useState<'builtin' | 'local' | 'zip'>('builtin');
  const [zipError, setZipError] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [uploadedIframeDoc, setUploadedIframeDoc] = useState<string>('');
  const [zipFileName, setZipFileName] = useState<string>('');
  const [unzippedFilesCount, setUnzippedFilesCount] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.zip')) {
      setZipError('Please select a valid .zip archive file.');
      return;
    }

    setZipError('');
    setZipFileName(file.name);
    setIsExtracting(true);
    setUploadedIframeDoc('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          throw new Error('Failed to read zip array buffer.');
        }

        const zip = await JSZip.loadAsync(arrayBuffer);
        const assetsMap: Record<string, string> = {};
        let indexFileEntry: JSZip.JSZipObject | null = null;
        const promises: Promise<void>[] = [];
        let fileCount = 0;

        zip.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir) {
            fileCount++;
            const mimeType = getMimeTypeFromPath(relativePath);
            const promise = zipEntry.async('blob').then((blob) => {
              const blobWithMime = new Blob([blob], { type: mimeType });
              const blobUrl = URL.createObjectURL(blobWithMime);
              assetsMap[relativePath] = blobUrl;
              assetsMap[relativePath.toLowerCase()] = blobUrl;
              
              // Map some common prefix matches
              if (relativePath.startsWith('./')) {
                assetsMap[relativePath.substring(2)] = blobUrl;
                assetsMap[relativePath.substring(2).toLowerCase()] = blobUrl;
              }

              if (relativePath.toLowerCase().endsWith('index.html') || relativePath.toLowerCase() === 'index.html') {
                indexFileEntry = zipEntry;
              }
            });
            promises.push(promise);
          }
        });

        await Promise.all(promises);
        setUnzippedFilesCount(fileCount);

        let targetHtmlEntry = indexFileEntry;
        if (!targetHtmlEntry) {
          // Fallback to any html file in root or folders
          const htmlKeys = Object.keys(assetsMap).filter(k => k.endsWith('.html'));
          if (htmlKeys.length > 0) {
            // Find root html file or just use the first html key matching
            const firstHtml = htmlKeys[0];
            const matchingEntry = zip.file(firstHtml);
            if (matchingEntry) {
              targetHtmlEntry = matchingEntry;
            }
          }
        }

        if (!targetHtmlEntry) {
          throw new Error('Could not find an index.html or any HTML landing file inside the unzipped archive structure.');
        }

        const rawHtmlText = await targetHtmlEntry.async('text');
        const resolvedDoc = resolveHtmlAssetsWithBlobs(rawHtmlText, assetsMap);
        setUploadedIframeDoc(resolvedDoc);
      } catch (err: any) {
        setZipError(err.message || 'Error parsing the compressed portfolio zip file.');
      } finally {
        setIsExtracting(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const getMimeTypeFromPath = (path: string): string => {
    const ext = path.toLowerCase().split('.').pop();
    switch (ext) {
      case 'html': return 'text/html';
      case 'css': return 'text/css';
      case 'js': return 'application/javascript';
      case 'json': return 'application/json';
      case 'png': return 'image/png';
      case 'jpg':
      case 'jpeg': return 'image/jpeg';
      case 'gif': return 'image/gif';
      case 'svg': return 'image/svg+xml';
      default: return 'application/octet-stream';
    }
  };

  const resolveHtmlAssetsWithBlobs = (htmlText: string, assetsMap: Record<string, string>): string => {
    let doc = htmlText;
    
    // Sort keys by length descending to prevent shorter prefix matches from replacing longer asset filenames
    const sortedFilenames = Object.keys(assetsMap).sort((a, b) => b.length - a.length);

    sortedFilenames.forEach((filename) => {
      const blobUrl = assetsMap[filename];
      const escapedName = filename.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      
      // Match structures like src="image.png" or href="./styles.css"
      const regex = new RegExp(`(src|href|url)\\s*=\\s*["'](\\.\\/)?` + escapedName + `["']`, 'gi');
      doc = doc.replace(regex, `$1="${blobUrl}"`);
    });

    return doc;
  };

  const getBrandFolderId = (): string => {
    return unlockedClient.id.replace('-client', '');
  };

  return (
    <div className="flex-1 flex flex-col bg-stone-900 border-l border-neutral-800 text-neutral-100 min-h-0 font-sans">
      
      {/* Sandbox Sub Tab Nav Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-neutral-950 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#007AFF]" />
          <span className="text-xs font-extrabold uppercase tracking-wide">Frame Target Source</span>
        </div>

        <div className="flex bg-white/5 border border-white/10 rounded-full p-0.5 text-[10px] font-bold">
          <button
            onClick={() => setTab('builtin')}
            className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
              tab === 'builtin' ? 'bg-[#007AFF] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Built-in Dev Mock
          </button>
          
          <button
            onClick={() => setTab('local')}
            className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
              tab === 'local' ? 'bg-[#007AFF] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Local Server (/public)
          </button>

          <button
            onClick={() => setTab('zip')}
            className={`px-3 py-1 rounded-full cursor-pointer transition-all ${
              tab === 'zip' ? 'bg-[#007AFF] text-white' : 'text-shadow bg-lime-500/10 text-lime-400'
            }`}
          >
            ZIP Live Sandbox
          </button>
        </div>
      </div>

      {/* Main Renderer Segment */}
      <div className="flex-1 flex flex-col bg-neutral-900/50 min-h-0 p-4">
        {tab === 'builtin' && (
          <div className="flex-grow flex flex-col min-h-0 overflow-y-auto">
            {unlockedClient.id === 'antpet-client' && <BrochureViewer />}
          </div>
        )}

        {tab === 'local' && (
          <div className="flex-grow flex flex-col min-h-0">
            {/* Guide header */}
            <div className="p-4 bg-neutral-950/40 rounded-xl border border-white/5 mb-4 text-xs space-y-2 leading-relaxed">
              <div className="flex items-center gap-1 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Local Serving Coordinates</span>
              </div>
              <p>
                To preview your standalone HTML design here, place your unzipped folder containing <code className="bg-white/10 px-1 py-0.5 rounded font-mono text-[10px] text-lime-400">index.html</code> inside your local directory at:
              </p>
              <div className="font-mono text-[11px] bg-black/60 p-2.5 rounded border border-white/10 text-lime-400 select-all font-bold">
                /public/projects/{getBrandFolderId()}/
              </div>
              <p className="text-[#6D6D72] text-[11px] font-medium">
                Vite automatically serves assets placed inside public directories matching this route. Once files are written in this path, they will instantly display in the sandbox below.
              </p>
            </div>

            {/* Embedded Live Iframe */}
            <div className="flex-1 border border-white/15 rounded-xl overflow-hidden bg-white shadow-2xl relative min-h-[350px]">
              <iframe
                src={`/projects/${getBrandFolderId()}/index.html`}
                className="w-full h-full border-0"
                title={`${unlockedClient.codename} Local Preview Webpage`}
                sandbox="allow-scripts allow-same-origin"
                onError={() => console.log('Iframe failed to find local directory index.')}
              />
              
              {/* Overlay note on bottom */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded text-[10px] font-medium text-neutral-300 pointer-events-none flex items-center justify-between">
                <span>🌐 Target URI: localhost:3000/projects/{getBrandFolderId()}/index.html</span>
                <span className="text-lime-400 text-[9px] uppercase tracking-wider font-bold">Monitoring live directories</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'zip' && (
          <div className="flex-grow flex flex-col min-h-0">
            {/* Drag Drop ZIP Box */}
            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                accept=".zip"
                onChange={handleZipFileChange}
                className="hidden"
              />
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center transition-all bg-neutral-950/25 cursor-pointer leading-relaxed flex flex-col items-center justify-center gap-3 ${
                  uploadedIframeDoc ? 'border-lime-500/45 bg-lime-500/5' : 'border-neutral-700 hover:border-lime-400/50'
                }`}
              >
                <div className="p-3 bg-white/5 rounded-full border border-white/10 text-lime-400">
                  <Upload className="w-5 h-5" />
                </div>
                
                <div>
                  <h4 className="text-xs font-extrabold">
                    {zipFileName ? `Active Archive: ${zipFileName}` : 'Select Website ZIP Design File'}
                  </h4>
                  <p className="text-[10px] text-neutral-450 font-medium mt-1">
                    {uploadedIframeDoc 
                      ? ` extracted ${unzippedFilesCount} files. Standard asset pointers maps resolved inside sandbox!`
                      : 'Drag & drop or click to upload your portfolio website folder ZIP containing index.html. Files will unpack client-side.'
                    }
                  </p>
                </div>

                {isExtracting && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-lime-400">
                    <div className="w-3.5 h-3.5 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
                    <span>Extracting compressed directories in memory...</span>
                  </div>
                )}

                {zipError && (
                  <p className="text-xs text-red-500 font-bold block mt-1">
                    ⚠️ {zipError}
                  </p>
                )}
              </div>
            </div>

            {/* Simulated Live Viewport iframe loading doc */}
            <div className="flex-grow border border-white/15 rounded-xl overflow-hidden bg-white shadow-2xl relative min-h-[350px]">
              {uploadedIframeDoc ? (
                <iframe
                  srcDoc={uploadedIframeDoc}
                  className="w-full h-full border-0"
                  title={`${unlockedClient.codename} Sandboxed ZIP Live Build`}
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center font-sans space-y-4 p-8 bg-neutral-950 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                    🖥️
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h3 className="text-xs font-bold text-neutral-300">Sandbox Viewport Awaiting ZIP</h3>
                    <p className="text-[10px] text-neutral-500 leading-relaxed font-semibold">
                      Please upload a valid folder ZIP above, containing an index.html at root, to immediately compile and run your custom brand website live inside this device frame.
                    </p>
                  </div>
                </div>
              )}

              {uploadedIframeDoc && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md border border-lime-500/25 p-2.5 rounded text-[10px] font-mono text-lime-400 pointer-events-none flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-2 font-bold">
                    <FileCheck className="w-3.5 h-3.5 text-lime-400" />
                    <span>LOCAL BLOB: blob:unzipped-sandbox/index.html</span>
                  </div>
                  <span className="text-[9px] bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/25 font-black uppercase tracking-wider">Uncompressed Run Live</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const GoogleDriveIcon = () => (
  <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
    <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
    <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
    <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
    <path d="m59.8 53h27.5c0-1.55-.4-3.1-1.2-4.5l-13.75-23.8c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8z" fill="#2684fc"/>
    <path d="m73.4 76.8 13.75-23.8c.8-1.4 1.2-2.95 1.2-4.5h-57.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h47.1c1.6 0 3.15-.4 4.5-1.2z" fill="#ffba00"/>
  </svg>
);

function FileDirectoryView({ clientId }: { clientId: string }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const clientData = clientDriveDirectories[clientId] || clientDriveDirectories['antpet-client'];

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center shadow-xs border border-neutral-200/80">
            <GoogleDriveIcon />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 inline-block">
              Google Drive Cloud Storage
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1 leading-tight">
              File Directory
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Official Google Drive folders for {clientData.clientName}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-600">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Syncing Live Cloud Folders</span>
        </div>
      </div>

      {/* Security Warning Note */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
        <div className="p-2 bg-amber-100 text-amber-800 rounded-xl flex-shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="text-xs text-amber-950 leading-relaxed font-medium">
          <span className="font-extrabold text-amber-900 block mb-0.5 uppercase tracking-wider text-[11px]">
            IMPORTANT SECURITY NOTICE
          </span>
          IMPORTANT: Before sharing these links, note that files may be stored within folders that also contain your publicly accessible directories. When forwarding files, please download a separate copy first for your security.
        </div>
      </div>

      {/* Grid of Drive Folders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clientData.folders.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-400 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-neutral-50 rounded-xl border border-neutral-100 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <GoogleDriveIcon />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-neutral-900 leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-medium text-neutral-400">
                      Google Drive Folder
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer no-underline"
              >
                <span>Open Drive Folder</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
              </a>

              <button
                onClick={() => handleCopy(item.id, item.url)}
                className="p-2.5 bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-700 rounded-xl transition-all cursor-pointer border border-neutral-200/80"
                title="Copy folder URL"
              >
                {copiedId === item.id ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-neutral-600" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
