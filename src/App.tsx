import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, ChevronUp, Menu, X } from 'lucide-react';

// --- Componente Principal App ---
const App = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    experiencia: useRef<HTMLElement>(null),
    ingressos: useRef<HTMLElement>(null),
    eventos: useRef<HTMLElement>(null),
    contato: useRef<HTMLElement>(null),
  };

  // --- Efeito para eventos de scroll ---
  useEffect(() => {
    const handleScroll = () => {
      // Lógica para o header
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Lógica para o botão "Voltar ao Topo"
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Lógica para o link de navegação ativo
      let currentSection = 'home';
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current && window.scrollY >= ref.current.offsetTop - 150) {
          currentSection = key;
        }
      });
      setActiveLink(currentSection);

      // Lógica para animações ao rolar
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
          el.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez no carregamento inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { id: 'home', title: 'Início', ref: sectionRefs.home },
    { id: 'experiencia', title: 'A Experiência', ref: sectionRefs.experiencia },
    { id: 'ingressos', title: 'Ingressos', ref: sectionRefs.ingressos },
    { id: 'eventos', title: 'Eventos', ref: sectionRefs.eventos },
    { id: 'contato', title: 'Contato', ref: sectionRefs.contato },
  ];
  
  const handleNavClick = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }

  // --- DADOS MOCKADOS ---
  const galeriaItems = [
    { id: 1, categoria: 'show', img: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', evento: 'Festival Starlight' },
    { id: 2, categoria: 'festival', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', evento: 'Verão Eletrônico' },
    { id: 3, categoria: 'festival', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', evento: 'Sunrise Fest' },
  ];

  const ingressos = [
    { tipo: 'Pista', preco: '120,00', beneficios: ['Acesso ao setor Pista', 'Visão geral do palco', 'Bares e banheiros no setor'] },
    { tipo: 'Pista Premium', preco: '210,00', beneficios: ['Acesso à frente do palco', 'Entrada diferenciada', 'Bares e banheiros exclusivos'], destaque: true },
    { tipo: 'Camarote', preco: '350,00', beneficios: ['Visão privilegiada', 'Open bar e food', 'After-party exclusiva'] },
  ];

  const eventosFuturos = [
    { nome: 'Show Acústico', data: '25 DEZ 2025', local: 'Teatro Principal', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  ];

  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* --- CABEÇALHO --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-400">Discovery</h1>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.ref); }}
                className={`text-lg transition-colors duration-300 hover:text-indigo-400 pb-1 ${activeLink === link.id ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}`}
              >
                {link.title}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {/* Menu Mobile */}
        {isMenuOpen && (
            <div className="md:hidden bg-gray-900/95 backdrop-blur-sm flex flex-col items-center py-4 space-y-4">
                {navLinks.map((link) => (
                <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.ref); }}
                    className="text-xl transition-colors duration-300 hover:text-indigo-400"
                >
                    {link.title}
                </a>
                ))}
            </div>
        )}
      </header>

      <main>
        {/* --- SEÇÃO HERO --- */}
        <section id="home" ref={sectionRefs.home} className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-center" style={{ backgroundImage: "linear-gradient(rgba(10, 10, 20, 0.7), rgba(10, 10, 20, 0.9)), url('https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
          <div className="container mx-auto px-6">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">A Experiência Começa Aqui</h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-down animation-delay-300">Conectamos você a momentos inesquecíveis. Suas melhores histórias e a trilha sonora da sua vida te esperam na próxima história.</p>
            <a href="#ingressos" onClick={(e) => { e.preventDefault(); handleNavClick(sectionRefs.ingressos); }} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-down animation-delay-600">
              Ver Ingressos
            </a>
          </div>
        </section>

        {/* --- SEÇÃO VIVA A EXPERIÊNCIA --- */}
        <section id="experiencia" ref={sectionRefs.experiencia} className="py-20 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-4 animate-on-scroll">Viva a Experiência Discovery</h3>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-on-scroll delay-1">Veja o que te espera e garanta seu lugar na próxima grande história.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galeriaItems.map((item, index) => (
                <div key={item.id} className={`group relative overflow-hidden rounded-lg shadow-2xl animate-on-scroll delay-${(index % 3) + 2}`}>
                  <img src={item.img} alt={item.evento} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6">
                    <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-12">
                       <h4 className="text-2xl font-bold text-white mb-2">{item.evento}</h4>
                       <button className="bg-orange-500 text-white py-2 px-5 rounded-full font-semibold hover:bg-red-600 transition-colors duration-300 text-sm opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-4">
                         Ver Ingressos
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SEÇÃO DE INGRESSOS --- */}
        <section id="ingressos" ref={sectionRefs.ingressos} className="py-20 bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-4 animate-on-scroll">Garanta seu Ingresso</h3>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-on-scroll delay-1">Escolha a melhor experiência para você. Vagas limitadas!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {ingressos.map((ingresso, index) => (
                <div key={ingresso.tipo} className={`bg-gray-900 rounded-lg p-8 flex flex-col shadow-lg transition-transform duration-300 hover:scale-105 animate-on-scroll delay-${index + 2} ${ingresso.destaque ? 'border-2 border-indigo-500 transform scale-105' : ''}`}>
                  <h4 className="text-2xl font-bold text-indigo-400 mb-4">{ingresso.tipo}</h4>
                  <p className="text-5xl font-extrabold mb-6">R$ {ingresso.preco}</p>
                  <ul className="text-left space-y-3 mb-8 flex-grow">
                    {ingresso.beneficios.map(b => <li key={b} className="flex items-center"><span className="text-indigo-500 mr-3">✓</span> {b}</li>)}
                  </ul>
                  <button className="mt-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">Comprar Agora</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SEÇÃO AGENDA DE EVENTOS --- */}
        <section id="eventos" ref={sectionRefs.eventos} className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                <h3 className="text-4xl font-bold text-center mb-12 animate-on-scroll">Agenda de Eventos</h3>
                <div className="space-y-12">
                    {eventosFuturos.map((evento, index) => (
                        <div key={evento.nome} className={`group grid grid-cols-1 md:grid-cols-5 gap-8 items-center animate-on-scroll delay-${index + 1}`}>
                            <div className="md:col-span-2 overflow-hidden rounded-lg">
                                <img src={evento.img} alt={evento.nome} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                            </div>
                            <div className="md:col-span-3">
                                <p className="text-indigo-400 font-semibold mb-2">{evento.data}</p>
                                <h4 className="text-4xl font-bold mb-4">{evento.nome}</h4>
                                <p className="text-gray-400 mb-6 flex items-center"><MapPin size={16} className="mr-2"/> {evento.local}</p>
                                <button className="bg-transparent border-2 border-indigo-500 text-indigo-500 font-bold py-2 px-6 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300">Mais Informações</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- SEÇÃO DE CONTATO --- */}
        <section id="contato" ref={sectionRefs.contato} className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4 animate-on-scroll">Entre em Contato</h3>
              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-on-scroll delay-1">Tem alguma dúvida ou sugestão? Fale conosco!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="animate-on-scroll delay-2">
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 mb-2">Nome</label>
                    <input type="text" id="name" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <input type="email" id="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Mensagem</label>
                    <textarea id="message" rows={5} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">Enviar Mensagem</button>
                </form>
              </div>
              <div className="space-y-8 animate-on-scroll delay-3">
                <h4 className="text-2xl font-bold">Informações de Contato</h4>
                <div className="flex items-center text-lg">
                  <Mail className="text-indigo-400 mr-4" size={24} />
                  <span>marcio.nogueira@discoveryentretenimento.com.br</span>
                </div>
                <div className="flex items-center text-lg">
                  <Phone className="text-indigo-400 mr-4" size={24} />
                  <span>(14) 97603-3750</span>
                </div>
                <div className="flex items-start text-lg">
                  <MapPin className="text-indigo-400 mr-4 mt-1" size={24} />
                  <span>Rua Luiz Scatimburgo, 550 - Ch. Bosque do Sol, Dois Córregos - SP</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- RODAPÉ --- */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Discovery Entretenimento. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* --- BOTÃO VOLTAR AO TOPO --- */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300">
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;