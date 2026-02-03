import type { Metadata } from "next";

import { getBaseUrl } from "@/config";

interface OgImageOptions {
  type?: string;
  id?: string;
}

function getOgImage({ type, id }: OgImageOptions = {}): string {
  const params = new URLSearchParams();
  if (id) params.set("id", id);
  if (type) params.set("type", type);
  const baseUrl = getBaseUrl();
  const logoUrl = `${baseUrl}/api/og?${params.toString()}`;
  return logoUrl;
}

// interface MetaDataInput {
//   _type?: Maybe<string>;
//   seoDescription?: Maybe<string>;
//   seoTitle?: Maybe<string>;
//   slug?: Maybe<{ current: string | null }> | string | null;
//   title?: Maybe<string>;
//   description?: Maybe<string>;
//   _id?: Maybe<string>;
// }

export function getMetaData(data: any): Metadata {
  const { _type,ogTitle, ogDescription, seoDescription, seoTitle, seoCanonicalUrl, seoNoIndex, seoNoFollow, slug, title, description, _id } =
    data ?? {};

  const baseUrl = getBaseUrl();
  const pageSlug = typeof slug === "string" ? slug : (slug?.current ?? "");
  const pageUrl = `${baseUrl}${pageSlug}`;

  const meta = {
    title: seoTitle ?? title ?? "",
    description: seoDescription ?? description ?? "",
    ogTitle: ogTitle ?? seoTitle ?? title ?? "",
    ogDescription: ogDescription ?? seoDescription ?? description ?? "",
  };

  const ogImage = getOgImage({
    type: _type ?? undefined,
    id: _id ?? undefined,
  });

  return {
    title: `${meta.title} | Urban Play`,
    description: meta.description,
    metadataBase: new URL(baseUrl),
    creator: "Urban Play",
    authors: [{ name: "Urban Play" }],
    icons: {
      icon: `${baseUrl}/favicon.ico`,
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
      creator: "@urbanplay",
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
    alternates: {
      canonical: seoCanonicalUrl ?? pageUrl,
    },
    robots: {
      index: !seoNoIndex,
      follow: !seoNoFollow,
    },
    openGraph: {
      type: "website",
      countryName: "AU",
      description: meta.description,
      title: meta.title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.title,
          secureUrl: ogImage,
        },
      ],
      url: pageUrl,
    },
  };
}
