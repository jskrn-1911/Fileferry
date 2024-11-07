import Header from "@/components/Header";
import { AppProvider } from "@/contexts/AppContext";
import "@/styles/globals.css";
import { fetchDailyBackgrounds } from "@/utils/fetchDailyBackground";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const [background, setBackground] = useState<string>("")

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
