"use client";

import { client } from "@/lib/sanity/client";
import { ImageType } from "@/lib/sanity/queries/fragments";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

type Props = {
  src: ImageType;
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
  const imageProps: any = useNextSanityImage(client, src, {
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
      alt={alt ? alt : ""}
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
