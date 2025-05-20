"use client";

import "./header.css";
import { useRouter } from "next/navigation";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import * as solid from "@fortawesome/free-solid-svg-icons";

//import { useEffect, useState } from "react";
import { useLanguage } from "@/lang/LanguageContext";

import Link from "next/link";
import Menu from "@/components/Menu";

const styleEn = {
    flexDirection: "row-reverse",
    textAlign: "right"
};

const Header = ({ dataMenu }) => {
    const { language, setLanguage } = useLanguage();
    const router = useRouter();

    const toggleLanguage = event => {
        setLanguage(event.target.value);

        setTimeout(function () {
            router.refresh();
        }, 500);
    };
    return (
        <header id="header" className="">
            <div
                className="container containerMe header"
                style={language === "ar" ? styleEn : {}}
            >
                <div className="logo" style={language === "ar" ? styleEn : {}}>
                    <Link
                        href="/"
                        className="logo"
                        style={language === "ar" ? styleEn : {}}
                    >
                        <img src="/imgs/nanologo.png" alt="nano" />
                        <div className="name">
                         {/*   <p>نانو 2 سوفت</p>
                            <p>Nano2soft</p>
                            */}
                            <h1>{language === "ar"?
                              <span>نانو 2 سوفت</span>
                             :
                             <span>Nano2soft</span>
                            }
                            </h1>
                        </div>
                    </Link>
                    <div className="flex langParent">
                        <select
                            className="lang"
                            onChange={toggleLanguage}
                            value={language}
                        >
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
                <Menu dataMenu={dataMenu} />
            </div>
        </header>
    );
};

export default Header;
