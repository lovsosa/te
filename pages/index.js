import Head from "next/head";
import { useEffect } from "react";
import Slider from "../components/UI/Slider/Slider";
import style from "../styles/Home.module.sass";
import axios from "../api/axios.news";

export default function Home({data}) {
  return (
    <div className={style.container}>
      <Head>
        <title>Home</title>
        <meta name="Home" content="News in Kyrgyzstan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.mainSlider}>
        <Slider />
      </main>
      <section className={style.lastNews}>
      {data.map(news => {
        return (
          <div key={news.id} className={style.post}>
            <h3 className={style.postTitle}>{news.attributes.title}</h3>
            <span className={style.smallDescription}>{news.attributes.smallDes}</span>
          </div>
        )
      })}
      </section>
    </div>
  );
}
export const getStaticProps = async () => {
  try {
    const res = await axios.get("/news");
    if (!res.data) {
      throw new Error();
    }
    return {
      props:{
        data: res.data.data
      }
    }
  } catch (error) {
    return {
      props:{
        data: [],
        error
      }
    }
  }
}