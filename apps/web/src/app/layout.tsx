import "@/styles/index.scss";

import { revalidatePath, revalidateTag } from "next/cache";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { preconnect, prefetchDNS } from "react-dom";

import { FooterServer } from "@/components/footer";
import { PreviewBar } from "@/components/preview-bar";
import { SanityLive } from "@/lib/sanity/live";
import { Providers } from "../components/providers";
import { Lenis } from "@/lib/lenis";
import { fonts } from "./fonts";
import { NavbarServer } from "@/components/navbar";
import { NavbarSkeletonResponsive } from "@/components/navbar-client";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  prefetchDNS("https://cdn.sanity.io");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fonts} font-body bg-background text-text transition-colors duration-500`}
      >
        <Lenis root />
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
