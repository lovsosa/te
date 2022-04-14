import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.sass";
import logoimg from "./logoImgNews.png";
import { nav } from "../../../data/nav";
import ColorButtons from "../../UI/Button/Button";
import Button from "@mui/material/Button";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <label>
            <img src={logoimg.src} alt="#" className={styles.logoImg} />
            <h3 className={styles.logoTitle}>News</h3>
          </label>
        </div>
        <nav className="nav">
          {nav.map(({ href, title, id }) => {
            return (
              <Link key={id} href={href}>
                <a className={styles.navLink}>{title}</a>
              </Link>
            );
          })}
        </nav>
        <div className="account">
        <Link href="/addNews">
          <Button variant="outlined" component={'a'} color="error">
            Войти
          </Button>
        </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
