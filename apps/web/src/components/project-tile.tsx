import { TileType } from "@/lib/sanity/queries/fragments";
import Link from "./link";
import SanityImage from "./sanity-image";
import processUrl from "@/utils/processUrl";
import { twMerge } from "tailwind-merge";
export default function ProjectTile({
  project,
  imageAspectRatio = "square",
  className,
}: {
  project: TileType;
  imageAspectRatio?: "square" | "landscape" | "portrait" | "video";
  className?: string;
}) {
  const { image, solutions, title, description } = project;

  var imageAspectRatioClass: string;

  switch (imageAspectRatio) {
    case "square":
      imageAspectRatioClass = "aspect-square";
      break;
    case "landscape":
      imageAspectRatioClass = "aspect-landscape";
      break;
    case "portrait":
      imageAspectRatioClass = "aspect-portrait";
      break;
    case "video":
      imageAspectRatioClass = "aspect-video";
      break;
    default:
      imageAspectRatioClass = "aspect-square";
      break;
  }
  return (
    <Link href={processUrl(project)} className={twMerge("block", className)}>
      <div
        className={twMerge(
          "relative mb-2 rounded-xl overflow-hidden",
          imageAspectRatioClass,
        )}
      >
        <SanityImage
          src={image}
          className="object-cover inset-0 w-full h-full"
        />
        {solutions && solutions.length > 0 && (
          <span className="absolute bg-nav-bar-background/20 backdrop-blur text-nav-bar-text top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg">
            {solutions[0].title}
          </span>
        )}
      </div>
      <h3 className="text-lg underline font-bold mb-4">{title}</h3>
      <p className="text-sm line-clamp-2 max-w-[390px]">{description}</p>
    </Link>
  );
}
