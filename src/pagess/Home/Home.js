import "./home.css";
// import { Box,SkBox } from '../Box';
// import Title from '../Title';

//import MySwiper from '../../components/MySwiper';
import { SwiperSlide } from "swiper/react";
//import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// import "swiper/css/autoplay";
// import "swiper/css/effect-cube";
// import "swiper/css/pagination";

import React, { useEffect, useState } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { fetchData } from "../../Services/api";
import Skeleton from "react-loading-skeleton";
// import Page from "../page";
//import Card from "../../components/Card";
// import Contact from "./Contact";
import CustomSwiper from "../../components/CustomSwiper";
import Stats from "../../Layout/Stats";
import Associates from "../../Layout/Associates";
import Adverts from "../../Layout/Adverts";
import Features from "../../Layout/Features";
import Title from "../../components/Title";
import Card from "../../components/Card";
import Shop from "../../Layout/Shop/index.js";
import Albums from "../../Layout/Albums/index.js";
// #########################

function Category(props) {
    const { language } = useLanguage();
    const [Category, setCategory] = useState({ data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let ui = Category.data.map((el, i) => {
        return (
            <SwiperSlide key={i}>
                <Card
                    title={el.name}
                    description={`${
                        el.short_description
                            ? el.short_description
                            : "description"
                    }`}
                    img={el.image ? el.image.original : "/imgs/nanologo.png"}
                    more={`/${props.name}/${el.id}`}
                />
            </SwiperSlide>
        );
    });
    useEffect(() => {
        setLoading(true);
        fetchData(`webbasic/${props.name}/`, {
            params: {
                // reftype:"projemmct"
            },
            headers: {
                "Accept-Language": language
            }
        })
            .then(data => {
                setCategory(data);
                
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [language,props]);

    if (loading) {
        ui = <Skeleton key={"23"} height={"300px"} width={"100%"} />;
    }
    if (error) {
        ui = <Skeleton key={"20"} height={"300px"} width={"100%"} />;
    }
    return (
        <div
            className="containerMe"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
        >
            <CustomSwiper
                swiperProps={{
                    spaceBetween: 10
                }}
            >
                {ui}
            </CustomSwiper>
        </div>
    );
}

// #########################
const Home = () => {
    const { language } = useLanguage();
    return (
        <div>
            {
                // <Title text={"نانو سوفت للبرمجيات خيارك التقني الأول"} />
            }
            <Adverts />
            <Title
                showAll="/shop/products"
                text={language === "en" ? "Software" : "البرمجيات"}
            />
            <Shop reftype="products" />
            <Title
                showAll="/shop/services"
                text={language === "en" ? "Services" : "الخدمات"}
            />
            <Shop reftype="services" />
            {/* ################################# */}
            <Title text={language === "en" ? "Our Features" : "مميزاتنا"} />
            <Features />
            {/* ################################# */}
            {/* ################################# */}
            <div className="main-section">
                <Title text={"من أعمالنا "} />
                <Category name="projects" />
            </div>
            {/* ################################# */}
            <div className="main-section">
                <Title text={"اخر الأخبار"} />
                <Category name="posts" />
            </div>
            {/* ################################# */}

            {/* ################################# */}
            <Stats />
            <div className="main-section">
                <Title text={"شركاء النجاح "} />
                <Associates name="associates" />
            </div>
            <div style={{ paddingBottom: "100px" }}>
                <Albums />
            </div>
            {/* ################################# */}
        </div>
    );
};

export default Home;
