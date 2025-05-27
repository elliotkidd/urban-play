"use client";

import { ImageType, TileType } from "@/lib/sanity/queries/fragments";
import Link from "./link";
import SanityImage from "./sanity-image";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { childVars, descriptionVariants, titleVariants } from "@/lib/motion";

export default function ProjectTile({
  project,
  imageAspectRatio = "square",
  className,
  index = 0,
  staggerDelay = 0,
  showDescription = false,
}: {
  project: TileType & { seoImage: ImageType };
  imageAspectRatio?: "square" | "landscape" | "portrait" | "video";
  className?: string;
  index?: number;
  staggerDelay?: number;
  showDescription?: boolean;
}) {
  const { image, solutions, title, shortDescription, slug, seoImage } = project;

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
    <motion.li variants={childVars} className={className}>
      <Link href={slug} className={twMerge("block")}>
        <div
          className={twMerge(
            "relative mb-2 rounded-xl overflow-hidden",
            imageAspectRatioClass,
          )}
        >
          <SanityImage
            src={image || seoImage}
            className="object-cover inset-0 w-full h-full"
          />
          {solutions && solutions.length > 0 && (
            <span className="absolute bg-nav-bar-background/20 backdrop-blur text-nav-bar-text top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg">
              {solutions[0].title}
            </span>
          )}
        </div>
        <motion.h3
          variants={titleVariants(index * staggerDelay + 0.25)}
          className="text-lg underline font-bold mb-4"
        >
          {title}
        </motion.h3>
        {showDescription && shortDescription && (
          <motion.p
            variants={descriptionVariants(index * staggerDelay + 0.5)}
            className="text-sm line-clamp-2 max-w-[520px] opacity-60"
          >
            {shortDescription}
          </motion.p>
        )}
      </Link>
    </motion.li>
  );
}
