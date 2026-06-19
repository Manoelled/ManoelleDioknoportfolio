import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-200/50 py-12 px-6 lg:px-16 bg-neutral-100/50">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
        {/* Copyright */}
        <p className="text-xs text-neutral-500 font-medium">
          © 2026 Manoelle Diokno. All rights reserved.
        </p>

        {/* Legal */}
        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <a href="#" className="hover:text-neutral-700 transition-colors">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:text-neutral-700 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
