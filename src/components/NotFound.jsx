import { Link } from 'react-router-dom';
import SEOHead from './layout/SEOHead';
import { ROUTES } from '../utils/constants';

export default function NotFound() {
  const seoProps = {
    title: '404 - Page Not Found',
    description: 'Looks like this page went out of bounds! Return to Ring & Rink Co. to find what you\'re looking for.',
    path: '/404'
  };

  return (
    <>
      <SEOHead page={seoProps} />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Code Display */}
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl font-bold text-gray-300 mb-4">404</h1>
            <div className="relative">
              {/* Ringette Ring Animation */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin" style={{ borderTopColor: '#296CAC' }}></div>
                <div className="absolute inset-2 border-2 border-gray-200 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 border-2 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs font-bold">OOPS!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ringette-themed Error Message */}
          <div className="space-y-6 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              This page has four man over the ringette line!
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                This page either moved positions 
              or got called for a penalty and sent to the box.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: '#296CAC' }}>
              <p className="text-gray-700 italic">
                "Sometimes you miss the net, sometimes you miss the page. 
                What matters is getting back on the ice!" 
                <br />
                <span className="text-sm text-gray-500 mt-2 block">- Every Ringette Player Ever</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={ROUTES.HOME}
              className="inline-block text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#296CAC' }}
            >
              Back to Home Ice
            </Link>
            <Link 
              to={ROUTES.STORE}
              className="inline-block bg-white border-2 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
              style={{ color: '#296CAC', borderColor: '#296CAC' }}
            >
              Browse Our Gear
            </Link>
          </div>

          {/* Fun Easter Egg Message */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Fun fact: In ringette, there are 6 players on ice at once, but apparently 0 pages here!</p>
            <p className="mt-2">Maybe try checking the triangle?</p>
          </div>
        </div>
      </div>
    </>
  );
}