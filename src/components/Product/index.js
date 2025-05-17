"use client";
import Link from "next/link";
import "./product.css";
import Price from "../Price.js";
// import PropsTy
/*
function discount(oldPrice, newPrice) {
    if (oldPrice <= 0 || newPrice < 0 || newPrice > oldPrice) return;
    let d = ((oldPrice - newPrice) / oldPrice) * 100;
    return d.toFixed() + "%";
}*/
// function Price({ data }) {
//   const priceLogo = <img src="/imgs/Saudi_Riyal.svg" width={"15px"} alt="" />;
//   return (
//     <div className="price">
//       <span className="currentPrice">
//         {priceLogo} {data.price}{" "}
//       </span>
//       {data.is_show_old_price ? (
//         <span className="oldPrice">
//           {priceLogo} {data.old_price}
//         </span>

//       ) : null}

//     </div>
//   );
// }
const des = `
 description description description description description description description description description description description description description description description description description description description description description description description 
`;
function Product({ data }) {
    // let data = props.data
    if (!data) return;
    const imgSrc = data.image ? data.image.original : "/imgs/nanologo.png";
    console.log(data, "mem");
    return (
        <div className="product">
            <Link href={`/shop/${data.ref_type_class}/${data.id}`}>
                {!data.is_offer ? (
                    <div className="offer">
                        <span className="icon">
                            <i className="fa-solid fa-percent"></i>
                        </span>
                        <span>Offer</span>
                    </div>
                ) : null}
                <div className="img">
                    <img src={imgSrc} alt="" />
                </div>
                <h4 className="name">{data.name}</h4>
                <p className="description">
                    {data.short_description
                        ? data.short_description
                        :  des}
                </p>
                {data.is_show_price ? <Price data={data} /> : null}
                <div></div>

                {/* <div className="buy">
        <button className="hideStyle">
          <i className="fa fa-add"></i>
          <span>Add to Card</span>
        </button>
      </div> */}
            </Link>
        </div>
    );
}
export default Product;
