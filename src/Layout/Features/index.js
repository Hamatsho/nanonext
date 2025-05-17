"use client";

import "./features.css";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { useLanguage } from "../../lang/LanguageContext";
function Box() {
    return (
        <div className="box">
            {/* <i className="fas fa-user-shield fa-4x"></i> */}

            <h3>security</h3>
            <div className="info">
                <a href="#">Details</a>
            </div>
        </div>
    );
}
const Features = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get("webbasic/features")
            .then(data => {
                setData(data.data.data);
                console.log(data.data.data, "ffffffffffffff");
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const { language } = useLanguage();
    const ui = data.map(f => {
        return (
            <div className="box" key={f.id}>
                {/* <i className="fas fa-user-shield fa-4x"></i> */}
                <img src={f.image.original} alt="" />
                <h3>{f.name} </h3>
                <div className={`info info${language}`}>
                    <a href={`/features/${f.id}`}>
                        {language === "en" ? "Details" : "التفاصيل"}
                    </a>
                </div>
            </div>
        );
    });
    return (
        <div className="features" id="features">
        
            <div className={`container containerMe container${language}`}>
                {ui}
            </div>
        </div>
    );
};

export default Features;
