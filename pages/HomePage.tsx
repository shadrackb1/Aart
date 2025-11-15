
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import PageTransition from '../components/layout/PageTransition';
import SkeletonCard from '../components/SkeletonCard';

const HomePage: React.FC = () => {
  const { products, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative flex h-screen items-center justify-center bg-brand-light">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-black tracking-tighter text-brand-dark"
          >
            Aart
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl md:text-2xl font-medium tracking-wider uppercase text-gray-500"
          >
            Art You Wear
          </motion.p>
        </div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-10"
        >
             <Link to="/shop">
                <Button size="lg">Explore Collection</Button>
            </Link>
        </motion.div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-tighter text-center sm:text-4xl">Featured Products</h2>
            <p className="mt-4 text-center text-gray-500">Curated pieces from our latest collection.</p>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
            <div className="mt-16 text-center">
                <Link to="/shop">
                    <Button variant="secondary" size="lg">View All Products</Button>
                </Link>
            </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
