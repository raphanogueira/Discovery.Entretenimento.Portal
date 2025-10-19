// src/components/ShowGalleryPage.tsx
import React, { useState } from 'react';
import { ChevronLeft, ImageOff } from 'lucide-react';
import { ImageModal } from './ImageModal';

interface ShowGalleryPageProps {
  show: {
    id: number;
    title: string;
    date: string;
    description?: string;
    images: string[];
  };
  onBack: () => void;
}

export const ShowGalleryPage: React.FC<ShowGalleryPageProps> = ({ show, onBack }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Cabeçalho */}
        <button 
          onClick={onBack}
          className="flex items-center text-indigo-400 hover:text-indigo-300 mb-8 group"
        >
          <ChevronLeft className="transition-transform group-hover:-translate-x-1" />
          <span>Voltar para Galeria</span>
        </button>

        <h1 className="text-4xl font-bold mb-2">{show.title}</h1>
        <p className="text-indigo-400 text-xl mb-4">{show.date}</p>
        {show.description && (
          <p className="text-gray-300 mb-8 max-w-3xl">{show.description}</p>
        )}

        {/* Grid de Fotos ou Mensagem */}
        {show.images && show.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {show.images.map((image, index) => (
              <div 
                key={index}
                className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${show.title} - Foto ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg">Ver foto</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-lg p-12 text-center animate-fade-in">
            <ImageOff size={48} className="text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl text-gray-300 mb-2">
              Nenhuma foto disponível ainda
            </h3>
            <p className="text-gray-400">
              As fotos deste show ainda estão sendo processadas. 
              Volte em breve para conferir os melhores momentos!
            </p>
          </div>
        )}

        {/* Modal */}
        {selectedImageIndex !== null && show.images && (
          <ImageModal
            images={show.images}
            currentIndex={selectedImageIndex}
            onClose={() => setSelectedImageIndex(null)}
            onPrevious={() => setSelectedImageIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev)}
            onNext={() => setSelectedImageIndex((prev) => prev !== null && prev < show.images.length - 1 ? prev + 1 : prev)}
          />
        )}
      </div>
    </div>
  );
};