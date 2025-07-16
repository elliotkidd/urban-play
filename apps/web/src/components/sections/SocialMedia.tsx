import { SocialMediaProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import SanityImage from "../sanity-image";
import Link from "next/link";

function SocialMedia({ sectionHeader, images, linkedInUrl }: SocialMediaProps) {
  console.log(sectionHeader.buttons);
  return (
    <motion.div
      {...sectionAnimationConfig}
      className="wrapper pb-fluid space-y-fluid"
    >
      <SectionHeader {...sectionHeader} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.isArray(images) &&
          images.map((image, i) => (
            <Link
              key={`social-media-image-${i}`}
              href={linkedInUrl}
              target="_blank"
              className="aspect-portrait relative rounded-lg overflow-hidden"
            >
              <SanityImage
                src={image}
                className="object-cover inset-0 w-full h-full"
                sizes="(max-width: 768px) 100vw, 33vw"
                width={600}
                height={800}
              />
            </Link>
          ))}
      </div>
    </motion.div>
  );
}
export default SocialMedia;
