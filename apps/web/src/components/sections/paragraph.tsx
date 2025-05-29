import { twMerge } from "tailwind-merge";
import { RichText } from "../richtext";
import { ParagraphProps } from "@/lib/sanity/queries/sections";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { SanityButtons } from "../sanity-buttons";
import { cn } from "@/lib/utils";

export default function ParagraphSection({
  richText,
  topText,
  buttons,
  annotations,
  smallWrapper,
  largeSpacing,
  annotationDirection,
}: ParagraphProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-xs",
        smallWrapper && "wrapper--small",
        largeSpacing ? "space-y-fluid-xl" : "space-y-fluid-md",
      )}
    >
      <div className="flex flex-col md:flex-row w-full justify-between gap-fluid-sm prose">
        {topText && (
          <RichText
            richText={topText}
            className={cn(
              "max-w-p-lg",
              (!buttons || !annotations) && "max-w-p-xl",
            )}
          />
        )}
        {buttons && !annotations && <SanityButtons buttons={buttons} />}
        {annotations && !buttons && (
          <ul
            className={twMerge(
              "w-80 list-none not-prose text-xs",
              annotationDirection === "vertical" ? "space-y-4" : "space-y-1",
            )}
          >
            {annotations.map(({ top, bottom, _key }) => (
              <>
                {annotationDirection === "horizontal" ? (
                  <li
                    key={_key}
                    className="leading-none grid grid-cols-3 gap-2"
                  >
                    <span className="block opacity-40">{top}</span>
                    <span className="block col-span-2">
                      {bottom.split(",").map((word, i) => {
                        return (
                          <span key={i} className="block">
                            {word}
                          </span>
                        );
                      })}
                    </span>
                  </li>
                ) : (
                  <li key={_key} className="leading-none">
                    <span className="block">{top}</span>
                    <span className="block opacity-40">{bottom}</span>
                  </li>
                )}
              </>
            ))}
          </ul>
        )}
      </div>
      <div className="prose">
        {richText && <RichText richText={richText} className="max-w-p-lg" />}
      </div>
    </motion.div>
  );
}
