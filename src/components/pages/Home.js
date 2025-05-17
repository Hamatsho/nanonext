import "../css/home.css"
import { Box,SkBox } from '../Box';
import Title from '../Title';
import MySwiper from '../MySwiper';
import { SwiperSlide } from 'swiper/react';
import React,{ useEffect, useState } from 'react';
import {  useLanguage } from '../../lang/LanguageContext';
import { fetchData } from '../../Services/api';
import Skeleton from "react-loading-skeleton";
import Page from "../page";
import Card from "../Card";
import Contact from "./Contact";
import Albums from "../../Layout/Albums";
import Adverts from "../Adverts";
import Associates from "../../Layout/Associates";
import Stats from "../../Layout/Stats";

// #########################
function Category(props) {
  const {language} = useLanguage();
    const [works, setWorks] = useState({ data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let ui = works.data.map((el,i) => {
      
      return (
        <SwiperSlide key={i}>
          <Card
            title={el.name}
            description={`${
              el.short_description ? el.short_description : el.description
            }`}
            img={el.image ? el.image.original : ""}
            // width="350px"
            more={el.description}
          />
        </SwiperSlide>
      );
    });
    useEffect(() => {
      console.log(language,"llllllllllllll");
      setLoading(true)
      fetchData(`webbasic/${props.name}/`, {
        params: {
          // reftype:"projemmct"
        },
        headers: {
          "Accept-Language": language,
        },
      })
        .then((data) => {
          setWorks(data);
          console.log(data, props.name);

          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        }); 
    },[language])
     
    if(loading) {
      
      ui= <Skeleton key={"23"} height={"300px"} width={"100%"} />
      // return <span>Loading...</span>
    }
    if(error) {
      ui = <Skeleton key={"20"} height={"300px"} width={"100%"} />;
    }
    return (
      <div className="containerMe">
        <MySwiper>
          {ui}
          
        </MySwiper>
      </div>
    );
}
  
// #########################
const Home = () => {
  // const { language } = useLanguage();
  return (
    <div>
      {/* <Contact /> */}
      {/* <Page /> */}
      <Title text={"نانو سوفت للبرمجيات خيارك التقني الأول"} />
      <Adverts />
     {/* <Page /> */}
      <Title text={"البرامج والخدمات"} />
      <Category name="categories" />

      {/* ################################# */}
      <Title text={"مميزاتنا"} />
      <Category name="features" />

      {/* ################################# */}
      {/* ################################# */}
      <Title text={"News"} />
      <Category name="posts" />
      {/* ################################# */}

      {/* ################################# */}

      <Title text={"شركاء النجاح"} />
      <Associates />
      {/* <Category name="associates" /> */}
      {/* ################################# */}
      <Stats />
      <Albums />
    </div>
  );
};

export default Home;