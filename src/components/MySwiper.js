
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const breakPoints = {
  630: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
};
export default function MySwiper(props) {
  return (
    <div className="containerMe" style={{ padding: "50px 0" }}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        pagination={
          props.notPagination? {}: {
          el: ".custom-pagination",
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet  "  > </span>`;
          },
          clickable: true,
        }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        loop={true}
        autoplay={true}
        autoFocus={true}
     
        breakpoints={props.breakPoints ? props.breakPoints : breakPoints}
      >
        {props.children}
       {props.notPagination? null: 
        <div className="swiperNav">
          <div className="custom-pagination "> </div>
          <button className="prev hideStyle">{" <"} </button>
          <button className="next hideStyle">{" >"} </button>
        </div>}
      </Swiper>
    </div>
  );
}
