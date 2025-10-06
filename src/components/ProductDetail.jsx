import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../constants/products';
import { Button } from './common/Button';
import { useCart } from '../context/CartContext';
import { getProductPrice, COLORS, SIZES } from '../utils/pricing';
import SEOHead from './layout/SEOHead';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [sizeCategory, setSizeCategory] = useState('adult'); // 'adult' or 'youth'

  const product = products.find(p => p.id === parseInt(id));
  const currentPrice = selectedSize 
    ? getProductPrice(product?.type, sizeCategory, selectedSize)
    : product?.basePrice || 25;

  const seoProps = product ? {
    title: `${product.name} - Ringette ${product.type === 'tee' ? 'T-Shirt' : 'Hoodie'} | Ring & Rink Co.`,
    description: `${product.description} Available in youth and adult sizes. Premium ringette apparel from Saskatchewan.`,
    keywords: [product.name.toLowerCase(), `ringette ${product.type}`, `${product.position} ringette apparel`, 'Saskatchewan ringette clothing'],
    type: 'product'
  } : {
    title: 'Product Not Found',
    description: 'The requested product could not be found.'
  };

  if (!product) {
    return (
      <>
        <SEOHead page={seoProps} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/store')}>
              Back to Store
            </Button>
          </div>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color first');
      return;
    }
    const sizeWithCategory = `${sizeCategory === 'youth' ? 'Youth ' : ''}${selectedSize}`;
    const productWithPricing = {
      ...product,
      price: currentPrice,
      selectedColor: selectedColor,
      colorName: COLORS.find(c => c.id === selectedColor)?.name || 'Black'
    };
    addToCart(productWithPricing, sizeWithCategory);
    alert('Item added to cart!');
  };

  const handleSizeCategoryChange = (category) => {
    setSizeCategory(category);
    setSelectedSize(''); // Reset selected size when category changes
  };

  const getAvailableSizes = () => {
    return SIZES[sizeCategory];
  };

  return (
    <>
      <SEOHead page={seoProps} />
      <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Button 
          onClick={() => navigate('/store')}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          ← Back to Store
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div 
            className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden cursor-zoom-in group relative"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              const img = e.currentTarget.querySelector('img');
              if (img) {
                img.style.transformOrigin = `${x}% ${y}%`;
              }
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) {
                img.style.transformOrigin = 'center center';
              }
            }}
          >
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-200 ease-out group-hover:scale-125"
              />
            ) : (
              <div className="text-center">
                <span className="text-gray-500 text-lg">Product Image</span>
                <p className="text-sm text-gray-400 mt-2">{product.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-bold" style={{ color: '#296CAC' }}>${currentPrice.toFixed(2)} CAD</p>
            {selectedSize && selectedSize !== '' && (
              <p className="text-sm text-gray-600 mt-1">
                {sizeCategory === 'youth' ? 'Youth' : 'Adult'} {selectedSize} - ${currentPrice.toFixed(2)} CAD
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          {/* Color Selection */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
            <div className="grid grid-cols-4 gap-4">
              {COLORS.map(color => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors ${
                    selectedColor === color.id
                      ? 'bg-blue-50 hover:border-gray-400'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={selectedColor === color.id ? { borderColor: '#296CAC' } : {}}
                >
                  <div 
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-sm font-medium">{color.name}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3 italic">
              * Colors may vary from pictures in the reference guide. Please note sports grey is the only preview image available.
            </p>
          </div>

          {/* Reference Links */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Reference Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href={`/images/${product.type === 'tee' ? 'Color Tshirt' : 'Hoodie Color'} ${sizeCategory === 'youth' ? 'Youth' : 'Adult'}.png`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium text-sm"
                style={{ color: '#296CAC' }}
              >
                🎨 Color Options / Material ({sizeCategory === 'youth' ? 'Youth' : 'Adult'})
              </a>
              <a 
                href={`/images/Sizing ${sizeCategory === 'youth' ? 'Youth' : 'Adult'}.png`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium text-sm"
                style={{ color: '#296CAC' }}
              >
                📏 {sizeCategory === 'youth' ? 'Youth' : 'Adult'} Size Guide
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li><span className="font-medium">Type:</span> {product.type === 'tee' ? 'T-Shirt' : 'Hoodie'}</li>
              <li><span className="font-medium">Selected Color:</span> {COLORS.find(c => c.id === selectedColor)?.name || 'Black'}</li>
            </ul>
          </div>

          {/* Size Selection */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Size
            </label>
            
            {/* Size Category Selection */}
            <div className="mb-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSizeCategoryChange('adult')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    sizeCategory === 'adult'
                      ? 'text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={sizeCategory === 'adult' ? { backgroundColor: '#296CAC' } : {}}
                >
                  Adult Sizes
                </button>
                <button
                  onClick={() => handleSizeCategoryChange('youth')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    sizeCategory === 'youth'
                      ? 'text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  style={sizeCategory === 'youth' ? { backgroundColor: '#296CAC' } : {}}
                >
                  Youth Sizes
                </button>
              </div>
            </div>

            {/* Size Options */}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {getAvailableSizes().map(size => {
                const sizePrice = getProductPrice(product.type, sizeCategory, size);
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-center border rounded-md font-medium transition-colors duration-200 ${
                      selectedSize === size
                        ? 'text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    style={selectedSize === size ? { backgroundColor: '#296CAC', borderColor: '#296CAC' } : {}}
                  >
                    <div className="text-sm">{size}</div>
                    <div className="text-xs opacity-75">${sizePrice} CAD</div>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {sizeCategory === 'youth' ? 'Youth sizing' : 'Adult sizing'}
            </p>
          </div>

          {/* Add to Cart */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <Button 
              onClick={handleAddToCart}
              className="w-full py-4 text-lg font-semibold"
            >
              Add to Cart
            </Button>
            <Button 
              onClick={() => navigate('/store')}
              className="w-full py-3 text-base font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}