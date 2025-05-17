"use client";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Search.module.css";
import { useLanguage } from "@/lang/LanguageContext";
export default function Search({ dirction, query, handleSearch }) {
    const { language } = useLanguage();
    return (
        <div className={`${styles.search} ${dirction} containerMe`}>
            <input
                className={` ${dirction}`}
                value={query}
                onChange={handleSearch}
                type="search"
                placeholder={language === "en" ? "Search" : "بحث..."}
            />
            <i className="fas fa-search 3x" style={{ color: "red" }}></i>
        </div>
    );
}
