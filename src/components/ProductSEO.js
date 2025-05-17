import Head from 'next/head';

const ProductSEO = ({ product }) => {
  console.log(product)
  const seo = product?.seostorm_options?.seo_data;
  if (!seo) return null;

  const metaTags = [];

  // Meta Title & Description & Keywords
  metaTags.push(
    <title key="title">{seo.meta?.title_raw || seo.meta?.title}</title>,
    <meta key="meta-title" name="title" content={seo.meta?.title || ''} />,
    <meta key="description" name="description" content={seo.meta?.description || ''} />,
    <meta key="keywords" name="keywords" content={seo.meta?.keywords || ''} />
  );

  // Open Graph
  if (seo.og?.enable_og) {
    metaTags.push(
      <meta key="og:title" property="og:title" content={seo.og?.og_title || ''} />,
      <meta key="og:description" property="og:description" content={seo.og?.og_description || ''} />,
      <meta key="og:site_name" property="og:site_name" content={seo.og?.og_site_name || ''} />,
      <meta key="og:type" property="og:type" content={seo.og?.og_type || 'website'} />,
      <meta key="og:locale" property="og:locale" content={seo.og?.og_locale || 'ar'} />,
      <meta key="og:locale:alt" property="og:locale:alternate" content={seo.og?.og_locale_alternate || 'ar'} />,
      <meta key="og:card" property="og:card" content={seo.og?.og_card || 'summary_large_image'} />,
      <meta key="og:image" property="og:image" content={seo.og?.og_image || product?.image?.original || ''} />
    );

    if (seo.og?.og_url)
      metaTags.push(<meta key="og:url" property="og:url" content={seo.og.og_url} />);
    if (seo.og?.fb_app_id)
      metaTags.push(<meta key="fb:app_id" property="fb:app_id" content={seo.og.fb_app_id} />);
    if (seo.og?.twitter_site)
      metaTags.push(<meta key="twitter:site" name="twitter:site" content={seo.og.twitter_site} />);
    if (seo.og?.twitter_creator)
      metaTags.push(<meta key="twitter:creator" name="twitter:creator" content={seo.og.twitter_creator} />);
  }

  // Robots & Canonical
  if (seo.robots?.enable_robots) {
    metaTags.push(
      <meta key="robots" name="robots" content={seo.robots?.robots || 'index,follow'} />
    );
    if (seo.robots?.canonical_url) {
      metaTags.push(
        <link key="canonical" rel="canonical" href={seo.robots.canonical_url} />
      );
    }
  }

  // Favicon
  if (seo.favicon?.enable_favicon) {
    if (seo.favicon?.favicon_site) {
      metaTags.push(
        <link key="favicon" rel="shortcut icon" href={seo.favicon.favicon_site} />
      );
    }
    if (Array.isArray(seo.favicon.icons)) {
      seo.favicon.icons.forEach((icon, index) => {
        metaTags.push(
          <link
            key={`icon-${index}`}
            rel="icon"
            href={icon.src}
            sizes={icon.sizes}
            type={icon.type}
          />
        );
      });
    }
  }

  // Webmanifest
  if (seo.webmanifest?.enable_webmanifest && seo.webmanifest?.webmanifest_url) {
    metaTags.push(
      <link key="manifest" rel="manifest" href={seo.webmanifest.webmanifest_url} />
    );
  }

  // Schema
  if (seo.schema?.enable_schema) {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": seo.schema?.schema_type || "WebPage",
      name: seo.meta?.title,
      description: seo.meta?.description,
      image: seo.schema?.schema_image || product?.image?.original || '',
      publisher: seo.schema?.publisher || undefined,
    };

    metaTags.push(
      <script
        key="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  }

  // Extra HTML
  if (seo.extra_meta?.html) {
    metaTags.push(
      <div
        key="extra-meta"
        dangerouslySetInnerHTML={{ __html: seo.extra_meta.html }}
      />
    );
  }

  return <Head>{metaTags}</Head>;
};

export default ProductSEO;
