import { motion } from "motion/react";
import { RichText } from "../richtext";
import SanityImage from "../sanity-image";
import { HeroProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";

export function HeroBlock({ title, image, richText }: HeroProps) {
  return (
    <div id="hero" className="h-screen relative">
      {image && (
        <SanityImage
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className="wrapper py-fluid-xs h-full flex flex-col justify-end relative z-[1]"
        // initial={{
        //   opacity: 0,
        // }}
        // animate={{
        //   opacity: 1,
        // }}
        // transition={{
        //   duration: 0.5,
        //   ease: "easeInOut",
        // }}
      >
        <RichText
          richText={richText}
          className="max-w-p prose-white mb-fluid-xs"
        />
        <h2
          className={twMerge(
            "jumbo w-full font-black font-heading mb-0 whitespace-nowrap overflow-hidden",
          )}
          style={{
            lineHeight: "1",
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
