// Global constants and configuration
export const SITE_CONFIG = {
  name: 'Ring & Rink Co.',
  email: 'ring.rink.co@gmail.com',
  paymentEmail: 'ring.rink.co@gmail.com',
  logo: {
    light: '/images/ringandrink-logo-white.png',
    dark: '/images/ringandrink-logo-black.png'
  },
  shipping: {
    flatRate: 20,
    pickupLocations: ['Warman', 'Saskatoon']
  },
  processing: {
    timeframe: '2 weeks'
  }
};

export const ROUTES = {
  HOME: '/',
  STORE: '/store',
  PRODUCT: '/product',
  CART: '/cart',
  CONTACT: '/contact',
  ABOUT: '/about',
  ORDER_INFO: '/order-delivery-info'
};

export const NAVIGATION_ITEMS = [
  { path: ROUTES.STORE, label: 'Store' },
  { path: ROUTES.CART, label: 'Cart' },
  { path: ROUTES.ORDER_INFO, label: 'Order & Delivery Info' },
  { path: ROUTES.ABOUT, label: 'About' },
  { path: ROUTES.CONTACT, label: 'Contact' }
];