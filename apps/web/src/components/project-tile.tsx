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
  project: TileType & { seoImage?: ImageType };
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
      imageAspectRatioClass = "lg:aspect-square";
      break;
    case "landscape":
      imageAspectRatioClass = "lg:aspect-landscape";
      break;
    case "portrait":
      imageAspectRatioClass = "lg:aspect-portrait";
      break;
    case "video":
      imageAspectRatioClass = "lg:aspect-video";
      break;
    default:
      imageAspectRatioClass = "lg:aspect-square";
      break;
  }

  return (
    <motion.div variants={childVars} className={className}>
      <Link href={slug} className={twMerge("block group")}>
        <div
          className={twMerge(
            "relative mb-4 rounded-xl overflow-hidden aspect-square flex items-start justify-start p-3",
            imageAspectRatioClass,
          )}
        >
          <SanityImage
            src={image || seoImage}
            className="object-cover absolute inset-0 w-full h-full group-hover:scale-105 transition-all duration-500"
            width={
              imageAspectRatio === "landscape"
                ? 800
                : imageAspectRatio === "portrait"
                  ? 600
                  : 900
            }
            height={
              imageAspectRatio === "landscape"
                ? 600
                : imageAspectRatio === "portrait"
                  ? 800
                  : 900
            }
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {solutions && solutions.length > 0 && (
            <div className="flex gap-1">
              {solutions.slice(0, 2).map((solution, index) => (
                <span
                  key={solution._id || index}
                  className="bg-nav-bar-background/20 backdrop-blur text-white text-xs font-medium p-[15px] tracking-[0.005em] rounded-lg"
                >
                  {solution.title}
                </span>
              ))}
            </div>
          )}
        </div>
        <motion.h3
          variants={titleVariants(index * staggerDelay + 0.25)}
          className="text-lg leading-[120%] font-bold mb-4"
        >
          {title}
        </motion.h3>
        {showDescription && shortDescription && (
          <motion.p
            variants={descriptionVariants(index * staggerDelay + 0.5)}
            className="line-clamp-2 max-w-[520px] text-body-copy leading-[120%]"
          >
            {shortDescription}
          </motion.p>
        )}
      </Link>
    </motion.div>
  );
}
