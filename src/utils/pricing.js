// Pricing utility functions
export const PRICING = {
  youth: {
    tee: 25,
    hoodie: 50
  },
  adult: {
    tee: {
      'XS': 25, 'S': 25, 'M': 25, 'L': 25,
      'XL': 28, 'XXL': 28
    },
    hoodie: {
      'XS': 50, 'S': 50, 'M': 50, 'L': 50, 'XL': 53,
      'XXL': 53
    }
  },
  shipping: 20
};

export const COLORS = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'light-pink', name: 'Light Pink', hex: '#FFB6C1' },
  { id: 'sport-grey', name: 'Sport Grey', hex: '#C3C3D3' },
  { id: 'purple', name: 'Purple', hex: '#382656' }
];

export const SIZES = {
  adult: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  youth: ['XS', 'S', 'M', 'L', 'XL']
};

export const getProductPrice = (productType, sizeCategory, size) => {
  if (sizeCategory === 'youth') {
    return PRICING.youth[productType] || 25;
  } else {
    const adultPricing = PRICING.adult[productType];
    if (typeof adultPricing === 'object') {
      return adultPricing[size] || 25;
    }
    return adultPricing || 25;
  }
};

export const formatPrice = (price) => `$${price.toFixed(2)}`;