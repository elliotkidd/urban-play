import { ProcessProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import SectionHeader from "../section-header";
import SanityImage from "../sanity-image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Process({ steps, smallWrapper, sectionHeader }: ProcessProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-100%"]);

  return (
    <div
      className={twMerge(
        "wrapper relative overflow-visible",
        smallWrapper && "wrapper--small",
      )}
      style={{ height: steps.length * 66 + "vh" }}
      ref={scrollRef}
    >
      <div className="sticky top-0 h-screen flex flex-col w-full">
        <SectionHeader {...sectionHeader} />
        <motion.div
          className="flex flex-nowrap gap-4 flex-1 items-center overflow-hidden"
          style={{ x }}
        >
          {steps.map((step) => (
            <motion.div
              key={step._key}
              className="bg-nav-bar-background/20 p-4 rounded-lg flex gap-4 aspect-landscape"
              style={{ height: "437px" }}
            >
              <div className="relative aspect-portrait rounded-lg overflow-hidden flex-none">
                <SanityImage
                  src={step.image}
                  className="w-full h-full absolute inset-0 object-cover"
                />
              </div>
              <div className="text-sm flex-none flex flex-col h-full justify-between max-w-xs">
                <h3 className="text-lg font-bold">{step.heading}</h3>
                <div className="text-sm">{step.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
export default Process;
