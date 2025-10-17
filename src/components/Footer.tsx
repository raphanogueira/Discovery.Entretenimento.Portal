import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p>&copy; {currentYear} Discovery Entretenimento. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};