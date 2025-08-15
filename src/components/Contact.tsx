import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    // Send via WhatsApp
    const message = `Nom: ${formData.name}\nTéléphone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/221123456789?text=${encodeURIComponent(message)}`, '_blank');
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons rapidement sur WhatsApp",
    });

    setFormData({ name: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+221 77 877 58 58', '+221 77 877 58 58']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@smkboutique.sn', 'contact@smkboutique.sn']
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Parcelle Assainies/ Case Ba', 'Dakar, Sénégal']
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun - Sam: 8h - 18h', 'Fermer']
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Contactez-<span className="text-gold">nous</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl text-navy">Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                    Nom complet *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    className="border-navy/20 focus:border-navy"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-navy mb-2">
                    Numéro de téléphone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+221 XX XXX XX XX"
                    className="border-navy/20 focus:border-navy"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande..."
                    rows={5}
                    className="border-navy/20 focus:border-navy"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:bg-navy-light text-white shadow-elegant"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Envoyer via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">Informations de contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-elegant hover:shadow-gold transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-full">
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy mb-2">{info.title}</h4>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp Button */}
            <Card className="border-0 shadow-gold bg-gradient-accent">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 text-navy mx-auto mb-4" />
                <h4 className="text-xl font-bold text-navy mb-2">Besoin d'une réponse rapide ?</h4>
                <p className="text-navy mb-4">Contactez-nous directement sur WhatsApp</p>
                <Button 
                  onClick={() => window.open('https://wa.me/221778775858?text=Bonjour, j\'ai une question', '_blank')}
                  className="bg-navy hover:bg-navy-light text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp Maintenant
                </Button>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-navy mx-auto mb-2" />
                    <p className="text-navy font-medium">Carte Google Maps</p>
                    <p className="text-muted-foreground text-sm">Parcelle Assainies / Case BA, Dakar/ Senegal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;