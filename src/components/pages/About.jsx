import "../css/framwork.css"
import "../css/about.css"
import Title from "../Title";
// import { useLanguage } from "../../lang/LanguageContext";
// const Card = () => {
//   const {language} = useLanguage()
//   return (
//           <div className="card bg-white rad-6 p-relative"
//           style={{textAlign: language === "en" ? "left" : "right"}}
//           >
//             <img decoding="async" className="cover" src="imgs/landing1.webp" alt="" />
//             <img decoding="async" className="instructor" src="imgs/nanologo.webp" alt="" />
//             <div className="p-20">
//               <h4 className="m-0">Mastering Web Design</h4>
//               <p className="description c-grey mt-15  fs-16">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt iure corporis quam atque? Voluptas, nemo. Molestias praesentium non tempore eveniet ab obcaecati mollitia vero, veritatis suscipit nisi qui excepturi aspernatur.
//              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta quis odio, ipsum similique ipsam laborum corrupti et, dolores debitis facere soluta doloremque, eum nobis perspiciatis illum modi ut quod? Fugit?
//               </p>
//             </div>
//             <div className="flex" >
//             <button className="hideStyle more">hello</button>
              
//             </div>
//             {/* <div className="info p-15 p-relative between-flex">
//               <span className="title bg-blue c-white btn-shape">card Info</span>
//               <span className="c-grey">
//                 <i className="fa-regular fa-user"></i>
//                 950
//               </span>
//               <span className="c-grey">
//                 <i className="fa-solid fa-dollar-sign"></i>
//                 165
//               </span>
//             </div> */}
//           </div>

//   );
// };
import Card from "../Card"
const A = () => {
  return (
    <div>

    <Title text={"helo"} />
    <div className="grid-template d-grid  gap-20 containerMe " 
  
    >
<Card description ="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt iure corporis quam atque? Voluptas, nemo. Molestias praesentium non tempore eveniet ab obcaecati mollitia vero, veritatis suscipit nisi qui excepturi aspernatur."
    title="Web Applications Development"
    img="./imgs/landing1.webp"
/>
<Card />
<Card />
<Card />
    </div>
      </div>
  )
}
export default A;
