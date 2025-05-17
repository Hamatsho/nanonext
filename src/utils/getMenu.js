// lib/getMenuData.js
const BASE_URL = "https://account.now-ye.com/api/v1/";

export async function getMenuData() {
    const response = await fetch(
       BASE_URL+ "cms/menus/data?name=testmenu"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
}
