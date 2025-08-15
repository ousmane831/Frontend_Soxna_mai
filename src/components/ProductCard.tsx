import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const handleWhatsAppOrder = () => {
    const message = `Bonjour, je suis intéressé(e) par le produit: ${product.name} - ${product.price} CFA`;
    window.open(`https://wa.me/221778775858?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 border-0 shadow-lg">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image_url || 'https://via.placeholder.com/300x200'} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-gold text-navy px-2 py-1 rounded-full text-xs font-semibold">
                {product.category.name}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 text-navy group-hover:text-navy-light transition-colors">
          {product.title}
        </CardTitle>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gold">
            {Number(product.price).toLocaleString()} CFA
          </span>
        </div>
        
        <Button 
          onClick={handleWhatsAppOrder}
          className="w-full bg-gradient-primary hover:bg-navy-light text-white shadow-elegant"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Commander sur WhatsApp
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
