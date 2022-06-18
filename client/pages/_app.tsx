import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Gnb from "../src/component/Gnb";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Gnb />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
