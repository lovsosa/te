import Link from "next/link";
import React from "react";
import { nav } from "../../../data/nav";
import styles from "./Footer.module.sass";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerNav}>
        <h2 className={styles.navLink__title}>Навигация по сайту</h2>
        {nav.map(({ id, href, title }) => {
          return (
            <Link key={id} href={href}>
              <a className={styles.footerLink}>{title}</a>
            </Link>
          );
        })}
      </nav>
      <div className={styles.footerSoсial__link}>
        <h2 className={styles.soсial__title}>Социальные сети</h2>
        <span>
          <a href="https://www.instagram.com/24_kg/">
            <img src="/icon/instagram.svg" alt="" />
          </a>
          <a href="https://www.facebook.com/www.24.kg/">
            <img src="/icon/facebook.svg" alt="" />
          </a>
          <a href="https://t.me/news24kg/">
            <img src="/icon/telegram.svg" alt="" />
          </a>
        </span>
      </div>
      <div className={styles.contact}>
        <h2 className={styles.contact__title}>Контактная информация</h2>
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <span>info@24.kg</span>
        </label>
        <label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span> +996 (312) 66-01-88</span>
        </label>
      </div>
    </footer>
  );
}
