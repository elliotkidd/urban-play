import { ProcessProps } from "@/lib/sanity/queries/sections";
import { twMerge } from "tailwind-merge";
import SectionHeader from "../section-header";
import SanityImage from "../sanity-image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ChevronLeftIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Process({
  steps,
  smallWrapper,
  sectionHeader,
  showIndex,
}: ProcessProps) {
  const splideRef = useRef<Splide>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(currentIndex);
    splideRef.current?.go(currentIndex);
  }, [currentIndex]);

  return (
    <div className={twMerge("wrapper", smallWrapper && "wrapper--small")}>
      <SectionHeader {...sectionHeader} />
      <div className="flex justify-end gap-2 mb-fluid-xs">
        <button
          className="w-10 h-10 rounded-full border flex justify-center items-center border-text/20"
          disabled={currentIndex === 0}
          onClick={() => {
            setCurrentIndex(currentIndex - 1);
          }}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          className="w-10 h-10 rounded-full border flex justify-center items-center border-text/20"
          disabled={currentIndex === steps.length - 1}
          onClick={() => {
            setCurrentIndex(currentIndex + 1);
          }}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <Splide
        hasTrack
        options={{
          perPage: 2,
          perMove: 1,
          gap: "var(--space-xs)",
          arrows: false,
          pagination: false,
        }}
        onMounted={(splide) => {
          splideRef.current = splide;
        }}
      >
        {steps.map((step, i) => (
          <SplideSlide
            key={step._key}
            className="bg-nav-bar-background/20 p-4 rounded-lg flex gap-4"
            style={{ height: "437px" }}
          >
            <div className="relative aspect-portrait rounded-lg overflow-hidden flex-none">
              <SanityImage
                src={step.image}
                className="w-full h-full absolute inset-0 object-cover"
              />
            </div>
            <div className="text-sm flex-1 flex flex-col h-full justify-between max-w-lg space-y-fluid">
              <h3 className="text-lg font-bold">
                {showIndex && (
                  <span className="opacity-30 mr-1">
                    {i > 9 ? i + 1 : `0${i + 1}`}
                  </span>
                )}
                {step.heading}
              </h3>
              <div className="text-sm">{step.description}</div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
export default Process;
