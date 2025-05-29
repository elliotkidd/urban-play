import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { GridProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";

export default function Grid({ sectionHeader, items }: GridProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className="wrapper space-y-fluid-xs"
    >
      <SectionHeader {...sectionHeader} />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-fluid-xs">
        {items &&
          items.map((item) => (
            <motion.div
              key={item._key}
              className="bg-gray-100 rounded-lg overflow-hidden text-center"
            >
              <h3 className="bg-text text-background flex items-center justify-center font-bold text-xl p-8 aspect-landscape">
                {item.heading}
              </h3>
              <div className="p-8 flex items-center justify-center aspect-landscape prose">
                <p className="opacity-50">{item.description}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
