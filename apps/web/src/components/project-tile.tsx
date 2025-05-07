import { TileType } from "@/lib/sanity/queries/fragments";
import Link from "./link";
import SanityImage from "./sanity-image";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { descriptionVariants, titleVariants } from "@/lib/motion";
export default function ProjectTile({
  project,
  imageAspectRatio = "square",
  className,
}: {
  project: TileType;
  imageAspectRatio?: "square" | "landscape" | "portrait" | "video";
  className?: string;
}) {
  const { image, solutions, title, description, slug } = project;

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
    <Link href={slug} className={twMerge("block", className)}>
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
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{
          margin: "-100px 0px -100px 0px",
        }}
        variants={titleVariants}
        className="text-lg underline font-bold mb-4"
      >
        {title}
      </motion.h3>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{
          margin: "-100px 0px -100px 0px",
        }}
        variants={descriptionVariants}
        className="text-sm line-clamp-2 max-w-[390px]"
      >
        {description}
      </motion.p>
    </Link>
  );
}
