"use client";
import styles from './Pagination.module.css';
  
import { useLanguage } from "@/lang/LanguageContext"
export default function Pagination({currentPage,totalPages, handlePageChange ,dirction}) {
   const {language} = useLanguage()
//    let dirction = language === "en" ? "ltr" : "rtl"
    return (
      <div
        className={`${styles.pagination} ${dirction} containerMe`}
        style={{ flexDirection: "row-reverse !important" }}
      >
        <button
          className={currentPage === totalPages ? "desabled" : ""}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {language === "en" ? "Next" : "التالي"}
        </button>
        <button
          className={currentPage === 1 ? "desabled" : ""}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {language === "en" ? "Prev" : "السابق"}
        </button>
        <span>
          {currentPage}/{totalPages}{" "}
        </span>
      </div>
    );
}