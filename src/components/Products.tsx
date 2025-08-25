import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/content/CartContent";


export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
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

  const { addToCart } = useCart();

  // Charger catégories
  useEffect(() => {
    fetch(`${API_URL}/api/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories([{ id: "Tous", name: "Tous" }, ...data]))
      .catch(() => setError("Impossible de charger les catégories."));
  }, []);

  // Charger produits
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products/`)
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setError("Impossible de charger les produits."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    activeCategory === "Tous"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
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

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Liste produits */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mt-2">{product.price} FCFA</p>

                {/* ✅ Ajouter au panier */}
                <Button
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  onClick={() => addToCart(product)}
                >
                  Ajouter au panier
                </Button>

                {/* Commander direct via WhatsApp */}
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
