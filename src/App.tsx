/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import SocialFeedPage from './components/SocialFeedPage';
import ClientPortalPage from './components/ClientPortalPage';
import RamngoPage from './components/projects/ramngo/RamngoPage';
import CrumbPage from './components/projects/crumb/CrumbPage';
import NomadPage from './components/projects/nomad/NomadPage';
import StackhousePage from './components/projects/stackhouse/StackhousePage';
import CreativeWorksPage from './components/projects/creativeworks/CreativeWorksPage';
import DesignSentimentsPage from './components/projects/designsentiments/DesignSentimentsPage';
import CliptographicPage from './components/projects/cliptographic/CliptographicPage';
import FeaturedWorksPage from './components/FeaturedWorksPage';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import { Project } from './app/components/portfolioData';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('portfolio'); // 'portfolio' | 'client-portal' | 'featured-works' | brand-ids
  const [previousView, setPreviousView] = useState<string>('portfolio');

  const navigateToView = (view: string) => {
    setPreviousView(currentView);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isMainLayout = currentView === 'portfolio' || currentView === 'client-portal';
  const showBackgroundBlobs = isMainLayout || currentView === 'featured-works';

  const returnFromBrand = () => {
    setCurrentView(previousView);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (previousView === 'portfolio') {
      setTimeout(() => {
        const portfolioSec = document.getElementById('portfolio');
        if (portfolioSec) {
          portfolioSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans overflow-x-hidden p-0 m-0">
      {/* Universal Background Blur Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Scroll Progress Indicator for Project Showcase Pages */}
      <ScrollProgress currentView={currentView} />
      
      {showBackgroundBlobs && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 animate-blob-drift"
            style={{
              background: 'radial-gradient(circle, #BFD7FF 0%, #E8F0FF 40%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full opacity-15 animate-blob-drift"
            style={{
              background: 'radial-gradient(circle, #FFD6E8 0%, #FFF0F6 40%, transparent 70%)',
              animationDelay: '-6s',
            }}
          />
        </div>
      )}

      {isMainLayout && (
        <Header currentView={currentView} setCurrentView={(view) => navigateToView(view)} />
      )}

      {currentView === 'portfolio' ? (
        <>
          {/* Main Single Page Contents */}
          <HeroSection />
          
          <PortfolioSection 
            limit={3}
            onViewMoreClick={() => navigateToView('featured-works')}
            onProjectClick={(project) => {
              navigateToView(project.id);
            }} 
          />

          {/* Seamlessly Integrated Social designs device mockup */}
          <SocialFeedPage 
            onBackToPortfolio={handleScrollToTop} 
            onProjectClick={(projectId) => navigateToView(projectId)} 
          />

          <Footer />
        </>
      ) : currentView === 'featured-works' ? (
        <FeaturedWorksPage 
          onBack={() => navigateToView('portfolio')} 
          onProjectClick={(project) => navigateToView(project.id)} 
        />
      ) : currentView === 'ramngo' ? (
        <RamngoPage onBack={returnFromBrand} />
      ) : currentView === 'crumb' ? (
        <CrumbPage onBack={returnFromBrand} />
      ) : currentView === 'nomad' ? (
        <NomadPage onBack={returnFromBrand} />
      ) : currentView === 'stackhouse' ? (
        <StackhousePage onBack={returnFromBrand} />
      ) : currentView === 'creativeworks' ? (
        <CreativeWorksPage onBack={returnFromBrand} />
      ) : currentView === 'designsentiments' ? (
        <DesignSentimentsPage onBack={returnFromBrand} />
      ) : currentView === 'cliptographic' ? (
        <CliptographicPage onBack={returnFromBrand} />
      ) : (
        <div className="pt-16 sm:pt-20">
          <ClientPortalPage onBackToPortfolio={() => navigateToView('portfolio')} />
        </div>
      )}

    </div>
  );
}

