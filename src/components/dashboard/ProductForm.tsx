import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Product } from '@/pages/Dashboard';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (formData: FormData) => void; // onSubmit reçoit FormData pour upload fichier
  onClose: () => void;
  isOpen: boolean;
}

interface LocalFormState {
  name: string;
  price: number;
  category: string; // id en string
  imageFile: File | null;

}

const categories = [
  { id: 1, label: 'Téléphones' },
  { id: 2, label: 'Électroménager' },
  { id: 3, label: 'Accessoires' },
];

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose, isOpen }) => {
  const [formState, setFormState] = useState<LocalFormState>({
    name: '',
    price: 0,
    category: '',
    imageFile: null,
    
  });

  useEffect(() => {
    if (product) {
      const cat = categories.find(c => c.label === product.category);
      setFormState({
        name: product.name,
        price: product.price,
        category: cat?.id.toString() || '',
        imageFile: null, // on ne préremplit pas le fichier
       
      });
    } else {
      setFormState({
        name: '',
        price: 0,
        category: '',
        imageFile: null,
       
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.category) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }
    if (!formState.imageFile && !product) {
      alert('Veuillez téléverser une image');
      return;
    }

    const data = new FormData();
    data.append('name', formState.name);
    data.append('price', formState.price.toString());
    data.append('category_id', formState.category);
   
    if (formState.imageFile) {
      data.append('image', formState.imageFile);
    }

    onSubmit(data); // on envoie FormData
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Modifier le produit' : 'Ajouter un produit'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="Ex: iPhone 15 Pro"
              required
            />
          </div>

          {/* Prix */}
          <div className="space-y-2">
            <Label htmlFor="price">Prix (CFA)</Label>
            <Input
              id="price"
              type="number"
              value={formState.price}
              onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
              placeholder="Ex: 850000"
              required
            />
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={formState.category}
              onValueChange={(value) => setFormState({ ...formState, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ id, label }) => (
                  <SelectItem key={id} value={id.toString()}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload image */}
          <div className="space-y-2">
            <Label htmlFor="image">Image du produit</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormState({ ...formState, imageFile: e.target.files?.[0] || null })
              }
            />
            {product && product.image && (
              <p className="text-xs text-gray-500">
                Image actuelle : {product.image}
              </p>
            )}
          </div>

          {/* Stock */}
          

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              {product ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
