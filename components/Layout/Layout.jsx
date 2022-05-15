import React, { createContext, useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";
import Search from "../Search/Search";
import cn from "classnames";

export const AppContext = createContext();

function Layout({ children }) {
  const [webColor, setWebColor] = useState("white");
  return (
    <AppContext.Provider value={{ webColor, setWebColor }}>
      <div className={cn("wrapper", { "blackColor": webColor === "black" })}>
        <Navbar backColor={webColor} setBackColor={setWebColor} />
        {children}
        <Footer backColor={webColor} />
        <Search backColor={webColor} />
      </div>
    </AppContext.Provider>
  );
}

export default Layout;
