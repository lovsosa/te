import Head from "next/head";
import Slider from "../components/UI/Slider/Slider";
import style from "../styles/Home.module.sass";
import axios from "../api/axios.news";

export default function Home({ data }) {
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
        {data.map((news) => {
          return (
            <div key={news.id} className={style.post}>
              <span className={style.postImg}>
                {news.image ? (
                  <img
                    className={style.post__img}
                    src={news.image.url}
                    alt=""
                  />
                ) : null}
              </span>
              <h3 className={style.postTitle}>{news.title}</h3>
              <span className={style.smallDescription}>{news.smallDes}</span>
            </div>
          );
        })}
        
      </section>
    </div>
  );
}
export const getStaticProps = async () => {
  try {
    const res = await axios.get(
      "/news?sort=publishedAt:DESC&pagination[pageSize]=3&populate=image"
    );
    if (!res.data) {
      throw new Error();
    }
    return {
      props: {
        data: res.data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        error,
      },
    };
  }
};
