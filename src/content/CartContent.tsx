import React, { createContext, useContext, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: Record<number, CartItem>;
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<number, CartItem>>({});

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[product.id]) copy[product.id].quantity += 1;
      else copy[product.id] = { product, quantity: 1 };
      return copy;
    });
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id]) {
        if (copy[id].quantity > 1) copy[id].quantity -= 1;
        else delete copy[id];
      }
      return copy;
    });
  };

  const totalItems = Object.values(cart).reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
