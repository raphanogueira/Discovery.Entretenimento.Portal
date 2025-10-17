import React from 'react';

const ingressos = [
  { tipo: 'Pista', preco: '120,00', beneficios: ['Acesso ao setor Pista', 'Visão geral do palco', 'Bares e banheiros no setor'] },
  { tipo: 'Pista Premium', preco: '210,00', beneficios: ['Acesso à frente do palco', 'Entrada diferenciada', 'Bares e banheiros exclusivos'], destaque: true },
  { tipo: 'Camarote', preco: '350,00', beneficios: ['Visão privilegiada', 'Open bar e food', 'After-party exclusiva'] },
];

export const TicketsSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="ingressos" ref={ref} className="py-20 bg-gray-800">
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
  );
});