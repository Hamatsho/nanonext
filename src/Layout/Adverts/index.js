"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFlip, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-flip";

import { fetchData } from "@/Services/api";
//import Skeleton from "react-loading-skeleton";

import "./adverts.css";

  function Adverts({data}) {
 // const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(true);
//  const [error, setError] = useState(null);
//let dt ={},data = []

/*  useEffect(() => {
    fetchData("advert/madverts")
      .then((res) => {
        setData(res.data);
        
      })
      .catch((error) => {
        console.log(error.message);
       
      });
  }, []);
*/
  return (
    <div className="containerMe advarts">
      <Swiper
        modules={[Autoplay, EffectFlip, A11y]}
        speed={500}
        effect="flip"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {data.map((el) => {
        if(!el.image) return null
      return  (
          <SwiperSlide key={el.id}>
            <div className="advart">
              <div className="img">
                <img src={el.image ? el.image.original:""} alt={el.name} />
              </div>
              <div className="info">
                <h3 className="name">{el.name}</h3>
                <p>{el.short_description}hhfdghuuh</p>
              </div>
            </div>
          </SwiperSlide>
        )
        })
        }
      </Swiper>
      
    </div>
  );
}

export default Adverts;
 