import { Video } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { VideoSectionProps } from "@/lib/sanity/queries/sections";
import { useScroll, motion, useTransform } from "motion/react";
import { useRef } from "react";

export default function VideoSection({
  video,
  contain,
  smallWrapper,
}: {
  video: string | null;
  contain: boolean;
  smallWrapper: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "0.9 end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div
      ref={ref}
      className={twMerge(
        "relative",
        smallWrapper && "wrapper--small",
        contain && "wrapper",
      )}
    >
      {video && (
        <motion.video
          style={{ scale }}
          src={video}
          autoPlay
          muted
          loop
          controls
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
