
import { Product } from '../types';
import { initialProducts } from '../data/products';

// Simulate a database
let products: Product[] = JSON.parse(localStorage.getItem('products') || 'null') || initialProducts;

const saveProducts = () => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Initialize if not already set
if (!localStorage.getItem('products')) {
  saveProducts();
}


const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getProducts = async (): Promise<Product[]> => {
  await simulateDelay(500);
  return [...products];
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  await simulateDelay(300);
  return products.find(p => p.id === id);
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await simulateDelay(500);
    const newProduct: Product = {
        ...productData,
        id: Date.now(), // Simple unique ID
    };
    products.push(newProduct);
    saveProducts();
    return newProduct;
};

export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product> => {
    await simulateDelay(500);
    let productToUpdate = products.find(p => p.id === id);
    if (!productToUpdate) {
        throw new Error('Product not found');
    }
    Object.assign(productToUpdate, productData);
    saveProducts();
    return productToUpdate;
};

export const deleteProduct = async (id: number): Promise<{ success: boolean }> => {
    await simulateDelay(500);
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length === initialLength) {
        throw new Error('Product not found');
    }
    saveProducts();
    return { success: true };
};
