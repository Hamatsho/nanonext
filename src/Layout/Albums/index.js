"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../../Services/api";
import "./albums.css"
import Title from "@/components/Title";
import Skeleton from "react-loading-skeleton";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";
import LightGallery from "lightgallery/react";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";

export default function Albums () {
  const [albums, setAlbums] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [albumId, setAlbumId] = useState(null)
  
  useEffect(() => {
    fetchData("media/albums")
    .then((data) => {
      console.log(data);
      setAlbums(data.data)
    setAlbumId(data.data[0].id)
      setLoading(false)
      setError(false)
    }).catch((error) => {
      setError(error)
      // setLoading(false)
    })
  },[])
  
  function selectAlbum(id) {
    if(id !== albumId)
    setAlbumId(id);
   

  }
  let UI = albums.map((album,i) => {
    let cls = i === 0? "active" :""
    return (
      <div onClick={(e) =>{ selectAlbum(album.id)
         document.querySelector(".albums .box.active").classList.remove("active");
         document.querySelector("#a"+album.id).classList.add("active")
      }}
      key={i}
      >
        <div className={`box ${cls}`} id={"a"+album.id}
        >
          <div className="albumTitle">{album.name}</div>
          <div className="image">
            <img src={album.image.small} alt="" />
          </div>
        </div>
      </div>
      // </Link>
    );
  })


  const Sk = () => 
      <Skeleton
        
        width={"150px"}
        height={"80px"}
      />
  ;
  if (loading) {
  
   /* UI = (
      <div className="container containerMe">
        <Sk key={1} />
        <Sk key={2} />
        <Sk key={3} />

      </div>
    );*/
  }


  const [loading2, setloading2] = useState(false);
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  const [images, setImages] = useState([]);
  useEffect(() => {
    setloading2(true);
    fetchData("media/albums/" + albumId, {
      params: {
        include: "photos",
      },
    })
      .then((data) => {
        console.log(data);
        setImages(data.photos.data);
        setloading2(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [albumId]);

  // eslint-disable-next-line array-callback-return
 /*  let imgsUI = images.map((image, index) => {
    let src = "";
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
    if (src)
      return (
        <a
          className="imgParent  gallery-item"
          key={index}
          href={src}
          data-sub-html={`<h4>${image.meta_title}</h4>`}
          data-src={src}
        >
          <img
            className="img-responsive"
            src={src}
            data-src={src}
            closable={true}
            alt={image.id}
          />
        </a>
      );
      
  });
*/
 let imgsUI = images
  .map((image, index) => {
    const img = image.image;
    
    
   let  src = img.original ?  img.original : "";

    if (!src) return null;

    return (
      <a
        className="imgParent gallery-item"
        key={index}
        href={src}
        data-sub-html={`<h4>${image.meta_title}</h4>`}
        
      >
        <img
          className="img-responsive"
          src={src}
          
          alt={image.id}
        />
      </a>
    );
  })
  .filter(Boolean); // تزيل العناصر التي قيمتها null

 /* if (loading2) {
    const Sk = (
      <Skeleton
        containerClassName="gallery-container containerMe"
        width={"100px"}
        height={"100px"}
      />
    );
    // imgsUI = [Sk,  Sk, Sk,  Sk];
    imgsUI = (
      <div className="gallery-container">
        {Sk}
        {Sk}
        {Sk}
        {Sk}
      </div>
    );
  }
  */
  return (
    <div>
      <div className="albums" id="albums">
        <Title text={"Albums"} />
        <div className="container containerMe">{UI}

        </div>
      </div>

      {/* <Gallery albumId={2} /> */}
      <div className="">
        {/* <Title text={name} /> */}
        <LightGallery
          onInit={onInit}
          elementClassNames="gallery-container"
          speed={500}
          closable={true}
          plugins={[lgThumbnail, lgFullscreen, lgZoom]}
        >
          {imgsUI}
        </LightGallery>
      </div>
    </div>
  );
}