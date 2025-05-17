// import axios from "axios";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import MySwiper from "./MySwiper";
import { fetchData } from "../Services/api";
// import { SkBox } from "./Box";
import Skeleton from "react-loading-skeleton";

function Adverts(props) {
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let ui = data.data.map((el) => {
    
    return (
      <SwiperSlide key={el.id}>
        <div key={el.id} className="slide">
          <div className="img">
            <img src={el.image.large} className="w-100" alt="najeeb" />
          </div>
          <div className="info">
            <h2>{el.name} </h2>
            <p>{el.short_description} </p>
          </div>
        </div>
      </SwiperSlide>
    );
  });
  useEffect(() => {
    fetchData("advert/madverts")
      .then((data) => {
          setLoading(false);
           setData(data);
      })
      .catch((error) => {
          setError(error.message);
          setLoading(false);
      });
  }, []);
   function Skele(props) {
   return (
     <div>
       <span style={{ padding: "10px",
        color:props.color?props.color : "black"
        }}>{props.text}</span>
       <Skeleton height={"300px"} width={"100%"} />
     </div>
   );
  }
  if (loading ) {
   
    ui = [<Skele key={"loading"} text="Loading...." />]
  } 

  if (error) {
      ui = [<Skele key={"error"} text={error} color="red" />];
  }

  return (
    <div className="containerMe">
    <MySwiper breakPoints={{}}>{ui}</MySwiper>
    </div>
  );
}

export default Adverts;
