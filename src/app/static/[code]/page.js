

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
                className={direction + ` pb-20 pt-20`}
                style={{ textAlign: "start", minHeight: "100vh" }}
                dangerouslySetInnerHTML={{
                    __html: pageData?.data?.markup || "'No Content'"
                }}
            ></div>
        </div>
    );
}
