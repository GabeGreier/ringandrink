import SEOHead from './layout/SEOHead';
import { ROUTES, SITE_CONFIG } from '../utils/constants';

export default function About() {
  const seoProps = {
    title: 'About',
    description: 'Learn about Ring & Rink Co., Saskatchewan\'s premier ringette apparel brand. Founded by ringette enthusiasts for players and fans in Warman, Saskatoon, and across Canada.',
    keywords: ['about Ring Rink Co', 'ringette brand Saskatchewan', 'Warman ringette apparel', 'Canadian ringette clothing'],
    path: ROUTES.ABOUT
  };

  return (
    <>
      <SEOHead page={seoProps} />
      <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">About Ring & Rink Co.</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      We're not just selling shirts—we're celebrating a sport that deserves the spotlight. 
                      Ringette is fast, fierce, and full of heart. So is our clothing. Whether you're a pivot queen, 
                      a triangle tactician, or a rink-side cheerleader, our clothing is made to honor your hustle.
                    </p>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      From Saskatchewan rinks to ringette communities across Canada, we're proud to represent 
                      the sport that brings us all together.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center order-1 md:order-2">
                <img 
                  src="/images/player_image.png"
                  alt="Ringette Player"
                  className="h-64 sm:h-80 md:h-96 w-auto mx-auto"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">We're a Team With a Goal</h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  This project started with a simple idea: combine our love for ringette with a creative way to 
                  fundraise for an unforgettable school trip. What began as a few sketches and slogans quickly 
                  turned into a full-blown apparel line that celebrates the sport we live and breathe.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Every shirt we sell helps support our journey—not just across the ice, but across the country. 
                  The proceeds go directly toward funding a school trip that will provide new experiences, new 
                  friendships, and memories that will last a lifetime.
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}