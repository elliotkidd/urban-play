import { SolutionsSectionProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import Link from "next/link";
import { sectionAnimationConfig, titleVariants } from "@/lib/motion";
import { motion } from "motion/react";
import { Fragment } from "react";
import { Button } from "../ui/Button";

function SolutionsGridSection({
  sectionHeader,
  solutions,
}: SolutionsSectionProps) {
  return (
    <div className="wrapper">
      <SectionHeader {...sectionHeader} className="mb-fluid-lg" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-fluid-lg">
        {Array.isArray(solutions) &&
          solutions.length > 0 &&
          solutions.map((solution, i) => (
            <Fragment key={solution._id}>
              <motion.div
                {...sectionAnimationConfig}
                id={solution.slug?.slice(1)}
                className={twMerge(
                  i % 2 !== 0 && "lg:col-start-2",
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
                <div className="flex flex-col justify-center gap-8">
                  <div className="prose">
                    <h3 className="text-3xl uppercase">{solution.title}</h3>
                    <motion.p
                      variants={titleVariants()}
                      className="max-w-p text-balance"
                    >
                      {solution.description}
                    </motion.p>
                  </div>
                  {solution.slug && (
                    <Link
                      href={`/projects?tags=${solution.slug}`}
                      className="link"
                    >
                      <Button variant="default">View Projects</Button>
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
