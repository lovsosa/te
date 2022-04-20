import axios from "../../api/axios.news";
import styles from "./LastNews.module.sass";
import React, { useEffect, useState } from "react";

export default function LastNews() {
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
          <div className={styles.post} key={news.id}>
            <span className={styles.postImg}>
              {news.image ? (
                <img className={styles.post__img} src={news.image.url} alt="" />
              ) : null}
            </span>
            <h3 className={styles.postTitle}>{news.title}</h3>
            <span className={styles.smallDescription}>{news.smallDes}</span>
          </div>
        );
      })}
    </div>
  );
}
