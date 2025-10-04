import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './common/Button';
import { getProductPrice, COLORS, SIZES } from '../utils/pricing';

export const ProductCard = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [sizeCategory, setSizeCategory] = useState('adult');
  const navigate = useNavigate();

  const currentPrice = selectedSize 
    ? getProductPrice(product.type, sizeCategory, selectedSize)
    : product.basePrice;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
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
    onAddToCart(productWithPricing, sizeWithCategory);
    alert('Item added to cart!');
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">{product.description}</p>
        <p className="text-xl font-bold text-gray-800">${currentPrice.toFixed(2)}</p>
        
        {/* Color Selection */}
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Color
          </label>
          <div className="flex gap-2">
            {COLORS.map(color => (
              <button
                key={color.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color.id);
                }}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color.id ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          
          {/* Size Category */}
          <div className="mb-2">
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSizeCategory('adult');
                  setSelectedSize('');
                }}
                className={`px-2 py-1 text-xs rounded ${
                  sizeCategory === 'adult'
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                style={sizeCategory === 'adult' ? { backgroundColor: '#296CAC' } : {}}
              >
                Adult
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSizeCategory('youth');
                  setSelectedSize('');
                }}
                className={`px-2 py-1 text-xs rounded ${
                  sizeCategory === 'youth'
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                style={sizeCategory === 'youth' ? { backgroundColor: '#296CAC' } : {}}
              >
                Youth
              </button>
            </div>
          </div>

          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {SIZES[sizeCategory].map(size => (
              <option key={size} value={size}>
                {size} - ${getProductPrice(product.type, sizeCategory, size).toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <Button 
          onClick={handleAddToCart}
          className="mt-4 w-full"
        >
          Add to Cart
        </Button>
        

      </div>
    </div>
  );
};