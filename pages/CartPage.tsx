
import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import PageTransition from '../components/layout/PageTransition';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  return (
    <PageTransition>
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter sm:text-6xl">Your Cart</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              You have {totalItems()} item(s) in your cart.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center mt-16">
              <p className="text-gray-500 text-xl">Your cart is empty.</p>
              <Link to="/shop">
                <Button size="lg" className="mt-6">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                  {items.map((product) => (
                    <li key={`${product.id}-${product.selectedSize}`} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link to={`/product/${product.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                            <p className="mt-1 text-sm text-gray-500">Size: {product.selectedSize}</p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label htmlFor={`quantity-${product.id}`} className="sr-only">
                              Quantity, {product.name}
                            </label>
                            <input
                              id={`quantity-${product.id}`}
                              name={`quantity-${product.id}`}
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) => updateQuantity(product.id, product.selectedSize, parseInt(e.target.value, 10))}
                              className="w-16 rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            />

                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                onClick={() => removeItem(product.id, product.selectedSize)}
                              >
                                <span className="sr-only">Remove</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
              >
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">${totalPrice().toFixed(2)}</dd>
                  </div>
                  {/* Add shipping and taxes here if needed */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">${totalPrice().toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <Link to="/checkout">
                    <Button size="lg" className="w-full">
                      Checkout
                    </Button>
                  </Link>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default CartPage;
