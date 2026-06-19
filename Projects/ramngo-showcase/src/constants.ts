import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aura App',
    category: 'Mobile Design',
    description: 'A revolutionary mindfulness app built with a focus on serene user experiences and minimalist aesthetics. Aura helps users find their calm through guided meditations and atmospheric soundscapes, all wrapped in a fluid, iOS-native interface.',
    mainImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop'],
    tags: ['UI/UX', 'Mobile', 'iOS'],
    date: 'Spring 2024'
  },
  {
    id: '2',
    title: 'Lumina Web',
    category: 'Web Development',
    description: 'A high-performance editorial platform for design news. Lumina combines aggressive minimalist layouts with fast-loading tech to create a reading experience that is as beautiful as it is efficient. Built with React and optimized for deep reading.',
    mainImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'],
    tags: ['React', 'Frontend', 'Design'],
    date: 'Summer 2023'
  },
  {
    id: '3',
    title: 'Verve Identity',
    category: 'Branding',
    description: 'Complete visual identity for Verve, a sustainable fashion brand. From logo development to packaging design, this project focuses on the intersection of modern luxury and ecological responsibility.',
    mainImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop'],
    tags: ['Branding', 'Identity', 'Print'],
    date: 'Winter 2023'
  }
];
