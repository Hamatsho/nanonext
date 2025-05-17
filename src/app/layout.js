
/*
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";
import { fetchData } from "@/Services/api";
import { LanguageProvider } from "@/lang/LanguageContext";

import "./App.css";

export default async function RootLayout({ children }) {
  const dataMenu = await fetchData("cms/menus/data", {
    params: { name: "testmenu" },
    next: { revalidate: 3600 }, // cache for 1 hour (اختياري)
  });

  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          
            <Header />
            <div style={{ height: "110px" }}></div>
            {children}
            <Footer />
         
        </LanguageProvider>
      </body>
    </html>
  );
}

*/

import Header from "@/Layout/Header";
import SocialmediaMenu from "@/components/SocialmediaMenu/";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { api } from "@/Services/api.js";
import "./globals.css";
//import "../pages/Home/home.css";
import Footer from "@/Layout/Footer";
import { LanguageProvider } from "@/lang/LanguageContext";
//import { MenuProvider } from "@/hook/MenuContext";
import { fetchData } from "@/utils/fetchData";
//import { getMenuData } from "@/utils/getMenu";
//import { AppContext } from "@/hook/AppContext";

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
