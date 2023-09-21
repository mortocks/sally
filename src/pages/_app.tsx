import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import Head from "next/head";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const poppins = Poppins({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["latin-ext"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={poppins.className}>
      <Head>
        <title>Sally</title>
      </Head>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwVjom3zpwUl-JbStWFB00RIYDHyBGxRc&libraries=places&callback=initMap"
        async
      />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ToastContainer hideProgressBar autoClose={false} />
    </div>
  );
};

export default api.withTRPC(MyApp);
