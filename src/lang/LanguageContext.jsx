/*"use client"
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // اللغة الافتراضية

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
*/
"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('ar'); // اللغة الافتراضية

  // مزامنة اللغة من الكوكي عند التحميل الأول
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)Language=([^;]+)/);
    if (match && match[1]) {
      setLanguageState(match[1]);
    }
  }, []);

  // تحديث الحالة والكوكي معًا
  const setLanguage = (lang) => {
    document.cookie = `Language=${lang}; path=/`;
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
