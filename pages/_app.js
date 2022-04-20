import Layout from "../components/Layout/Layout";
import "../styles/globals.sass";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}

export default MyApp;
