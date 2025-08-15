import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Fatou Diop',
      location: 'Dakar',
      rating: 5,
      comment: 'Excellent service ! J\'ai acheté mon iPhone chez SMK et je suis très satisfaite. Produit authentique et prix correct.',
      product: 'iPhone 14'
    },
    {
      id: 2,
      name: 'Mamadou Sy',
      location: 'Thiès',
      rating: 5,
      comment: 'Boutique sérieuse, livraison rapide. Mon réfrigérateur fonctionne parfaitement depuis 6 mois. Je recommande !',
      product: 'Réfrigérateur Samsung'
    },
    {
      id: 3,
      name: 'Aïssatou Ba',
      location: 'Rufisque',
      rating: 5,
      comment: 'Très professionnel, bons conseils et après-vente au top. SMK est maintenant ma boutique de référence.',
      product: 'Samsung Galaxy A54'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-gold fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Ce que disent nos <span className="text-gold">clients</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La satisfaction de nos clients est notre plus grande fierté
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative border-0 shadow-elegant hover:shadow-gold transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-gold mb-4" />
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Comment */}
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.comment}"
                </p>
                
                {/* Customer Info */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-navy">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-sm text-gold font-medium mt-1">
                    Achat: {testimonial.product}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-2">500+</div>
              <div className="text-muted-foreground">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-2">2+</div>
              <div className="text-muted-foreground">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-2">1000+</div>
              <div className="text-muted-foreground">Produits vendus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-navy mb-2">4.9/5</div>
              <div className="text-muted-foreground">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;