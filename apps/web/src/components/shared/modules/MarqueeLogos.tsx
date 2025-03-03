"use client";

import { TypeFromSelection } from "groqd";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";

import { MARQUEE_LOGOS_FRAGMENT } from "@/sanity/lib/queries/sections";

import SanityImage from "../SanityImage";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof MARQUEE_LOGOS_FRAGMENT>;

const transition = {
  type: "just",
  duration: 0.3,
  ease: [0.76, 0, 0.24, 1],
};

const headingVars = {
  hidden: {
    y: "100%",
    opacity: 0,
    transition,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ...transition,
      delay: 0.1,
    },
  },
};

export default function MarqueeLogos({ settings, items }: Props) {
  return (
    <ModuleWrapper settings={settings} className="overflow-hidden">
      <div className="wrapper overflow-visible">
        <Marquee autoFill className="!overflow-visible">
          {items &&
            items.map((item, i) => {
              return (
                <div className="mx-fluid flex items-center justify-center transition-all duration-500">
                  <SanityImage
                    src={item}
                    height={100}
                    width={200}
                    className={twMerge(
                      "transition-all duration-500 h-fluid-md w-auto",
                    )}
                  />
                </div>
              );
            })}
        </Marquee>
      </div>
    </ModuleWrapper>
  );
}
