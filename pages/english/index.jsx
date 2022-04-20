import Head from "next/head";
import Slider from "../../components/UI/Slider/Slider";
import style from "../../styles/Home.module.sass";
import LastNews from "../../components/LastNews/LastNews";

export default function en() {
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
        <LastNews />
      </section>
    </div>
  );
}
