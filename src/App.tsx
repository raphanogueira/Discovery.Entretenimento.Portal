import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TicketsSection } from './components/TicketsSection';
import { EventsSection } from './components/EventsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { GallerySection } from './components/GallerySection';
import type { Show } from './types/Show';
import { ShowGalleryPage } from './components/ShowGalleryPage';

const App = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    experiencia: useRef<HTMLElement>(null),
    ingressos: useRef<HTMLElement>(null),
    eventos: useRef<HTMLElement>(null),
    contato: useRef<HTMLElement>(null),
    galeria: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowBackToTop(scrollY > 300);

      let currentSection = 'home';
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current && scrollY >= ref.current.offsetTop - 150) {
          currentSection = key;
        }
      });
      setActiveLink(currentSection);

      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top <= window.innerHeight - 100) {
          el.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', title: 'Início', ref: sectionRefs.home },
    { id: 'experiencia', title: 'A Experiência', ref: sectionRefs.experiencia },
    // { id: 'ingressos', title: 'Ingressos', ref: sectionRefs.ingressos },
    { id: 'eventos', title: 'Eventos', ref: sectionRefs.eventos },
    { id: 'galeria', title: 'Galeria', ref: sectionRefs.galeria },
    { id: 'contato', title: 'Contato', ref: sectionRefs.contato }
  ];

  return (
    <div className="bg-gray-900 text-white font-sans overflow-x-hidden">
      {selectedShow ? (
        <ShowGalleryPage 
          show={selectedShow} 
          onBack={() => setSelectedShow(null)} 
        />
      ) : (
        <>
          <Header
            navLinks={navLinks}
            activeLink={activeLink}
            isScrolled={isScrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            handleNavClick={handleNavClick}
          />

          <main>
            <HeroSection sectionRef={sectionRefs.home} onVerIngressosClick={() => handleNavClick(sectionRefs.ingressos)} />
            <ExperienceSection ref={sectionRefs.experiencia} />
            {/* <TicketsSection ref={sectionRefs.ingressos} /> */}
            <EventsSection ref={sectionRefs.eventos} />
            <GallerySection 
              ref={sectionRefs.galeria} 
              onShowSelect={setSelectedShow} 
            />
            <ContactSection ref={sectionRefs.contato} />
          </main>

          <Footer />
          <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
        </>
      )}
    </div>
  );
};

export default App;