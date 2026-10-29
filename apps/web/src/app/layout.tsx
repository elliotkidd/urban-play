import "@/styles/index.scss";

import { revalidatePath, revalidateTag } from "next/cache";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { preconnect, prefetchDNS } from "react-dom";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { FooterServer } from "@/components/footer";
import { PreviewBar } from "@/components/preview-bar";
import { SanityLive } from "@/lib/sanity/live";
import { Providers } from "../components/providers";
import { Lenis } from "@/lib/lenis";
import { fonts } from "./fonts";
import { NavbarServer } from "@/components/navbar";
import { NavbarSkeletonResponsive } from "@/components/navbar-client";
import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || false;
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || false;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  prefetchDNS("https://cdn.sanity.io");
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <meta
          name="google-site-verification"
          content="rrupQRzlSh1m0Zdwf1_Nuwfs5_pVvXugLiMo-LOoMwQ"
        />

        <body
          className={`${fonts} font-body bg-black text-text transition-colors duration-500`}
        >
          {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
          {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
          <Script
            id="mcjs"
            src="https://chimpstatic.com/mcjs-connected/js/users/ed2b28164c6aee6b8e81ba26f/a4404ed37633e6edde777269e.js"
            strategy="afterInteractive"
          />
          <Lenis root />
          <Providers>
            <div className="bg-background">
              <Suspense fallback={<NavbarSkeletonResponsive />}>
                <NavbarServer />
              </Suspense>
              {(await draftMode()).isEnabled ? (
                <>
                  {children}
                  <VisualEditing
                    refresh={async (payload) => {
                      "use server";
                      if (payload.source === "manual") {
                        revalidatePath("/", "layout");
                        return;
                      }
                      const id = payload?.document?._id?.startsWith("drafts.")
                        ? payload?.document?._id.slice(7)
                        : payload?.document?._id;
                      const slug = payload?.document?.slug?.current;
                      const type = payload?.document?._type;
                      for (const tag of [slug, id, type]) {
                        if (tag) revalidateTag(tag);
                      }
                    }}
                  />
                  <PreviewBar />
                </>
              ) : (
                children
              )}
              <FooterServer />
              <SanityLive />
              {/* <LoadInScreen /> */}
              <Toaster />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
