import { SocialMediaProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import SanityImage from "../sanity-image";

function SocialMedia({ sectionHeader, images }: SocialMediaProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className="wrapper pb-fluid space-y-fluid"
    >
      <SectionHeader {...sectionHeader} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.isArray(images) &&
          images.map((image, i) => (
            <div
              key={`social-media-image-${i}`}
              className="aspect-portrait relative rounded-lg overflow-hidden"
            >
              <SanityImage
                src={image}
                className="object-cover inset-0 w-full h-full"
              />
            </div>
          ))}
      </div>
    </motion.div>
  );
}
export default SocialMedia;
