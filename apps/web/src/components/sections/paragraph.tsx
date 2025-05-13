import { twMerge } from "tailwind-merge";
import { RichText } from "../richtext";
import { ParagraphProps } from "@/lib/sanity/queries/sections";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { SanityButtons } from "../sanity-buttons";

export default function ParagraphSection({
  richText,
  topText,
  buttons,
  annotations,
  smallWrapper,
  largeSpacing,
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
      <div className="flex w-full justify-between gap-fluid-sm prose">
        {topText && <RichText richText={topText} className="max-w-p-lg" />}
        {buttons && !annotations && (
          <SanityButtons buttons={buttons} buttonClassName="btn--header" />
        )}
        {annotations && !buttons && (
          <ul className="w-80 space-y-4  list-none not-prose">
            {annotations.map(({ top, bottom, _key }) => (
              <li key={_key} className="leading-none">
                <span className="block">{top}</span>
                <span className="block opacity-40">{bottom}</span>
              </li>
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
