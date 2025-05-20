"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lang/LanguageContext";
import { fetchData } from "@/Services/api";


import Link from "next/link";

const styleEn = {
    flexDirection: "row-reverse",
    textAlign: "right"
};
function MyLink(props) {
    return (
        <a href={props.to} onClick={props.onClick}>
            {props.icon && (
                <FontAwesomeIcon icon={props.icon} className="icon" />
            )}
            {props.text}
        </a>
    );
}

function Sub(props) {
    const [subMenuStatus, setSubMenuStatus] = useState(false);
    const { language } = useLanguage();
    const menu = props.items;

    return (
        <div className="link">
            <button
                className={
                    "subMenuBtn " + (props.isHead ? " subMenuBtnHead " : "")
                }
                style={language === "ar" ? styleEn : {}}
                onClick={() => setSubMenuStatus(!subMenuStatus)}
            >
                <span>
                    {language === "en" &&
                    menu.viewBag &&
                    menu.viewBag.locale &&
                    menu.viewBag.locale.en &&
                    menu.viewBag.locale.en.title
                        ? menu.viewBag.locale.en.title
                        : menu.title}
                </span>
                <FontAwesomeIcon
                    icon={
                        subMenuStatus ? solid.faChevronUp : solid.faChevronDown
                    }
                />
            </button>

            <ul
                className={"subMenu " + (props.isHead ? " subMenuHead " : "")}
                style={subMenuStatus ? {} : { display: "none" }}
            >
                {props.children}
            </ul>
        </div>
    );
}

export default function Menu({ dataMenu }) {
    const [menuStatus, setMenuStatus] = useState(false);
    const { language } = useLanguage();
    function getPath(item) {
      //  let path = item.type=="url" ?item.url :`/${item.code}`;
       let path = item.url;
        if (item.type === "static-page") {
            path = `/static/${item.code}`;
            let s = item.url.split("/");
            path = "/static/" + s[s.length - 1] ;
        }
        return path;
    }
    function makeUI(items = []) {
        if (!items) return [];
        return items.map((item, i) => {
            const key = item.code + i; // unique key for each item

            if (item.items && item.items.length > 0) {
                return (
                    <Sub key={key} items={item}>
                        {makeUI(item.items)}
                    </Sub>
                );
            }

            /*   let to = "/" + item.code;
            if (item.type === "static-page") {
                to = `/static/${item.code}`;
                //let s = item.url.split("/");
                //to = "/static/" + s[s.length - 1];
            }
            */
            let to = getPath(item);
            return (
                <li key={key}>
                    <MyLink
                        to={to}
                        text={
                            language === "en" &&
                            item.viewBag.locale &&
                            item.viewBag.locale.en &&
                            item.viewBag.locale.en.title
                                ? item.viewBag.locale.en.title
                                : item.title
                        }
                        onClick={() => setMenuStatus(false)}
                        key={key}
                    />
                </li>
            );
        });
    }

    let items = dataMenu.items || [];

    const headItems = items.slice(0, 3);
    items = items.slice(3);
    let centerLength = items ? items.length / 2 : 0;

    let links1 = null,
        links2 = null;

    const head = headItems.map(item => {
        const key = item.code;
        if (item.items && item.items.length > 0) {
            return (
                <Sub key={key} isHead={true} items={item}>
                    {makeUI(item.items)}
                </Sub>
            );
        }

        /*   let to = item.code;
        if (item.type === "static-page") {
            to = `/static/${item.code}`;
            let s = item.url.split("/");
            to = "/static/" + item.code ? item.code : s[s.length - 1];
        }
        */
        let to = getPath(item);
        return (
            <li key={key}>
                <MyLink
                    to={to}
                    text={
                        language === "en" &&
                        item.viewBag.locale &&
                        item.viewBag.locale.en &&
                        item.viewBag.locale.en.title
                            ? item.viewBag.locale.en.title
                            : item.title
                    }
                    onClick={() => setMenuStatus(false)}
                    key={key}
                />
            </li>
        );
    });

    if (centerLength > 3) {
        links1 = makeUI(items.slice(0, centerLength));
        links2 = makeUI(items.slice(centerLength));
    } else {
        links1 = makeUI(items);
    }

    function handelMenu() {
        setMenuStatus(!menuStatus);
    }

    function colseMenu() {
        setMenuStatus(false);
    }

    return (
        <ul className="main-nav" style={language === "ar" ? styleEn : {}}>
            <li>
                <button onClick={handelMenu} className="hideStyle">
                    <FontAwesomeIcon
                        icon={menuStatus ? solid.faClose : solid.faNavicon}
                        size="2x"
                    />
                </button>
                <div
                    className={
                        menuStatus ? "mega-menu megaMenuOpen" : "mega-menu"
                    }
                >
                    <div className="image">
                        <img src="/imgs/nanologo.png" alt="" />
                    </div>
                    <ul className="links">{links1}</ul>
                    <ul className="links">{links2}</ul>
                </div>
            </li>
            {head}
        </ul>
    );
}
