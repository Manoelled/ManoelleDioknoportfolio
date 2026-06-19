export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  tags: string[];
  coverImage: string;
  previewImages: string[];
  bgColor: string;
  accentColor: string;
}

export const allTags = [
  'Branding',
  'Digital marketing',
  'Graphic design',
  'Social media',
  'Video production',
  'Website UI/UX design',
  'AI creatives',
  'Creative direction',
  'Packaging',
  'Copywriting',
  'SaaS'
];


export const tagColors: Record<string, {bg: string;text: string;lightBg: string;darkText: string;}> = {
  'Branding': {
    bg: '#34C759',
    text: '#FFFFFF',
    lightBg: '#D4F5DE',
    darkText: '#1A6633'
  },
  'Digital marketing': {
    bg: '#AF52DE',
    text: '#FFFFFF',
    lightBg: '#EDD9F8',
    darkText: '#5B1F7A'
  },
  'Graphic design': {
    bg: '#FF3B30',
    text: '#FFFFFF',
    lightBg: '#FFD9D7',
    darkText: '#8B1610'
  },
  'Social media': {
    bg: '#007AFF',
    text: '#FFFFFF',
    lightBg: '#D6E8FF',
    darkText: '#003D80'
  },
  'Video production': {
    bg: '#FF9F0A',
    text: '#FFFFFF',
    lightBg: '#FFECD0',
    darkText: '#7A4600'
  },
  'Website UI/UX design': {
    bg: '#5856D6',
    text: '#FFFFFF',
    lightBg: '#EBEBFA',
    darkText: '#2C2A8A'
  },
  'AI creatives': {
    bg: '#00C7BE',
    text: '#FFFFFF',
    lightBg: '#D6F8F6',
    darkText: '#006B66'
  },
  'Creative direction': {
    bg: '#FF2D55',
    text: '#FFFFFF',
    lightBg: '#FFD1DC',
    darkText: '#990022'
  },
  'Packaging': {
    bg: '#FF5E3A',
    text: '#FFFFFF',
    lightBg: '#FFEFEA',
    darkText: '#8E2000'
  },
  'Copywriting': {
    bg: '#FF4E00',
    text: '#FFFFFF',
    lightBg: '#FFECE5',
    darkText: '#A32A00'
  },
  'SaaS': {
    bg: '#5E5CE6',
    text: '#FFFFFF',
    lightBg: '#EBEBFA',
    darkText: '#2C2A8A'
  }
};

