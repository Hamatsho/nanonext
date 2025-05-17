"use client";
import { useLanguage } from "../lang/LanguageContext.jsx";
import "@emran-alhaddad/saudi-riyal-font/index.css";
function Discount({
    oldPrice,
    newPrice,
    published_at,
    unpublished_at,
    is_published
}) {
    const { language } = useLanguage();
    if (oldPrice <= 0 || newPrice < 0 || newPrice > oldPrice) return;
    let d = ((oldPrice - newPrice) / oldPrice) * 100;
    // return d.toFixed() + "%";
    return (
        <div className="discountt">
            {language === "en" ? "Discount" : "تخفيض"}
            <span> {d.toFixed() + "%"} </span>
            <div className="offer-to-date">
                {/* {data.published_at.split(" ")[0]} */}
                {/* <p>{data.unpublished_at.split(" ")[0]}</p> */}
            </div>
        </div>
    );
}
function Price({ data }) {
    if (!data) return;
    let { currency_code, currency_symbol } = data.currency;

    if (currency_code === "SAR" || currency_code === "SR") {
        currency_symbol = <span className="icon-saudi_riyal"></span>;
    } else if (currency_code === "YER" || currency_code === "YE") {
        currency_symbol = currency_code;
    }
    return (
        <div className="priceAndDiscount">
            <div className="price">
                <span className="currentPrice">
                    {currency_symbol} {data.price}{" "}
                </span>

                {data.is_show_old_price ? (
                    <span className="oldPrice">
                        {currency_symbol} {data.old_price}
                    </span>
                ) : null}
                {
                    //data.is_parleying ?
                    //   <span>قابل للتفاوض</span>
                    // :
                    //   <span> غير قابل للتفاوض </span>
                }
            </div>
            {data.is_show_old_price ? (
                <Discount oldPrice={data.old_price} newPrice={data.price} />
            ) : (
                ""
            )}
            <div className="offer-to-date"></div>
        </div>
    );
}
export default Price;
