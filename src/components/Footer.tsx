import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gold">SMK</span> Boutique
            </h3>
            <p className="text-white/80 mb-4">
              Votre partenaire de confiance pour l'électronique et l'électroménager au Sénégal.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/boutiquesokhnamaikabir/" className="text-white/80 hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/boutiquesokhnamaikabir/" className="text-white/80 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/221783326970?text=Bonjour, j'ai une question" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-gold transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="text-white/80 hover:text-gold transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#produits" className="text-white/80 hover:text-gold transition-colors">
                  Produits
                </a>
              </li>
              <li>
                <a href="#apropos" className="text-white/80 hover:text-gold transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos catégories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#produits" className="text-white/80 hover:text-gold transition-colors">
                  Téléphones
                </a>
              </li>
              <li>
                <a href="#produits" className="text-white/80 hover:text-gold transition-colors">
                  Électroménager
                </a>
              </li>
              <li>
                <a href="#produits" className="text-white/80 hover:text-gold transition-colors">
                  Accessoires
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-gold transition-colors">
                  Service client
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3"> 
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-white/80 text-sm">+221 77 877 58 58</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-white/80 text-sm">info@smkboutique.sn</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  Parcelle Assainies / Case BA<br />
                  Dakar, Sénégal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">
              © {currentYear} SMK Boutique. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/80 hover:text-gold text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-white/80 hover:text-gold text-sm transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;