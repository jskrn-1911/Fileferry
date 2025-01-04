import Header from "@/components/Header";
import { AppProvider } from "@/contexts/AppContext";
import "@/styles/globals.css";
import { fetchDailyBackgrounds } from "@/utils/fetchDailyBackground";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SessionProvider } from 'next-auth/react'
import Head from "next/head";
import { useRouter } from "next/router";
import GlobalLoader from "@/components/GlobalLoader";
import BottomToggle from "@/components/BottomToggle";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [background, setBackground] = useState<string>("")
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const background = await fetchDailyBackgrounds();
      // console.log(background)
      setBackground(background);
    }
    fetchBackgroundImage();
  }, [])

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Head>
          <title>FileFerry</title>
          <meta name="description" content="file ferry  is file  transfer platform. you can transfer files freely using emails to any point of the earth and these files will stay there for which ever time you wants." />
        </Head>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
          <Header />
          <main>
            {loading && <GlobalLoader />}
            <Component {...pageProps} />
          </main>
          <BottomToggle />
        </div>
      </AppProvider>
    </SessionProvider>
  )
}
