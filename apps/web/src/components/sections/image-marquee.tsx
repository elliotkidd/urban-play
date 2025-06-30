import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import SectionHeader from "../section-header";
import { ImageMarqueeProps } from "@/lib/sanity/queries/sections";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
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
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        loop={true}
        style={{ overflow: "visible" }}
        className="h-[200px] lg:h-[468px]"
      >
        {images &&
          images.length > 0 &&
          images.map((image, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{
                  width: "auto",
                  aspectRatio: image.aspectRatio,
                }}
                className="rounded-lg overflow-hidden"
              >
                <SanityImage src={image} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </motion.div>
  );
}
