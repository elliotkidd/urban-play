import SanityImage from "./sanity-image";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { motion } from "motion/react";
import { childVars, descriptionVariants, titleVariants } from "@/lib/motion";

export type ImageLinkCardProps = {
  card: any;
  className?: string;
  index?: number;
  staggerDelay?: number;
};

export function ImageLinkCard({
  card,
  className,
  index = 0,
  staggerDelay = 0,
}: ImageLinkCardProps) {
  const { image, title, url } = card ?? {};

  return (
    <motion.div
      variants={childVars}
      className={twMerge("group prose", className)}
    >
      <div className="relative not-prose aspect-landscape inset-0 overflow-hidden rounded-xl bg-nav-bar-background">
        {image && (
          <SanityImage
            src={image}
            className="object-cover pointer-events-none group-hover:scale-105 duration-500"
          />
        )}
      </div>
      <motion.h2
        variants={titleVariants(index * staggerDelay + 0.25)}
        className=""
      >
        {title}
      </motion.h2>
      <motion.div variants={descriptionVariants(index * staggerDelay + 0.5)}>
        <Link
          href={url?.href}
          target={url?.openInNewTab ? "_blank" : "_self"}
          className="underline block text-lg font-bold leading-none hover:opacity-70 duration-500 transition-opacity"
        >
          Learn More
        </Link>
      </motion.div>
    </motion.div>
  );
}
