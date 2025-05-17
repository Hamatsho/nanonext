import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";

const Success = ({ partners }) => {
    return (
        <div style={{ padding: "20px" }}>
            <Swiper
                modules={[Autoplay, FreeMode]}
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                freeMode={true}
                speed={3000} // كل كم ميللي ثانية يكمل السلايد الواحد
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    reverseDirection: true
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                style={{ cursor: "grab" }}
            >
                {partners.map((partner, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundColor: partner.bgColor,
                                color: partner.textColor,
                                borderRadius: "10px",
                                padding: "20px",
                                textAlign: "center",
                                height: "100%"
                            }}
                        >
                            <img
                                src={partner.image}
                                alt={partner.title}
                                style={{
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "contain"
                                }}
                            />
                            <h3 style={{ marginTop: "15px", fontSize: "18px" }}>
                                {partner.title}
                            </h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Success;
