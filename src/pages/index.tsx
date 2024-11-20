import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {


  return (
    <>
      <Head>
        <Head>
          <title>FileFerry - Effortless File Sharing and Transfer</title>
          <meta name="description" content="FileFerry makes file sharing seamless and secure. Send, upload, and share files with ease. Try FileFerry for a smooth and reliable file transfer experience." />
          <meta name="keywords" content="file transfer, file sharing, upload files, send files online, secure file sharing, FileFerry app" />
          <meta name="author" content="FileFerry Team" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
      </Head>
      <div
        className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white px-4 md:px-10">
          <h1 className="text-4xl font-semibold">Welcome to FileFerry 🚢</h1>
          <h3 className="mt-2 text-xl">A file transferring app.</h3>
        </div>
      </div>
    </>
  )
}

export default Home;