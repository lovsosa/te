import axios from "../../api/axios.news";
import React, { useEffect, useState } from "react";
import styles from "../../styles/AllNews.module.sass";

export default function allNews() {
  const [allNews, setAllNews] = useState([]);
  useEffect(() => {
    const getAllNews = async () => {
      try {
        const res = await axios.get(
          "/news?sort=publishedAt:DESC&populate=image"
        );
        if (!res.data) {
          throw new Error();
        }
        setAllNews([...res.data.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getAllNews();
  }, []);
  return (
    <header className={styles.allNews__container}>
      <h1 className={styles.allNews__title}>Новости</h1>
      <main className={styles.allNews}>
        {allNews.map(({ id, image, title, smallDes, fullDescription }) => {
          return (
            <div key={id} className={styles.news__post}>
              {/* <div className={styles.newsImg}> */}
              <img className={styles.newsImg} src={image.url} alt="#" />
              {/* </div> */}
              <div className={styles.newsDescription}>
                <h3 className={styles.news__title}>{title}</h3>
                <p className={styles.newsSmallDes__text}>{smallDes}</p>
              </div>
            </div>
          );
        })}
      </main>
    </header>
  );
}
