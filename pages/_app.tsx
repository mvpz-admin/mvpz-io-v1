/* eslint-disable */
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import Layout from "../core/Layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import { Notifications } from "@mantine/notifications";
import InstallPWA from "../core/Atoms/Others/InstallPWA";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/router";
import { useGlobalStore } from "../store/useGlobalStore";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = ({ Component, pageProps }: AppProps) => {
  let router = useRouter();
  const authStore = useAuthStore((state) => state.user);
  const handleFetchGlobalData = useGlobalStore(
    (state) => state.setDefaultSearchList
  );

  useEffect(() => {
    handleFetchGlobalData();
  }, [router.pathname]);

  useEffect(() => {
    if (!authStore?.token) return;

    // if (authStore?.token && !authStore?.isProfileCompleted) {
    //   router.push("/auth/account/new");
    // }
  }, [authStore]);

  console.log({
    env : process.env.NEXT_PUBLIC_GOOGLE_Client_ID
  });
  

  return (
    <>
      <Head>
        <title>MVPz Sports</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#222" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          colors: {
            // purple: ['#F3E5F5','#F3E5F5','#B39DDB','#9575CD','#7E57C2','#673AB7','#5E35B1','#512DA8','#4527A0','#311B92'],
            mvpz: [
              "#4d2d8c",
              "#543199",
              "#5b35a5",
              "#6239b2",
              "#693dbf",
              "#7041cc",
              "#7745d8",
              "#7e49e5",
              "#854df2",
              "#8c52ff",
            ],
            // mvpz: ['#8c52ff','#8c52ff','#8c52ff','#8c52ff','#8c52ff','#8c52ff','#8c52ff','#8c52ff','#8c52ff','#8c52ff']
          },
          primaryColor: "mvpz",
          fontFamily: "MonumentExtended-Regular",
        }}
      >
        <Notifications position="top-right" autoClose={5000} />
        <SessionProvider session={pageProps.session}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_Client_ID || "573777399562-pre5j6pbs3bemlquugu9us5tlr9pkhdj.apps.googleusercontent.com"}>
            <Layout>
              <div className="page">
                <main>
                  <Component {...pageProps} />
                  <Analytics />
                </main>
              </div>
            </Layout>
          </GoogleOAuthProvider>
        </SessionProvider>{" "}
      </MantineProvider>
      <InstallPWA />
    </>
  );
};

export default App;
