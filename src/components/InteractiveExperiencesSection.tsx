import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, ExternalLink, RotateCw, Globe, Lock } from 'lucide-react';

interface ExperienceSite {
  id: string;
  name: string;
  domain: string;
  displayDomain?: string;
  url: string;
  category: string;
  description: string;
  badge: string;
  hideUrl?: boolean;
}

const experienceSites: ExperienceSite[] = [
  {
    id: 'cliptographic',
    name: 'Cliptographic',
    domain: 'cliptographic.com',
    url: 'https://cliptographic.com',
    category: 'SaaS Motion Tool',
    description: 'An open-source SaaS motion graphics web tool for rapid typography & video asset generation.',
    badge: 'SAAS WEB APP',
  },
  {
    id: 'ramngo',
    name: 'RAMNGO',
    domain: 'ramngo.com',
    displayDomain: 'ramngo.com',
    url: 'https://ramngo-website.vercel.app/',
    category: 'Japanese Culinary Web',
    description: 'Interactive brand experience for an artisanal Japanese ramen house and modern dining venue.',
    badge: 'BRAND EXPERIENCE',
    hideUrl: true,
  },
  {
    id: 'crumb',
    name: 'Crumb Cookies',
    domain: 'crumbcookies.com',
    displayDomain: 'crumbcookies.com',
    url: 'https://crumbcookies.vercel.app/',
    category: 'Gourmet E-Commerce',
    description: 'Digital storefront and ordering interface for a boutique gourmet cookie bakery.',
    badge: 'E-COMMERCE STORE',
    hideUrl: true,
  },
  {
    id: 'designsentiments',
    name: 'Design Sentiments',
    domain: 'designsentiments.com',
    url: 'https://designsentiments.com',
    category: 'Editorial Journal',
    description: 'Minimalist digital publication exploring design theory, typography, and creative philosophy.',
    badge: 'DIGITAL PUBLICATION',
  },
];

export default function InteractiveExperiencesSection() {
  const [activeSiteId, setActiveSiteId] = useState<string>('cliptographic');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeSite = experienceSites.find((site) => site.id === activeSiteId) || experienceSites[0];

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section id="interactive-experiences" className="py-16 sm:py-24 bg-[#F2F2F7] relative border-t border-neutral-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight font-sans">
            Live Web Experiences
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 font-medium leading-relaxed">
            Test and interact with live web applications and concepts in real time.
          </p>
        </div>

        {/* Layout Container: Selector on Left (on desktop), Browser Frame on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Site Selection Sidebar (Left on desktop, bottom on mobile) */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1 px-1">
              Select Experience
            </p>
            {experienceSites.map((site) => {
              const isSelected = site.id === activeSiteId;
              return (
                <button
                  key={site.id}
                  onClick={() => {
                    setActiveSiteId(site.id);
                    setIframeKey((prev) => prev + 1);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                      : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200/90 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className={`text-base sm:text-lg font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                        {site.name}
                      </h3>
                      <Globe size={16} className={isSelected ? 'text-amber-400' : 'text-neutral-400'} />
                    </div>
                    {!site.hideUrl && (
                      <p className={`text-xs mt-0.5 truncate ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {site.displayDomain || site.domain}
                      </p>
                    )}
                  </div>

                  <p className={`mt-2.5 pt-2 border-t text-xs leading-relaxed ${
                    isSelected ? 'border-white/10 text-neutral-300' : 'border-neutral-100 text-neutral-500'
                  }`}>
                    {site.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Browser Mockup Frame (Right on desktop, top on mobile) */}
          <div className="lg:col-span-8 order-1 lg:order-2 bg-white border border-neutral-300/90 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
            
            {/* Top Browser Toolbar */}
            <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <button
                  onClick={handleRefresh}
                  title="Reload Frame"
                  className="ml-2 p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <RotateCw size={14} />
                </button>
              </div>

              {/* Address Bar */}
              <div className="flex-1 max-w-xl mx-2 bg-white px-3.5 py-1.5 rounded-lg border border-neutral-200 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-neutral-700 font-medium truncate">
                  <Lock size={12} className="text-emerald-600 flex-shrink-0" />
                  {!activeSite.hideUrl ? (
                    <>
                      <span className="text-neutral-400 select-none hidden sm:inline">https://</span>
                      <span className="font-semibold text-neutral-900 truncate">
                        {activeSite.displayDomain || activeSite.domain}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-neutral-900 truncate">
                      {activeSite.name}
                    </span>
                  )}
                </div>
                {!activeSite.hideUrl && (
                  <a
                    href={activeSite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-md border border-neutral-200 transition-colors flex-shrink-0"
                  >
                    <span>Open</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* View Mode Toggle (Desktop / Mobile) */}
              {!isMobileDevice && (
                <div className="flex items-center bg-neutral-200/80 p-0.5 rounded-lg border border-neutral-300">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === 'desktop'
                        ? 'bg-white text-neutral-900 shadow-2xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Monitor size={14} />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === 'mobile'
                        ? 'bg-white text-neutral-900 shadow-2xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Smartphone size={14} />
                    <span>Mobile</span>
                  </button>
                </div>
              )}
            </div>

            {/* Iframe Viewport */}
            <div className="bg-neutral-900 transition-all duration-300 flex items-center justify-center p-2 sm:p-6 min-h-[480px] sm:min-h-[580px]">
              {isMobileDevice || viewMode === 'mobile' ? (
                <div className="w-full max-w-[340px] aspect-[9/16] bg-neutral-950 relative rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl my-2">
                  <iframe
                    key={`${activeSite.id}-mobile-${iframeKey}`}
                    src={activeSite.url}
                    className="absolute inset-0 w-full h-full border-0"
                    title={activeSite.name}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[16/9] bg-neutral-950 relative rounded-xl overflow-hidden border border-neutral-700 shadow-xl">
                  <iframe
                    key={`${activeSite.id}-desktop-${iframeKey}`}
                    src={activeSite.url}
                    className="absolute inset-0 w-full h-full border-0"
                    title={activeSite.name}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="bg-neutral-50 border-t border-neutral-200 px-4 py-3 flex items-center justify-between text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Live Web Application</span>
              </div>
              {!activeSite.hideUrl && (
                <a
                  href={activeSite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 underline font-medium flex items-center gap-1"
                >
                  <span>{activeSite.displayDomain || activeSite.domain}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

