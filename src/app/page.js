//"use client";

//import "@/pages/Home/home.css";
//import "@/components/css/about.css";
//import React from "react"
/*
import { SwiperSlide } from "swiper/react";
import "@/components/Card/card.css";
import CustomSwiper from "@/components/CustomSwiper";
import Card from "@/components/Card";
*/
//import React, { useEffect, useState } from "react";
//import { useLanguage } from "@/lang/LanguageContext";
//import { fetchData } from "@/Services/api";
//import Skeleton from "react-loading-skeleton";
//import Success from "@/Layout/Success/";
import { cookies } from "next/headers";

import Stats from "@/Layout/Stats";
import Associates from "@/Layout/Associates";
import Adverts from "@/Layout/Adverts";
import Features from "@/Layout/Features";
import Title from "@/components/Title";
import Shop from "@/Layout/Shop/index.js";
import Albums from "@/Layout/Albums/index.js";
// #########################
import Section from "@/Layout/Webbasic/index.js";
const language = "ar";

// #########################
async function getData(url, language) {
    try {
    const res = await fetch(`${process.env.API_URL}/${url}`, {
        headers: {
            "Accept-Language": language
        }
    });
    if (!res.ok) {
        return {data:[]};
        throw "Nahool Error from Home";
    }
    
    const data = await res.json();
    return data;
    } catch(err) {
      console.log(err)
    }
}

async function Home(context) {
    // const { language } = useLanguage();
    const cookieStore = await cookies();
    const language = cookieStore.get("Language")?.value || "ar";
    const direction = language === "en" ? "ltr" : "rtl";

  
    let ads = await getData("advert/madverts",language);
    let projects = await getData("webbasic/projects",language);
    let posts = await getData("webbasic/posts",language);
    let features = await getData("webbasic/features",language);
    console.log(projects);
    if (!projects) {
        projects = [];
    }
    return (
        <div>
            <Adverts data={ads?.data} />
            <Title
                showAll="/shop/products"
                text={language === "en" ? "Software" : "البرمجيات"}
            />
            <Shop reftype="products" />
           
            <Title
                showAll="/shop/services"
                text={language === "en" ? "Services" : "الخدمات"}
            />
           
            <Shop reftype="services" />
            <Title text={language === "en" ? "Our Features" : "مميزاتنا"} />

            <Features data={features?.data} name="features" language={language} />
            <div className="">
                <Title showAll="/web/projects" text={"من أعمالنا "} />
                <Section data={projects.data} name="projects" language="ar" />
            </div>
            <div className="">
                <Title showAll="/web/posts" text={"اخر الأخبار"} />
                <Section data={posts?.data} name="posts" />
            </div>

            <Stats />
            <div className="main-section">
                <Title text={"شركاء النجاح "} />
                <Associates name="associates" />
            </div>
               <div style={{ paddingBottom: "100px" }}>
                <Albums />
            </div>
           
            {/* ################################# */}
        </div>
    );
}

export default Home;
