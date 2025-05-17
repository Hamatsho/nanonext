

export default async function getSEO(url) {
  let seo = {};
    
    try {
        const res = 
        await fetch(url);
        const data = await res.json();
        seo = data.seostorm_options.seo_data;
        //await fetchProductMeta(params.id);
    } catch (err) {
      console.log("Error from getSEO function failed fetch")
    }
    
    if (!seo?.meta?.enable_meta) return {};

    return {
        title: seo.meta.title_raw,
        description: seo.meta.description,
        keywords: seo.meta.keywords,
        openGraph: seo.og?.enable_og
            ? {
                  title: seo.og.og_title,
                  description: seo.og.og_description,
                  siteName: seo.og.og_site_name,
                  type: seo.og.og_type,
                  locale: seo.og.og_locale,
                  images: seo.og.og_image ? [seo.og.og_image] : [],
                  url: seo.og.og_url || undefined
              }
            : undefined,
        twitter: seo.og?.enable_og
            ? {
                  card: seo.og.og_card,
                  site: seo.og.twitter_site,
                  creator: seo.og.twitter_creator
              }
            : undefined,
        robots: seo.robots?.enable_robots
            ? {
                  index: seo.robots.robot_index === "index",
                  follow: seo.robots.robot_follow === "follow"
              }
            : undefined,
        icons: seo.favicon?.enable_favicon
            ? seo.favicon.icons.map(icon => ({
                  url: icon.src,
                  type: icon.type,
                  sizes: icon.sizes
              }))
            : undefined,
        manifest: seo.webmanifest?.enable_webmanifest
            ? seo.webmanifest.webmanifest_url
            : undefined
    };
}