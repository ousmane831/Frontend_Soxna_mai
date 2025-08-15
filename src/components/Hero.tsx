import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Star, Shield, Zap } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const Hero = () => {
  const advantages = [
    { icon: Star, text: 'Produits de qualité' },
    { icon: Shield, text: 'Prix compétitifs' },
    { icon: Zap, text: 'Service client rapide' },
  ];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Welcome Message */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Hello la famille, bienvenue chez{' '}
            <span className="text-gold">Sokhna Mai Kabir</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Vente de Téléphones & Électroménager
          </p>

          {/* Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <advantage.icon className="w-6 h-6 text-gold flex-shrink-0" />
                <span className="text-white font-medium">{advantage.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold-dark text-navy font-semibold shadow-gold"
              onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir nos produits
            </Button>
              <Button
              variant="outline"
              size="lg"
              className="border-white text-navy hover:bg-white hover:text-navy flex items-center justify-center"
              onClick={() =>
                window.open(
                  "https://wa.me/221778775858?text=Bonjour, je souhaite avoir des informations sur vos produits",
                  "_blank"
                )
              }
            >
              <Phone className="w-5 h-5 mr-2" />
              Contacter sur WhatsApp
            </Button>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;