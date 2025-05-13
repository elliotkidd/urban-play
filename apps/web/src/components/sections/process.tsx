import { ProcessProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import SectionHeader from "../section-header";
import SanityImage from "../sanity-image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Process({
  steps,
  smallWrapper,
  sectionHeader,
  showIndex,
}: ProcessProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const scrollAmount = (() => {
    const horizontalWidth = horizontalRef.current?.offsetWidth ?? 0;
    const scrollWidth = scrollRef.current?.offsetWidth ?? 0;
    return horizontalWidth - scrollWidth;
  })();

  console.log(scrollAmount);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollAmount]);

  return (
    <>
      <div className={twMerge("wrapper", smallWrapper && "wrapper--small")}>
        <SectionHeader {...sectionHeader} />
      </div>
      <div
        className={twMerge("relative overflow-visible")}
        style={{ height: steps.length * 100 + "vh" }}
        ref={scrollRef}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={horizontalRef}
            className="flex gap-4 items-center px-fluid-xs"
            style={{ x }}
          >
            {steps.map((step, i) => (
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
                  <h3 className="text-lg font-bold">
                    {showIndex && (
                      <span className="opacity-30 mr-1">
                        {i > 9 ? i + 1 : `0${i + 1}`}
                      </span>
                    )}
                    {step.heading}
                  </h3>
                  <div className="text-sm">{step.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
export default Process;
