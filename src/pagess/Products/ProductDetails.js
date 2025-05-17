import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Services/api";
import Swip from "../../Layout/Swip";
import Price from "../../components/Price";
import { useLanguage } from "../../lang/LanguageContext";
import Reload from "../../components/Reload";

const ProductDetails = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const { language } = useLanguage();
    let direction = language === "en" ? "ltr" : "rtl";
    useEffect(() => {
        setLoading(true);
        setError(false);
        api.get(`/shop/products/${id}`, {
            params: {
                include: "currency"
            },
            headers: {
                "Accept-Language": language
            }
        })
            .then(res => {
                if (res.data.image) res.data.images.push(res.data.image);
                setData(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
                setTimeout(function() {
                setLoading(false);
                setError(error.message);
                  
                }, 2000);
            });
    }, [language, reloading,id]);
    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <h1>Loading...</h1>
            </div>
        );
    }
    function reload() {
        setError(false);
        setReloading(!reloading);
    }
    if (error) {
        return (
            <div className="containerMe">
                <Reload onClick={reload} message={error} />
            </div>
        );
    }
    return (
        <div className={`containerMe ${direction} productDetails`}>
            {data.images ? <Swip images={data.images} /> : null}
            <h3 className="name">{data.name} </h3>
            {/* <div className="priceAndDiscount"> */}

            {data.is_show_price ? <Price data={data} /> : null}
            <div className="attributes">
                <div> {language === "en" ? "Attributes" : "الخصائص"} </div>
                {data.is_parleying ? (
                    <span className="attribute">قابل للتفاوض</span>
                ) : (
                    <span className="attribute not"> غير قابل للتفاوض </span>
                )}
                <span className="attribute">{data.type_process} </span>
                <span className="attribute">{data.use_case} </span>
                {data.is_offer && data.unpublished_at ?
                <span className="attribute">
                  {data.unpublished_at} 
                ساري حتى
                </span>
                  :""
                }
            </div>
             

            <h5>{language === "en" ? "Product Details" : "تفاصيل المنتج"} </h5>
            <div
                className="details containerMe"
                dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
        </div>
    );
};
export default ProductDetails;
