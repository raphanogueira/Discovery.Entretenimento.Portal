import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        navLinks={[]}
        activeLink=""
        isScrolled={true}
        isMenuOpen={false}
        setIsMenuOpen={() => {}}
        handleNavClick={() => {}}
      />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar para Início
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Galeria de Fotos</h1>
          <p className="text-gray-400">
            Bem-vindo(a), {user?.nome || 'Usuário'}! Explore nossa galeria de eventos.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-300">Galeria em desenvolvimento</p>
          <p className="text-gray-400 mt-2">
            Em breve você poderá visualizar todas as fotos dos nossos eventos aqui!
          </p>
        </div>
      </div>
    </div>
  );
};
