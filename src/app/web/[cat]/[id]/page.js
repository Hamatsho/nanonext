
export const dynamic = "force-dynamic";

import Swip from "@/Layout/Swip";
import Reload from "@/components/Reload";
import { cookies } from "next/headers";
import getSEO from "@/utils/getSEO.js";
export async function generateMetadata(context) {
    const params = await context.params; // ✅ انتظر params
    const { cat, id } = params;
    const seo = await getSEO(
        `${process.env.API_URL}/webbasic/${cat}/${id}?include=seostorm_options`
    );
    return seo;
}
export default async function ReadMore(context) {
    const params = await context.params;
    const cookieStore = await cookies();
    const language = cookieStore.get("Language")?.value || "ar";
    const direction = language === "en" ? "ltr" : "rtl";
    // const {cat,id} = await params;
    let data = {};
    let error = null;
    let res;
    const apiUrl = `https://account.now-ye.com/api/v1/webbasic/${params.cat}/${params.id}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // مهلة 5 ثواني

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
                <div className={`page  containerMe `}>
                    <h1 style={{ textAlign: "center" }}>{data.name}</h1>
                    {data.images.length ? <Swip images={data.images} /> : null}
                    <div
                        className={direction}
                        style={{ textAlign: "start", minHeight: "100vh" }}
                        dangerouslySetInnerHTML={{
                            __html: data ? data.description : ""
                        }}
                    ></div>
                </div>
            </main>
        </>
    );
}

