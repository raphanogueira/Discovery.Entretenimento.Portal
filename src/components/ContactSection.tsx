import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="contato" ref={ref} className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-4 animate-on-scroll">Entre em Contato</h3>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-on-scroll delay-1">Tem alguma dúvida ou sugestão? Fale conosco!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="animate-on-scroll delay-2">
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">Nome</label>
                <input type="text" id="name" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input type="email" id="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-300 mb-2">Mensagem</label>
                <textarea id="message" rows={5} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">Enviar Mensagem</button>
            </form>
          </div>
          <div className="space-y-8 animate-on-scroll delay-3">
            <h4 className="text-2xl font-bold">Informações de Contato</h4>
            <div className="flex items-start text-lg">
              <div className="w-8 h-8 mr-4 flex-shrink-0">
                <Mail className="w-full h-full text-indigo-400" />
              </div>
              <span className="break-all">contato@discoveryentretenimento.com.br</span>
            </div>
            <div className="flex items-start text-lg">
              <div className="w-8 h-8 mr-4 flex-shrink-0">
                <Phone className="w-full h-full text-indigo-400" />
              </div>
              <span>(14) 97603-3750</span>
            </div>
            <div className="flex items-start text-lg">
              <div className="w-8 h-8 mr-4 flex-shrink-0">
                <MapPin className="w-full h-full text-indigo-400" />
              </div>
              <span>Rua Luiz Scatimburgo, 550 - Ch. Bosque do Sol, Dois Córregos - SP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});