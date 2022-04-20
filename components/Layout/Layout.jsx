import React, { createContext, useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";
import Search from "../Search/Search";

export const AppContext = createContext();

function Layout({ children }) {
  const [webColor, setWebColor] = useState("white");
  return (
    <AppContext.Provider value={{ webColor, setWebColor }}>
      <div className="wrapper">
        <Navbar />
        {children}
        <Search />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default Layout;
