import React from 'react';
import { MapPin } from 'lucide-react';
import showBeeGeesImg from '../assets/wer_show_bee_gees.png';

const eventosFuturos = [
  { nome: 'Show Acústico', data: '17 OUT 2025', local: 'Algodoeira Eventos', img: showBeeGeesImg },
];

export const EventsSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="eventos" ref={ref} className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-bold text-center mb-12 animate-on-scroll">Agenda de Eventos</h3>
        <div className="space-y-12">
          {eventosFuturos.map((evento, index) => (
            <div key={evento.nome} className={`group grid grid-cols-1 md:grid-cols-5 gap-8 items-center animate-on-scroll delay-${index + 1}`}>
              <div className="md:col-span-2 overflow-hidden rounded-lg">
                <img src={evento.img} alt={evento.nome} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="md:col-span-3">
                <p className="text-indigo-400 font-semibold mb-2">{evento.data}</p>
                <h4 className="text-4xl font-bold mb-4">{evento.nome}</h4>
                <p className="text-gray-400 mb-6 flex items-center"><MapPin size={16} className="mr-2" /> {evento.local}</p>
                <button className="bg-transparent border-2 border-indigo-500 text-indigo-500 font-bold py-2 px-6 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300">Mais Informações</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});