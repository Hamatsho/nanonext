// components/CustomSwiper.jsx
"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Autoplay,
    EffectFlip,
    A11y
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "./customSwiper.css";
const CustomSwiper = ({ children, className = "", swiperProps = {} }) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            swiperRef.current?.swiper?.update();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={` ${className}`}>
            <Swiper className="custom-swiper-container"
                ref={swiperRef}
                modules={[Navigation,Pagination, Autoplay, EffectFlip, A11y]}
                // effect="flip"
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom"
                }}
                pagination={{
                    el: ".swiper-pagination-custo",
                    clickable: true
                }}
                {...swiperProps}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 4
                    }
                }}
            >
                {children}
            </Swiper>

            {/* Custom Navigation */}
            <div className="swiper-button-prev-custom absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-white text-2xl">
                ‹
            </div>
            <div className="swiper-button-next-custom absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-white text-2xl">
                ›
            </div>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom mt-4 flex justify-center gap-2"></div>
        </div>
    );
};

export default CustomSwiper;
