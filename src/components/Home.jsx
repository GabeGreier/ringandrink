import { Link } from 'react-router-dom';
import { ROUTES, SITE_CONFIG } from '../utils/constants';

export default function Home() {
  const seoProps = {
    title: 'Ring & Rink Co',
    description: 'Premium ringette apparel for players, fans, and families in Warman, Saskatoon, and across Saskatchewan. Position-specific t-shirts and hoodies celebrating ringette culture.',
    keywords: ['ringette apparel', 'Warman ringette', 'Saskatoon ringette', 'Saskatchewan ringette', 'ringette t-shirts', 'ringette hoodies'],
    path: ROUTES.HOME
  };

  return (
    <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center blur-sm opacity-60"
            style={{
              backgroundImage: "url('/images/rink-background.png')",
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto text-center">
              <img 
                src={SITE_CONFIG.logo.light}
                alt={SITE_CONFIG.name}
                className="h-20 sm:h-24 md:h-32 w-auto mx-auto mb-6 sm:mb-8"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
                Wear Your Position Proudly. Play Loud.
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                From the triangle to the ringette line, our ringette-inspired apparel lets you rep your role on and off the ice. 
                Designed for centers, defenders, and die-hard fans who live for the game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <Link 
                  to={ROUTES.STORE} 
                  className="inline-block text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                  style={{ backgroundColor: '#296CAC' }}
                >
                  Shop the Collection
                </Link>

              </div>
            </div>
          </div>
        </section>


      </div>
  );
}