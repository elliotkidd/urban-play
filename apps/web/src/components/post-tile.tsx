import { PostTileType } from "@/lib/sanity/queries/fragments";
import SanityImage from "./sanity-image";
import processUrl from "@/utils/processUrl";
import Link from "./link";
import { twMerge } from "tailwind-merge";

function PostTile({
  post,
  image_aspect,
  className,
}: {
  post: PostTileType;
  image_aspect: "square" | "portrait";
  className?: string;
}) {
  const { image, title, description } = post;

  return (
    <Link href={processUrl(post)} className={twMerge("block", className)}>
      <div
        className={twMerge(
          "relative mb-2 rounded-xl overflow-hidden",
          image_aspect === "square" && "aspect-square",
          image_aspect === "portrait" && "aspect-portrait",
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
export default PostTile;
