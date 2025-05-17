// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import * as solid from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../lang/LanguageContext";

// import * as regular from "@fortawesome/free-regular-svg-icons";
import Menu from "./Menu";
// import {Menu1} from "./Menu";

const styleEn = {
  flexDirection: "row-reverse",
};

export default function Header() {
  // const [lang, setLang] = useState("ar");
  // const [menuStatus, setMenuStatus] = useState(false);
  //
  const { language, setLanguage } = useLanguage();
  const toggleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  //
 

  return (
    <header className="container" style={language === "ar" ? styleEn : {}}>
      <div className="logo" style={language === "ar" ? styleEn : {}}>
        <img src="./imgs/nanologo.webp" alt="nano" />
        <h2>{language === "en" ? "Nanosoft" : "نانوسوفت"}</h2>
      </div>
      {/* Lang Select */}
      <div className="flex">
        <select className="lang" onChange={toggleLanguage}>
          <option value="ar">Arabic</option>
          <option value="en">English</option>
        </select>
      </div>
     
        <Menu />
    </header>
  );
}
