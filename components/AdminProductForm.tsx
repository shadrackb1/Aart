
import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { useProductStore } from '../store/productStore';
import Button from './ui/Button';
import toast from 'react-hot-toast';

interface AdminProductFormProps {
  product: Product | null;
  onClose: () => void;
}

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  description: '',
  category: 'Unisex',
  imageUrl: '',
  sizes: ['S', 'M', 'L', 'XL'],
};

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useProductStore();
  const [formData, setFormData] = useState(emptyProduct);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(emptyProduct);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({...prev, sizes: e.target.value.split(',').map(s => s.trim())}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (product) {
            await updateProduct(product.id, formData);
            toast.success('Product updated successfully!');
        } else {
            await addProduct(formData);
            toast.success('Product added successfully!');
        }
        onClose();
    } catch (error) {
        toast.error('An error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                </select>
              </div>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="https://picsum.photos/seed/aartX/800/1000" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sizes (comma-separated)</label>
            <input type="text" name="sizes" value={formData.sizes.join(', ')} onChange={handleSizeChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">{product ? 'Update Product' : 'Add Product'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
