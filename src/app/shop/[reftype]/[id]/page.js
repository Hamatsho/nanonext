
export const dynamic = "force-dynamic";
import ProductSEO from "@/components/ProductSEO";

import Swip from "@/Layout/Swip";
import Price from "@/components/Price";
import Reload from "@/components/Reload";
import { cookies } from "next/headers";
import "../products.css";
import React from "react";
import getSEO from "@/utils/getSEO.js";
export async function generateMetadata(context) {
    const params = await context.params; // ✅ انتظر params
    const { id } = params;
    const seo = await getSEO(
        `${process.env.API_URL}/shop/products/${id}?include=seostorm_options`
    );
    return seo;
}
//##########
export default async function ProductDetails(context) {
    const params = await context.params;
    const cookieStore = await cookies();
    const language = cookieStore.get("Language")?.value || "ar";
    const direction = language === "en" ? "ltr" : "rtl";

    let data = {};
    let error = null;
    let res;

    const apiUrl = `https://account.now-ye.com/api/v1/shop/products/${params.id}?include=currency`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // مهلة 5 ثواني

    try {
        res = await fetch(apiUrl, {
            cache: "no-store",
            headers: { "Accept-Language": language },
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!res.ok) {
            if (res.status === 404) {
                return (
                    <div className="containerMe">
                        <h1>
                            {language === "en"
                                ? "Product Not Found"
                                : "المنتج غير موجود"}
                        </h1>
                    </div>
                );
            } else {
                throw new Error(`Server error: ${res.status}`);
            }
        }

        data = await res.json();

        if (data.image) {
            data.images = [...(data.images || []), data.image];
        }
    } catch (err) {
        clearTimeout(timeout);
        console.error("Fetch error:", err);
        error =
            language === "en"
                ? "There was a problem loading the product. Please try again later."
                : "حدثت مشكلة أثناء تحميل المنتج. حاول مرة أخرى لاحقًا.";
    }

    if (error) {
        return (
            <div className="containerMe">
                <Reload message={error} />
            </div>
        );
    }

    return (
        <>
            <main>

                <div className={`containerMe ${direction} productDetails`}>
                    <Swip images={data.images} />
                    <h3 className="name">{data.name}</h3>

                    {data.is_show_price ? <Price data={data} /> : null}

                    <div className="attributes">
                        <div>
                            {language === "en" ? "Attributes" : "الخصائص"}
                        </div>
                        {data.is_parleying ? (
                            <span className="attribute">قابل للتفاوض</span>
                        ) : (
                            <span className="attribute not">
                                غير قابل للتفاوض
                            </span>
                        )}
                        <span className="attribute">{data.type_process}</span>
                        <span className="attribute">{data.use_case}</span>
                        {data.is_offer && data.unpublished_at ? (
                            <span className="attribute">
                                {data.unpublished_at}{" "}
                                {language === "en" ? "Valid Until" : "ساري حتى"}
                            </span>
                        ) : null}
                    </div>

                    <h5>
                        {language === "en"
                            ? "Product Details"
                            : "تفاصيل المنتج"}
                    </h5>
                    <div
                        className="details containerMe"
                        dangerouslySetInnerHTML={{
                            __html: data.description || ""
                        }}
                    ></div>
                </div>
            </main>
        </>
    );
}
