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
    <>
      {image && !containImage && (
        <SanityImage
          src={image}
          className="absolute inset-0 w-full h-full object-cover hidden lg:block"
          width={1440}
          height={1024}
          sizes="100vw"
        />
      )}
      <div
        className={twMerge(
          "wrapper py-fluid-xs relative hidden",
          !containImage && "lg:flex h-full items-start",
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
              sizes="100vw"
            />
            <div className="bg-accent relative rounded-xl p-fluid-xs z-[1]"></div>
          </div>
        )}
        {!containImage && (title || richText) && (
          <motion.div
            {...sectionAnimationConfig}
            className="bg-primary-button rounded-xl p-fluid-xs w-full max-w-[560px] space-y-fluid sticky top-24 hidden lg:block"
          >
            <p className="lead">{title}</p>
            <RichText richText={richText} />
          </motion.div>
        )}
      </div>
      {(title || richText) && !containImage && (
        <div className="wrapper relative lg:hidden space-y-fluid-sm">
          <div className="relative z-10 aspect-portrait overflow-hidden rounded-xl">
            <SanityImage
              src={image}
              className="object-cover absolute inset-0 w-full h-full"
            />
          </div>
          <div className="absolute bg-bottle-green bottom-0 left-0 right-0 h-2/3"></div>
          <div className="relative z-10 space-y-fluid-sm">
            <h3 className="font-heading text-[35px] uppercase leading-[95%]">
              {title}
            </h3>
            <RichText richText={richText} className="" />
          </div>
        </div>
      )}
    </>
  );
}
