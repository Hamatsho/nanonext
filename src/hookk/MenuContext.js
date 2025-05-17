"use client";
import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export function MenuProvider({ children, initialMenu }) {
  const [menuData] = useState(initialMenu); // لا يتم تغييره

  return (
    <MenuContext.Provider value={menuData}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
