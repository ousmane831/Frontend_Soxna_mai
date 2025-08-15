import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// URL du backend depuis Vercel env
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://backend-soxna-mai.onrender.com" // URL de ton backend déployé
    : "http://127.0.0.1:8000"; // localhost pour dev

const Products = () => {
  const [categories, setCategories] = useState([{ id: "Tous", name: "Tous" }]);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier l'URL du backend
  useEffect(() => {
    console.log("API_URL:", API_URL);
  }, []);

  // Charger les catégories
  useEffect(() => {
    fetch(`${API_URL}/api/categories/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur API catégories: ${res.status}`);
        return res.json();
      })
      .then((data) => setCategories([{ id: "Tous", name: "Tous" }, ...data]))
      .catch((err) => {
        console.error("Erreur lors du chargement des catégories :", err);
        setError("Impossible de charger les catégories.");
      });
  }, []);

  // Charger les produits
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/products/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur API produits: ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Erreur lors du chargement des produits :", err);
        setError("Impossible de charger les produits. Veuillez réessayer.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtrer par catégorie
  const filteredProducts =
    activeCategory === "Tous"
      ? products
      : products.filter((p) => p.category?.id === activeCategory);

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
                {product.category?.name && (
                  <span className="absolute top-2 left-2 bg-gold hover:bg-gold-dark text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {product.category.name}
                  </span>
                )}
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mt-2">{product.price} FCFA</p>
                <Button
                  className="mt-4 w-full bg-gradient-primary hover:bg-green-600 text-white font-semibold"
                  onClick={() =>
                    window.open(
                      `https://wa.me/221778775858?text=Bonjour, je souhaite commander : ${product.name} (${product.price} FCFA)`,
                      "_blank"
                    )
                  }
                >
                  Commander sur WhatsApp
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Commande personnalisée */}
      <div className="flex justify-center mt-6">
        <Button
          size="lg"
          className="bg-gold hover:bg-gold-dark text-navy font-semibold shadow-gold"
          onClick={() =>
            window.open(
              "https://wa.me/221778775858?text=Je souhaite voir d'autres produits ou passer une commande personnalisée",
              "_blank"
            )
          }
        >
          Commande personnalisée
        </Button>
      </div>
    </div>
  );
};

export default Products;
