


import Header from "@/Layout/Header";
import SocialmediaMenu from "@/components/SocialmediaMenu/";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { api } from "@/Services/api.js";
import "./globals.css";
import Footer from "@/Layout/Footer";
import { LanguageProvider } from "@/lang/LanguageContext";

import { fetchData } from "@/utils/fetchData";


export async function generateMetadata() {
  let settings = null
  try {
   const baseUrl = process.env.API_URL;
    const res = await fetch(`${baseUrl}/basic/settings`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch settings')
    settings = await res.json()
    
  } catch (error) {
    console.log('Error fetching settings:', error.message)

    // بيانات افتراضية fallback
    settings = {
      website_name: 'نانو سوفت',
      website_url: 'https://nano2soft.com',
      meta_title: 'نانو سوفت للبرمجيات',
      meta_description: 'شركة برمجيات وحلول تقنية',
      meta_keywords: 'برمجيات, نانو سوفت, تقنية',
      website_author: 'Nano Soft',
      website_author_name: 'Eng. Dheia Al-Shami',
      author_web: 'https://nano2soft.com',
      brand_primary: '#3f9ce8',
      website_logo: {
        original: '/logo.png',
      },
      website_icon: {
        small: '/favicon.jpg',
      },
    }
  }

  return {
    title: settings.meta_title || settings.website_name,
    description: settings.meta_description,
    keywords: settings.meta_keywords?.split(',') || [],
    authors: [
      {
        name: settings.website_author || 'Nano Soft',
        url: settings.author_web || settings.website_url,
      },
    ],
    creator: settings.website_author_name,
    publisher: settings.website_name,
    icons: {
      icon: [
        { url: settings.website_icon?.original, type: 'image/jpg' },
        { url: settings.website_logo?.original, type: 'image/jpg' },
      ],
    },
openGraph: {
      title: settings.meta_title,
      description: settings.meta_description,
      url: settings.website_url,
      siteName: settings.website_name,
      images: [
        {
          url: settings.website_logo?.original,
          width: 800,
          height: 600,
          alt: settings.website_name,
        },
      ],
      locale: 'ar_YE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.meta_title,
      description: settings.meta_description,
      images: [settings.website_logo?.original],
      site: settings.website_url,
    },
    metadataBase: new URL(settings.website_url),
    robots: {
      index: true,
      follow: true,
    }
    }
}

// ✅ إعدادات viewport
export const viewport = {
  width: 'device-width',
  initialScale: 1,
      themeColor:   '#green',
    
};



 



//####
export default async function RootLayout({ children }) {
    const dataMenu = await fetchData("cms/menus/data", {
        name: "testmenu"
    });

    //const menuData = await getMenuData();

    return (
        <html lang="en">
            <head></head>
            <body>
                <LanguageProvider>
                    <Header dataMenu={dataMenu.data} />
                    <div style={{ height: "110px" }}></div>
                    <SocialmediaMenu />
                    <main>
                      
                    {children}
                    </main>
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
