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
  const { image, solutions, title, description } = post;
  return (
    <Link href={processUrl(post)} className={twMerge("block", className)}>
      <div
        className={twMerge(
          "relative mb-2 aspect-square rounded-xl overflow-hidden",
          image_aspect === "square" && "aspect-square",
          image_aspect === "portrait" && "aspect-portrait",
        )}
      >
        <SanityImage
          src={image}
          className="object-cover inset-0 w-full h-full"
        />
        {solutions && solutions.length > 0 && (
          <span className="absolute bg-nav-bar-background/20 backdrop-blur text-nav-bar-text top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg">
            {solutions.map(({ title }: { title: string }) => title).join(", ")}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold mb-4">{title}</h3>
      <p className="line-clamp-3 prose">{description}</p>
    </Link>
  );
}
export default PostTile;
