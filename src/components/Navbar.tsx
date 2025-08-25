import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Product } from "./Products";
import Cart from "./Cart";

interface NavbarProps {
  cart: Record<number, { product: Product; quantity: number }>;
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: number) => void;
  orderCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, addToCart, decreaseQuantity, orderCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Accueil", href: "#accueil" },
    { name: "Produits", href: "#produits" },
    { name: "À propos", href: "#apropos" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-gradient-primary shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-gold">SMK</span> Boutique
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="border-gold text-gold hover:bg-gold hover:text-navy"
              onClick={() => window.open("https://wa.me/221778775858", "_blank")}
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>

            <Cart
              cart={cart}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              orderCart={orderCart}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Cart
              cart={cart}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              orderCart={orderCart}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-navy-dark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-gold block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="border-gold text-gold hover:bg-gold hover:text-navy ml-3 mt-2"
              onClick={() => {
                window.open("https://wa.me/221778775858", "_blank");
                setIsOpen(false);
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
