import { TeamProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";

function Team({ title, teamMembers, smallWrapper }: TeamProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid prose",
        smallWrapper && "wrapper--small",
      )}
    >
      <h2 className="h2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-8 not-prose">
        {teamMembers.map(
          ({ _id, _key, image, name, position, startingYear }, i) => (
            <div
              key={_id || _key}
              className={twMerge(
                "font-bold",
                i % 6 === 3 ? "lg:col-start-2" : "",
              )}
            >
              <div className="relative aspect-portrait overflow-hidden mb-4">
                <SanityImage
                  src={image}
                  className="object-cover absolute inset-0 h-full w-full"
                />
                {startingYear && (
                  <span className="absolute bg-nav-bar-background/20 backdrop-blur text-nav-bar-text top-3 left-3 text-xs font-bold p-4 rounded-xl">
                    Since {startingYear}
                  </span>
                )}
              </div>
              <h3 className="no-underline !normal-case">{name}</h3>
              <p className="text-sm text-gray-500">{position}</p>
            </div>
          ),
        )}
      </div>
    </motion.div>
  );
}
export default Team;
