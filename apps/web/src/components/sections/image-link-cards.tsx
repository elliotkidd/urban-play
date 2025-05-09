import { twMerge } from "tailwind-merge";
import { ImageLinkCard } from "../image-link-card";
import {
  opacityStaggerChildrenConfig,
  sectionAnimationConfig,
  STAGGER_DELAY,
} from "@/lib/motion";
import { motion } from "motion/react";

export function ImageLinkCards({ cards, smallWrapper }: any) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-sm",
        smallWrapper && "wrapper--small",
      )}
    >
      {Array.isArray(cards) && cards.length > 0 && (
        <motion.div
          className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2"
          {...opacityStaggerChildrenConfig}
        >
          {cards?.map((card, index) => (
            <ImageLinkCard
              key={card._key}
              card={card}
              className={twMerge()}
              index={index}
              staggerDelay={STAGGER_DELAY}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
