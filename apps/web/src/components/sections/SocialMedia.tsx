import { SocialMediaProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";

function SocialMedia({ sectionHeader }: SocialMediaProps) {
  return (
    <motion.div {...sectionAnimationConfig} className="wrapper">
      <SectionHeader {...sectionHeader} />
      {/* TODO: Integrate social media */}
    </motion.div>
  );
}
export default SocialMedia;
