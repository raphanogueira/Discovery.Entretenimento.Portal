import React from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { ExperienceSection } from './ExperienceSection';
import { EventsSection } from './EventsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { BackToTopButton } from './BackToTopButton';
import { GallerySection } from './GallerySection';
import type { Show } from '../types/Show';

interface MainLayoutProps {
  navLinks: { id: string; title: string; ref: React.RefObject<HTMLElement | null> }[];
  activeLink: string;
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleNavClick: (ref: React.RefObject<HTMLElement | null>) => void;
  sectionRefs: { [key: string]: React.RefObject<HTMLElement | null> };
  onVerIngressosClick: () => void;
  onShowSelect: (show: Show) => void;
  showBackToTop: boolean;
  scrollToTop: () => void;
  isAuthenticated: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  navLinks,
  activeLink,
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  handleNavClick,
  sectionRefs,
  onVerIngressosClick,
  onShowSelect,
  showBackToTop,
  scrollToTop,
  isAuthenticated,
}) => {
  return (
    <div className="bg-gray-900 text-white font-sans overflow-x-hidden">
      <Header
        navLinks={navLinks}
        activeLink={activeLink}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleNavClick={handleNavClick}
      />
      <main>
        <HeroSection sectionRef={sectionRefs.home} onVerIngressosClick={onVerIngressosClick} />
        <ExperienceSection ref={sectionRefs.experiencia} />
        <EventsSection ref={sectionRefs.eventos} />
        {isAuthenticated && (
          <GallerySection 
            ref={sectionRefs.galeria} 
            onShowSelect={onShowSelect} 
          />
        )}
        <ContactSection ref={sectionRefs.contato} />
      </main>
      <Footer />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  );
};
