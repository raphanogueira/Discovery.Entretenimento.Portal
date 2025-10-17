import React from 'react';
import { ChevronUp } from 'lucide-react';

interface BackToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({ show, onClick }) => {
  if (!show) return null;

  return (
    <button onClick={onClick} className="fixed bottom-8 right-8 bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300">
      <ChevronUp size={24} />
    </button>
  );
};