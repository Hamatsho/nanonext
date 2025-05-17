import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@//Services/api";
/*
import { SwiperSlide } from "swiper/react";
import MySwiper from "@//components/MySwiper";
*/
import Skeleton from "react-loading-skeleton";
import Reload from "@//components/Reload";
import { useLanguage } from "@//lang/LanguageContext";
import Swip from "@//Layout/Swip";
 
// import Home from "./pages/Home";
const More = ({params}) => {
    const [pageData, setPageData] = useState({ images: [] });
    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState(true);
    const [error, setError] = useState(null);
  //  const params = useParams();
    const { language } = useLanguage();
    const dirction = language === "en" ? "ltr" : "rtl";
    useEffect(() => {
    //    setLoading(true);
      //  setError(false);
        window.scrollTo(0, 0);
        api.get(`webbasic/${params.cat}/${params.id}`)
            .then(res => {
                if (res.data.image) res.data.images.push(res.data.image);
                setPageData(res.data);
              //  setLoading(false);
            })
            .catch(error => {
                setTimeout(() => {
                //    setLoading(false);
                //    setError(error.message);
                }, 2000);
            });
    }, [params, language]);

    if (loading) {
        return (
            <div className="containerMe">
                <Skeleton height={300} width={"100%"} />
                <div>
                    <Skeleton
                        className="d-block"
                        containerClassName="containerMe"
                        width={"100%"}
                        count={10}
                    />
                </div>
            </div>
        );
    }
    function reload() {
        setError(false);
        setReloading(!reloading);
    }
    if (error) {
        return (
            <div className="containerMe">
                <Reload onClick={reload} message={error} />
            </div>
        );
    }
    if (!pageData.data) {
        // return null
    }

    return (
        <div className={`page  containerMe `}>
            <h3 style={{ textAlign: "center" }}>{pageData.name}</h3>
            {pageData.images.length ? (
                // Swip(pageData.images)
                <Swip images={pageData.images} />
            ) : null}
            <div
                className={dirction}
                style={{ textAlign: "start", minHeight: "100vh" }}
                dangerouslySetInnerHTML={{
                    __html: pageData ? pageData.description : ""
                }}
            ></div>
        </div>
    );
};
export default More;
