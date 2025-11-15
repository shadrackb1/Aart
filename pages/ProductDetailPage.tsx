
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';
import Button from '../components/ui/Button';
import PageTransition from '../components/layout/PageTransition';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, fetchProducts } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      if (products.length === 0) {
        await fetchProducts();
      }
      const foundProduct = products.find(p => p.id === Number(id));
      if(foundProduct){
        setProduct(foundProduct);
        if (foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
      }
      setIsLoading(false);
    };

    loadProduct();
  }, [id, products, fetchProducts]);

  const handleAddToCart = () => {
    if (product) {
      if (!selectedSize) {
        toast.error('Please select a size.');
        return;
      }
      addItem(product, selectedSize);
      toast.success(`${product.name} added to cart!`);
    }
  };
  
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="bg-gray-300 aspect-w-1 aspect-h-1"></div>
          <div>
            <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-8 w-1/4 bg-gray-300 rounded mt-4"></div>
            <div className="h-20 w-full bg-gray-300 rounded mt-8"></div>
            <div className="h-12 w-full bg-gray-300 rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
        <PageTransition>
            <div className="text-center py-24">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <Link to="/shop" className="mt-4 inline-block">
                    <Button>Back to Shop</Button>
                </Link>
            </div>
        </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid md:grid-cols-2 gap-x-12">
            {/* Image gallery */}
            <div className="animate-fade-in">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover object-center"/>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 md:mt-0 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
              <h1 className="text-3xl font-black tracking-tight text-brand-dark sm:text-4xl">{product.name}</h1>
              <div className="mt-3">
                <p className="text-3xl text-brand-dark">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base text-gray-700">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="mt-10">
                {/* Sizes */}
                <div>
                  <h3 className="text-sm font-medium text-brand-dark">Size</h3>
                  <fieldset className="mt-4">
                    <legend className="sr-only">Choose a size</legend>
                    <div className="flex items-center space-x-3">
                      {product.sizes.map((size) => (
                        <label key={size} className={`relative border rounded-md p-4 flex items-center justify-center text-sm font-medium uppercase cursor-pointer focus:outline-none 
                          ${selectedSize === size ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'}`}>
                          <input type="radio" name="size-choice" value={size} className="sr-only" onChange={() => setSelectedSize(size)} checked={selectedSize === size}/>
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <Button onClick={handleAddToCart} size="lg" className="mt-10 w-full">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
          <div className="bg-brand-light py-24 sm:py-32">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">You might also like</h2>
                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {relatedProducts.map((relatedProduct) => (
                          <ProductCard key={relatedProduct.id} product={relatedProduct} />
                      ))}
                  </div>
              </div>
          </div>
      )}
    </PageTransition>
  );
};

export default ProductDetailPage;
