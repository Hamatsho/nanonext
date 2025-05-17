import axios from "axios";
const API_URL = "https://account.now-ye.com/api/v1";
// import { useLanguage } from "../lang/LanguageContext";
// const language = useLanguage()
export const fetchData = async (endpoint, data = {}, lang = "ar") => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`, data);

        console.log(response, "resss");

        return response.data;
    } catch (error) {
        throw error;

        // return error
    }
};
export const api = axios.create({
    baseURL: "https://account.now-ye.com/api/v1"
    // timeout:5000,
});

export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.log("Error Post Data Api");
        throw error;
    }
};

export const api2 = axios.create({
    baseURL: "https://account.now-ye.com/api/v1",
    timeout: 10000, // مهلة الانتظار 10 ثواني
    withCredentials: true, // إرسال الكوكيز إذا كان عندك CORS مع المصادقة
    headers: {
        Accept: "application/json"
        // لا تضع Content-Type هنا إذا راح تستخدم FormData
    }
});

// اعتراض الطلبات
api2.interceptors.request.use(
    config => {
        // اللغة من localStorage (إن وجدت)
        const lang = localStorage.getItem("lang");
        if (lang) {
            config.headers["Accept-Language"] = lang;
        }

        // توكن المصادقة من localStorage
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

// اعتراض الردود
api2.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // مثال: تسجيل خروج تلقائي أو إعادة توجيه
            console.warn("غير مصرح، سيتم تسجيل الخروج");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
