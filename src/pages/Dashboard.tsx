import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, LogOut, Search } from 'lucide-react';
import ProductsList from '@/components/dashboard/ProductsList';
import ProductForm from '@/components/dashboard/ProductForm';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string; // toujours string pour le filtre
  image: string;
  description?: string;
}

// Variable d'environnement pour le backend
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Tous', 'Téléphone', 'Électroménager', 'Accessoires'];

  // Vérification de l'authentification
  useEffect(() => {
    const token = localStorage.getItem('smk_admin_token');
    if (!token) navigate('/login');
  }, [navigate]);

  // Récupération des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('smk_admin_token');
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_URL}/api/products/`, { headers });
        if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
        const data = await res.json();

        const productsWithCategoryName = data.map((p: any) => ({
          ...p,
          category: typeof p.category === 'string' ? p.category : p.category.name,
        }));

        setProducts(productsWithCategoryName);
      } catch (err) {
        console.error(err);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les produits.',
          variant: 'destructive',
        });
      }
    };
    fetchProducts();
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem('smk_admin_token');
    toast({ title: 'Déconnexion réussie', description: 'À bientôt !' });
    navigate('/');
  };

  // Ajouter un produit
  const handleAddProduct = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('smk_admin_token');
      const res = await fetch(`${API_URL}/api/products/`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Erreur API:', errorData);
        throw new Error('Erreur lors de l\'ajout du produit');
      }

      const newProduct = await res.json();
      newProduct.category = typeof newProduct.category === 'string' ? newProduct.category : newProduct.category.name;

      setProducts(prev => [...prev, newProduct]);
      setShowProductForm(false);
      toast({ title: 'Produit ajouté', description: `${newProduct.name} a été ajouté avec succès` });
    } catch (err) {
      console.error(err);
      toast({ title: 'Erreur', description: 'Impossible d\'ajouter le produit.', variant: 'destructive' });
    }
  };

  // Modifier un produit
  const handleEditProduct = async (formData: FormData) => {
    if (!editingProduct) return;
    try {
      const token = localStorage.getItem('smk_admin_token');
      const res = await fetch(`${API_URL}/api/products/${editingProduct.id}/`, {
        method: 'PUT',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Erreur API:', errorData);
        throw new Error('Erreur lors de la modification du produit');
      }

      const updatedProduct = await res.json();
      updatedProduct.category = typeof updatedProduct.category === 'string' ? updatedProduct.category : updatedProduct.category.name;

      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setEditingProduct(null);
      setShowProductForm(false);
      toast({ title: 'Produit modifié', description: `${updatedProduct.name} a été mis à jour` });
    } catch (err) {
      console.error(err);
      toast({ title: 'Erreur', description: 'Impossible de modifier le produit.', variant: 'destructive' });
    }
  };

  // Supprimer un produit
  const handleDeleteProduct = async (id: number) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('smk_admin_token');
      const res = await fetch(`${API_URL}/api/products/${id}/`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression du produit');

      const deleted = products.find(p => p.id === id);
      setProducts(products.filter(p => p.id !== id));
      toast({
        title: 'Produit supprimé',
        description: `${deleted?.name} a été supprimé`
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le produit.',
        variant: 'destructive'
      });
    }
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const closeForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  // Filtrage par catégorie et recherche
  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredProducts = products.filter(p =>
    (selectedCategory === 'Tous' || normalize(p.category) === normalize(selectedCategory)) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = { total: products.length };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-navy">Dashboard SMK</h1>
            <p className="text-muted-foreground">Gestion des produits</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card><CardContent><p>Total Produits: {stats.total}</p></CardContent></Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button onClick={() => setShowProductForm(true)} className="bg-gradient-primary flex items-center gap-2">
            <Plus className="h-4 w-4" /> Ajouter un produit
          </Button>
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Filtres par catégorie */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map(c => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}
          </TabsList>
        </Tabs>

        {/* Liste des produits */}
        <ProductsList
          products={filteredProducts}
          onEdit={openEditForm}
          onDelete={handleDeleteProduct}
        />

        {/* Formulaire produit */}
        {showProductForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            onClose={closeForm}
            isOpen={showProductForm}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
