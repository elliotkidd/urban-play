import SanityImage from "./sanity-image";
import { twMerge } from "tailwind-merge";
import SanityLink from "./sanity-link";

export type ImageLinkCardProps = {
  card: any;
  className?: string;
};

export function ImageLinkCard({ card, className }: ImageLinkCardProps) {
  const { image, title, url } = card ?? {};
  return (
    <SanityLink url={url} className={twMerge("group", className)}>
      <div className="relative aspect-landscape inset-0 overflow-hidden rounded-xl bg-nav-bar-background">
        {image && (
          <SanityImage
            src={image}
            className="object-cover pointer-events-none group-hover:scale-105 duration-500"
          />
        )}
      </div>
      <h3 className="mt-4 font-black text-2xl no-underline">{title}</h3>
    </SanityLink>
  );
}
