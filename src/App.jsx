import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Layout from './components/layout/Layout'
import Products from './components/Products'
import ContactForm from './components/ContactForm'
import Home from './components/Home'
import Cart from './components/Cart'
import About from './components/About'
import ProductDetail from './components/ProductDetail'
import PaymentShipping from './components/PaymentShipping'
import NotFound from './components/NotFound'
import { CartProvider } from './context/CartContext'
import { ROUTES } from './utils/constants'

function App() {
  return (
    <Router>
      <CartProvider>
          <Routes>
            {/* Home page without layout (custom design) */}
            <Route path={ROUTES.HOME} element={<Home />} />
            
            {/* Pages with layout */}
            <Route path={ROUTES.STORE} element={
              <Layout seoProps={{ 
                title: 'Ringette Apparel Store', 
                description: 'Shop premium ringette t-shirts, hoodies, and apparel for players and fans in Saskatchewan.',
                path: ROUTES.STORE,
                type: 'product'
              }}>
                <Products />
              </Layout>
            } />
            
            <Route path={`${ROUTES.PRODUCT}/:id`} element={
              <Layout seoProps={{ 
                title: 'Product Details', 
                description: 'View detailed information about our ringette apparel.',
                type: 'product'
              }}>
                <ProductDetail />
              </Layout>
            } />
            
            <Route path={ROUTES.CART} element={
              <Layout seoProps={{ title: 'Shopping Cart' }}>
                <Cart />
              </Layout>
            } />
            
            <Route path="/order-delivery-info" element={
              <Layout seoProps={{ 
                title: 'Order & Delivery Information',
                description: 'Learn about our shipping, pickup, payment, and return policies for ringette apparel orders.',
                path: '/order-delivery-info'
              }}>
                <PaymentShipping />
              </Layout>
            } />
            
            <Route path={ROUTES.ABOUT} element={
              <Layout seoProps={{ 
                title: 'About Ring & Rink Co.',
                description: 'Learn about our mission to celebrate ringette culture and support young athletes in Saskatchewan.',
                path: ROUTES.ABOUT
              }}>
                <About />
              </Layout>
            } />
            
            <Route path={ROUTES.CONTACT} element={
              <Layout seoProps={{ 
                title: 'Contact Us',
                description: 'Get in touch with Ring & Rink Co. for custom orders, questions, or support.',
                path: ROUTES.CONTACT
              }}>
                <ContactForm />
              </Layout>
            } />
            
            {/* 404 Catch-all route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
