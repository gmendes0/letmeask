import type { AppProps } from "next/app";

import "../styles/global.scss";
import "../styles/auth.scss";

import "../services/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
