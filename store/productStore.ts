
import { create } from 'zustand';
import { Product } from '../types';
import { getProducts, addProduct as apiAddProduct, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from '../services/productService';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await getProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', isLoading: false });
    }
  },
  addProduct: async (productData) => {
    try {
      const newProduct = await apiAddProduct(productData);
      set((state) => ({ products: [...state.products, newProduct] }));
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  },
  updateProduct: async (id, productData) => {
    try {
      const updatedProduct = await apiUpdateProduct(id, productData);
      set((state) => ({
        products: state.products.map(p => (p.id === id ? updatedProduct : p)),
      }));
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  },
  deleteProduct: async (id) => {
    try {
      await apiDeleteProduct(id);
      set((state) => ({
        products: state.products.filter(p => p.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  },
}));
