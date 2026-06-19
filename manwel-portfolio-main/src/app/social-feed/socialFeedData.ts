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
  // reel specific
  videoThumbnail?: string;
  duration?: string;
  // detail panel
  program: string;
  programIcon: string;
  projectId?: string;
  projectTitle?: string;
  projectDescription: string;
  tags: string[];
}

export const socialPosts: SocialPost[] = [
{
  id: 'post-1',
  type: 'image',
  username: 'manoelle.diokno',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4776655-1777600010085.png",
  verified: true,
  timeAgo: '2h ago',
  likes: 984,
  comments: 42,
  shares: 148,
  caption: 'Crumb Bakery brand identity — warm tones, artisan feel. Every detail tells a story. 🍞✨',
  media: ['https://img.rocket.new/generatedImages/rocket_gen_img_1be3f33ca-1777598873128.png'],
  program: 'Adobe Illustrator',
  programIcon: 'Ai',
  projectId: 'crumb',
  projectTitle: 'Crumb Bakery',
  projectDescription: 'Full brand identity for an artisan bakery in Manila — logo, packaging, and digital presence.',
  tags: ['Branding', 'Graphic Design']
},
{
  id: 'post-2',
  type: 'carousel',
  username: 'manoelle.diokno',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14e8c06d5-1772530082838.png",
  verified: true,
  timeAgo: '1d ago',
  likes: 1240,
  comments: 87,
  shares: 203,
  caption: "Ramn'go street food concept — vibrant, bold, and unapologetically Filipino. Swipe to see the full brand system 🌶️",
  media: [
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'],

  program: 'Adobe Photoshop',
  programIcon: 'Ps',
  projectId: 'ramngo',
  projectTitle: "Ramn'go",
  projectDescription: 'Vibrant branding and social media strategy for a street food concept in BGC.',
  tags: ['Branding', 'Social Media']
},
{
  id: 'post-3',
  type: 'reel',
  username: 'manoelle.diokno',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12ea0046f-1774133450990.png",
  verified: true,
  timeAgo: '3d ago',
  likes: 3200,
  comments: 156,
  shares: 412,
  caption: 'NOMAD travel brand — motion identity reel. Built for the restless souls 🌍✈️ #travel #branding #motion',
  media: ['https://img.rocket.new/generatedImages/rocket_gen_img_18ee41cb4-1764832558067.png'],
  videoThumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_18ee41cb4-1764832558067.png',
  duration: '0:28',
  program: 'Adobe After Effects',
  programIcon: 'Ae',
  projectId: 'nomad',
  projectTitle: 'NOMAD',
  projectDescription: 'Travel lifestyle brand — identity, video production, and content strategy across platforms.',
  tags: ['Video Production', 'Branding']
},
{
  id: 'post-4',
  type: 'image',
  username: 'manoelle.diokno',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19c4dda91-1777600005371.png",
  verified: true,
  timeAgo: '5d ago',
  likes: 762,
  comments: 31,
  shares: 94,
  caption: 'Bloom Studio — botanical wellness identity. Soft, intentional, alive. 🌿',
  media: ['https://img.rocket.new/generatedImages/rocket_gen_img_1b5377add-1777598886168.png'],
  program: 'Figma',
  programIcon: 'Fig',
  projectId: 'bloom',
  projectTitle: 'Bloom Studio',
  projectDescription: 'Boutique wellness brand identity with soft, botanical visual language.',
  tags: ['Branding', 'Graphic Design']
},
{
  id: 'post-5',
  type: 'reel',
  username: 'manoelle.diokno',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11e1770ab-1772108371965.png",
  verified: true,
  timeAgo: '1w ago',
  likes: 5100,
  comments: 289,
  shares: 730,
  caption: 'Kinetic Films — motion graphics showreel. Energy in every frame. 🎬⚡',
  media: ['https://img.rocket.new/generatedImages/rocket_gen_img_107b83ddc-1777556420511.png'],
  videoThumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_107b83ddc-1777556420511.png',
  duration: '0:45',
  program: 'Adobe Premiere Pro',
  programIcon: 'Pr',
  projectId: 'kinetic',
  projectTitle: 'Kinetic Films',
  projectDescription: 'Short-form video production and motion graphics for a content-first agency.',
  tags: ['Video Production', 'Social Media']
},
{
  id: 'post-6',
  type: 'carousel',
  username: 'manoelle.diokno',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_174ea28f8-1774454251023.png",
  verified: true,
  timeAgo: '2w ago',
  likes: 1890,
  comments: 112,
  shares: 267,
  caption: 'Prism Agency rebrand — prismatic identity system. Swipe through the full campaign 🌈',
  media: [
  'https://img.rocket.new/generatedImages/rocket_gen_img_17cfe0820-1772171210250.png',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80'],

  program: 'Adobe Illustrator',
  programIcon: 'Ai',
  projectId: 'prism',
  projectTitle: 'Prism Agency',
  projectDescription: 'Comprehensive digital marketing campaigns and brand refresh for a creative agency.',
  tags: ['Digital Marketing', 'Graphic Design']
}];