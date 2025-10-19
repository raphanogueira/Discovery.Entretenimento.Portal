import React from 'react';

interface HeroSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  onVerIngressosClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef }) => {
  return (
    <section id="home" ref={sectionRef} className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(10, 10, 20, 0.7), rgba(10, 10, 20, 0.9)), url('https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">A Experiência Começa Aqui</h2>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-down animation-delay-300">Conectamos você a momentos inesquecíveis. Suas melhores histórias e a trilha sonora da sua vida te esperam na próxima história.</p>
      </div>
    </section>
  );
};