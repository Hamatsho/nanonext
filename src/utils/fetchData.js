const BASE_URL = "https://account.now-ye.com/api/v1/";

export async function fetchData(
    endpoint,
    params = {},
    headers = {},
    revalidateSeconds = 5
) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${BASE_URL}${endpoint}${
        queryString ? `?${queryString}` : ""
    }`;
    console.log("full url  ", fullUrl);
    const res = await fetch(fullUrl, {
        headers: headers,
        cashe: "force-cashe",
        next: { revalidate: revalidateSeconds }
    });

    if (!res.ok) {
        throw new Error(`فشل في جلب البيانات من ${endpoint}`);
    }

    return res.json();
}
