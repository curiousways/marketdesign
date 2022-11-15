import { useEffect } from "react";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import * as Fathom from "fathom-client";

import Footer from "@/components/common/Footer";
import Nav from "@/components/common/Nav";

import "../styles/globals.css"; // Global style sheet for css

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const siteUrl = process.env.SITE_URL as string;
  const siteTitle = process.env.SITE_TITLE;
  const fathom = process.env.FATHOM_ANALYTICS_ID as string; //fathom analytics id
  const siteUrlhttpsStripped = process.env.SITE_URL?.split("//")[1] as string;

  useEffect(() => {
    // Load fathom analytics
    Fathom.load(fathom, {
      includedDomains: [siteUrlhttpsStripped],
      excludedDomains: ["localhost", "*.vercel.app"],
    });

    // Fathom Analytics
    const handleRouteChange = () => {
      Fathom.trackPageview();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo
        title={siteTitle}
        description="Enter description here"
        canonical={`${siteUrl}${router.asPath === "/" ? "" : router.asPath}`}
        openGraph={{
          type: "website",
          url: `${siteUrl}${router.asPath === "/" ? "" : router.asPath}`,
          site_name: siteTitle,
          title: siteTitle,
          description: "Enter description here",
          images: [
            {
              url: "Enter social icon path here",
              width: 1200,
              height: 630,
              alt: `${siteTitle}`,
            },
          ],
        }}
        twitter={{
          handle: "@twitterhandle",
          site: siteUrl,
          cardType: "summary_large_image",
        }}
      />
      <Nav />
      <Component
        {...pageProps}
        // Remount components if the route changes
        // https://nextjs.org/docs/api-reference/next/router#resetting-state-after-navigation
        key={router.asPath}
      />
      <Footer />
    </>
  );
}

export default MyApp;
