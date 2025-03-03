"use client";

import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

import { client } from "@/sanity/lib/client";

type Props = {
  src: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
    alt?: string | null;
    height?: number | null | undefined;
    width?: number | null | undefined;
    lqip?: string | null | undefined;
  };
  className?: string;
  alt?: string;
  sizes?: string;
  height?: number;
  width?: number;
};

export default function SanityImage({
  src,
  className,
  alt,
  sizes,
  height,
  width,
}: Props) {
  const imageProps = useNextSanityImage(client, src, {
    imageBuilder: (imageUrlBuilder, options) => {
      return imageUrlBuilder
        .width(width || options.originalImageDimensions.width)
        .height(height || options.originalImageDimensions.height)
        .quality(80);
    },
  });

  if (!imageProps) return null;

  const loader = ({ src, width }: { src: string; width: number }) => {
    return `${src}&w=${width}`;
  };

  return (
    <Image
      {...imageProps}
      loader={loader}
      alt={alt ? alt : src?.alt ? src.alt : ""}
      placeholder="blur"
      style={{ maxWidth: "100%" }}
      height={height ? height : src?.height || undefined}
      width={width ? width : src?.width || undefined}
      className={className}
      blurDataURL={src?.lqip || undefined}
      sizes={sizes}
    />
  );
}
