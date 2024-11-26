import Ads from "@/components/Ads";
import FileUploader from "@/components/FileUploader";
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
      <main className="main_div min-h-[90vh] py-2 px-4 grid grid-cols-12 gap-5">
        <div className='col-span-12  order-1 md:col-span-4  md:order-1 h-full '>
          <FileUploader />
        </div>
        <div className=" col-span-12 order-2 md:col-span-8 md:order-2 h-full">
          <Ads />
        </div>
      </main>
    </>
  )
}

export default Home;