// @ts-ignore
import ds_vol2_1 from '../components/projects/designsentiments/Carousel2/1.png';
// @ts-ignore
import ds_vol2_2 from '../components/projects/designsentiments/Carousel2/2.png';
// @ts-ignore
import ds_vol2_3 from '../components/projects/designsentiments/Carousel2/3.png';
// @ts-ignore
import ds_vol2_4 from '../components/projects/designsentiments/Carousel2/4.png';
// @ts-ignore
import ds_vol2_5 from '../components/projects/designsentiments/Carousel2/5.png';
// @ts-ignore
import ds_vol2_6 from '../components/projects/designsentiments/Carousel2/6.png';

// @ts-ignore
import ds_vol5_1 from '../components/projects/designsentiments/dscarousel7/1.png';
// @ts-ignore
import ds_vol5_2 from '../components/projects/designsentiments/dscarousel7/2.png';
// @ts-ignore
import ds_vol5_3 from '../components/projects/designsentiments/dscarousel7/3.png';
// @ts-ignore
import ds_vol5_4 from '../components/projects/designsentiments/dscarousel7/4.png';

export interface SocialPost {
  id: string;
  type: 'image' | 'carousel' | 'reel';
  username: string;
  avatar: string;
  verified: boolean;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  caption: string;
  media: string[];
  videoThumbnail?: string;
  duration?: string;
  program: string;
  programIcon: string;
  projectId?: string;
  projectTitle?: string;
  projectDescription: string;
  tags: string[];
  aspectRatio?: '1/1' | '9/16' | '16/9' | '4/3' | '3/2';
}

