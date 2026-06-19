import React from 'react';
import { motion } from 'motion/react';
import { Menu, Search } from 'lucide-react';

export const IOSNav: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="ios-nav fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">P.</span>
        </div>
        <span className="font-bold tracking-tight text-primary">Portfolio</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="#" className="text-primary hover:text-accent transition-colors">Work</a>
        <a href="#" className="hover:text-accent transition-colors">About</a>
        <a href="#" className="hover:text-accent transition-colors">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-secondary rounded-full transition-colors">
          <Search size={20} className="text-primary" />
        </button>
        <button className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors">
          <Menu size={20} className="text-primary" />
        </button>
      </div>
    </motion.nav>
  );
};
