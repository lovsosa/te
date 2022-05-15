import axios from "../../api/axios.news";
import styles from "./LastNews.module.sass";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Layout/Layout";
import cn from "classnames";
import Link from "next/link";
import MuLink from "@mui/material/Link";

export default function LastNews() {
  const { webColor } = useContext(AppContext);
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getLastNews = async () => {
      try {
        const res = await axios.get(
          "/news?sort=publishedAt:DESC&pagination[pageSize]=3&populate=image"
        );
        if (!res.data) {
          throw new Error();
        }
        setNews([...res.data.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getLastNews();
  }, []);
  return (
    <div className={styles.lastNews__list}>
      {news.map((news) => {
        return (
          <div
            className={cn(styles.post, {
              [styles.blackColor]: webColor === "black",
            })}
            key={news.id}
          >
            <span className={styles.postImg}>
              {news.image ? (
                <img
                  className={styles.post__img}
                  src={news.image.url}
                  alt="#"
                />
              ) : null}
            </span>
            <h3 className={styles.postTitle}>{news.title}</h3>
            <p className={styles.smallDescription}>{news.smallDes}</p>
            <Link href={`/allNews/${news.id}`}>
              <MuLink component="a" className={styles.description__btn}>
                Подробнее
              </MuLink>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
