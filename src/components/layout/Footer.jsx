import { Link } from 'react-router-dom';
import { SITE_CONFIG, ROUTES } from '../../utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src={SITE_CONFIG.logo.light} 
              alt={SITE_CONFIG.name} 
              className="h-12 w-auto" 
            />
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-300">
                Thank you for supporting us.
              </h2>
              <p className="text-gray-300 leading-relaxed">
                When you wear our apparel, you're not just raising up ringette - you're helping us chase a dream.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <nav className="space-y-2">
              <Link to={ROUTES.STORE} className="block text-gray-300 hover:text-white transition-colors">
                Shop Collection
              </Link>
              <Link to={ROUTES.CART} className="block text-gray-300 hover:text-white transition-colors">
                Cart
              </Link>
              <Link to={ROUTES.ORDER_INFO} className="block text-gray-300 hover:text-white transition-colors">
                Order & Delivery Info
              </Link>
              <Link to={ROUTES.CONTACT} className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">Email:</span> {SITE_CONFIG.email}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Service Area:</span> Warman, Saskatoon & Saskatchewan
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-700 text-center space-y-2">
          <p className="text-gray-400 text-sm lg:text-base">
            Your position is your personality. Wear it.
          </p>
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}