import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from "../src/_app/store";
import { Provider } from "react-redux";
import Gnb from "../src/component/Gnb/Gnb";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Gnb />
      <Provider store={store}>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
