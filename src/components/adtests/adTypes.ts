export type AdSize = '300x250' | '336x280' | '728x90' | '300x600' | '320x100' | '320x50';

export interface AdSizeConfig {
  size: AdSize;
  width: number;
  height: number;
  label: string;
  category: 'Medium Rectangle' | 'Large Rectangle' | 'Leaderboard' | 'Half Page' | 'Large Mobile' | 'Mobile Banner';
}

export const AD_SIZES: AdSizeConfig[] = [
  { size: '300x250', width: 300, height: 250, label: '300 × 250', category: 'Medium Rectangle' },
  { size: '336x280', width: 336, height: 280, label: '336 × 280', category: 'Large Rectangle' },
  { size: '728x90', width: 728, height: 90, label: '728 × 90', category: 'Leaderboard' },
  { size: '300x600', width: 300, height: 600, label: '300 × 600', category: 'Half Page' },
  { size: '320x100', width: 320, height: 100, label: '320 × 100', category: 'Large Mobile' },
  { size: '320x50', width: 320, height: 50, label: '320 × 50', category: 'Mobile Banner' },
];

export interface AdTypeMetadata {
  id: string;
  title: string;
  promptNum: number;
  description: string;
  interactionSummary: string;
}

export const AD_TYPES: AdTypeMetadata[] = [
  {
    id: 'color-swap',
    title: 'Color-Swap Ad',
    promptNum: 1,
    description: 'Cycle between 4 preset accent colors using round selector dots. Smooth background / shape transitions.',
    interactionSummary: '4 color selector dots (or tap target on 320x50) updating accent fill, with fixed CTA center-bottom.',
  },
  {
    id: 'multi-panel',
    title: 'Multi-Panel Hover Ad',
    promptNum: 2,
    description: 'Grid/split panels that reveal secondary copy or accent fill on hover (or tap on touch).',
    interactionSummary: '2x2 grid, vertical stack, or horizontal panel split with hover/tap reveal states.',
  },
  {
    id: 'chatbox',
    title: 'Chatbox Ad',
    promptNum: 3,
    description: 'Simulated minimal chat interface with pre-set question chips and typing-delay answer reveals.',
    interactionSummary: 'Tappable question chips trigger typing indicator and pre-written answer bubbles.',
  },
  {
    id: 'quiz-funnel',
    title: 'Quiz-Funnel Ad',
    promptNum: 4,
    description: 'Short linear quiz funnel (question → answer → next step) with progress bar/dots.',
    interactionSummary: 'Multi-step question progression with horizontal slide transition and final result CTA screen.',
  },
  {
    id: 'flipbook',
    title: 'Flipbook Ad',
    promptNum: 5,
    description: 'Page-turn style reveal simulating 2–4 interactive pages with page counter and 3D transforms.',
    interactionSummary: '3D page-turn flip animation with next/prev controls or tap corner trigger.',
  },
  {
    id: 'cylinder-scroll',
    title: '3D Cylinder Scroll-Lock Ad',
    promptNum: 6,
    description: '3D rotating cylinder of panels that snaps/locks to one face at a time on scroll or swipe.',
    interactionSummary: 'Vertical/horizontal 3D perspective cylinder with scroll-snap and active face indicators.',
  },
  {
    id: 'hover-reveal',
    title: 'Animate-on-Hover Ad',
    promptNum: 7,
    description: 'Hover triggers a full panel animation—a shape sweeps from left-to-right, revealing the "Explore" CTA gliding from the left to the center.',
    interactionSummary: 'Interactive mouse hover (or tap on touch) triggers high-impact left-to-right revealing transitions and sliding text dynamics.',
  },
];
