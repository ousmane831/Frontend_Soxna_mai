import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "./Products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  cart?: Record<number, CartItem>; // rendu optionnel pour plus de sécurité
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: number) => void;
  orderCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  cart = {}, // valeur par défaut vide
  addToCart,
  decreaseQuantity,
  orderCart,
}) => {
  const [showCart, setShowCart] = React.useState(false);

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <Button
        className="relative bg-blue-600 text-white"
        onClick={() => setShowCart(!showCart)}
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
            {totalItems}
          </span>
        )}
      </Button>

      {showCart && (
        <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg p-4 rounded-lg z-50">
          <h3 className="font-bold mb-2">Panier ({totalItems} articles)</h3>
          {totalItems === 0 && <p>Votre panier est vide.</p>}
          <ul>
            {Object.values(cart).map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between items-center mb-2">
                <span>{product.name}</span>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    className="bg-gray-200 text-black"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    size="sm"
                    className="bg-gray-200 text-black"
                    onClick={() => addToCart(product)}
                  >
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
              Commander le panier
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
