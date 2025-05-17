"use client";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./SocialmediaMenu.css";
import { api } from "@/Services/api";
function checkImg(path, callback) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = path;
}

function ImgOrIcon({ src, alt }) {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        
        if (typeof window !== "undefined") {
            const img = new window.Image();
            img.onload = () => setIsError(false);
            img.onerror = () => setIsError(true);
            img.src = src;
        }
    }, [src]);

    if (isError) {
        return <FontAwesomeIcon icon={faBars} />;
    } else {
        return <img src={src} alt={alt || "noImg"} width={"100%"} />;
    }
}

const SocialmediaMenu = () => {
    const [isOpen, setIsOpen] = useState(false); // حالة فتح/إغلاق القائمة
    const [position, setPosition] = useState({ top: 100, left: 0 }); // موقع القائمة
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const [data, setData] = useState([]);
    useEffect(() => {
        api.get("basic/settings")
            .then(data => {
                setData(data.data.social_links);
                console.log(data);
            })
            .catch(error => {});
    }, []);
    const ui = data.map((link, i) => {
        if (!link.icon) {
            link.icon = `fab fa-${link.name.toLowerCase()}`;
        }
        return (
            <a
                key={i}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className={link.icon}></i>
                {link.icon ? "" : link.name}
                {/* <FontAwesomeIcon icon={faFacebook} /> */}
            </a>
        );
    });
    return (
        <div
            className={`circular-menu ${isOpen ? "open" : ""}`}
            ref={menuRef}
            style={{ top: position.top }}
            
        >
            <div className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? (
                    <FontAwesomeIcon icon={faClose} />
                ) : (
                    <ImgOrIcon src="/imgs/socialIcon.jpg" />
                )}
            </div>

            {isOpen && <div className="menu-items">{ui}</div>}
        </div>
    );
};

export default SocialmediaMenu;
