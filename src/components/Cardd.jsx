"use client";
import  Link  from "next/link";
import { useLanguage } from "../lang/LanguageContext";
import Skeleton from "react-loading-skeleton";
const Card = (props) => {
  const {language} = useLanguage()
  return (
    <div
      className="card bg-white rad-6 "
      style={{ textAlign: language === "en" ? "left" : "right" }}
    >
      <img
        decoding="async"
        className="cover"
        src={props.img}
        alt=""
        width={"100%"}
      />
      {/* <img decoding="async" className="instructor" src="imgs/nanologo.webp" alt="" /> */}
      <div className="p-20">
        <h4 className="m-0">{props.title ? props.title : "Unknowen"}</h4>
        <p
          className="description c-grey mt-15  fs-16"
          dangerouslySetInnerHTML={{
            __html: props.description
              ? props.description
              : "Description not exist",
          }}
        >
          {/* {props.description ? props.description : "Description not exist"} */}
        </p>
      </div>
      <div className="btn ">
        <Link href={props.more}>
          <button className="hideStyle more">
            {language === "en" ? "more ..." : "... المزيد"}
          </button>
        </Link>
      </div>
    </div>
  );
};


export const SkCard = ({dirction}) => {
  
  return  (
       <div className={"skCard " + dirction}
       
       >
                <Skeleton
                  containerClassName="skCard"
                  className="item"
                  width={"100%"}
                  height={200}
                />
                <Skeleton
                  className="item"
                  containerClassName="skCard"
                  width={200}
                  height={20}
                  // style={{ margin: " auto", display: "block" }}
                />
                <Skeleton
                  className="item"
                  containerClassName="skCard"
                  width={"80%"}
                  height={60}
                />
                <Skeleton
                  className="item"
                  containerClassName="skCard"
                  width={"80px"}
                  height={"20px"}
                  style={{ margin: " auto", display: "block" }}
                />
              </div>
  )
}
export default Card;