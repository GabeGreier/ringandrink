import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, SITE_CONFIG, NAVIGATION_ITEMS } from '../../utils/constants';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const showNav = location.pathname !== '/';

  if (!showNav) return null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center justify-center h-full">
            <img 
              src={SITE_CONFIG.logo.dark} 
              alt={SITE_CONFIG.name} 
              className="h-10 w-auto" 
            />
          </Link>
        </div>
        
        <button 
          className="md:hidden focus:outline-none rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg md:relative md:top-0 md:block md:bg-transparent md:shadow-none`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 p-6 md:p-0 space-y-4 md:space-y-0">
            {NAVIGATION_ITEMS.map(({ path, label }) => (
              <li key={path}>
                <Link 
                  to={path} 
                  className="block text-gray-700 hover:underline font-medium py-2 md:py-0 focus:outline-none" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}