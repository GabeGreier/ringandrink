// SEO and Meta utilities
export const SEO_CONFIG = {
  defaultTitle: 'Ring & Rink Co',
  defaultDescription: 'Premium ringette apparel for players, fans, and families in Warman, Saskatoon, and across Saskatchewan. T-shirts, hoodies, and gear celebrating ringette culture.',
  keywords: [
    'ringette apparel',
    'ringette clothing',
    'ringette t-shirts',
    'ringette hoodies',
    'Warman ringette',
    'Saskatoon ringette',
    'Saskatchewan ringette',
    'Canadian ringette gear',
    'position specific ringette shirts',
    'center tee',
    'forward hoodie',
    'defense apparel',
    'goalie gear',
    'ringette fan merchandise'
  ],
  author: 'Ring & Rink Co.',
  siteUrl: 'https://ringrinkco.com', // Update with actual domain
  businessInfo: {
    name: 'Ring & Rink Co.',
    email: 'ring.rink.co@gmail.com',
    location: 'Warman, Saskatchewan, Canada',
    serviceArea: ['Warman', 'Saskatoon', 'Saskatchewan', 'Canada']
  }
};

export const generateMetaTags = (page = {}) => {
  const title = page.title || SEO_CONFIG.defaultTitle;
    
  const description = page.description || SEO_CONFIG.defaultDescription;
  
  return {
    title,
    description,
    keywords: [...SEO_CONFIG.keywords, ...(page.keywords || [])].join(', '),
    'og:title': title,
    'og:description': description,
    'og:type': 'website',
    'og:url': `${SEO_CONFIG.siteUrl}${page.path || ''}`,
    'og:image': `${SEO_CONFIG.siteUrl}/images/ringandrink-logo-black.png`,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': `${SEO_CONFIG.siteUrl}/images/ringandrink-logo-black.png`
  };
};

export const generateStructuredData = (type = 'organization') => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.businessInfo.name,
    email: SEO_CONFIG.businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warman',
      addressRegion: 'Saskatchewan',
      addressCountry: 'Canada'
    },
    areaServed: SEO_CONFIG.businessInfo.serviceArea.map(area => ({
      '@type': 'Place',
      name: area
    })),
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl
  };

  if (type === 'product') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      brand: {
        '@type': 'Brand',
        name: SEO_CONFIG.businessInfo.name
      },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '25',
        highPrice: '53',
        priceCurrency: 'CAD'
      }
    };
  }

  return baseData;
};