import { PostTileType } from "@/lib/sanity/queries/fragments";
import SanityImage from "./sanity-image";
import processUrl from "@/utils/processUrl";
import Link from "./link";
import { twMerge } from "tailwind-merge";

export function PostTileSkeleton({
  imageAspect,
  className,
}: {
  imageAspect: "square" | "portrait" | "landscape";
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className={twMerge(
          "relative mb-2 rounded-xl overflow-hidden animate-pulse bg-gray-200",
          imageAspect === "square" && "aspect-square",
          imageAspect === "portrait" && "aspect-portrait",
          imageAspect === "landscape" && "aspect-landscape",
        )}
      />
      <div className="h-4 w-full mb-4 bg-gray-200 rounded-md animate-pulse" />
      <div className="h-8 w-2/3 bg-gray-200 rounded-md animate-pulse" />
    </div>
  );
}

export default function PostTile({
  post,
  image_aspect,
  className,
}: {
  post: PostTileType;
  image_aspect: "square" | "portrait" | "landscape";
  className?: string;
}) {
  const { image, title, description } = post;

  return (
    <Link
      href={processUrl(post)}
      className={twMerge("block not-prose", className)}
    >
      <div
        className={twMerge(
          "relative mb-2 rounded-xl overflow-hidden",
          image_aspect === "square" && "aspect-square",
          image_aspect === "portrait" && "aspect-portrait",
          image_aspect === "landscape" && "aspect-landscape",
        )}
      >
        <SanityImage
          src={image}
          className="object-cover inset-0 w-full h-full"
        />
      </div>
      <h3 className="text-base font-bold mb-4">{title}</h3>
      <p className="line-clamp-3 prose">{description}</p>
    </Link>
  );
}
