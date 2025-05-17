import { useEffect, useState } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import "./stats.css";
import { fetchData } from "../../Services/api";
import Skeleton from "react-loading-skeleton";

function Box({ number, text, img }) {
    return (
        <div className="box">
            <img src={img} alt="" width="60px" />
            <span className="number">{number.split(".")[0]}</span>
            <span className="text">{text}</span>
        </div>
    );
}
const Stats = () => {
    const { language } = useLanguage();
    const [stats, setStats] = useState({ data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let ui = stats.data.map((el, i) => {
        return (
            <Box
                key={i}
                number={el.price}
                text={el.name}
                img={el.image ? el.image.original : ""}
            />
        );
    });
    useEffect(() => {
        console.log(language, "llllllllllllll");
        setLoading(true);
        fetchData(`webbasic/counts/`, {
            headers: {
                "Accept-Language": language
            }
        })
            .then(data => {
                setStats(data);
                console.log(data, "stats");

                setLoading(false);
            })
            .catch(error => {
                setError(error);
            });
    }, [language]);
    const Sk = p => {
        return (
            <Skeleton
                style={{
                    margin: "auto"
                }}
                containerClassName="container containerMe"
                width={250}
                height={100}
            />
        );
    };
    if (loading) {
        ui = (
            <div className="container containerMe">
                <Sk />
                <Sk />
                <Sk />
                <Sk />
            </div>
        );
    }
    if (error) {
    }
    return (
        <div className="stats" id="stats">
            <h2>{language === "en" ? " Stats" : "الإحصائيات"}</h2>
            <div className="container containerMe">{ui}</div>
        </div>
    );
};

export default Stats;
