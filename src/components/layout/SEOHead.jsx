import { Helmet } from 'react-helmet-async';
import { generateMetaTags, generateStructuredData } from '../../utils/seo';

export default function SEOHead({ page = {} }) {
  const metaTags = generateMetaTags(page);
  const structuredData = generateStructuredData(page.type);

  return (
    <Helmet>
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <meta name="author" content="Ring & Rink Co." />
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTags['og:title']} />
      <meta property="og:description" content={metaTags['og:description']} />
      <meta property="og:type" content={metaTags['og:type']} />
      <meta property="og:url" content={metaTags['og:url']} />
      <meta property="og:image" content={metaTags['og:image']} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={metaTags['twitter:card']} />
      <meta name="twitter:title" content={metaTags['twitter:title']} />
      <meta name="twitter:description" content={metaTags['twitter:description']} />
      <meta name="twitter:image" content={metaTags['twitter:image']} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Local Business Optimization */}
      <meta name="geo.region" content="CA-SK" />
      <meta name="geo.placename" content="Warman, Saskatchewan" />
      <meta name="geo.position" content="52.3230;-106.5880" />
      <meta name="ICBM" content="52.3230, -106.5880" />
    </Helmet>
  );
}