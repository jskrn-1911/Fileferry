import Header from "@/components/Header";
import { AppProvider } from "@/contexts/AppContext";
import "@/styles/globals.css";
import { fetchDailyBackgrounds } from "@/utils/fetchDailyBackground";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SessionProvider } from 'next-auth/react'
import Head from "next/head";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [background, setBackground] = useState<string>("")

  //   useEffect(() => {
  //     const fetchBackgroundImage = async () => {
  //         const background = await fetchDailyBackgrounds();
  //         console.log(background);
  //         setBackground(background);
  //     };

  //     fetchBackgroundImage();

  //     const intervalId = setInterval(fetchBackgroundImage, 120000);

  //     return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const background = await fetchDailyBackgrounds();
      console.log(background)
      setBackground(background);
    }
    fetchBackgroundImage();
  }, [])

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
            <Component {...pageProps} />
          </main>
        </div>
      </AppProvider>
    </SessionProvider>
  )
}
