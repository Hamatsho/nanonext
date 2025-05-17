"use client";
import { useEffect, useState, useRef } from "react";
import MySwiper from "../../components/MySwiper";
import Success from "@/Layout/Success";
import { useLanguage } from "../../lang/LanguageContext";
import "./associates.css";
import { SwiperSlide } from "swiper/react";
import { fetchData } from "../../Services/api";
import Skeleton from "react-loading-skeleton";

// #########################

function Associates(props) {
    const { language } = useLanguage();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let bgColor = "#eee",
        textColor = "black";
    let ui;
    let ss= data.map((el, i) => {
        if (el.properties)
            el.properties.map(p => {
                if (p.code === "bgColor") bgColor = p.value;
                else if (p.code === "textColor") {
                    textColor = p.value;
                }
            });
        return {
            image: el.image.original,
            title: el.name,
            bgColor: bgColor,
            textColor: textColor
        };
    });
    useEffect(() => {
        setLoading(true);
        fetchData(`webbasic/associates/`, {
            params: {
                // reftype:"projemmct"
            },
            headers: {
                "Accept-Language": language
            }
        })
            .then(data => {
                setData(data.data);
                console.log(data, "associates");

                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [language]);

    if (loading) {
        ui = <Skeleton key={"23"} height={"300px"} width={"100%"} />;
        // return <span>Loading...</span>
    }
    if (error) {
        ui = <Skeleton key={"20"} height={"300px"} width={"100%"} />;
    }
    return (
        <div className="" style={{ backgroundColor: "white" }}>
            <div className="containerMe associates">
                <Success partners={ss} />
            </div>
        </div>
    );
}

export default Associates;
