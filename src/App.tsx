import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Show } from './types/Show';
import { ShowGalleryPage } from './components/ShowGalleryPage';
import AuthLayout from './pages/AuthLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import { MainLayout } from './components/MainLayout';
import { Toaster } from 'sonner';

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
    { id: 'eventos', title: 'Eventos', ref: sectionRefs.eventos },
    { id: 'galeria', title: 'Galeria', ref: sectionRefs.galeria },
    { id: 'contato', title: 'Contato', ref: sectionRefs.contato }
  ];

  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/confirmar-email" element={<ConfirmEmailPage />} />
        </Route>
        <Route path="/" element={
          selectedShow ? (
            <ShowGalleryPage 
              show={selectedShow} 
              onBack={() => setSelectedShow(null)} 
            />
          ) : (
            <MainLayout
              navLinks={navLinks}
              activeLink={activeLink}
              isScrolled={isScrolled}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              handleNavClick={handleNavClick}
              sectionRefs={sectionRefs}
              onVerIngressosClick={() => handleNavClick(sectionRefs.ingressos)}
              onShowSelect={setSelectedShow}
              showBackToTop={showBackToTop}
              scrollToTop={scrollToTop}
            />
          )
        } />
      </Routes>
    </>
  );
};

export default App;