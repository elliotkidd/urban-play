import { TeamProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import { motion } from "motion/react";
import {
  sectionAnimationConfig,
  childVars,
  opacityStaggerChildrenConfig,
} from "@/lib/motion";
import { ArrowDownRightIcon } from "lucide-react";

function Team({ title, teamMembers, smallWrapper }: TeamProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge("wrapper prose", smallWrapper && "wrapper--small")}
    >
      <h2 className="lg:hidden text-[11px] uppercase leading-[120%] font-body flex items-center gap-1">
        {title}
        <ArrowDownRightIcon className="w-4 h-4" />
      </h2>
      <motion.ul
        {...opacityStaggerChildrenConfig}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-fluid-md lg:gap-x-fluid-xs not-prose"
      >
        {teamMembers.map(
          ({ _id, image, name, position, yearsExperience }, i) => (
            <motion.li
              key={`team-member-${_id}-${i}`}
              variants={childVars}
              className={twMerge("font-bold")}
            >
              <div className="relative aspect-video rounded-lg lg:rounded-0 lg:aspect-portrait overflow-hidden mb-fluid-xs">
                <SanityImage
                  src={image}
                  className="object-cover absolute inset-0 h-full w-full lg:hidden"
                  width={400}
                  height={250}
                />
                <SanityImage
                  src={image}
                  className="object-cover absolute inset-0 h-full w-full hidden lg:block"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  width={600}
                  height={700}
                />
                {yearsExperience && (
                  <span className="absolute bg-nav-bar-background/20 backdrop-blur flex items-center justify-center text-white top-3 left-3 text-xs font-medium px-[15px] h-[30px] leading-none tracking-[0.005em] rounded-full lg:rounded-xl">
                    {yearsExperience} Years Industry Experience
                  </span>
                )}
              </div>
              <h3 className="no-underline text-[25px] lg:text-lg leading-[95%] lg:leading-[120%] text-white font-heading uppercase lg:!normal-case lg:font-body mb-[7px] lg:mb-0">
                {name}
              </h3>
              <p className=" font-normal lg:font-bold text-[11px] uppercase lg:normal-case lg:text-lg leading-[120%]">
                {position}
              </p>
            </motion.li>
          ),
        )}
      </motion.ul>
    </motion.div>
  );
}
export default Team;