const rawSocialPosts: SocialPost[] = [
  // 1. Crumb Carousel (Form meet Flavor)
  {
    id: 'crumb-carousel',
    type: 'carousel',
    username: 'crumb.cookies',
    avatar: "/assets/images/CRUMB/CrumbCookieLogo.png",
    verified: true,
    timeAgo: '2h ago',
    likes: 984,
    comments: 42,
    shares: 148,
    caption: 'Handcrafted artisan cookie & flour workshop. Minimalist structural alignments, warm baked earth tones, and satisfying typography that honors sweet kitchen rituals. 🍞🍪✨ #branding #identities #satisfying #crumb',
    media: [
      '/assets/images/CRUMB/carousell 1.png',
      '/assets/images/CRUMB/Carousell2.png',
      '/assets/images/CRUMB/carousell 3.png',
      '/assets/images/CRUMB/carousell 4.png',
      '/assets/images/CRUMB/Carousell5.png',
      '/assets/images/CRUMB/Carousell6.png'
    ],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'crumb',
    projectTitle: 'Crumb Cookies',
    projectDescription: 'Full brand identity for an artisan cookie and flour workshop in Manila — logo, packaging, and digital presence.',
    tags: ['Branding', 'Graphic Design']
  },

  // 2. Design Sentiments Editorial Carousel (1:1 ratio)
  {
    id: 'designsentiments-carousel-1',
    type: 'carousel',
    username: 'designsentiments',
    avatar: "/assets/images/DesignSentiments/DesignSentiments_logo.png",
    verified: true,
    timeAgo: 'Just now',
    likes: 1980,
    comments: 65,
    shares: 247,
    caption: 'Editorial Layouts & Grid Systems',
    media: [
      '/assets/images/DesignSentiments/DesignSentimentsCarousel1.png',
      '/assets/images/DesignSentiments/DesignSentimentsCarousel2.png',
      '/assets/images/DesignSentiments/DesignSentimentsCarousel3.png',
      '/assets/images/DesignSentiments/DesignSentimentsCarousel4.png',
      '/assets/images/DesignSentiments/DesignSentimentsCarousel5.png',
      '/assets/images/DesignSentiments/DesignSentimentsCarousel6.png'
    ],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'designsentiments',
    projectTitle: 'Design Sentiments (Vol. 1)',
    projectDescription: 'Layout systems, guidelines, and color theory specs for digital journals.',
    tags: ['Branding', 'Graphic Design', 'Social Media']
  },
  {
    id: 'designsentiments-carousel-2',
    type: 'carousel',
    username: 'designsentiments',
    avatar: "/assets/images/DesignSentiments/DesignSentiments_logo.png",
    verified: true,
    timeAgo: 'Just now',
    likes: 1540,
    comments: 42,
    shares: 110,
    caption: 'Digital Interfaces & Interactive Components',
    media: [
      ds_vol2_1,
      ds_vol2_2,
      ds_vol2_3,
      ds_vol2_4,
      ds_vol2_5,
      ds_vol2_6
    ],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'designsentiments',
    projectTitle: 'Design Sentiments (Vol. 2)',
    projectDescription: 'Responsive grid alignments and modern layout elements.',
    tags: ['Branding', 'Graphic Design', 'Social Media']
  },
  {
    id: 'designsentiments-carousel-3',
    type: 'carousel',
    username: 'designsentiments',
    avatar: "/assets/images/DesignSentiments/DesignSentiments_logo.png",
    verified: true,
    timeAgo: 'Just now',
    likes: 1720,
    comments: 58,
    shares: 185,
    caption: 'Tactile Ephemera & Printed Materials',
    media: [
      '/assets/images/DesignSentiments/1_carousel3.png',
      '/assets/images/DesignSentiments/2_carousel3.png',
      '/assets/images/DesignSentiments/3_carousel3.png',
      '/assets/images/DesignSentiments/4_carousel3.png',
      '/assets/images/DesignSentiments/5_carousel3.png'
    ],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'designsentiments',
    projectTitle: 'Design Sentiments (Vol. 3)',
    projectDescription: 'Physical brand assets, booklets, and tactile designs.',
    tags: ['Branding', 'Graphic Design', 'Social Media']
  },
  {
    id: 'designsentiments-carousel-4',
    type: 'carousel',
    username: 'designsentiments',
    avatar: "/assets/images/DesignSentiments/DesignSentiments_logo.png",
    verified: true,
    timeAgo: 'Just now',
    likes: 1680,
    comments: 49,
    shares: 142,
    caption: 'Design is More Than Just Aesthetics',
    media: [
      '/assets/images/DesignSentiments/DSCarousel6/1.png',
      '/assets/images/DesignSentiments/DSCarousel6/2.png',
      '/assets/images/DesignSentiments/DSCarousel6/3.png',
      '/assets/images/DesignSentiments/DSCarousel6/4.png',
      '/assets/images/DesignSentiments/DSCarousel6/5.png',
      '/assets/images/DesignSentiments/DSCarousel6/6.png'
    ],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'designsentiments',
    projectTitle: 'Design Sentiments (Vol. 4)',
    projectDescription: 'Design process, philosophy, and architectural aesthetics.',
    tags: ['Branding', 'Graphic Design', 'Social Media']
  },
  {
    id: 'designsentiments-carousel-5',
    type: 'carousel',
    username: 'designsentiments',
    avatar: "/assets/images/DesignSentiments/DesignSentiments_logo.png",
    verified: true,
    timeAgo: 'Just now',
    likes: 1890,
    comments: 72,
    shares: 201,
    caption: 'Big Tech is Looksmaxxing',
    media: [
      ds_vol5_1,
      ds_vol5_2,
      ds_vol5_3,
      ds_vol5_4
    ],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'designsentiments',
    projectTitle: 'Design Sentiments (Vol. 5)',
    projectDescription: 'Analyzing corporate style rebrands, visual designs, and aesthetic transformations of technology giants.',
    tags: ['Branding', 'Graphic Design', 'Social Media']
  },
  {
    id: 'designsentiments-reel',
    type: 'reel',
    username: 'designsentiments',
    avatar: "/assets/images/DesignSentiments/DesignSentiments_logo.png",
    verified: true,
    timeAgo: 'Just now',
    likes: 3125,
    comments: 112,
    shares: 442,
    caption: 'Kinetic typography, layout architectures, and visual commentary playing in real-time. Exploring our physical booklet translations, editorial design systems, and authorship in motion. 📖✍🏼🎥 #editorial #graphicdesign #motiondesign #designsentiments',
    media: ['/assets/images/DesignSentiments/designsentiments.mp4'],
    videoThumbnail: '/assets/images/DesignSentiments/DesignSentiments_Thumbnail.png',
    aspectRatio: '16/9',
    duration: '0:30',
    program: 'Adobe After Effects',
    programIcon: 'Ae',
    projectId: 'designsentiments',
    projectTitle: 'Design Sentiments (Brand Video)',
    projectDescription: 'Kinetic design walkthrough showcasing editorial publication systems and interactive web layouts.',
    tags: ['Video Production', 'Social Media']
  },

  // 3. RAMNGO Velocity Reel (PNG reel)
  {
    id: 'ramngo-reel-1',
    type: 'reel',
    username: 'ramngo.streetfood',
    avatar: "/assets/images/RamngoMainLogo.png",
    verified: true,
    timeAgo: '1w ago',
    likes: 2430,
    comments: 115,
    shares: 312,
    caption: 'Velocity highlight reel! Fast motion frames, extreme color saturation, and sharp audio edits. 🎬🌶️🍜 #motionreel #ramen #videoedit #energy',
    media: ['/assets/images/Ramngo ReelAd.png'],
    videoThumbnail: '/assets/images/Ramngo ReelAd.png',
    duration: '0:15',
    aspectRatio: '9/16',
    program: 'Adobe Premiere Pro',
    programIcon: 'Pr',
    projectId: 'ramngo',
    projectTitle: "RAMNGO",
    projectDescription: 'High-octane short-form video commercial tailored for vertical feed platforms.',
    tags: ['Video Production', 'Social Media']
  },

  // 3. NOMAD Adventure Shots (1:1)
  {
    id: 'nomad-img-1',
    type: 'image',
    username: 'nomad.wanderer',
    avatar: "/assets/images/NOMAD/NomadFinalLogo.png",
    verified: true,
    timeAgo: '6h ago',
    likes: 934,
    comments: 31,
    shares: 88,
    caption: 'Weatherproof log logs and navigation kits. NOMAD is built for those who find peace in the unrest of discovery. 🌍🎒🌲 #travel #adventure #tactilebranding #nomad',
    media: ['/assets/images/NOMAD/Socmed.png'],
    aspectRatio: '1/1',
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectId: 'nomad',
    projectTitle: 'NOMAD',
    projectDescription: 'Travel lifestyle brand — identity, video production, and content strategy across platforms.',
    tags: ['Video Production', 'Branding']
  },

  // 4. Stackhouse Bold Charcoal Plating (1:1)
  {
    id: 'stackhouse-img-1',
    type: 'image',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '2d ago',
    likes: 928,
    comments: 31,
    shares: 54,
    caption: 'Modern restaurant brand developed from the ground up featuring sculptural gastronomy, raw stone textures, and robust typographic matrices. 🥩🔥 #beef #grillculture #editorial',
    media: ['/assets/images/Stackhouse/Post1.png'],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'High-impact social media assets featuring high-contrast macro meat cuts.',
    tags: ['Branding', 'Photography']
  },

  // 5. Crumb Kinetic Reel (PNG reel)
  {
    id: 'crumb-reel-1',
    type: 'reel',
    username: 'crumb.cookies',
    avatar: "/assets/images/CRUMB/CrumbCookieLogo.png",
    verified: true,
    timeAgo: '4h ago',
    likes: 1245,
    comments: 54,
    shares: 98,
    caption: 'Satisfying baking texture and kinetic typography cuts. Capturing the sensory experience of Crumb. 🍪🔥 #reels #branding #typography #motions',
    media: ['/assets/images/CRUMB/Crumbreelad.png'],
    videoThumbnail: '/assets/images/CRUMB/Crumbreelad.png',
    duration: '0:15',
    aspectRatio: '9/16',
    program: 'Adobe Premiere Pro',
    programIcon: 'Pr',
    projectId: 'crumb',
    projectTitle: 'Crumb Cookies',
    projectDescription: 'Bespoke short-form kinetic branding reels showing artisan baking processes.',
    tags: ['Video Production', 'Social Media']
  },

  // 6. RAMNGO High-Velocity Street Branding (1:1)
  {
    id: 'ramngo-img-1',
    type: 'image',
    username: 'ramngo.streetfood',
    avatar: "/assets/images/RamngoMainLogo.png",
    verified: true,
    timeAgo: '5h ago',
    likes: 852,
    comments: 32,
    shares: 64,
    caption: 'Pure high-velocity branding. RAMNGO’s stark red and intense graphic lines cut straight through the digital clutter. 🌶️🔥 #streetfood #ramen #graphicdesign #branding',
    media: ['/assets/images/RamngoSocmed.png'],
    aspectRatio: '1/1',
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectId: 'ramngo',
    projectTitle: "RAMNGO",
    projectDescription: 'Vibrant branding and social media strategy for a premium, fast-moving street food ramen concept.',
    tags: ['Branding', 'Social Media']
  },

  // 7. NOMAD Expedition Reel MP4 Video (Plays in UI!)
  {
    id: 'nomad-reel-1',
    type: 'reel',
    username: 'nomad.wanderer',
    avatar: "/assets/images/NOMAD/NomadFinalLogo.png",
    verified: true,
    timeAgo: '4d ago',
    likes: 4120,
    comments: 342,
    shares: 981,
    caption: 'The restless explorer. Kinetic typography overlays, cinematic scale, and actual expedition footage playing live. ⛰️🌍🎒 #filmmaking #reels #aftereffects #cinematic',
    media: ['/assets/images/NOMAD/Nomad_LoopReel.mp4'],
    videoThumbnail: '/assets/images/NOMAD/ReelAD.png',
    duration: '0:28',
    aspectRatio: '9/16',
    program: 'Adobe After Effects',
    programIcon: 'Ae',
    projectId: 'nomad',
    projectTitle: 'NOMAD',
    projectDescription: 'Kinetic short-form campaign video displaying outdoor adventure sequences.',
    tags: ['Video Production', 'Social Media']
  },

  // 8. Stackhouse Culinary Carousel (1:1)
  {
    id: 'stackhouse-carousel',
    type: 'carousel',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '1d ago',
    likes: 1845,
    comments: 64,
    shares: 218,
    caption: 'The Stackhouse brand design architecture: converting avant-garde raw structural forms into a high-impact digital presence. Seared culinary textures, dark basalt plates, and crisp typographic rhythms. 🥩🔥🧱 #brutalism #brandidentity #stackhouse #typography #carousel',
    media: [
      '/assets/images/Stackhouse/StackhouseCarousel1.png',
      '/assets/images/Stackhouse/StackhouseCarousel2.png',
      '/assets/images/Stackhouse/StackhouseCarousel3.png'
    ],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'To communicate the confidence and sculptural style of the brand, I developed a high-impact social media system built around dramatic food close ups, dark basalt tables, and crisp typography.',
    tags: ['Branding', 'Photography', 'Art Direction']
  },

  // 9. Crumb Structured Minimal Alignment (1:1)
  {
    id: 'crumb-img-2',
    type: 'image',
    username: 'crumb.cookies',
    avatar: "/assets/images/CRUMB/CrumbCookieLogo.png",
    verified: true,
    timeAgo: '2d ago',
    likes: 720,
    comments: 31,
    shares: 45,
    caption: 'Identity exploration - clean structural alignment. Visual balance meets rustic warmth. 📐🍪 #graphicdesign #identity #crumb',
    media: ['/assets/images/CRUMB/Crumb2.png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'crumb',
    projectTitle: 'Crumb Cookies',
    projectDescription: 'Social graphics exploring geometry and typographic spacing.',
    tags: ['Branding', 'Graphic Design']
  },

  // 10. RAMNGO Fire-Engine Curation (1:1)
  {
    id: 'ramngo-img-2',
    type: 'image',
    username: 'ramngo.streetfood',
    avatar: "/assets/images/RamngoMainLogo.png",
    verified: true,
    timeAgo: '1d ago',
    likes: 914,
    comments: 41,
    shares: 72,
    caption: 'Full responsive grid curation. Red overlays, mechanical parameters, and food layout in absolute structural alignment. 🍜⚙️ #feeddesign #curation #aesthetic',
    media: ['/assets/images/RamngoSocmed2.png'],
    aspectRatio: '1/1',
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectId: 'ramngo',
    projectTitle: "RAMNGO",
    projectDescription: 'Full responsive social grid development featuring stark red brand matrices.',
    tags: ['Branding', 'Social Media']
  },

  // 11. NOMAD Field Navigation Guides (1:1)
  {
    id: 'nomad-img-2',
    type: 'image',
    username: 'nomad.wanderer',
    avatar: "/assets/images/NOMAD/NomadFinalLogo.png",
    verified: true,
    timeAgo: '1d ago',
    likes: 1042,
    comments: 44,
    shares: 112,
    caption: 'Field Navigation Guide sheets. Exploring coordinates and organic earth-shade typography pairs. 🗺️⛰️✈️ #outdoors #brandguidelines',
    media: ['/assets/images/NOMAD/SocmedAction.png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'nomad',
    projectTitle: 'NOMAD',
    projectDescription: 'Organic topographical layout files and outdoor map design sheets.',
    tags: ['Branding', 'Graphic Design']
  },

  // 12. Stackhouse Chef Hearth MP4 Video Reel (Plays in UI!)
  {
    id: 'stackhouse-reel-1',
    type: 'reel',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '1w ago',
    likes: 3120,
    comments: 142,
    shares: 418,
    caption: 'Chef Plating Editorial and Brutalist Dining Space. Standardizing on raw physical beauty to create an experiential social feed. 🔥🎥 #editorial #videoproduction #reels #stackhouse',
    media: ['/assets/images/Stackhouse/StackHouseReell.mp4'],
    videoThumbnail: '/assets/images/Stackhouse/StackhouseReel2.png',
    duration: '0:35',
    aspectRatio: '9/16',
    program: 'Adobe Premiere Pro',
    programIcon: 'Pr',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'Experiential culinary short-film exploring wood-fired hearths and premium chef plating.',
    tags: ['Video Production', 'Social Media']
  },

  // 13. Crumb Motion Graphics Reel (PNG Reel)
  {
    id: 'crumb-reel-2',
    type: 'reel',
    username: 'crumb.cookies',
    avatar: "/assets/images/CRUMB/CrumbCookieLogo.png",
    verified: true,
    timeAgo: '1d ago',
    likes: 1420,
    comments: 83,
    shares: 112,
    caption: 'Crumb Reels series 2. Soft crusts, deep focus lenses, and typographic grids in absolute sync. 🍞✨ #reels #motiongraphics #filmmaking #artisan',
    media: ['/assets/images/CRUMB/CrumbReelad2.png'],
    videoThumbnail: '/assets/images/CRUMB/CrumbReelad2.png',
    duration: '0:18',
    aspectRatio: '9/16',
    program: 'Adobe After Effects',
    programIcon: 'Ae',
    projectId: 'crumb',
    projectTitle: 'Crumb Cookies',
    projectDescription: 'Kinetic typography overlays and macro filming elements.',
    tags: ['Video Production', 'Social Media']
  },

  // 14. RAMNGO Specs & Grid Reel (PNG Reel)
  {
    id: 'ramngo-reel-2',
    type: 'reel',
    username: 'ramngo.streetfood',
    avatar: "/assets/images/RamngoMainLogo.png",
    verified: true,
    timeAgo: '1w ago',
    likes: 1890,
    comments: 92,
    shares: 203,
    caption: 'Artboard Specs and grid motion templates. Engineering the street flavor experience. 📐🟥🌶️ #aftereffects #motiongraphics #specs',
    media: ['/assets/images/RamngoArtboard 8.png'],
    videoThumbnail: '/assets/images/RamngoArtboard 8.png',
    duration: '0:12',
    aspectRatio: '9/16',
    program: 'Adobe After Effects',
    programIcon: 'Ae',
    projectId: 'ramngo',
    projectTitle: "RAMNGO",
    projectDescription: 'Exploded grid motion specification template highlights.',
    tags: ['Video Production', 'Social Media']
  },

  // 15. NOMAD Vertical Expedition Layout Reel (PNG Reel)
  {
    id: 'nomad-reel-2',
    type: 'reel',
    username: 'nomad.wanderer',
    avatar: "/assets/images/NOMAD/NomadFinalLogo.png",
    verified: true,
    timeAgo: '1w ago',
    likes: 3510,
    comments: 218,
    shares: 610,
    caption: 'Expedition campaign vertical layout elements. Frame in focus, text in motion. 🏔️🎥 #cinematheque #reelsproduction #nomad',
    media: ['/assets/images/NOMAD/ReelAD.png'],
    videoThumbnail: '/assets/images/NOMAD/ReelAD.png',
    duration: '0:15',
    aspectRatio: '9/16',
    program: 'Adobe Premiere Pro',
    programIcon: 'Pr',
    projectId: 'nomad',
    projectTitle: 'NOMAD',
    projectDescription: 'Kinetic mobile frames and vertical advertising sheets.',
    tags: ['Video Production', 'Social Media']
  },

  // 16. Stackhouse Spec Plate Sheets (1:1)
  {
    id: 'stackhouse-img-2',
    type: 'image',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '3d ago',
    likes: 1042,
    comments: 45,
    shares: 68,
    caption: 'Plate 2 Spec elements. Clean whitespace combined with deep, charred grill marks. 🥩🔥🦷 #platepresentation #editorialchef #stackhouse',
    media: ['/assets/images/Stackhouse/Post2.png'],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'Spec sheets and social media templates examining premium dining layouts.',
    tags: ['Branding', 'Photography']
  },

  // 17. Crumb Baked Stone & Charcoal Tones (1:1)
  {
    id: 'crumb-img-3',
    type: 'image',
    username: 'crumb.cookies',
    avatar: "/assets/images/CRUMB/CrumbCookieLogo.png",
    verified: true,
    timeAgo: '3d ago',
    likes: 805,
    comments: 29,
    shares: 52,
    caption: 'Deep tones of baked stone and charcoal typography. Our brand spectrum is earthy, honest, and warm. 🌾🌾 #palette #designfeed',
    media: ['/assets/images/CRUMB/Crumb3.png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'crumb',
    projectTitle: 'Crumb Cookies',
    projectDescription: 'Color palette and brand token specification highlights.',
    tags: ['Branding', 'Graphic Design']
  },

  // 18. RAMNGO Brutalist Street Broth Grid (1:1)
  {
    id: 'ramngo-img-3',
    type: 'image',
    username: 'ramngo.streetfood',
    avatar: "/assets/images/RamngoMainLogo.png",
    verified: true,
    timeAgo: '2d ago',
    likes: 1045,
    comments: 48,
    shares: 88,
    caption: 'The bold street food experience. Merging industrial design sheets with classic hot broth appeal. 🌶️🍜🔥 #brutalism #packaging #branding',
    media: ['/assets/images/RamngoSocmed3.png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'ramngo',
    projectTitle: "RAMNGO",
    projectDescription: 'Brutalist social tiles and visual language experiments.',
    tags: ['Branding', 'Social Media']
  },

  // 19. NOMAD Organic Spec Badges (1:1)
  {
    id: 'nomad-img-3',
    type: 'image',
    username: 'nomad.wanderer',
    avatar: "/assets/images/NOMAD/NomadFinalLogo.png",
    verified: true,
    timeAgo: '2d ago',
    likes: 978,
    comments: 37,
    shares: 93,
    caption: 'Rainproof and ready for elevation. Spec files of our classic expedition badges. 🌲🎒🏕️ #badge #logodesign #adventure',
    media: ['/assets/images/NOMAD/SocmedAction (2).png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'nomad',
    projectTitle: 'NOMAD',
    projectDescription: 'Badge systems and waterproof clothing print guidelines.',
    tags: ['Branding', 'Graphic Design']
  },

  // 20. Stackhouse Charcoal / Ember Flame Movie PNG Reel
  {
    id: 'stackhouse-reel-2',
    type: 'reel',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '1w ago',
    likes: 2790,
    comments: 110,
    shares: 315,
    caption: 'Editorial Reel 2. Capturing the flame, the smoke, and the searing temperature in 24 frames of absolute detail. 🔥💨🎬 #smokeandfire #macrochef #filmmaking',
    media: ['/assets/images/Stackhouse/StackhouseReel2.png'],
    videoThumbnail: '/assets/images/Stackhouse/StackhouseReel2.png',
    duration: '0:22',
    aspectRatio: '9/16',
    program: 'Adobe Premiere Pro',
    programIcon: 'Pr',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'Vertical advertising reel detailing restaurant textures and fire.',
    tags: ['Video Production', 'Social Media']
  },

  // 21. Crumb Tactile Paper & Box Design (1:1)
  {
    id: 'crumb-img-4',
    type: 'image',
    username: 'crumb.cookies',
    avatar: "/assets/images/CRUMB/CrumbCookieLogo.png",
    verified: true,
    timeAgo: '1w ago',
    likes: 670,
    comments: 18,
    shares: 24,
    caption: 'Packaging details & tactile paper texture. The physical feel is just as important as the digital interface. 📦🍪 #packaging #branding #printdesign',
    media: ['/assets/images/CRUMB/Crumb4.png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'crumb',
    projectTitle: 'Crumb Cookies',
    projectDescription: 'Packaging layouts and mockups for boxes, bags, and tapes.',
    tags: ['Branding', 'Graphic Design']
  },

  // 22. RAMNGO High-Tension Editorial Frames (1:1)
  {
    id: 'ramngo-img-4',
    type: 'image',
    username: 'ramngo.streetfood',
    avatar: "/assets/images/RamngoMainLogo.png",
    verified: true,
    timeAgo: '3d ago',
    likes: 1120,
    comments: 53,
    shares: 95,
    caption: 'RAMNGO high-velocity grid detail. Breaking standard margins to arrest interest and keep scroll retention. ⚡️🍜 #graphicdesign #editorial',
    media: ['/assets/images/Socmed44.png'],
    aspectRatio: '1/1',
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectId: 'ramngo',
    projectTitle: "RAMNGO",
    projectDescription: 'Grid layouts for promotional print and digital materials.',
    tags: ['Branding', 'Social Media']
  },

  // 24. Stackhouse Hearth Architectural Layout (1:1)
  {
    id: 'stackhouse-img-3',
    type: 'image',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '4d ago',
    likes: 1150,
    comments: 52,
    shares: 80,
    caption: 'Basalt backgrounds and raw material alignments. Emphasizing the physical heft of dining. 🧱🧱🔥 #interiordesign #basalt #grillhearth',
    media: ['/assets/images/Stackhouse/Post3.png'],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'Industrial restaurant layouts and texture overlays for posts and stories.',
    tags: ['Branding', 'Photography']
  },

  // 26. NOMAD Coordinates Patterns (1:1)
  {
    id: 'nomad-img-4',
    type: 'image',
    username: 'nomad.wanderer',
    avatar: "/assets/images/NOMAD/NomadFinalLogo.png",
    verified: true,
    timeAgo: '3d ago',
    likes: 1210,
    comments: 65,
    shares: 142,
    caption: 'Dynamic outdoor coordinate grids. Precise maps combined with untamed topography. ⛰️📐📍 #coordinates #mapping #brutalism',
    media: ['/assets/images/NOMAD/SocmedAction (3).png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'nomad',
    projectTitle: 'NOMAD',
    projectDescription: 'Explorative topographic grid patterns and hiking specs card sets.',
    tags: ['Branding', 'Graphic Design']
  },

  // 27. Stackhouse Hot Ember Oranges (1:1)
  {
    id: 'stackhouse-img-4',
    type: 'image',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '5d ago',
    likes: 870,
    comments: 29,
    shares: 42,
    caption: 'Stark black layouts punctuated by hot ember oranges. Pure confidence. 🥩🔥⬛ #rebranding #confidentdesign #gourmet',
    media: ['/assets/images/Stackhouse/Stackhousepost4.png'],
    aspectRatio: '1/1',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'Color schemes and high-contrast digital promotional blocks.',
    tags: ['Branding', 'Photography']
  },

  // 28. RAMNGO Structural Brand Overlays (1:1)
  {
    id: 'ramngo-img-5',
    type: 'image',
    username: 'ramngo.streetfood',
    avatar: "/assets/images/RamngoMainLogo.png",
    verified: true,
    timeAgo: '4d ago',
    likes: 689,
    comments: 21,
    shares: 34,
    caption: 'Stark geometric borders and frame matrices. Protecting brand assets with absolute visual control. 🟥🍜 #matrix #brandframe',
    media: ['/assets/images/RamngoSquare4.png'],
    aspectRatio: '1/1',
    program: 'Adobe Illustrator',
    programIcon: 'Ai',
    projectId: 'ramngo',
    projectTitle: "RAMNGO",
    projectDescription: 'Bespoke structural social templates and frames.',
    tags: ['Branding', 'Social Media']
  },

  // 29. Stackhouse Photography Density Specifications Manual (4:3 ratio)
  {
    id: 'stackhouse-photo-guide',
    type: 'image',
    username: 'stackhouse.hearth',
    avatar: "/assets/images/Stackhouse/StackhouseLogo.png",
    verified: true,
    timeAgo: '4w ago',
    likes: 1560,
    comments: 63,
    shares: 139,
    caption: 'Photography Guide & style specifications. Contrast, color-balance, and depth metrics. 📸🧱📐 #photoguide #manual',
    media: ['/assets/images/Stackhouse/StackhousePhotographyStyle.png'],
    aspectRatio: '4/3',
    program: 'Figma',
    programIcon: 'Fig',
    projectId: 'stackhouse',
    projectTitle: 'Stackhouse',
    projectDescription: 'Detailed photography guidelines examining food density, shadows, and temperature indices.',
    tags: ['Branding', 'Photography']
  }
];

const preferredOrder = [
  'designsentiments-reel', // Design Sentiments Brand Video (FIRST!)
  'crumb-carousel',
  'nomad-img-1',
  'ramngo-reel-1',
  'stackhouse-img-1',
  'designsentiments-carousel-1', // Spread out Design Sentiments
  'crumb-reel-1',
  'ramngo-img-1',
  'nomad-reel-1',
  'stackhouse-carousel',
  'designsentiments-carousel-2', // Spread out
  'crumb-img-2',
  'ramngo-img-2',
  'nomad-img-2',
  'stackhouse-reel-1',
  'designsentiments-carousel-3', // Spread out
  'crumb-reel-2',
  'ramngo-reel-2',
  'nomad-reel-2',
  'stackhouse-img-2',
  'designsentiments-carousel-4', // Spread out
  'crumb-img-3',
  'ramngo-img-3',
  'nomad-img-3',
  'stackhouse-reel-2',
  'designsentiments-carousel-5', // Spread out
  'crumb-img-4',
  'ramngo-img-4',
  'stackhouse-img-3',
  'nomad-img-4',
  'stackhouse-img-4',
  'ramngo-img-5',
  'stackhouse-photo-guide'
];

const postEnrichments: Record<string, { program: string; programIcon: string; projectDescription: string }> = {
  'designsentiments-reel': {
    program: 'Cliptographic, Adobe Premiere Pro, Adobe Photoshop',
    programIcon: 'Cliptographic',
    projectDescription: 'A motion graphics explainer exploring why film photography continues to exist despite advances in digital technology. The video opens with a contradiction to spark curiosity before exploring the reasons behind film\'s lasting appeal.'
  },
  'crumb-carousel': {
    program: 'Adobe Photoshop, Google NanoBanana Pro',
    programIcon: 'Ps',
    projectDescription: 'A personality-based carousel inspired by the popularity of zodiac posts and personality quizzes. The concept encourages viewers to relate to the content, making it naturally more engaging and shareable.'
  },
  'nomad-img-1': {
    program: 'Adobe Photoshop, Google NanoBanana Pro',
    programIcon: 'Ps',
    projectDescription: 'The product is shown in rugged outdoor conditions instead of a studio setting. The environment reinforces durability and positions the brand around exploration and performance.'
  },
  'ramngo-reel-1': {
    program: 'Sora Image Generation, Google NanoBanana Pro, Adobe Photoshop',
    programIcon: 'Sora',
    projectDescription: 'A static advertisement designed for the vertical Reel format. The composition communicates the message through one strong visual, making it easy to understand while scrolling.'
  },
  'stackhouse-img-1': {
    program: 'Sora Image Generation, Google NanoBanana Pro, Adobe Photoshop',
    programIcon: 'Sora',
    projectDescription: 'The burger dominates the composition before the headline is read. The copy, "Size matters. Especially here.", reinforces the visual through simple, memorable humor.'
  },
  'designsentiments-carousel-1': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'An editorial carousel examining how AI-generated content has evolved over recent years. The essay focuses on how creative workflows and expectations continue to change alongside the technology.'
  },
  'crumb-reel-1': {
    program: 'Sora Image Generation, Google NanoBanana Pro, Adobe Photoshop',
    programIcon: 'Sora',
    projectDescription: 'A playful advertisement comparing stacked cookies to the Leaning Tower of Pisa. The familiar landmark turns the cookies into the punchline while reinforcing product quality through humor.'
  },
  'ramngo-img-1': {
    program: 'Sora Image Generation, Google NanoBanana Pro, Adobe Photoshop',
    programIcon: 'Sora',
    projectDescription: 'A hero image designed to maximize appetite appeal through steam, rich colors, and a close composition. The product becomes the focal point without relying on excessive copy.'
  },
  'nomad-reel-1': {
    program: 'Adobe Premiere Pro, Adobe Photoshop',
    programIcon: 'Pr',
    projectDescription: 'A short reel featuring a climber on Mount Everest. The environment demonstrates durability and reinforces the brand\'s association with adventure and resilience.'
  },
  'stackhouse-carousel': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A three-slide carousel where one sandwich stretches across every panel. The concept encourages interaction while exaggerating the product\'s generous size.'
  },
  'designsentiments-carousel-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A personal essay exploring why coffee shops have become the workplace of the creative class. It examines how these spaces balance routine, focus, and social energy.'
  },
  'crumb-img-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'An empty cookie box paired with the line, "It was fun while it lasted." The missing cookies become proof of enjoyment, allowing viewers to imagine the experience themselves.'
  },
  'ramngo-img-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A clean product showcase highlighting the Chicken Ramen. Keeping the composition simple allows the ingredients and texture to become the primary focus.'
  },
  'nomad-img-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'An outdoor campaign inspired by leading adventure brands. Showing the product during a trail run builds credibility through real-world use instead of product claims.'
  },
  'stackhouse-reel-1': {
    program: 'Adobe Premiere Pro, Adobe Photoshop',
    programIcon: 'Pr',
    projectDescription: 'An animated promotion for the Chicken Teriyaki sandwich. Japanese-inspired music complements the product while strengthening the overall concept.'
  },
  'designsentiments-carousel-3': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A long-form editorial titled "Why Film Photography Refuses to Die." The essay explores why film continues to attract photographers beyond simple nostalgia.'
  },
  'crumb-reel-2': {
    program: 'Sora Image Generation, Google NanoBanana Pro, Adobe Photoshop',
    programIcon: 'Sora',
    projectDescription: 'A brand adaptation of the trending "I\'m bouta..." meme. The familiar format helps the content feel timely while connecting the brand to internet culture.'
  },
  'ramngo-reel-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A surreal advertisement showing ramen flowing from a smartphone. The visual turns online ordering into a simple and memorable metaphor for convenience.'
  },
  'nomad-reel-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A lifestyle image set in an extreme mountain environment. The harsh conditions reinforce the product\'s reliability without relying on technical specifications.'
  },
  'stackhouse-img-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A straightforward product advertisement designed to maintain consistency across the brand\'s social media while keeping the sandwich as the main attraction.'
  },
  'designsentiments-carousel-4': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'An editorial carousel arguing that design is more than aesthetics. The essay explains how good design solves problems, influences behavior, and gives purpose to visual decisions.'
  },
  'crumb-img-3': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A clean product image created to reinforce brand recognition while maintaining a consistent social media presence.'
  },
  'ramngo-img-3': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A surreal advertisement using exaggerated food proportions to create humor and capture attention within crowded social media feeds.'
  },
  'nomad-img-3': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'Another outdoor lifestyle image reinforcing the brand\'s identity through authentic product use and environmental storytelling.'
  },
  'stackhouse-reel-2': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A humorous advertisement featuring the line, "Contains vegetables. Probably healthy." The self-aware copy makes the brand feel more relatable and memorable.'
  },
  'designsentiments-carousel-5': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'An observational essay titled "Big Tech is Looksmaxxing." It explores how technology companies increasingly compete through aesthetics and emotional branding alongside functionality.'
  },
  'crumb-img-4': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A straightforward product image designed to maintain visual consistency while keeping the cookies as the center of attention.'
  },
  'ramngo-img-4': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A lineup of different ramen bowls paired with the message, "Your bowl, your way." The concept communicates menu variety while helping customers quickly find something that fits their preferences.'
  },
  'stackhouse-img-3': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'An advertisement for the Italian BLT featuring the headline, "A little Italy between bread." The copy gives the sandwich a memorable identity while communicating its flavor profile.'
  },
  'nomad-img-4': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A lifestyle advertisement showing the product in demanding outdoor conditions. The environment reinforces the brand\'s focus on performance and exploration.'
  },
  'stackhouse-img-4': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A casual lifestyle image featuring someone holding a sandwich. Including a person adds relatability while creating variety within the content strategy.'
  },
  'ramngo-img-5': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A campaign introducing a tarot-inspired ramen recommendation feature. Turning indecision into an interactive experience makes choosing a meal more engaging.'
  },
  'stackhouse-photo-guide': {
    program: 'Adobe Photoshop',
    programIcon: 'Ps',
    projectDescription: 'A clean product showcase highlighting freshness, texture, and ingredient quality while maintaining visual consistency across the brand\'s social media.'
  },
};

export const socialPosts: SocialPost[] = [...rawSocialPosts].map((p) => {
  const enrich = postEnrichments[p.id];
  if (enrich) {
    return {
      ...p,
      program: enrich.program,
      programIcon: enrich.programIcon,
      projectDescription: enrich.projectDescription,
    };
  }
  return p;
}).sort((a, b) => {
  const indexA = preferredOrder.indexOf(a.id);
  const indexB = preferredOrder.indexOf(b.id);
  const valA = indexA === -1 ? 999 : indexA;
  const valB = indexB === -1 ? 999 : indexB;
  return valA - valB;
});

