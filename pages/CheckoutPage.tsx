
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import PageTransition from '../components/layout/PageTransition';
import { useCartStore } from '../store/cartStore';

const CheckoutPage: React.FC = () => {
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        // Clear the cart when the user reaches the "checkout"
        clearCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <PageTransition>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="mt-4 text-4xl font-black tracking-tighter text-brand-dark sm:text-6xl">Thank You!</h1>
            <p className="mt-6 text-xl text-gray-500">
              Your order has been placed successfully.
              (This is a placeholder page. No real order has been processed).
            </p>
            <div className="mt-10">
              <Link to="/shop">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CheckoutPage;
