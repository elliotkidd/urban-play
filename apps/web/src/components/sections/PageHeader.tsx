"use client";

import { PageHeaderProps } from "@/lib/sanity/queries/sections";
import { RichText } from "../richtext";
import SanityImage from "../sanity-image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { VimeoVideo } from "../VimeoVideo";
import { extractVimeoId } from "@/utils/utils";

export default function PageHeader({
  title,
  richText,
  image,
  vimeo,
  mediaType,
}: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full flex items-center overflow-hidden rounded-b-xl lg:rounded-none"
    >
      <motion.div
        style={{ y }}
        className="h-[calc(100vh+200px)] w-full object-cover absolute inset-0"
      >
        {image && (
          <SanityImage
            src={image}
            className="absolute inset-0 w-full h-full object-cover"
            height={1024}
            width={1440}
            sizes="100vw"
          />
        )}
        {mediaType === "video" && vimeo?.type === "page" && (
          <VimeoVideo videoId={extractVimeoId(vimeo.url) || ""} />
        )}
        {mediaType === "video" && vimeo?.type === "asset" && vimeo.url && (
          <video
            src={vimeo.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="wrapper flex py-fluid-sm flex-col justify-between h-full lg:h-auto lg:grid lg:grid-cols-2 lg:gap-fluid-sm relative z-[1] prose">
        <div className="lg:hidden"></div>
        <h2 className="text-[60px]">{title}</h2>
        <RichText richText={richText} />
      </div>
    </div>
  );
}
