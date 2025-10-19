import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext
}) => {
  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={32} />
      </button>
      
      <button
        onClick={onPrevious}
        className="absolute left-4 text-white hover:text-gray-300"
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={48} />
      </button>

      <img
        src={images[currentIndex]}
        alt={`Foto ${currentIndex + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />

      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-gray-300"
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight size={48} />
      </button>

      <div className="absolute bottom-4 text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};