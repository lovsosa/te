import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { useCookies } from "react-cookie";
import Footer from "./Footer/Footer";
import Search from "../Search/Search";

function Layout({ children }) {
  return (
    <div className="wrapper">
      <Navbar />
      {children}
      <Footer />
      <Search />
    </div>
  );
}

export default Layout;
