import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../constants/products';
import { ProductCard } from './ProductCard';
import SEOHead from './layout/SEOHead';
import { ROUTES } from '../utils/constants';

export default function Products() {
  const { addToCart } = useCart();
  const [productFilter, setProductFilter] = useState('all');
  
  const seoProps = {
    title: 'Store',
    description: 'Shop premium ringette t-shirts and hoodies for centers, forwards, defense, goalies, and fans. Youth and adult sizes available with Saskatchewan local pickup.',
    keywords: ['ringette store', 'buy ringette apparel', 'ringette t-shirts', 'ringette hoodies', 'Warman clothing store', 'Saskatchewan ringette gear'],
    path: ROUTES.STORE,
    type: 'product'
  };

  const filteredProducts = productFilter === 'all' 
    ? products 
    : products.filter(product => product.type === productFilter);

  return (
    <>
      <SEOHead page={seoProps} />
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Product Filter */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setProductFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                productFilter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setProductFilter('tee')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                productFilter === 'tee'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              T-Shirts
            </button>
            <button
              onClick={() => setProductFilter('hoodie')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                productFilter === 'hoodie'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Hoodies
            </button>
          </div>
        </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(product, size) => addToCart(product, size)}
          />
        ))}
      </div>
      </div>
    </>
  );
}