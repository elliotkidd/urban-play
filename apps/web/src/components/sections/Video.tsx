import { Play } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { VideoSectionProps } from "@/lib/sanity/queries/sections";
import { useScroll, motion, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import SanityImage from "../sanity-image";
import ReactPlayer from "react-player";
import SectionHeader from "../section-header";
import { VimeoVideo } from "../VimeoVideo";
import { extractVimeoId } from "@/utils/utils";

export default function VideoSection({
  video,
  videoURL,
  sectionHeader,
  vimeo,
  image,
  contain,
  smallWrapper,
}: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "0.9 end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  if (!image && (!video || !videoURL) && !vimeo) return null;

  console.log(videoURL);

  return (
    <div
      ref={ref}
      className={twMerge(
        "relative",
        smallWrapper && "wrapper--small",
        contain && "wrapper",
      )}
    >
      <SectionHeader {...sectionHeader} />
      <motion.div
        style={{ scale }}
        className="aspect-video relative inset-0 w-full h-full overflow-hidden rounded-lg"
      >
        {/* Handle Vimeo videos - no play button or image cover */}
        {vimeo?.type === "page" && (
          <VimeoVideo videoId={extractVimeoId(vimeo.url) || ""} />
        )}
        {vimeo?.type === "asset" && vimeo.url && (
          <video
            src={vimeo.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Handle regular videos with play button and image cover */}
        {!vimeo && (
          <>
            <AnimatePresence>
              {image && !isPlaying && (
                <motion.button
                  className="absolute inset-0 w-full h-full z-10 flex items-center justify-center"
                  onClick={() => {
                    setIsPlaying(true);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <SanityImage
                    src={image}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="relative bg-background w-12 h-12 rounded-full flex items-center justify-center z-1">
                    <Play
                      fill="currentColor"
                      className="w-6 h-6 object-cover"
                    />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
            {(videoURL || video) && (
              <ReactPlayer
                src={videoURL || video || ""}
                width="100%"
                height="100%"
                controls
                playing={isPlaying}
                onPause={() => {
                  setIsPlaying(false);
                }}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
