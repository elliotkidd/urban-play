import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";

function Quote({ quote, author: { name, position } }) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className="wrapper py-fluid-lg prose"
    >
      <p className="lead max-w-p-lg">{quote}</p>
      <p className="text-xs">
        {name} - <span className="opacity-50">{position}</span>
      </p>
    </motion.div>
  );
}
export default Quote;
