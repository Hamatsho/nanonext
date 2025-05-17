import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {faSearch}  from "@fortawesome/free-solid-svg-icons"
import { useLanguage } from "../lang/LanguageContext";
export default function Search({dirction,query,handleSearch}) {
    const {language} = useLanguage()
    return (
      <div className={`search ${dirction} containerMe`}>
        <input
          className={` ${dirction}`}
          value={query}
          onChange={handleSearch}
          type="search"
          placeholder={language === "en" ? "Search" : "بحث..."}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
    );
}