"use client";

import { stegaClean } from "@sanity/client/stega";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import processUrl from "@/utils/processUrl";

import SanityImage from "../SanityImage";
import { Link } from "../navigation/Link";

interface Props {
  projects: any[];
}

export default function ProjectTable({ projects }: Props) {
  const [hover, setHover] = useState<number>();

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverArea, setHoverArea] = useState<boolean | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hoverArea) {
      x.set(cursorPosition.x);
      y.set(cursorPosition.y);
    }
  }, [cursorPosition, x, y, hoverArea]);

  if (projects)
    return (
      <div
        onMouseEnter={() => setHoverArea(true)}
        onMouseLeave={() => setHoverArea(false)}
      >
        <AnimatePresence mode="wait">
          {hoverArea && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              style={{
                top: y.get(),
                left: x.get(),
              }}
              className={twMerge(
                "pointer-events-none fixed z-0 hidden aspect-square w-80 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-primary md:flex",
              )}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={twMerge(
                    "h-full w-full duration-500",
                    hover === index ? "opacity-100" : "opacity-0",
                  )}
                >
                  {project.mainImage && (
                    <SanityImage
                      key={index}
                      src={project.mainImage}
                      className="absolute inset-0 h-full w-full rounded-sm object-cover"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <ul className="group relative z-10 divide-y divide-contrast/10 border-y border-contrast/10">
          {projects.map((project, index) => (
            <li key={index}>
              <Link href={processUrl(project)}>
                <div
                  className={twMerge(
                    "grid w-full grid-cols-6 py-fluid-xs duration-500 md:grid-cols-12 md:justify-start",
                    hover === index
                      ? "z-40 opacity-100"
                      : "group-hover:opacity-10",
                  )}
                  onMouseOver={() => setHover(index)}
                >
                  <div className="col-span-3 md:col-span-5">
                    <h3 className="text-lg font-light tracking-tight">
                      {project.title}
                      {project.attribution && (
                        <span className="block opacity-40 md:inline">
                          {" "}
                          {project.attribution}
                        </span>
                      )}
                    </h3>
                  </div>
                  {project.categories && (
                    <div className="col-span-3">
                      <ul className="flex flex-wrap">
                        {project.categories.map((category: any, i: number) => (
                          <li
                            key={i}
                            className="text-label inline-block rounded-full border border-contrast/20 bg-contrast/10 px-2.5 py-1 uppercase text-contrast backdrop-blur"
                          >
                            {category.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
}
