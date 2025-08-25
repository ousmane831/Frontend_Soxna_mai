import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/content/CartContent";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, decreaseQuantity, totalItems } = useCart();

  const orderCart = () => {
    const message = Object.values(cart)
      .map(
        (item) =>
          `${item.product.name} x${item.quantity} (${item.product.price * item.quantity} FCFA)`
      )
      .join("\n");
    window.open(
      `https://wa.me/221778775858?text=${encodeURIComponent(
        `Bonjour, je souhaite commander :\n${message}`
      )}`,
      "_blank"
    );
  };

  const navItems = [
    { name: "Accueil", href: "#accueil" },
    { name: "Produits", href: "#produits" },
    { name: "À propos", href: "#apropos" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-gradient-primary shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          <span className="text-gold">SMK</span> Boutique
        </h1>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white hover:text-gold px-3 py-2 rounded-md text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">

          {/* Panier */}
          <div className="relative">
            <Button
              variant="ghost"
              className="relative text-gold hover:text-yellow-400"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Button>

            {showCart && (
              <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg p-4 rounded-lg">
                <h3 className="font-bold mb-2">Panier ({totalItems} articles)</h3>
                {totalItems === 0 && <p>Votre panier est vide.</p>}
                <ul>
                  {Object.values(cart).map((item) => (
                    <li
                      key={item.product.id}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{item.product.name}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          onClick={() => decreaseQuantity(item.product.id)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button size="sm" onClick={() => addToCart(item.product)}>
                          +
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                {totalItems > 0 && (
                  <Button
                    className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold"
                    onClick={orderCart}
                  >
                    Commander
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Bouton WhatsApp */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
              onClick={() =>
                window.open("https://wa.me/221778775858", "_blank")
              }
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

        </div>

        {/* Menu mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gold"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Navigation mobile */}
      {isOpen && (
        <div className="md:hidden bg-navy-dark px-2 pt-2 pb-3 space-y-1">
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
          {/* Mobile WhatsApp */}
          <Button
            variant="outline"
            size="sm"
            className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white mt-2 w-full"
            onClick={() =>
              window.open("https://wa.me/221778775858", "_blank")
            }
          >
            <FaWhatsapp className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
