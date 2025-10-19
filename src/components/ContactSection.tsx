import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactSection = React.forwardRef<HTMLElement>((_, ref) => {
  return (
    <section id="contato" ref={ref} className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-4xl font-bold mb-4 animate-on-scroll">Entre em Contato</h3>
          <p className="text-lg text-gray-400 mb-12 animate-on-scroll delay-1">
            Tem alguma dúvida ou sugestão? Fale conosco!
          </p>
          
          <div className="space-y-8 animate-on-scroll delay-2 flex flex-col items-center">
            <div className="flex items-center gap-4 justify-center">
              <div className="w-8 h-8 flex-shrink-0 text-indigo-400">
                <Mail className="w-full h-full" />
              </div>
              <span className="break-all text-center">contato@discoveryentretenimento.com.br</span>
            </div>
            
            <div className="flex items-center gap-4 justify-center">
              <div className="w-8 h-8 flex-shrink-0 text-indigo-400">
                <Phone className="w-full h-full" />
              </div>
              <span>(14) 97603-3750</span>
            </div>
            
            <div className="flex items-center gap-4 justify-center">
              <div className="w-8 h-8 flex-shrink-0 text-indigo-400">
                <MapPin className="w-full h-full" />
              </div>
              <span className="text-center">
                Rua Luiz Scatimburgo, 550 - Ch. Bosque do Sol, Dois Córregos - SP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});