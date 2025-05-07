import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import SectionHeader from "../section-header";
import { ImageMarqueeProps } from "@/lib/sanity/queries/sections";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

// Default theme
import "@splidejs/react-splide/css";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";

export default function ImageMarqueeSection({
  sectionHeader,
  images,
  smallWrapper,
}: ImageMarqueeProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-xs",
        smallWrapper && "wrapper--small",
      )}
    >
      {sectionHeader && <SectionHeader {...sectionHeader} />}
      <Splide
        options={{
          type: "loop",
          perPage: "auto",
          perMove: 1,
          gap: "1rem",
          drag: "free",
          autoScroll: {
            autoStart: true,
            speed: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
          fixedHeight: "468px",
          arrows: false,
          clones: 2,
        }}
        extensions={{ AutoScroll }}
        style={{ overflow: "visible" }}
      >
        {images &&
          images.length > 0 &&
          images.map((image, index) => {
            return (
              <SplideSlide
                key={index}
                style={{
                  width: "auto",
                  aspectRatio: image.aspectRatio,
                }}
                className="rounded-lg overflow-hidden"
              >
                <SanityImage src={image} />
              </SplideSlide>
            );
          })}
      </Splide>
    </motion.div>
  );
}
