import SanityImage from "./sanity-image";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export type ImageLinkCardProps = {
  card: any;
  className?: string;
};

export function ImageLinkCard({ card, className }: ImageLinkCardProps) {
  const { image, title, url } = card ?? {};

  return (
    <div className={twMerge("group", className)}>
      <div className="relative aspect-landscape inset-0 overflow-hidden rounded-xl bg-nav-bar-background">
        {image && (
          <SanityImage
            src={image}
            className="object-cover pointer-events-none group-hover:scale-105 duration-500"
          />
        )}
      </div>
      <h3 className="mt-4 font-black text-2xl no-underline">{title}</h3>
      <Link
        href={url?.href}
        target={url?.openInNewTab ? "_blank" : "_self"}
        className="underline block text-lg font-bold leading-none mt-2.5 hover:opacity-70 duration-500 transition-opacity"
      >
        Learn More
      </Link>
    </div>
  );
}
