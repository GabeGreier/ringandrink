import Navigation from './Navigation';
import Footer from './Footer';
import SEOHead from './SEOHead';

export default function Layout({ children, seoProps = {} }) {
  return (
    <>
      <SEOHead page={seoProps} />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}