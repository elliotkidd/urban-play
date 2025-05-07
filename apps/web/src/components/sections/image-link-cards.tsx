import { twMerge } from "tailwind-merge";
import { ImageLinkCard } from "../image-link-card";
import { sectionAnimationConfig } from "@/lib/motion";
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
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {cards?.map((card) => (
            <ImageLinkCard key={card._key} card={card} className={twMerge()} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
