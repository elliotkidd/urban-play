"use client";

import { PageHeaderProps } from "@/lib/sanity/queries/sections";
import { RichText } from "../richtext";
import SanityImage from "../sanity-image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function PageHeader({
  title,
  richText,
  image,
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
      className="relative h-screen w-full flex items-center overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="h-[calc(100vh+200px)] w-full object-cover absolute inset-0"
      >
        {image && (
          <SanityImage
            src={image}
            className="h-full w-full object-cover absolute inset-0"
            alt={title}
            width={1440}
            height={1024}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="wrapper grid lg:grid-cols-2 gap-fluid-sm relative z-[1] prose">
        <h2 className="">{title}</h2>
        <RichText richText={richText} />
      </div>
    </div>
  );
}
