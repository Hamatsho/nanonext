"use client";
import Product from "@/components/Product/index.js";
import CustomSwiper from "@/components/CustomSwiper/";
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lang/LanguageContext.jsx";
import { api } from "@/Services/api.js";

const Shop = ({ reftype }) => {
    const [data, setData] = useState([]);
    const { language } = useLanguage();
    useEffect(() => {
        api.get(`shop/products`, {
            params: {
                reftype: reftype,
                include: "currency"
            },
            headers: {
                "Accept-Language": language
            }
        })
            .then(res => {
                setData(res.data.data);

                //setLoading(false);
            })
            .catch(error => {
                //setError(error);
                //setLoading(false);
            });
    }, [language]);

    return (
        <div className="" style={{backgroundColor:"white"}}>
        <div className="containerMe shop" style={{}}>
            <CustomSwiper
                className="custom-swiper"
                swiperProps={{
                    spaceBetween: 10
                }}
            >
                {data.map(el => {
                    return (
                        <SwiperSlide
                        key={el.id} className="swiper-slide">
                            <Product data={el} />
                        </SwiperSlide>
                    );
                })}
            </CustomSwiper>
        </div>
        </div>
    );
};
export default Shop;
