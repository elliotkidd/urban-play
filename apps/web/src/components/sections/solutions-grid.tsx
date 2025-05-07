import { SolutionsSectionProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import Link from "next/link";
import { sectionAnimationConfig } from "@/lib/motion";
import { motion } from "motion/react";
import { Fragment } from "react";

const hidden = { opacity: 0, y: 16 };
const visible = { opacity: 1, y: 0 };
const transition = { duration: 0.5, ease: "easeInOut" };

const solutionTitleVariants = {
  hidden,
  visible: {
    ...visible,
    transition: { ...transition, delay: 0.25 },
  },
};

const solutionDescriptionVariants = {
  hidden,
  visible: {
    ...visible,
    transition: { ...transition, delay: 0.5 },
  },
};

function SolutionsGridSection({
  sectionHeader,
  solutions,
}: SolutionsSectionProps) {
  return (
    <div className="wrapper">
      <SectionHeader {...sectionHeader} className="mb-fluid-lg" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-fluid-lg">
        {solutions.map((solution, i) => (
          <Fragment key={solution._id}>
            <motion.div
              {...sectionAnimationConfig}
              className={twMerge(
                i % 2 === 0 && "lg:col-start-2",
                "lg:col-span-2 grid grid-cols-subgrid gap-4",
              )}
            >
              <div className="relative aspect-landscape lg:aspect-portrait rounded-lg overflow-hidden">
                <SanityImage
                  src={solution.image}
                  alt={solution.title}
                  className="object-cover w-full h-full inset-0"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div />
                <div className="prose">
                  <motion.h3
                    variants={solutionTitleVariants}
                    className="text-3xl uppercase"
                  >
                    {solution.title}
                  </motion.h3>
                  <motion.p
                    variants={solutionDescriptionVariants}
                    className="max-w-p text-balance"
                  >
                    {solution.description}
                  </motion.p>
                </div>
                {solution.slug && (
                  <Link
                    href={`/projects?solution=${solution.slug}`}
                    className="link"
                  >
                    See {solution.title} Projects
                  </Link>
                )}
              </div>
            </motion.div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
export default SolutionsGridSection;
