import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Home from "../pages/Home/Home.js";
import { fetchData } from "../Services/api";
import { useLanguage } from "../lang/LanguageContext";
const Page = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";
    window.scrollTo(0, 0);
    useEffect(() => {
        fetchData(`cms/static-pages/data`, {
            params: {
                name: params.code
            },
            headers: {
                "Accept-language": language
            }
        })
            .then(data => {
                setPageData(data);
                setLoading(false);
                console.log(data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [params, language]);
    if (loading)
        return (
            <div
                style={{
                    height: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize:"30px"
                }}
                className="flex"
            >
                Loding....
            </div>
        );
    if (error) return <div>Error.... {error}</div>;
    if (!pageData.data) {
        return <Home />;
    }
    return (
        <div className="page containerMe">
            <h1>{pageData.title}</h1>
            <div
                className={dirction}
                style={{ textAlign: "start", minHeight: "100vh" }}
                dangerouslySetInnerHTML={{ __html: pageData.data.markup }}
            ></div>
        </div>
    );
};
export default Page;
