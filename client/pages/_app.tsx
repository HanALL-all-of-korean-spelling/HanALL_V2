import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Gnb from "../src/component/Gnb/Gnb";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Gnb />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
