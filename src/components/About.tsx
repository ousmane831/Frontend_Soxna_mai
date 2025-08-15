import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Trophy, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Qualité garantie',
      description: 'Tous nos produits sont authentiques et bénéficient d\'une garantie officielle.'
    },
    {
      icon: Heart,
      title: 'Service client',
      description: 'Nous privilégions la relation humaine et l\'écoute de nos clients.'
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque transaction et service proposé.'
    },
    {
      icon: Users,
      title: 'Confiance',
      description: 'La confiance de nos clients est la base de notre réputation.'
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            À propos de <span className="text-gold">SMK</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Votre partenaire de confiance pour l'électronique et l'électroménager au Sénégal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story */}
          <div>
            <h3 className="text-3xl font-bold text-navy mb-6">Notre Histoire</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-navy">Sokhna Mai Kabir (SMK)</strong> est née d'une passion pour la technologie 
                et d'un désir de rendre les produits électroniques de qualité accessibles à tous les Sénégalais.
              </p>
              <p>
                Depuis notre création, nous avons bâti notre réputation sur la qualité de nos produits, 
                la compétitivité de nos prix et la satisfaction de notre clientèle. Notre mission est simple : 
                offrir des produits fiables et abordables tout en maintenant un service client exceptionnel.
              </p>
              <p>
                Que vous cherchiez le dernier smartphone, un électroménager pour votre foyer ou des accessoires 
                de qualité, SMK est votre destination de confiance.
              </p>
            </div>

            <div className="mt-8 p-6 bg-gradient-accent rounded-lg">
              <h4 className="text-xl font-bold text-navy mb-2">Notre Mission</h4>
              <p className="text-navy">
                Démocratiser l'accès aux technologies modernes en proposant des produits de qualité 
                à des prix compétitifs, tout en offrant un service client personnalisé et fiable.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-3xl font-bold text-navy mb-8">Nos Valeurs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-elegant hover:shadow-gold transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-navy mb-2">{value.title}</h4>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 bg-gradient-hero rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Pourquoi choisir SMK ?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold mb-2">100%</div>
              <div className="text-white">Produits authentiques</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">24h</div>
              <div className="text-white">Support client</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">Garantie</div>
              <div className="text-white">Sur tous nos produits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;