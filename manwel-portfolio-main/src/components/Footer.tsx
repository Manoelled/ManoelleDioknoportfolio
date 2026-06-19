import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-foreground/8 py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <AppLogo size={28} iconName="SparklesIcon" />
          <span className="font-bold text-sm text-foreground/60">ManoelleDiokno</span>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {[
            {
              label: 'Instagram',
              href: 'https://instagram.com',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              ),
            },
            {
              label: 'Behance',
              href: 'https://behance.net',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.483 1.808 1.399 2.083.582.173 1.349.048 1.675-.24h3.682zm-9.268-1.807h4.964c-.123-1.23-.571-2.232-2.498-2.232-1.761 0-2.268.979-2.466 2.232zM7.33 7.339c1.403 0 2.368.558 2.795 1.521.275.618.325 1.365.2 2.059-.139.771-.537 1.405-1.148 1.811-.613.405-1.381.594-2.247.594H3.77V7.339h3.56zm-.29 4.994c.571 0 .934-.126 1.154-.398.221-.272.31-.657.267-1.08-.044-.424-.201-.761-.467-.976-.266-.214-.64-.316-1.093-.316H5.744v2.77h1.296zM3.77 14.662h3.805c.639 0 1.162.122 1.567.365.404.243.717.62.885 1.082.169.462.204.985.104 1.482-.1.497-.32.947-.679 1.296-.359.349-.834.556-1.378.623a7.26 7.26 0 0 1-.853.047H3.77v-4.895zm2.977 3.012c.537 0 .893-.104 1.075-.313.183-.208.249-.527.2-.842-.049-.315-.209-.567-.47-.714-.26-.148-.61-.2-1.006-.2H5.744v2.069h1.003z"/>
                </svg>
              ),
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              ),
            },
          ]?.map((social) => (
            <a
              key={social?.label}
              href={social?.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social?.label}
              className="w-10 h-10 rounded-full border border-foreground/12 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:scale-110 transition-all duration-200"
            >
              {social?.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground font-medium">
          © 2026 Manoelle Diokno. All rights reserved.
        </p>

        {/* Legal */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          <span>·</span>
          <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}