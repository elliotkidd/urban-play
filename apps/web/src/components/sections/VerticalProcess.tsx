import { ProcessProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import SanityImage from "../sanity-image";
import { useState, useRef, Fragment } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScroll } from "motion/react";
import {
  descriptionVariants,
  sectionAnimationConfig,
  titleVariants,
} from "@/lib/motion";

function VerticalProcess({ sectionHeader, steps }: ProcessProps) {
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  scrollYProgress.on("change", (latest) => {
    const stepSize = 1 / steps.length;
    const currentStep = Math.floor(latest / stepSize);
    // Ensure we don't exceed the maximum step index
    const boundedStep = Math.min(currentStep, steps.length - 1);
    // Only update if we're still within the valid scroll range (0 to 1)
    if (latest >= 0 && latest <= 1) {
      setActiveStep(boundedStep);
    }
  });

  return (
    <div className="wrapper">
      {sectionHeader && <SectionHeader {...sectionHeader} />}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div ref={containerRef} className="space-y-fluid-sm">
          {steps.map((step) => (
            <Fragment key={step._key}>
              <motion.div
                {...sectionAnimationConfig}
                className="lg:h-[66dvh] prose flex flex-col justify-center"
              >
                <div className="relative aspect-landscape lg:hidden rounded-lg overflow-hidden">
                  <SanityImage
                    src={step.image}
                    alt={step.heading}
                    className="object-cover absolute inset-0 mt-0 w-full h-full"
                  />
                </div>
                <h3 className="text-lg font-bold font-body mb-4">
                  {step.heading}
                </h3>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    margin: "100px 0px 100px 0px",
                  }}
                  variants={descriptionVariants}
                  className="max-w-p text-balance"
                >
                  {step.description}
                </motion.p>
              </motion.div>
            </Fragment>
          ))}
        </div>
        <div className="items-start justify-items-end hidden lg:grid">
          <div className="sticky top-16 max-w-xl aspect-portrait rounded-lg overflow-hidden w-full">
            <AnimatePresence>
              {steps.map(
                (step, i) =>
                  i === activeStep && (
                    <motion.div
                      key={step._key}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full absolute inset-0"
                    >
                      <SanityImage
                        src={step.image}
                        alt={step.heading}
                        className="object-cover w-full h-full inset-0"
                      />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerticalProcess;
