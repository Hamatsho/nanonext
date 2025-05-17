//import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
// import Home from "../pages/Home/Home.js";
//import { fetchData } from "../Services/api";
//import { useLanguage } from "../lang/LanguageContext";
/*
import { cookies } from "next/headers"; // لاستخراج اللغة من الكوكيز مثلاً
export default async function Page(context) {
    const params = await context.params; // ✅ انتظر params
   const {code} = params;
    const cookieStore = await cookies();
    const language = cookieStore.get("Language")?.value || "ar";
    console.log("language  ", language);
    const direction = language === "en" ? "ltr" : "rtl";

    let pageData = {};
    let error = null;
    let SEO;

   // const apiUrl = `https://account.now-ye.com/api/v1/cms/static-pages/data?name=${code}`;

    // تنفيذ الـ fetch على الـ server مع إضافة headers
    try {
        const res = await fetch(
          `${process.env.API_URL}/cms/static-pages/data?name=${code}`, {
            cache: "no-store",
            headers: { "Accept-Language": language }
        });
        console.log(res);
        if (res.status === "404") {
            return (
                <div>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                </div>
            );
        }
        pageData = await res.json();
    } catch (err) {
        console.log(err);
    }
    // const pageData = await res.json();

    // console.log(pageData.data.settings.components);
    if (!pageData) {
        return (
            <div>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
                <h1>Hello</h1>
            </div>
        );
    }
    return (
        <div className="page containerMe">
           <h1>{pageData.title}</h1>
            <div
                className={direction}
                style={{ textAlign: "start", minHeight: "100vh" }}
                dangerouslySetInnerHTML={{ __html: pageData?.data?.markup }}
            ></div>
           
        </div>
    );
}


*/

import { cookies } from "next/headers";

export default async function Page(context) {
    const params =await context.params;
   // const { code } = params;

    const cookieStore = await cookies();
    const language = cookieStore.get("Language")?.value || "ar";
    const direction = language === "en" ? "ltr" : "rtl";

    let pageData = null;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 ثواني

        const res = await fetch(
            `${process.env.API_URL}/cms/static-pages/data?name=${params.code}`,
            {
                cache: "no-store",
                headers: { "Accept-Language": language }
            }
        );
       // clearTimeout(timeout);

        if (!res.ok) {
            console.error(`Failed to fetch: ${res.status}`);
            throw new Error("Page not found");
        }

        pageData = await res.json();
    } catch (err) {
        console.error("Fetch error:", err.message);
    }

    if (!pageData) {
        return (
            <div>
                <h1>Page not found or error loading content.</h1>
            </div>
        );
    }

    return (
        <div className="page containerMe">
            <h1>{pageData.title}</h1>
            <div
                className={direction}
                style={{ textAlign: "start", minHeight: "100vh" }}
                dangerouslySetInnerHTML={{
                    __html: pageData?.data?.markup || "'No Content'"
                }}
            ></div>
        </div>
    );
}
