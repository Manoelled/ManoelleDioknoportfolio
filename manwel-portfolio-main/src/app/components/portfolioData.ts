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
'Digital Marketing',
'Graphic Design',
'Social Media',
'Video Production'];


export const tagColors: Record<string, {bg: string;text: string;lightBg: string;darkText: string;}> = {
  'Branding': {
    bg: '#34C759',
    text: '#FFFFFF',
    lightBg: '#D4F5DE',
    darkText: '#1A6633'
  },
  'Digital Marketing': {
    bg: '#AF52DE',
    text: '#FFFFFF',
    lightBg: '#EDD9F8',
    darkText: '#5B1F7A'
  },
  'Graphic Design': {
    bg: '#FF3B30',
    text: '#FFFFFF',
    lightBg: '#FFD9D7',
    darkText: '#8B1610'
  },
  'Social Media': {
    bg: '#007AFF',
    text: '#FFFFFF',
    lightBg: '#D6E8FF',
    darkText: '#003D80'
  },
  'Video Production': {
    bg: '#FF9F0A',
    text: '#FFFFFF',
    lightBg: '#FFECD0',
    darkText: '#7A4600'
  }
};

export const projects: Project[] = [
{
  id: 'crumb',
  title: 'Crumb',
  description: 'Full brand identity for an artisan bakery in Manila — logo, packaging, and digital presence.',
  category: 'Brand Identity',
  year: '2025',
  tags: ['Branding', 'Digital Marketing', 'Graphic Design', 'Social Media'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1be3f33ca-1777598873128.png",
  previewImages: [
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#FFF8F0',
  accentColor: '#FF9F0A'
},
{
  id: 'ramngo',
  title: "Ramn'go",
  description: 'Vibrant branding and social media strategy for a street food concept in BGC.',
  category: 'Brand + Social',
  year: '2025',
  tags: ['Branding', 'Digital Marketing', 'Graphic Design', 'Social Media'],
  coverImage: "https://images.unsplash.com/photo-1717026777534-78336bae5ff8",
  previewImages: [
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#FFF0F5',
  accentColor: '#FF3B30'
},
{
  id: 'nomad',
  title: 'NOMAD',
  description: 'Travel lifestyle brand — identity, video production, and content strategy across platforms.',
  category: 'Full Brand',
  year: '2024',
  tags: ['Branding', 'Digital Marketing', 'Graphic Design', 'Social Media', 'Video Production'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18ee41cb4-1764832558067.png",
  previewImages: [
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#F0F4FF',
  accentColor: '#007AFF'
},
{
  id: 'bloom',
  title: 'Bloom Studio',
  description: 'Boutique wellness brand identity with soft, botanical visual language.',
  category: 'Brand Identity',
  year: '2024',
  tags: ['Branding', 'Graphic Design'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5377add-1777598886168.png",
  previewImages: [
  'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1585664811087-47f65abbad64?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#F5FFF0',
  accentColor: '#34C759'
},
{
  id: 'kinetic',
  title: 'Kinetic Films',
  description: 'Short-form video production and motion graphics for a content-first agency.',
  category: 'Video + Motion',
  year: '2024',
  tags: ['Video Production', 'Digital Marketing', 'Social Media'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_107b83ddc-1777556420511.png",
  previewImages: [
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1536240478700-b869ad10e128?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#FFF5F0',
  accentColor: '#FF9F0A'
},
{
  id: 'prism',
  title: 'Prism Agency',
  description: 'Comprehensive digital marketing campaigns and brand refresh for a creative agency.',
  category: 'Digital Campaign',
  year: '2024',
  tags: ['Digital Marketing', 'Social Media', 'Graphic Design'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17cfe0820-1772171210250.png",
  previewImages: [
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#F5F0FF',
  accentColor: '#AF52DE'
},
{
  id: 'verde',
  title: 'Verde Market',
  description: 'Farm-to-table market branding — logo, signage, packaging, and social content.',
  category: 'Brand + Print',
  year: '2023',
  tags: ['Branding', 'Graphic Design', 'Social Media'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1139875ff-1767030666369.png",
  previewImages: [
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#F0FFF5',
  accentColor: '#34C759'
},
{
  id: 'pulse',
  title: 'Pulse Fitness',
  description: 'High-energy gym brand with dynamic visual identity and reels content strategy.',
  category: 'Brand + Video',
  year: '2023',
  tags: ['Branding', 'Video Production', 'Social Media', 'Digital Marketing'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_121498676-1772745342117.png",
  previewImages: [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#FFF0F0',
  accentColor: '#FF3B30'
},
{
  id: 'archipelago',
  title: 'Archipelago',
  description: 'Philippine tourism campaign — photography direction, video, and digital marketing.',
  category: 'Campaign',
  year: '2023',
  tags: ['Digital Marketing', 'Video Production', 'Social Media', 'Graphic Design'],
  coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18ee41cb4-1764832558067.png",
  previewImages: [
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=300&q=70',
  'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=300&q=70'],

  bgColor: '#F0F8FF',
  accentColor: '#007AFF'
}];