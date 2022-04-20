import Head from "next/head";
import Slider from "../components/UI/Slider/Slider";
import styles from "../styles/Home.module.sass";
import LastNews from "../components/LastNews/LastNews";
import { Button, Link } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="Home" content="News in Kyrgyzstan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainSlider}>
        <Slider />
      </main>
      <section className={styles.lastNews}>
        <LastNews />
        <Link>
          <Button
            variant="outlined"
            color="error"
            type="submit"
            className={styles.allNews__btn}
          >
            Все новости
          </Button>
        </Link>
      </section>
    </div>
  );
}
