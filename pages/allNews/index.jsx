import axios from "../../api/axios.news";
import React, { useEffect, useState } from "react";
import styles from "../../styles/AllNews.module.sass";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Link from "next/link";
import MuLink from "@mui/material/Link";

export default function allNews() {
  const [allNews, setAllNews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getAllNews = async () => {
      try {
        const res = await axios.get(
          `/news?sort=publishedAt:DESC&populate=image&pagination[page]=${page}&pagination[pageSize]=${3}`
        );
        if (!res.data) {
          throw new Error();
        }
        setAllNews([...res.data.data]);
        setPageQty(res.data.meta.pagination.pageSize);
        setPageCount(res.data.meta.pagination.pageCount);
      } catch (error) {
        console.log(error);
      }
    };
    getAllNews();
  }, [page]);
  
  return (
    <Stack spacing={5}>
      <header className={styles.allNews__container}>
        <h1 className={styles.allNews__title}>Новости</h1>
        <main className={styles.allNews}>
          {allNews.map(({ id, image, title, smallDes }) => {
            return (
              <div key={id} className={styles.news__post}>
                <img className={styles.newsImg} src={image.url} alt="#" />
                <div className={styles.newsDescription}>
                  <h3 className={styles.news__title}>{title}</h3>
                  <p className={styles.newsSmallDes__text}>{smallDes}</p>
                  <Link href={`/allNews/${id}`}>
                    <MuLink component="a" className={styles.description__btn}>
                      Подробнее
                    </MuLink>
                  </Link>
                </div>
              </div>
            );
          })}
        </main>
        {!!pageQty && (
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, num) => setPage(num)}
          />
        )}
      </header>
    </Stack>
  );
}
