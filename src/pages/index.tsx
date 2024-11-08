import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {


  return (
    <>
      <Head>
        <meta name="description" content="FileFerry - A secure and easy-to-use platform for sending and sharing files. Upload and share files seamlessly with FileFerry." />
        <meta name="keywords" content="file transfer, file sharing, send files, upload files, FileFerry" />
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