import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://backend-soxna-mai.onrender.com"
    : "http://127.0.0.1:8000";

const Products: React.FC = () => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([
    { id: "Tous", name: "Tous" },
  ]);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Panier typé
  const [cart, setCart] = useState<Record<number, CartItem>>({});
  const [showCart, setShowCart] = useState(false);

  // Charger catégories
  useEffect(() => {
    fetch(`${API_URL}/api/categories/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur API catégories: ${res.status}`);
        return res.json();
      })
      .then((data) => setCategories([{ id: "Tous", name: "Tous" }, ...data]))
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les catégories.");
      });
  }, []);

  // Charger produits
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur API produits: ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les produits.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Ajouter au panier
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[product.id]) {
        copy[product.id].quantity += 1;
      } else {
        copy[product.id] = { product, quantity: 1 };
      }
      return copy;
    });
  };

  // Diminuer quantité ou supprimer produit
  const decreaseQuantity = (productId: number) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[productId]) {
        if (copy[productId].quantity > 1) {
          copy[productId].quantity -= 1;
        } else {
          delete copy[productId];
        }
      }
      return copy;
    });
  };

  // Commander le panier sur WhatsApp
  const orderCart = () => {
    const message = Object.values(cart)
      .map(({ product, quantity }) => `${product.name} x${quantity} (${product.price * quantity} FCFA)`)
      .join("\n");
    const finalMessage = `Bonjour, je souhaite commander les produits suivants :\n${message}`;
    window.open(`https://wa.me/221778775858?text=${encodeURIComponent(finalMessage)}`, "_blank");
  };

  // Filtrer produits
  const filteredProducts =
    activeCategory === "Tous"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 relative">

      {/* Catégories */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Erreur */}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Aucun produit */}
      {!loading && filteredProducts.length === 0 && !error && (
        <p className="text-center text-muted-foreground">
          Aucun produit trouvé pour cette catégorie.
        </p>
      )}

      {/* Liste des produits */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden relative">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mt-2">{product.price} FCFA</p>

                <Button
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  onClick={() => addToCart(product)}
                >
                  Ajouter au panier
                </Button>

                <Button
                  className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
                  onClick={() => {
                    const message = `Bonjour, je souhaite commander : ${product.name} (${product.price} FCFA)`;
                    window.open(
                      `https://wa.me/221778775858?text=${encodeURIComponent(message)}`,
                      "_blank"
                    );
                  }}
                >
                  Commander sur WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
