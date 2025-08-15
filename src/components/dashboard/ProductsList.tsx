import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '@/pages/Dashboard';

interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, onEdit, onDelete }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' CFA';
  };

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Aucun produit trouvé</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square overflow-hidden">
            <img
              src={
                product.image.startsWith('http')
                  ? product.image
                  : `http://127.0.0.1:8000${product.image}`
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-navy line-clamp-1">
                {product.name}
              </h3>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-gold">
                {formatPrice(product.price)}
              </span>
              <Badge variant="outline">
                {typeof product.category === 'string'
                  ? product.category
                  : (product.category as { name: string })?.name || 'Sans catégorie'}
              </Badge>

            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(product)}
                variant="outline"
                size="sm"
                className="flex-1 flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Modifier
              </Button>
              <Button
                onClick={() => onDelete(product.id)}
                variant="destructive"
                size="sm"
                className="flex-1 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
