import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FileFerry",
              url: "https://fileferry.vercel.app",
              logo: "https://fileferry.vercel.app/logo.png", 
              sameAs: [
                "https://www.facebook.com/FileFerry",
                "https://twitter.com/FileFerry",
                "https://www.linkedin.com/company/fileferry" 
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+97087496301",
                contactType: "Customer Support",
                areaServed: "US",
                availableLanguage: "English"
              }
            }),
          }}
        />
      </Head>
      <body className="antialiased ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
