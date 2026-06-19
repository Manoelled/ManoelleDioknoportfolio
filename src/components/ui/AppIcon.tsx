import React from 'react';
import { 
  Sparkles, 
  Heart, 
  MessageSquare, 
  Share2, 
  Compass, 
  Play, 
  Layout, 
  Layers, 
  User, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
  Folder,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Check,
  Globe,
  Settings,
  Grid,
  Menu,
  X,
  HelpCircle,
  FileText
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  SparklesIcon: Sparkles,
  Sparkles: Sparkles,
  HeartIcon: Heart,
  Heart: Heart,
  ChatBubbleLeftRightIcon: MessageSquare,
  MessageSquare: MessageSquare,
  ShareIcon: Share2,
  Share2: Share2,
  CompassIcon: Compass,
  PlayIcon: Play,
  LayoutIcon: Layout,
  LayersIcon: Layers,
  UserIcon: User,
  ArrowTopRightOnSquareIcon: ExternalLink,
  ChevronLeftIcon: ChevronLeft,
  ChevronRightIcon: ChevronRight,
  PlusIcon: Plus,
  ArrowPathIcon: RefreshCw,
  FolderIcon: Folder,
  ArrowRightIcon: ArrowRight,
  ArrowLeftIcon: ArrowLeft,
  CalendarIcon: Calendar,
  GlobeAltIcon: Globe,
  Bars3Icon: Menu,
  XMarkIcon: X,
  QuestionMarkCircleIcon: HelpCircle,
  ClockIcon: FileText
};

export default function AppIcon({
  name,
  size = 24,
  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  const Component = iconMap[name] || iconMap[name + 'Icon'] || Sparkles;

  return (
    <Component
      size={size}
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
}
