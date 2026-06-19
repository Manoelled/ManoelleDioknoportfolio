import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
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
  FolderOpen
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
    id: 'animal-clinic',
    name: 'Animal Wellness & Vet Clinic',
    codename: 'Animal Clinic',
    passwordKey: 'animal clinic',
    description: 'Veterinary care staging and appointment router portal.',
    color: '#E0F2FE',
    accentColor: '#0EA5E9'
  },
  {
    id: 'crumb-client',
    name: 'Crumb Bakery Manila',
    codename: 'Crumb Bakery',
    passwordKey: 'crumb bakery',
    description: 'Artisanal pastry menu prototype & cart compiler.',
    color: '#FFEDD5',
    accentColor: '#EA580C'
  },
  {
    id: 'ramngo-client',
    name: "RAMNGO Street Food",
    codename: "RAMNGO",
    passwordKey: 'ramngo',
    description: 'Vibrant street food truck finder and location board.',
    color: '#FEF08A',
    accentColor: '#CA8A04'
  },
  {
    id: 'stackhouse-client',
    name: 'Stackhouse Restaurant',
    codename: 'Stackhouse',
    passwordKey: 'stackhouse',
    description: 'Avant-garde restaurant reservation frame featuring sculptural gastronomy and exaggerated styling.',
    color: '#FEF3C7',
    accentColor: '#D97706'
  },
  {
    id: 'designsentiments-client',
    name: 'Design Sentiments Studio',
    codename: 'Design Sentiments',
    passwordKey: 'designsentiments',
    description: 'Minimalist brand identity framework, Swiss graphic systems, and digital editorial spec sheets.',
    color: '#FAF9F6',
    accentColor: '#FF3B30'
  }
];

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
  'animal-clinic': {
    branding: {
      logoSymbol: "🩺🐾",
      logoDescription: "A modern dual-node medical stethoscope interwoven with a soft rounded paw symbol, forming a clean medical cross with organic, friendly curves.",
      philosophy: "Elegance and absolute safety. The design balances clinical medical trustworthiness with a warmth that reassures owners during urgent pet care moments.",
      colors: [
        { name: 'Sky Cyan', hex: '#0EA5E9', role: 'Primary Core branding, focal health indicators, call-to-actions' },
        { name: 'Veterinary Slate', hex: '#1E293B', role: 'Durable body text, navigation elements, premium framing' },
        { name: 'Pure Wellness White', hex: '#F8FAFC', role: 'Surgical clean canvas, container fills, spacious backing' },
        { name: 'Healing Emerald', hex: '#10B981', role: 'Success confirmations, healthy indicators, slot updates' }
      ],
      typography: [
        { role: 'Display Headings', family: 'Inter (Sans-serif, Ultra Bold)', usage: 'For clinical headers and bold service focus panels.' },
        { role: 'Body & Meta Data', family: 'Inter / JetBrains Mono (Medium, Regular)', usage: 'For patient statistics cards, and vet logs.' }
      ]
    },
    social: [
      {
        id: 'ac-1',
        title: "Pet's Wellness Ritual Checkup Tips",
        date: "Today • 7k reach",
        views: "9.2k",
        likes: 1240,
        caption: "Is your Golden Retriever drinking enough water in the summer heat? 🐾 Learn the subtle signs of mild dehydration in companions and our easy water bowl habits. Read our clinic bio to reserve a clinical wellness checkup this weekend with Dr. Marcus! #VeterinaryScience #PetHealthCare #GoldenRetrieversManila",
        accentBg: "from-sky-400 to-blue-500"
      },
      {
        id: 'ac-2',
        title: "Modern Diagnostics & Pet Stress Levels",
        date: "2 days ago • 4.3k reach",
        views: "5.1k",
        likes: 830,
        caption: "By integrating non-invasive sensory scans, we keep clinic heart rates low and tail-wags high. We pride ourselves on creating standard trauma-free diagnosis loops. See our story highlights for an inside look! 🩺🌟 #PawsClawsManila #VetSurgery #DogsofManila",
        accentBg: "from-indigo-500 to-purple-600"
      }
    ]
  },
  'crumb-client': {
    branding: {
      logoSymbol: "🥐✨",
      logoDescription: "An elegant, hand-sketched classic crescent croissant with subtle golden yeast steam ripples emanating, symbolizing daily dawn oven-bakes.",
      philosophy: "Tactile, warm, and comforting. The aesthetics capture sourdough's rich, blistered textures and the artisanal commitment of Manila bakeries.",
      colors: [
        { name: 'Toasted Amber', hex: '#EA580C', role: 'Primary warm branding, pastry counters, appetizing details' },
        { name: 'Artisanal Clay', hex: '#7C2D12', role: 'Deep earthy typography, header text, border trims' },
        { name: 'Pastel Parchment', hex: '#FFFBEB', role: 'Warm bakery canvas, backgrounds, card surrounds' },
        { name: 'Soft Cream', hex: '#FFEDD5', role: 'Hover feedback, price tags, interactive button pills' }
      ],
      typography: [
        { role: 'Display Headings', family: 'Playfair Display (Serif, Extra Bold)', usage: 'Warm editorial font choice that reinforces traditional artisanal values.' },
        { role: 'Body Paragraphs', family: 'Inter (Regular, Medium)', usage: 'High legibility text for detailed pastry ingredients and cart compiles.' }
      ]
    },
    social: [
      {
        id: 'cb-1',
        title: "The Anatomy of 36-Hour Sourdough Loaves",
        date: "Yesterday • 15.2k reach",
        views: "21.6k",
        likes: 4320,
        caption: "Dark, blistered crust outside, airy and perfectly springy crumb inside. 🍞 Every loaf begins with our 8-year-old yeast starter, carefully fed and slow-fermented over three days. Cut into the crust today - fresh hot batches active at 8:00 AM! #ArtisanalSourdough #BakersManila #CrumbBakery",
        accentBg: "from-amber-500 to-orange-600"
      },
      {
        id: 'cb-2',
        title: "The Warm Pain au Chocolat Sunset",
        date: "4 days ago • 8.9k reach",
        views: "11.2k",
        likes: 2110,
        caption: "Flaky, buttery French laminated yeast pastry wrapping a rich, double column of dark Belgian chocolate. 🥐 Heat gently for 2 minutes to witness the beautiful molten chocolate core. Pairs perfectly with a hand-poured filter coffee. #PainAuChocolat #BakeryLife #PastryLover",
        accentBg: "from-amber-600 to-yellow-600"
      }
    ]
  },
  'ramngo-client': {
    branding: {
      logoSymbol: "🥭🚛",
      logoDescription: "A high-octane round badge featuring an industrial food transit truck crossed with a bright stylized slice of ripe Philippine Carabao mango.",
      philosophy: "Plentiful, fast, and energetic. The bold yellow and black identity mimics street food speed indicators and playful roadside signage designs.",
      colors: [
        { name: 'Carabao Mango Yellow', hex: '#FACC15', role: 'Vibrant focus accents, truck graphics, action indicators' },
        { name: 'Asphalt Charcoal', hex: '#171717', role: 'Deep industrial backing, solid typography, road grid blocks' },
        { name: 'Traffic Gold', hex: '#CA8A04', role: 'Information borders, location pins, dispatch alert indicators' },
        { name: 'Paper White', hex: '#FAFAFA', role: 'Clean copy sections, receipt values, interactive items' }
      ],
      typography: [
        { role: 'Display Headings', family: 'Space Grotesk (Bold, Tech)', usage: 'Loud, striking typeface suitable for mobile street food dispatch and road grids.' },
        { role: 'Data Indicators', family: 'JetBrains Mono (Mono, Bold)', usage: 'Used for GPS tracker updates, active operational hours, and crew logs.' }
      ]
    },
    social: [
      {
        id: 'rn-1',
        title: "Taft Gate: RIG LOCATION DETECTED 📍",
        date: "Today • 12k reach",
        views: "18.3k",
        likes: 3890,
        caption: "MANGO GRAHAM ROLL ALERT! 🥭 Active truck spot confirmed at DLSU Taft Gate. We are locked, loaded, and serving icy mango cups to combat the intense afternoon heat. Gather your academic peers and come find us directly beside the walkway! #MangoGrahamRoll #RamngoTaft #StreetFoodPH",
        accentBg: "from-yellow-400 to-amber-500"
      },
      {
        id: 'rn-2',
        title: "Behind the Mango Graham Craft 🚛",
        date: "3 days ago • 9.1k reach",
        views: "12.4k",
        likes: 2430,
        caption: "Pure condensed cream, crushed honey graham, and local ripe carabao mango wedges layered into high-fidelity portable street treats. 🍨 No artificial powders—only real fruit and fresh packaging. See why students are lining up on Taft today! #MangoTreats #ManilaFoodTrucks #GrahamPH",
        accentBg: "from-yellow-500 to-neutral-800"
      }
    ]
  },
  'stackhouse-client': {
    branding: {
      logoSymbol: "🍽️📐",
      logoDescription: "A geometric architectural wordmark combining exaggerated scale with high-contrast, linear framing lines as a nod to brutalist design.",
      philosophy: "Modern aesthetic, exaggerated styling, distinct market positioning, and sculptural food presentation that defies ordinary dining templates.",
      colors: [
        { name: 'Brutalist Charcoal', hex: '#1C1C1E', role: 'Core typography, heavy structural border lines, distinct frames' },
        { name: 'Sculptural Terracotta', hex: '#D2691E', role: 'Plating accents, highlight lines, high-contrast imagery contrast' },
        { name: 'Porous Warm Ecru', hex: '#F9F8F6', role: 'Clean typographic canvas, menu backdrops, calming margins' },
        { name: 'Polished Brass Edge', hex: '#B8860B', role: 'Premium interactive details, highlight widgets, active elements' }
      ],
      typography: [
        { role: 'Display Headings', family: 'Space Grotesk / Inter Match', usage: 'Delivers a highly structured, distinct and exaggerated editorial appearance.' },
        { role: 'Item Details & Logs', family: 'JetBrains Mono / Code font', usage: 'Establishes precise, meticulous, and disciplined technical metadata alignment.' }
      ]
    },
    social: [
      {
        id: 'bl-1',
        title: "Plates as Monolithic Platforms",
        date: "Today • 12k reach",
        views: "15.4k",
        likes: 2450,
        caption: "We believe dining is an architectural sequence. 🥩 The Monolithic Prime Rib is carved live and plated on standing dark volcanic basalt slabs. Discover exaggerated gastronomy that challenges classic restaurant layouts. #StackhouseModern #SculpturalDining #BrutalistEats",
        accentBg: "from-stone-900 to-amber-900"
      },
      {
        id: 'bl-2',
        title: "Plating Kinetic Editorial Reels Series",
        date: "3 days ago • 20.4k reach",
        views: "24.8k",
        likes: 4120,
        caption: "In the studio kitchen, we treat every dish as raw geometry. 📐 Watch Chef Alejandro's precise plating movements from our latest high-impact vertical Reels campaign. Designed for modern content behaviors and maximum eye tension. #StackhouseChef #ExaggeratedPlating #GourmetArt",
        accentBg: "from-red-950 to-neutral-900"
      }
    ]
  },
  'designsentiments-client': {
    branding: {
      logoSymbol: "📚✒️",
      logoDescription: "A minimalist Swiss-inspired branding system featuring high-contrast geometric ratios and raw tactile typography layouts.",
      philosophy: "Quiet confidence and editorial precision. Focusing on layout grids, raw paper finishes, and strict grotesque typography.",
      colors: [
        { name: 'Tactile Off-White', hex: '#FAF9F6', role: 'Calming editorial paper canvas base surface' },
        { name: 'Core Onyx', hex: '#1C1C1E', role: 'Grotesque headings, precise borders, primary textual nodes' },
        { name: 'Warm Crimson', hex: '#FF3B30', role: 'Highlight indicators, custom tag borders, focus links' },
        { name: 'Swiss Slate Grey', hex: '#E5E5E0', role: 'Delicate hairline borders, structural division systems' }
      ],
      typography: [
        { role: 'Display Elements', family: 'Swiss Grotesk (Sans-serif, Bold)', usage: 'For impactful title statements and primary catalog labels.' },
        { role: 'Body & Monospace', family: 'Inter / JetBrains Mono (Medium, Light)', usage: 'For precise alignment metadata, color descriptions, and system footnotes.' }
      ]
    },
    social: [
      {
        id: 'ds-1',
        title: "The Swiss Grid System in Modern Branding",
        date: "Today • 8.3k reach",
        views: "10.1k",
        likes: 1980,
        caption: "A structure built to endure. 📏 Our grid ratios frame minimalist editorial layouts and raw ink typography spec sheets with quiet editorial rigor. Explore our brand catalog highlights. #SwissMinimalism #GraphicDesignSystems #DesignSentiments",
        accentBg: "from-neutral-100 to-neutral-200"
      },
      {
        id: 'ds-2',
        title: "Tactile Paper Finishes & Unboxing Sensory Loops",
        date: "3 days ago • 5.1k reach",
        views: "6.3k",
        likes: 1140,
        caption: "Design you can feel. ✉️ Blending raw untreated cotton papers with spot-UV debossing to establish standard tactile branding finishes. #TactileBranding #EditorialDesign #SwissGrid",
        accentBg: "from-stone-100 to-neutral-300"
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
  const [activeTab, setActiveTab] = useState<'logo' | 'social' | 'website'>('logo');
  
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
    const cleanInput = password.trim().toLowerCase().replace(/'/g, '');
    
    const matched = clientDirectory.find(
      (c) => c.passwordKey === cleanInput || c.codename.toLowerCase() === cleanInput || c.id === cleanInput
    );

    if (matched) {
      setErrorMsg('');
      setIsSuccessfullyUnlocking(true);
      setTimeout(() => {
        setUnlockedClient(matched);
        setIsSuccessfullyUnlocking(false);
        setPassword('');
        setActiveTab('logo'); // default to logo & branding when logging in
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
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-2">
              Secure Studio Staging
            </p>
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
                Enter your project passkey code provided by Manoelle Diokno to view current design milestones.
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
                <span className="truncate">manoellediokno.studio/{unlockedClient.id}/{activeTab === 'logo' ? 'branding' : activeTab === 'social' ? 'social' : 'website'}</span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1.5 py-1 px-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Active Draft</span>
                </div>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Deliverables Navigation Sidebar on the Left */}
              <aside className="w-56 sm:w-64 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 flex flex-col overflow-y-auto">
                <div className="px-4 py-4 bg-neutral-100/60 border-b border-neutral-200">
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Project Deliverables</span>
                  <h3 className="text-xs font-black text-neutral-800 truncate leading-tight mt-0.5">{unlockedClient.codename} Hub</h3>
                </div>
                
                {/* Active Tabs Controls */}
                <div className="flex-1 py-3 space-y-1.5 px-3">
                  <button
                    onClick={() => setActiveTab('logo')}
                    className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                      activeTab === 'logo' 
                        ? 'bg-neutral-900 text-white shadow-md font-bold' 
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-xs'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-black ${activeTab === 'logo' ? 'bg-white/15' : 'bg-neutral-100'}`}>
                      🎨
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">Logo & Branding</p>
                      <p className={`text-[9px] font-semibold ${activeTab === 'logo' ? 'text-neutral-400' : 'text-neutral-400'}`}>Asset Guidelines</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('social')}
                    className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                      activeTab === 'social' 
                        ? 'bg-neutral-900 text-white shadow-md font-bold' 
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 shadow-xs'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-black ${activeTab === 'social' ? 'bg-white/15' : 'bg-neutral-100'}`}>
                      📱
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">Social Media</p>
                      <p className={`text-[9px] font-semibold ${activeTab === 'social' ? 'text-neutral-400' : 'text-neutral-400'}`}>Creatives & Copy</p>
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
                    <div>
                      <p className="text-xs font-bold leading-tight">Interactive Site</p>
                      <p className={`text-[9px] font-semibold ${activeTab === 'website' ? 'text-neutral-400' : 'text-neutral-400'}`}>Live Staging Frame</p>
                    </div>
                  </button>
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
                
                {/* 1. LOGO & BRANDING TAB */}
                {activeTab === 'logo' && currentDeliverables && (
                  <div className="p-6 space-y-6 max-w-4xl mx-auto w-full">
                    
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
                    <InteractiveWebSandbox unlockedClient={unlockedClient} />
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
   CLIENT CLIENT MOCK LIVE WEB PAGES (HTML DESIGNED)
   ========================================== */

/**
 * 1. ANIMAL CLINIC MOCK WORKSPACE
 */
function AnimalClinicMockSite() {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [service, setService] = useState('General Wellness Checkup');
  const [date, setDate] = useState('2026-05-21');
  const [vet, setVet] = useState('Dr. Marcus Gatchalian DVM');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName) return;
    setIsBooked(true);
  };

  return (
    <div className="flex-1 bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Clinic branding heading */}
      <header className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-xs tracking-tight text-slate-900 block">Paws & Claws Wellness</span>
            <span className="text-[8px] text-slate-400 font-semibold block uppercase">VETERINARY CLINIC MANILA</span>
          </div>
        </div>
        <nav className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
          <span className="text-sky-500">Home</span>
          <span>Services</span>
          <span>Our Doctors</span>
          <span>Contact</span>
        </nav>
      </header>

      {/* Main interactive area */}
      <div className="p-6 flex-1 max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-4">
          <div className="bg-gradient-to-br from-sky-400 to-indigo-500 text-white p-5 rounded-2xl shadow-sm">
            <span className="px-2 py-0.5 bg-white/15 backdrop-blur-md rounded-full text-[8.5px] font-extrabold uppercase tracking-widest block w-max mb-1">STAGING DRAFT V1.2</span>
            <h1 className="text-lg sm:text-2xl font-black leading-tight tracking-tight">Compassionate Health Hub for Your Beloved Companions</h1>
            <p className="text-[11px] text-sky-100/90 mt-1.5 leading-relaxed font-medium">
              We provide state-of-the-art diagnostic scans, preventive therapy loops, and professional dental surgeries directed by the country's senior veterinary specialists.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-150 shadow-xs">
            <h3 className="text-xs font-extrabold uppercase text-slate-450 tracking-wider mb-2.5">Available Specializations</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Preventive Labs', icon: '🩺', desc: 'Vaccinations & health checks' },
                { label: 'Ophthalmic Surgery', icon: '👁️', desc: 'Complex surgical care' },
                { label: 'Pet Dentistry', icon: '🦷', desc: 'Plaque and core extractions' }
              ].map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                  <span className="text-base block mb-0.5">{s.icon}</span>
                  <span className="text-[9px] font-extrabold text-slate-900 block leading-tight">{s.label}</span>
                  <span className="text-[8px] text-slate-400 block truncate mt-0.5">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Scheduler Simulation widget */}
        <div className="md:col-span-2">
          {!isBooked ? (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1.5 mb-3">
                <Calendar className="w-4 h-4 text-sky-500" />
                <h3 className="text-xs font-black text-slate-900">Virtual Booking Router</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Pet's Name</label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Cleo the Golden"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-sky-400 text-slate-900 font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Pet Type</label>
                    <select
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white text-slate-900 font-semibold"
                    >
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Rabbit</option>
                      <option>Bird</option>
                      <option>Other Exotic</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Target Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white text-slate-950 font-semibold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Service Requested</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white text-slate-900 font-semibold"
                  >
                    <option>General Wellness Checkup</option>
                    <option>Anti-Rabies Booster Shot</option>
                    <option>Deep Scale Scaling Dental Clinic</option>
                    <option>Sterilization Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Select Veterinarian</label>
                  <select
                    value={vet}
                    onChange={(e) => setVet(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white text-slate-900 font-semibold"
                  >
                    <option>Dr. Marcus Gatchalian DVM (Surgery)</option>
                    <option>Dr. Althea San Jose DVM (Wellness)</option>
                    <option>Dr. Liam Mendoza DVM (Exotic Care)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white rounded-lg text-2xs font-extrabold tracking-wide uppercase transition-all shadow-md cursor-pointer mt-1"
                >
                  Send Booking Request
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 p-4 rounded-2xl border border-green-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs font-black text-green-900 uppercase tracking-wider">Appointment Routed!</h3>
                <p className="text-[10px] text-green-700/90 mt-1 leading-relaxed">
                  Staging reservation captured on agency test flow. Our pipeline correctly transmitted ticket #PW-9804 to our simulated database.
                </p>
              </div>
              <div className="p-2.5 bg-white border border-green-100 rounded-xl text-left text-[9px] font-semibold text-slate-700 space-y-1">
                <p><span className="text-slate-400 font-normal">Patient Name:</span> <span className="font-bold">{petName} ({petType})</span></p>
                <p><span className="text-slate-400 font-normal">Treatment:</span> <span className="font-bold">{service}</span></p>
                <p><span className="text-slate-400 font-normal">Consultant:</span> <span className="font-bold">{vet}</span></p>
                <p><span className="text-slate-400 font-normal">Scheduled:</span> <span className="font-bold">{date}</span></p>
              </div>
              <button
                onClick={() => {
                  setIsBooked(false);
                  setPetName('');
                }}
                className="text-[9px] text-green-800 font-extrabold underline cursor-pointer"
              >
                Book another appointment
              </button>
            </div>
          )}
        </div>
      </div>
      
      <footer className="p-3 bg-white border-t border-slate-100 text-center text-[9.5px] text-slate-400 font-semibold italic">
        Draft Interactive Showcase by Diokno Designs — Feedback Node Activated.
      </footer>
    </div>
  );
}

/**
 * 2. CRUMB BAKERY MOCK WORKSPACE
 */
function CrumbBakeryMockSite() {
  const [cart, setCart] = useState<{ [key: string]: number }>({
    'Pain au Chocolat': 1,
    'Sourdough Loaf': 0,
    'Ube Cheese Pandesal': 0,
  });
  const [placedOrder, setPlacedOrder] = useState(false);

  const menuItems = [
    { name: 'Pain au Chocolat', price: 145, desc: 'Laminated yeast pastry with rich dark Belgian chocolate center.', emoji: '🥐' },
    { name: 'Sourdough Loaf', price: 280, desc: '36-hour slow fermented classic sourdough with dark blistered crust.', emoji: '🍞' },
    { name: 'Ube Cheese Pandesal', price: 45, desc: 'Whipped local purple yam with cream cheese filled bun crumb.', emoji: '🥯' },
  ];

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const cartItems = menuItems.filter((m) => (cart[m.name] || 0) > 0);
  const total = cartItems.reduce((acc, m) => acc + m.price * (cart[m.name] || 0), 0);

  const triggerCheckout = () => {
    if (total === 0) return;
    setPlacedOrder(true);
  };

  return (
    <div className="flex-1 bg-amber-50/40 text-amber-900 font-sans flex flex-col">
      {/* Bakery Branding */}
      <header className="p-4 bg-white border-b border-orange-100 flex items-center justify-between shadow-xs sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg">
            🥐
          </div>
          <div>
            <span className="font-black text-xs text-amber-950 block">Crumb Bakery Manila</span>
            <span className="text-[8px] text-amber-500 font-semibold block uppercase tracking-wider">Artisanal Doughs</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold text-amber-700">
          <span className="text-amber-950">Daily Fresh</span>
          <span>Locations</span>
          <span>Wholesale</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="p-5 flex-1 max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-3">
          <div className="bg-amber-100/70 p-4 rounded-xl border border-amber-200">
            <h2 className="text-xs font-black uppercase text-amber-800 tracking-wider mb-1">Staging Draft Concept v2.5</h2>
            <p className="text-[11px] text-amber-900/95 leading-relaxed font-medium">
              A cozy web catalog built with live interactive cart compiling to preview the dessert selection pipeline. Use the adjust counters to refresh estimates.
            </p>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.name} className="p-3 bg-white border border-amber-100/80 rounded-xl flex items-center justify-between gap-3 shadow-xs">
                <div className="text-xl px-1.5">{item.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-extrabold text-amber-950 truncate">{item.name}</h3>
                    <span className="text-neutral-500 text-[11px] font-bold">₱{item.price}</span>
                  </div>
                  <p className="text-[9px] text-amber-800 truncate">{item.desc}</p>
                </div>
                {/* Qty counters */}
                <div className="flex items-center gap-1.5 bg-amber-50/70 py-1 px-2 rounded-lg border border-amber-250 flex-shrink-0">
                  <button
                    onClick={() => updateQty(item.name, -1)}
                    className="text-amber-800 hover:bg-white rounded w-4 h-4 flex items-center justify-center text-xs font-black cursor-pointer shadow-2xs"
                  >
                    -
                  </button>
                  <span className="text-[10px] font-bold text-amber-950 w-3 text-center">
                    {cart[item.name] || 0}
                  </span>
                  <button
                    onClick={() => updateQty(item.name, 1)}
                    className="text-amber-800 hover:bg-white rounded w-4 h-4 flex items-center justify-center text-xs font-black cursor-pointer shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic checkout box */}
        <div className="md:col-span-2">
          {!placedOrder ? (
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 text-amber-950 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-3.5 pb-2 border-b border-amber-50">
                  <ShoppingBag className="w-4 h-4 text-orange-600" />
                  <h3 className="text-xs font-black text-amber-950">Active Cart Order</h3>
                </div>
                {cartItems.length === 0 ? (
                  <p className="text-[10px] text-amber-400 font-medium py-6 text-center">Your cart is empty. Add pastries to start previewing compile values.</p>
                ) : (
                  <div className="space-y-2 mb-4">
                    {cartItems.map((c) => (
                      <div key={c.name} className="flex justify-between items-center text-[10.5px] font-semibold text-amber-900">
                        <span>{c.name} <span className="opacity-40">x</span>{cart[c.name]}</span>
                        <span className="font-bold">₱{c.price * cart[c.name]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="border-t border-amber-50 pt-2 mb-3.5 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Grand Total</span>
                  <span className="text-sm font-black text-amber-950">₱{total}</span>
                </div>
                <button
                  disabled={total === 0}
                  onClick={triggerCheckout}
                  className={`w-full py-2 px-3 rounded-lg text-2xs font-extrabold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer text-white shadow-md ${total === 0 ? 'bg-amber-100 cursor-not-allowed text-amber-300' : 'bg-orange-600 hover:bg-orange-700 active:scale-98'}`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Interactive Checkout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-orange-100/50 p-4 rounded-2xl border border-orange-200 text-center space-y-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mx-auto">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-xs font-black text-amber-950 uppercase tracking-wider">Test Transmitted!</h3>
                <p className="text-[9.5px] text-amber-800 leading-relaxed font-semibold">
                  Excellent! Cart subtotaling draft compiler successfully logged ₱{total} directly on staging testing boards.
                </p>
              </div>
              <button
                onClick={() => setPlacedOrder(false)}
                className="text-[9.5px] text-neutral-500 hover:text-neutral-900 underline font-semibold cursor-pointer block mx-auto"
              >
                Clear Cart and try again
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="p-3 bg-white border-t border-orange-100 text-center text-[9.5px] text-amber-600 font-semibold italic">
        Draft Interactive Showcase by Diokno Designs — Feedback Node Activated.
      </footer>
    </div>
  );
}

/**
 * 3. RAMNGO MOCK WORKSPACE
 */
function RamngoMockSite() {
  const [selectedStation, setSelectedStation] = useState('taft');

  const stations = [
    { id: 'taft', title: 'Taft Station (La Salle Rig)', desc: 'Rolls beside DLSU Taft Gate. Peak morning hours daily.', activeHrs: '7:30 AM — 4:00 PM', crew: 'In-charge: Kyle, Janine', tag: 'High demand' },
    { id: 'katip', title: 'Katipunan Station (Ateneo Flat)', desc: 'Located along Regis Lane. Popular for students in local heat.', activeHrs: '10:00 AM — 8:00 PM', crew: 'In-charge: Marlon, Rico', tag: 'Fresh batch' },
    { id: 'bgc', title: 'BGC High Street Rig', desc: 'Active food truck on the north park quadrant street parking.', activeHrs: '12:00 PM — 10:00 PM', crew: 'In-charge: Sandra, Gab', tag: 'Weekend rush' },
  ];

  const currentSt = stations.find((s) => s.id === selectedStation) || stations[0];

  return (
    <div className="flex-1 bg-neutral-900 text-yellow-50 font-sans flex flex-col">
      {/* Street brand layout */}
      <header className="p-4 bg-yellow-400 border-b border-yellow-500 flex items-center justify-between text-yellow-950 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-yellow-950 flex items-center justify-center text-white text-xs font-black">
            RG
          </div>
          <div>
            <span className="font-extrabold text-xs block leading-tight">RAMNGO Street Food</span>
            <span className="text-[8px] font-black uppercase text-yellow-800 tracking-wider block">FOOD TRUCK TRACKER SYSTEM</span>
          </div>
        </div>
        <div className="text-[10px] font-extrabold flex gap-3 text-yellow-900">
          <span>Staging Tracker Live</span>
        </div>
      </header>

      {/* Content */}
      <div className="p-5 flex-1 max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-3">
          <div className="p-4 rounded-xl bg-neutral-800 border border-neutral-750">
            <span className="text-[9px] font-black text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full uppercase tracking-wider">MAP VIEW FINDER</span>
            <h2 className="text-sm font-extrabold text-white mt-1.5 leading-snug">Test active neighborhood rigs to load dispatcher schedules.</h2>
            <p className="text-[10.5px] text-neutral-400 mt-1 leading-relaxed">
              Real-time locations map scheduler concept. Manila's legendary mango graham rolls loaded ready. Select our test rigs below.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[9.5px] font-bold text-neutral-500 uppercase tracking-widest block px-1">STAGING NODES SELECTOR</span>
            {stations.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStation(s.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${selectedStation === s.id ? 'bg-yellow-400 text-neutral-900 border-yellow-400 shadow-sm font-bold' : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-100 border-neutral-750'}`}
              >
                <div>
                  <h3 className="text-xs font-extrabold leading-tight">{s.title}</h3>
                  <p className={`text-[9px] ${selectedStation === s.id ? 'text-yellow-950/80' : 'text-neutral-400'} truncate mt-0.5`}>{s.desc}</p>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded ${selectedStation === s.id ? 'bg-neutral-900 text-white' : 'bg-neutral-800 text-yellow-400'}`}>{s.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dispatcher Details */}
        <div className="md:col-span-2">
          <div className="bg-neutral-850 p-4 rounded-2xl border border-neutral-750 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-1 text-yellow-400 mb-3 pb-2 border-b border-neutral-800">
                <MapPin className="w-4 h-4" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Station Information</h3>
              </div>
              <div className="space-y-3.5">
                <div>
                  <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block">Rig Name</span>
                  <span className="text-[11.5px] text-white font-extrabold block mt-0.5">{currentSt.title}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block">Active Hours</span>
                    <span className="text-[10px] text-yellow-400 font-bold block mt-0.5">{currentSt.activeHrs}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block">Dispatchers</span>
                    <span className="text-[10px] text-white font-medium block mt-0.5">{currentSt.crew}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest block">Live Status Check</span>
                  <div className="mt-1 bg-green-500/10 border border-green-500/20 rounded p-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-[9.5px] text-green-400 font-extrabold uppercase">STATION DISPATCHER READY</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 mt-4">
              <p className="text-[8.5px] text-neutral-500 font-semibold leading-relaxed">
                Rigs dynamically report active client spots utilizing real-time GPS coordinates models. Double click active elements to test.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="p-3 bg-neutral-950 text-center text-[9.5px] text-neutral-500 font-semibold italic">
        Draft Interactive Showcase by Diokno Designs — Feedback Node Activated.
      </footer>
    </div>
  );
}

/**
 * 4. STACKHOUSE STUDIO MOCK WORKSPACE
 */
function StackhouseRestaurantMockSite() {
  const [classes, setClasses] = useState([
    { id: 'tasting', title: 'Morning Tasting Sequence', time: '11:30 AM — 1:30 PM', spots: 6, instructor: 'Chef Alejandro L.' },
    { id: 'dinner', title: 'Sunset Sculptural Dinner', time: '5:30 PM — 7:30 PM', spots: 4, instructor: 'Chef Marcus D.' },
    { id: 'latenight', title: 'Late Night Avant-Garde Table', time: '8:30 PM — 11:30 PM', spots: 10, instructor: 'Chef Alejandro L.' },
  ]);
  const [bookedClass, setBookedClass] = useState<string | null>(null);

  const handleReserve = (id: string) => {
    setClasses((prev) =>
      prev.map((c) => {
        if (c.id === id && c.spots > 0) {
          return { ...c, spots: c.spots - 1 };
        }
        return c;
      })
    );
    setBookedClass(id);
    setTimeout(() => {
      setBookedClass(null);
    }, 2800);
  };

  return (
    <div className="flex-1 bg-stone-50 text-stone-800 font-sans flex flex-col">
      {/* Wellness minimal layout */}
      <header className="p-4 bg-white border-b border-stone-200 flex items-center justify-between sticky top-0 z-10 shadow-3xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-serif text-sm">
            S
          </div>
          <div>
            <span className="font-extrabold text-xs block leading-tight text-stone-900">Stackhouse Restaurant</span>
            <span className="text-[8px] text-stone-400 font-bold uppercase tracking-widest block">Sculptural Gastronomy & Dining</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold text-stone-500">
          <span className="text-stone-900">Sessions</span>
          <span>Wellness</span>
          <span>Staging Port</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="p-5 flex-1 max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 space-y-3.5">
          <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
            <span className="text-[8px] font-black text-stone-950 bg-stone-950/10 px-2 py-0.5 rounded-full uppercase tracking-widest block w-max mb-1.5">DINING EXPERIENCE SPEC</span>
            <h2 className="text-sm font-black text-stone-900">Reserve interactive test dining slots directly inside staging list.</h2>
            <p className="text-[10.5px] mt-1 text-stone-600 leading-relaxed font-semibold">
              Live capsule booking draft. Choose a tasting sequence or avant-garde dining session to verify real-time remaining seating capacity in sandbox state.
            </p>
          </div>

          <div className="space-y-2">
            {classes.map((cls) => (
              <div key={cls.id} className="p-3 bg-white rounded-xl border border-stone-150 flex items-center justify-between gap-3 shadow-3xs">
                <div className="min-w-0">
                  <span className="text-[8px] px-1.5 py-0.5 bg-stone-100 font-extrabold rounded text-stone-600 uppercase tracking-widest">{cls.time}</span>
                  <h3 className="text-xs font-black text-stone-900 mt-1 leading-tight">{cls.title}</h3>
                  <p className="text-[9px] text-stone-400 mt-0.5 leading-none">Instructor: {cls.instructor}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] font-extrabold text-stone-900 block leading-tight">{cls.spots}</span>
                    <span className="text-[8px] text-stone-400 block uppercase leading-none font-semibold">spots left</span>
                  </div>
                  <button
                    disabled={cls.spots === 0}
                    onClick={() => handleReserve(cls.id)}
                    className={`px-3 py-1.5 text-3xs font-extrabold uppercase tracking-wide rounded-lg cursor-pointer transition-all ${cls.spots === 0 ? 'bg-stone-100 text-stone-300 cursor-not-allowed' : 'bg-stone-900 hover:bg-stone-800 text-white'}`}
                  >
                    Book Table
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Realtime Alert Hub */}
        <div className="md:col-span-2">
          <div className="bg-stone-100/50 p-4 rounded-xl border border-stone-200 flex flex-col justify-between h-full min-h-[160px]">
            <div>
              <span className="text-[8.5px] font-bold text-stone-400 uppercase tracking-widest block mb-2.5">Live Sandbox Tracker</span>
              <div className="space-y-3">
                {bookedClass ? (
                  <div className="p-3 bg-stone-900 text-white rounded-xl space-y-1 text-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                    <p className="text-[10.5px] font-black">Capacity Reduced Successfully</p>
                    <p className="text-[9px] text-stone-300 leading-snug">
                      Staging reservation received! Simulated spot decremented and saved.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-white border border-stone-200 rounded-xl flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-stone-900/10 flex items-center justify-center text-xs text-stone-850">
                      ℹ️
                    </div>
                    <div>
                      <p className="text-[9.5px] font-extrabold text-stone-900">Ready for Input</p>
                      <p className="text-[8.5px] text-stone-400">Click reserve on any schedule item.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[8px] text-stone-400 font-semibold leading-relaxed mt-4">
              Designed client prototype previewing. Standard animations and state handlers comply with Diokno specifications.
            </div>
          </div>
        </div>
      </div>

      <footer className="p-3 bg-white border-t border-stone-200 text-center text-[9.5px] text-stone-450 font-semibold italic">
        Draft Interactive Showcase by Diokno Designs — Feedback Node Activated.
      </footer>
    </div>
  );
}

/* ==========================================
   DYNAMIC DESIGN SENTIMENTS INTERACTIVE LAB
   ========================================== */
function DesignSentimentsMockSite() {
  const [paperColor, setPaperColor] = useState('#FAF9F6');
  const [inkColor, setInkColor] = useState('#1C1C1E');
  const [selectedFont, setSelectedFont] = useState('sans'); // 'sans' | 'serif' | 'mono'
  const [texture, setTexture] = useState('cotton'); // 'smooth' | 'cotton' | 'craft'

  return (
    <div className="flex-1 text-left font-sans flex flex-col min-h-[480px] rounded-xl overflow-hidden transition-all duration-300" style={{ backgroundColor: paperColor, color: inkColor }}>
      <header className="p-4 border-b border-[#E5E5E0] bg-white text-neutral-900 flex items-center justify-between sticky top-0 z-10 shadow-3xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
            DS
          </div>
          <div>
            <span className="font-extrabold text-xs block leading-tight text-neutral-900">Design Sentiments</span>
            <span className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest block font-sans">Interactive Brand Lab</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-500">
          <span className="text-neutral-900">Spec Lab</span>
          <span>Catalog V1.2</span>
        </div>
      </header>

      <div className="p-5 flex-grow flex flex-col lg:flex-row gap-5 max-w-4xl mx-auto w-full">
        {/* Controls Column */}
        <div className="w-full lg:w-72 bg-white/95 border border-[#E5E5E0] p-4 rounded-xl shadow-xs space-y-4 text-[#1C1C1E]">
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider mb-2 text-neutral-400 font-sans">Paper Canvas Surface</h4>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { hex: '#FAF9F6', label: 'Cotton' },
                { hex: '#F4EBE1', label: 'Oat' },
                { hex: '#E5E5E0', label: 'Slate' },
                { hex: '#1C1C1E', label: 'Coal' }
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setPaperColor(c.hex)}
                  className={`py-1.5 text-[10px] rounded border font-bold select-none cursor-pointer transition-all ${
                    paperColor === c.hex ? 'border-neutral-900 ring-2 ring-neutral-900/10' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                  style={{ backgroundColor: c.hex, color: c.hex === '#1C1C1E' ? '#FFFFFF' : '#1C1C1E' }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider mb-2 text-neutral-400 font-sans">Tactile Fine Ink</h4>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { hex: '#1C1C1E', label: 'Onyx' },
                { hex: '#FF3B30', label: 'Crimson' },
                { hex: '#3A3A3C', label: 'Graphite' },
                { hex: '#FAF9F6', label: 'Bleach' }
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setInkColor(c.hex)}
                  className={`py-1.5 text-[9.5px] rounded border font-bold bg-neutral-100 hover:bg-neutral-50 select-none cursor-pointer transition-all text-neutral-800 ${
                    inkColor === c.hex ? 'border-neutral-900 ring-2 ring-neutral-900/10' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider mb-2 text-neutral-400 font-sans">Typography Setup</h4>
            <div className="grid grid-cols-3 gap-1 px-0 text-[9px]">
              {[
                { id: 'sans', label: 'GROTESQUE' },
                { id: 'serif', label: 'SERIF' },
                { id: 'mono', label: 'TECHNICAL' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFont(f.id)}
                  className={`py-1.5 rounded border font-bold select-none cursor-pointer transition-all ${
                    selectedFont === f.id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider mb-2 text-[#6D6D72] font-sans">Paper Texture Feel</h4>
            <div className="grid grid-cols-3 gap-1 text-[9px]">
              {[
                { id: 'smooth', label: 'NATURAL' },
                { id: 'cotton', label: 'COTTON' },
                { id: 'craft', label: 'CRAFTED' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTexture(t.id)}
                  className={`py-1.5 rounded border font-bold select-none cursor-pointer transition-all ${
                    texture === t.id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Spec Sheet Render Column */}
        <div 
          className="flex-1 rounded-2xl p-6 border border-neutral-300/40 relative shadow-sm select-none transition-all duration-300 flex flex-col justify-between"
          style={{ 
            backgroundImage: texture === 'cotton' 
              ? 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)' 
              : texture === 'craft'
                ? 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)'
                : 'none',
            backgroundSize: '16px 16px',
            fontFamily: selectedFont === 'sans' ? 'sans-serif' : selectedFont === 'serif' ? 'serif' : 'monospace'
          }}
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold tracking-[0.2em] font-sans opacity-65">SPECIFICATION BOARD № 042</span>
              <span className="text-[9px] font-sans opacity-65">GRID: VERIFIED</span>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold uppercase tracking-tight leading-none">
                Design Sentiments
              </h1>
              <p className="text-xs italic leading-relaxed max-w-md opacity-85 font-sans">
                A visual framework constructed with editorial precision, raw textured substrates, and standard layout geometries.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-current/15 space-y-2">
            <div className="flex justify-between font-sans text-[8px] opacity-65">
              <span>CANVAS STATE: {paperColor}</span>
              <span>INK NODE: {inkColor}</span>
            </div>
            <div className="p-3.5 rounded-lg bg-neutral-950/5 border border-current/10 text-[11px] leading-relaxed opacity-95">
              "We choose quietness over noise, structures over decoration, and tactile truth over simulated layouts."
            </div>
          </div>
        </div>
      </div>
    </div>
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
            {unlockedClient.id === 'animal-clinic' && <AnimalClinicMockSite />}
            {unlockedClient.id === 'crumb-client' && <CrumbBakeryMockSite />}
            {unlockedClient.id === 'ramngo-client' && <RamngoMockSite />}
            {unlockedClient.id === 'stackhouse-client' && <StackhouseRestaurantMockSite />}
            {unlockedClient.id === 'designsentiments-client' && <DesignSentimentsMockSite />}
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
