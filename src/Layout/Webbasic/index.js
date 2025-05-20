"use client"
import { SwiperSlide } from "swiper/react";
import "@/components/Card/card.css";
import CustomSwiper from "@/components/CustomSwiper";
import Card from "@/components/Card";
 
 const  Section = ({data,name}) => {
  return (
        <div
            className="mobileSwiper containerMe"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
        >
            <CustomSwiper
                swiperProps={{
                    spaceBetween: 10
                }}
            >
                {data.map((el, i) => {
                    return (
                        <SwiperSlide key={i} className="customSlide">
                            <Card
                                title={el.name}
                                description={`${
                                    el.short_description
                                        ? el.short_description
                                        : "description"
                                }`}
                                img={
                                    el.image
                                        ? el.image.original
                                        : "/imgs/nanologo.png"
                                }
                                more={`/web/${name}/${el.id}`}
                            />
                        </SwiperSlide>
                    );
                })}
            </CustomSwiper>
        </div>
    );
}
export default Section