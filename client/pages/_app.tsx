import type { AppProps } from "next/app";
import Head from "next/head";
import { persistor, store } from "../src/_app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Gnb from "../src/component/Gnb/Gnb";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>hanALL</title>
        </Head>
        <Gnb />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
