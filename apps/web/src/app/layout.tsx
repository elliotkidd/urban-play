import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";

import DisableDraftMode from "@/components/DisableDraftMode";
import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { loadHomePage } from "@/sanity/loader/loadQuery";
import "@/styles/index.scss";

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || false;
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || false;

export const generateMetadata = async (): Promise<Metadata> => {
  const [{ data: homePage }] = await Promise.all([loadHomePage()]);

  const homeData = homePage?.home;

  const rootDomain = process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "";

  const ogImage = homeData?.seo?.ogImage;

  return {
    metadataBase: new URL(rootDomain || "localhost:3000"),
    alternates: {
      canonical: "/",
    },
    title: {
      template: "%s | " + (siteTitle || ""),
      default:
        (homeData?.seo?.metaTitle || homeData?.title || "") +
        " | " +
        (siteTitle || ""),
    },
    description: homeData?.seo?.metaDesc || "",
    openGraph: {
      url: "/",
      siteName: siteTitle,
      images: ogImage ? [ogImage] : undefined,
    },
  };
};

export const viewport: Viewport = {
  themeColor: "#000",
};

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mrz5rpz.css" />
        <Script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/47759019.js"
        />
      </head>
      <body className="bg-primary text-contrast transition-colors duration-1000 antialiased">
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {/* <Lenis root options={{ lerp: 0.15 }} /> */}
        {/* <Suspense>
          <Navbar />
        </Suspense> */}
        <main role="main">
          <Suspense>{children}</Suspense>
        </main>
        {/* <Suspense>
          <Footer />
        </Suspense> */}
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing zIndex={1000} />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
