import axios from "../../api/axios.news";
import React from "react";
import styles from "../../styles/AllNews.module.sass";

export default function PostPage({ newsPost }) {
  console.log(newsPost);
  return (
    <header className={styles.postPage__container}>
      <main className={styles.postPage}>
        <h2 className={styles.main__title}>{newsPost.title}</h2>
        <img src={newsPost.image.url} alt={newsPost.image.name} />
      </main>
      <section className={styles.description}>
        <div className={styles.descriptionContent}>
          <p className={styles.post__text}>{newsPost.smallDes}</p>
          <p className={styles.post__text}>{newsPost.fullDescription}</p>
        </div>
        <div className={styles.userCart}>
          <span>Автор поста</span>
          <h3 className={styles.newsPost__userName}>
            {newsPost.user.username}
          </h3>
          <span className={styles.newsPost__email}>{newsPost.user.email}</span>
        </div>
      </section>
    </header>
  );
}
export async function getStaticPaths() {
  const res = await axios.get(`/news`);
  const paths = res.data.data.map((res) => {
    return {
      params: { id: String(res.id) },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { id } }) {
  const res = await axios.get(`/news/${id}?populate=image,user`);
  const newsPost = res.data.data;
  return {
    props: {
      newsPost,
    },
    revalidate: 200,
  };
}
