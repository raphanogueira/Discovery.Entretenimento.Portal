import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavLink {
  id: string;
  title: string;
  ref: React.RefObject<HTMLElement | null>;
}

interface HeaderProps {
  navLinks: NavLink[];
  activeLink: string;
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleNavClick: (ref: React.RefObject<HTMLElement | null>) => void;
}

export const Header: React.FC<HeaderProps> = ({ navLinks, activeLink, isScrolled, isMenuOpen, setIsMenuOpen, handleNavClick }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-400">
          <Link to="/">Discovery</Link>
        </h1>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.ref); }}
              className={`text-gray-300 hover:text-indigo-400 transition-colors duration-300 pb-1 ${activeLink === link.id ? 'text-indigo-400 border-b-2 border-indigo-400' : 'border-b-2 border-transparent'}`}
            >
              {link.title}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300">
            Login
          </Link>
          <Link to="/cadastro" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
            Cadastre-se
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm flex flex-col items-center py-6 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.ref); setIsMenuOpen(false); }}
              className="text-xl text-gray-300 hover:text-indigo-400 transition-colors duration-300"
            >
              {link.title}
            </a>
          ))}
          <div className="border-t border-gray-700 w-3/4 my-4"></div>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl text-gray-300 hover:text-indigo-400 transition-colors duration-300">
            Login
          </Link>
          <Link to="/cadastro" onClick={() => setIsMenuOpen(false)} className="text-xl bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-all duration-300">
            Cadastre-se
          </Link>
        </div>
      )}
    </header>
  );
};