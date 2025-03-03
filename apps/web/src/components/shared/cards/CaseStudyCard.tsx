"use client";

import { stegaClean } from "@sanity/client/stega";
import { motion } from "framer-motion";
import { TypeFromSelection } from "groqd";
import { useRef, useState } from "react";

import { IconArrowUpRight } from "@/components/Icon";
import { PROJECT_TILE_FRAGMENT } from "@/sanity/lib/queries/tiles";
import processUrl from "@/utils/processUrl";

import SanityImage from "../SanityImage";
import ClientSideRoute from "../navigation/ClientSideRoute";

export default function CaseStudyCard(
  caseStudy: TypeFromSelection<typeof PROJECT_TILE_FRAGMENT>,
) {
  const { mainVideo, mainImage, title } = caseStudy;

  const [hover, setHover] = useState<boolean>(false);
  const video = useRef(null);

  return (
    <li
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <ClientSideRoute
        className="group"
        route={processUrl({ _type: "project", slug: caseStudy.slug })}
      >
        <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-contrast/30">
          {mainImage && (
            <SanityImage
              src={mainImage}
              className="absolute h-full w-full object-cover duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 33vw,
              33vw"
            />
          )}
        </div>
        <div className="relative flex w-full items-center justify-between">
          <h3 className="text-md">{title}</h3>
          <span className="overflow-hidden">
            <motion.span
              animate={{ y: hover ? 0 : "100%", x: hover ? 0 : "-100%" }}
              transition={{ delay: 0.25, duration: 0.25, ease: "easeInOut" }}
              className="block h-4 w-4 text-accent"
            >
              <IconArrowUpRight className="h-4 w-4" />
            </motion.span>
          </span>
        </div>
      </ClientSideRoute>
    </li>
  );
}
