import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
  const { isAuthenticated, user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsProfileMenuOpen(false);
    await logout();
  };

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
        
        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300">
                Login
              </Link>
              <Link to="/cadastro" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
                Cadastre-se
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400 transition-colors"
              >
                {user?.fotoPerfil ? (
                  <img
                    src={user.fotoPerfil}
                    alt={user.nome}
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-400"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center border-2 border-indigo-400">
                    <UserIcon size={16} />
                  </div>
                )}
                <span className="font-medium">{user?.nome}</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 border border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition-colors flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
          
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl text-gray-300 hover:text-indigo-400 transition-colors duration-300">
                Login
              </Link>
              <Link to="/cadastro" onClick={() => setIsMenuOpen(false)} className="text-xl bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-all duration-300">
                Cadastre-se
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-2">
                {user?.fotoPerfil ? (
                  <img
                    src={user.fotoPerfil}
                    alt={user.nome}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center border-2 border-indigo-400">
                    <UserIcon size={24} />
                  </div>
                )}
                <span className="text-xl text-gray-300 font-medium">{user?.nome}</span>
              </div>
              <button
                onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                className="text-xl bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-all duration-300 flex items-center space-x-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};