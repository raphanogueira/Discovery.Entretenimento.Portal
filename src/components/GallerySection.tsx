import React, { useState } from 'react';
import { ImageModal } from './ImageModal';
import showBeegeesImg  from '../assets/wer_show_bee_gees.png';

interface Show {
  id: number;
  title: string;
  date: string;
  coverImage: string;
  description?: string;
  images: string[];
}

const pastShows: Show[] = [
  {
    id: 1,
    title: "Show Bee Gees",
    date: "17 OUT 2025",
    coverImage: showBeegeesImg,
    description: "Uma noite incrível relembrando os grandes sucessos dos Bee Gees.",
    images: [
    ]
  },
];

interface GallerySectionProps {
  onShowSelect: (show: Show) => void;
}

export const GallerySection = React.forwardRef<HTMLElement, GallerySectionProps>(({ onShowSelect }, ref) => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (show: Show) => {
    setSelectedShow(show);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedShow(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedShow && currentImageIndex < selectedShow.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <section id="galeria" ref={ref} className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-center mb-12 animate-on-scroll">
          Galeria de Shows
        </h3>
        
        {pastShows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastShows.map((show) => (
              <div
                key={show.id}
                className="group relative overflow-hidden rounded-lg shadow-2xl cursor-pointer animate-on-scroll"
                onClick={() => onShowSelect(show)}
              >
                <img
                  src={show.coverImage}
                  alt={show.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{show.title}</h4>
                  <p className="text-gray-300">{show.date}</p>
                  <p className="text-indigo-400 mt-2">
                    {show.images.length} fotos
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900/50 rounded-lg p-8 text-center animate-on-scroll">
            <p className="text-xl text-gray-300">Nenhum show na galeria ainda.</p>
            <p className="text-gray-400 mt-2">Em breve adicionaremos fotos dos nossos eventos!</p>
          </div>
        )}

        {selectedShow && (
          <ImageModal
            images={selectedShow.images}
            currentIndex={currentImageIndex}
            onClose={closeGallery}
            onPrevious={previousImage}
            onNext={nextImage}
          />
        )}
      </div>
    </section>
  );
});