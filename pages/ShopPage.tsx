
import React, { useState, useEffect, useMemo } from 'react';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import PageTransition from '../components/layout/PageTransition';
import { Category } from '../types';
import { AnimatePresence } from 'framer-motion';

const categories: (Category | 'All')[] = ['All', 'Men', 'Women', 'Unisex'];

const ShopPage: React.FC = () => {
  const { products, isLoading, fetchProducts } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(product =>
        activeCategory === 'All' ? true : product.category === activeCategory
      )
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [products, activeCategory, searchTerm]);

  return (
    <PageTransition>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center animate-slide-in-up">
            <h1 className="text-4xl font-black tracking-tighter sm:text-6xl">Our Collection</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">Discover pieces designed for the modern creative.</p>
          </div>

          {/* Filters and Search */}
          <div className="mt-12 sticky top-16 bg-white/80 backdrop-blur-lg z-40 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                />
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? 'bg-brand-dark text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="mt-8">
             <AnimatePresence>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
                    : filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                </div>
            </AnimatePresence>
            {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-500">No products found. Try adjusting your filters.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ShopPage;
