import { twMerge } from "tailwind-merge";
import { RichText } from "../richtext";
import SanityImage from "../sanity-image";
import { ImageBannerProps } from "@/lib/sanity/queries/sections";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";

export function ImageBannerSection({
  title,
  image,
  richText,
  containImage,
  smallWrapper,
}: ImageBannerProps) {
  return (
    <div id="hero" className={twMerge("relative", !containImage && "h-screen")}>
      {image && !containImage && (
        <SanityImage
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
          width={1440}
          height={1024}
        />
      )}
      <div
        className={twMerge(
          "wrapper py-fluid-xs relative",
          !containImage && "flex h-full items-start",
          smallWrapper && "wrapper--small",
        )}
      >
        {containImage && (
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <SanityImage
              src={image}
              className="object-cover absolute inset-0 w-full h-full"
              width={1440}
              height={1024}
            />
            <div className="bg-accent relative rounded-xl p-fluid-xs z-[1]"></div>
          </div>
        )}
        {!containImage && (title || richText) && (
          <motion.div
            {...sectionAnimationConfig}
            className="bg-primary-button rounded-xl p-fluid-xs w-full max-w-[560px] space-y-fluid lg:sticky top-24"
          >
            <p className="lead">{title}</p>
            <RichText richText={richText} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
