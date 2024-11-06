import { fetchDailyBackgrounds } from "@/utils/fetchDailyBackground";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [backgroundImage, setBackgroundImage] = useState("")

  useEffect(() => {
    const getBackgroundImage = async () => {
      const background = await fetchDailyBackgrounds()
      setBackgroundImage(background)
    }
    getBackgroundImage();
  }, [])
  return (
    <div
      className="min-h-screen flex items-center justify-center">
      <div className="text-center text-white px-4 md:px-10">
        <h1 className="text-4xl font-semibold">Welcome to FileFerry 🚢</h1>
        <h3 className="mt-2 text-xl">A file transferring app.</h3>
      </div>
    </div>
  )
}

export default Home;