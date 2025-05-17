"use client";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";



// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
// import  rotateSettings  from "lightgallery/plugins/rotate/lg-rotate-settings";
import "./gallery.css"
import { useEffect, useState } from "react";
import { fetchData } from "../../Services/api";
import {  useParams } from "react-router-dom";
import Title from "../../components/Title";
import Skeleton from "react-loading-skeleton";
function Gallery() {
  const [loading, setLoading] = useState(false)
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  const {id,name} = useParams()
   const [images, setImages] = useState([]);
   useEffect(() => {
    setLoading(true)
     fetchData("media/albums/"+id,{
      params:{
        "include":"photos"
      }
     })
       .then((data) => {
         console.log(data);
         setImages(data.photos.data);
         setLoading(false)
       })
       .catch((error) => {
         console.log(error);
       });
   },[id]);

   // eslint-disable-next-line array-callback-return
   let UI = images.map((image, index) => {
    let src = ""
    const s = image.image;
    if (s.original) {
      src = s.original;
    } else if (s.small) {
      src = s.small;
    } else if (s.large) {
      src = s.large;
    } else if (s.medium) {
      src = s.medium;
    } else if (s.thumb) {
      src = s.thumb;
    }
      if(src)
      return (
        <a
          className="imgParent  gallery-item"
          key={index}
          href={src}
          data-sub-html={`<h4>${image.meta_title}</h4>`}
        >
          <img
            className="img-responsive"
            src={src}
            closable={true}
            alt={image.id}
          />
        </a>
      );});

      if(loading) {
        const Sk = <Skeleton containerClassName="gallery-container containerMe" width={"100px"} height={"100px"} />;
        UI = [
          Sk,Sk, Sk,Sk,
          Sk,Sk,Sk, Sk
        ]
      }
  return (
    <div className="">
      <Title text={name} />
      <LightGallery
        elementClassNames="gallery-container"
        onInit={onInit}
        speed={500}
        closable={true}
        plugins={[lgThumbnail, lgFullscreen, lgZoom]}
      >
        {UI}
      
      </LightGallery>
    </div>
  );
}

export default Gallery;
