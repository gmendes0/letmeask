import type { AppProps } from "next/app";

import "../styles/global.scss";
import "../styles/auth.scss";
import { AuthContextProvider } from "../contexts/AuthContext";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default appWithTranslation(MyApp);
