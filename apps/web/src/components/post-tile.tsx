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
  const { image, title, solutions } = post;

  return (
    <Link
      href={processUrl(post)}
      className={twMerge("block not-prose group space-y-fluid-xs", className)}
    >
      <div
        className={twMerge(
          "relative rounded-xl overflow-hidden aspect-square",
          image_aspect === "square" && "lg:aspect-square",
          image_aspect === "portrait" && "lg:aspect-portrait",
          image_aspect === "landscape" && "lg:aspect-landscape",
        )}
      >
        <SanityImage
          src={image}
          className="object-cover inset-0 w-full h-full group-hover:scale-105 transition-all duration-500"
          width={
            image_aspect === "landscape"
              ? 800
              : image_aspect === "portrait"
                ? 600
                : 900
          }
          height={
            image_aspect === "landscape"
              ? 600
              : image_aspect === "portrait"
                ? 800
                : 900
          }
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {solutions && solutions.length > 0 && (
          <span className="absolute bg-nav-bar-background/20 backdrop-blur text-white top-3 left-3 text-xs font-medium p-[15px] tracking-[0.005em] rounded-lg">
            {solutions[0].title}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold leading-[120%]">{title}</h3>
    </Link>
  );
}
