import React from 'react';

const galeriaItems = [
  { id: 1, categoria: 'show', img: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', evento: 'Festival Starlight' },
  { id: 2, categoria: 'festival', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', evento: 'Verão Eletrônico' },
  { id: 3, categoria: 'festival', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', evento: 'Sunrise Fest' },
];

export const ExperienceSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="experiencia" ref={ref} className="py-20 bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-4xl font-bold mb-4 animate-on-scroll">Viva a Experiência Discovery</h3>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-on-scroll delay-1">Veja o que te espera e garanta seu lugar na próxima grande história.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galeriaItems.map((item, index) => (
            <div key={item.id} className={`group relative overflow-hidden rounded-lg shadow-2xl animate-on-scroll delay-${(index % 3) + 2}`}>
              <img src={item.img} alt={item.evento} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-end p-6">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-12">
                  <h4 className="text-2xl font-bold text-white mb-2">{item.evento}</h4>
                  <button className="bg-orange-500 text-white py-2 px-5 rounded-full font-semibold hover:bg-red-600 transition-colors duration-300 text-sm opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-4">
                    Ver Ingressos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});