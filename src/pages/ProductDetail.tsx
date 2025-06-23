import React from 'react';
import { ArrowLeft, Plus, Check, Star, Shield, Zap, Smartphone } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate }) => {
  const { addItem, state } = useCart();
  const isInCart = state.items.some(item => item.product.id === product.id);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to All Subscriptions
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.popular && (
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Most Popular
                  </span>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Secure</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">100% Safe</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Instant</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Quick Delivery</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center shadow-sm border border-gray-200 dark:border-gray-700">
                <Smartphone className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Vodafone</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Cash Payment</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span 
                  className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: product.brandColor }}
                >
                  {product.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {product.duration}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">per {product.duration.toLowerCase()}</p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What's Included</h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center ${
                  isInCart
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-1'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="h-6 w-6 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="h-6 w-6 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>

              {isInCart && (
                <button
                  onClick={() => onNavigate('cart')}
                  className="w-full py-3 px-6 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-2xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  View Cart
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How it works:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Add to cart and proceed to checkout</li>
                <li>Pay securely with Vodafone Cash to 01021981265</li>
                <li>Upload payment screenshot for verification</li>
                <li>Receive your subscription details within 5-10 minutes</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};