export const projects: Project[] = [
{
  id: 'crumb',
  title: 'Crumb Cookies',
  description: 'Full brand identity for an artisan cookie and flour workshop in Manila — logo, packaging, and digital presence.',
  category: 'Brand Identity',
  year: '2025',
  tags: [
    'Branding',
    'Social media',
    'Website UI/UX design',
    'AI creatives',
    'Creative direction',
    'Graphic design',
    'Digital marketing',
    'Packaging'
  ],
  coverImage: "/assets/images/CRUMB/CrumbCookieLogo.png",
  previewImages: [
    "/assets/images/CRUMB/SocmedBanner.png",
    "/assets/images/CRUMB/Crumbreelad.png",
    "/assets/images/CRUMB/CrumbReelad2.png",
    "/assets/images/CRUMB/LandingPageConcept.png"
  ],

  bgColor: '#FFF8F0',
  accentColor: '#FF9F0A'
},
{
  id: 'ramngo',
  title: "RAMNGO",
  description: 'Vibrant branding and social media strategy for a premium, fast-moving street food ramen concept.',
  category: 'Brand + Social',
  year: '2025',
  tags: [
    'Branding',
    'Digital marketing',
    'Graphic design',
    'Packaging',
    'Website UI/UX design',
    'AI creatives',
    'Creative direction',
    'Social media'
  ],
  coverImage: "/assets/images/RamngoMainLogo.png",
  previewImages: [
    '/assets/images/RamngoSocmed.png',
    '/assets/images/RamngoSocmed2.png',
    '/assets/images/RamngoSocmed3.png',
    '/assets/images/RamngoSquare4.png'
  ],

  bgColor: '#FFFFFF',
  accentColor: '#FF3B30'
},
{
  id: 'nomad',
  title: 'NOMAD',
  description: 'Travel lifestyle brand — identity, video production, and content strategy across platforms.',
  category: 'Full Brand',
  year: '2024',
  tags: [
    'AI creatives',
    'Creative direction',
    'Website UI/UX design',
    'Video production',
    'Social media',
    'Graphic design',
    'Branding'
  ],
  coverImage: "/assets/images/NOMAD/Banner (4).png",
  previewImages: [
    "/assets/images/NOMAD/UIConcept2.png",
    "/assets/images/NOMAD/ReelAD.png",
    "/assets/images/NOMAD/ReelAd (2).png"
  ],

  bgColor: '#F0F4FF',
  accentColor: '#007AFF'
},
{
  id: 'stackhouse',
  title: 'Stackhouse',
  description: 'Modern restaurant brand developed from the ground up featuring sculptural gastronomy, exaggerated styling, and robust digital presence.',
  category: 'Brand Identity',
  year: '2024',
  tags: [
    'Branding',
    'Digital marketing',
    'Video production',
    'Social media',
    'Graphic design',
    'Packaging',
    'Website UI/UX design',
    'AI creatives',
    'Creative direction'
  ],
  coverImage: "/assets/images/Stackhouse/StackhouseThumbnailorBanner.png",
  previewImages: [
    '/assets/images/Stackhouse/StackhouseCarousel1.png',
    '/assets/images/Stackhouse/StackhouseCarousel2.png',
    '/assets/images/Stackhouse/StackhouseCarousel3.png'],

  bgColor: '#FFFBF5',
  accentColor: '#FF9500'
},
{
  id: 'designsentiments',
  title: 'Design Sentiments',
  description: 'An editorial design diary, minimalist graphic systems, digital marketing layouts, and website UI/UX concepts processing the evolution of craft and technology.',
  category: 'Art Direction & Print',
  year: '2025',
  tags: [
    'Branding',
    'Graphic design',
    'Website UI/UX design',
    'Social media',
    'Digital marketing',
    'Creative direction',
    'Copywriting'
  ],
  coverImage: "/assets/images/DesignSentiments/DesignSentiments_Thumbnail.png",
  previewImages: [
    "/assets/images/DesignSentiments/DesignSentimentsCarousel1.png",
    "/assets/images/DesignSentiments/DesignSentimentsCarousel2.png",
    "/assets/images/DesignSentiments/DesignSentimentsCarousel3.png"
  ],
  bgColor: '#FAF9F6',
  accentColor: '#FF3B30'
},
{
  id: 'dc-business-solutions',
  title: 'DC Business Solutions',
  description: 'Tailored enterprise corporate solutions design framework, business workflow optimization designs, and technical presentation identity.',
  category: 'Corporate Identity',
  year: '2025',
  tags: [
    'Branding',
    'Website UI/UX design',
    'Digital marketing',
    'Graphic design'
  ],
  coverImage: "/assets/images/DC_Thumbnail.png",
  previewImages: [
    "/assets/images/DC_Thumbnail.png",
    "/assets/images/CRUMB/SocmedBanner.png"
  ],
  bgColor: '#F3F4F6',
  accentColor: '#5856D6'
},
{
  id: 'cliptographic',
  title: 'Cliptographic',
  description: 'Cinematic, high-energy media editing, social video brand kits, and tailored post-production layouts for social agencies.',
  category: 'Creative Media',
  year: '2024',
  tags: [
    'SaaS',
    'Video production',
    'Social media',
    'AI creatives',
    'Creative direction',
    'Graphic design'
  ],
  coverImage: "/assets/images/Cliptographic_thumbnail.png",
  previewImages: [
    "/assets/images/Cliptographic_thumbnail.png",
    "/assets/images/Stackhouse/StackhouseReel2-1.png",
    "/assets/images/NOMAD/ReelAD.png"
  ],
  bgColor: '#0A0A0A',
  accentColor: '#FF9F0A'
}
];
