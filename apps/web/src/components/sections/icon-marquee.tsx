import { twMerge } from "tailwind-merge";
import SanityImage from "../sanity-image";
import SectionHeader from "../section-header";
import { IconMarqueeProps } from "@/lib/sanity/queries/sections";
import Marquee from "react-fast-marquee";

export default function IconMarqueeSection({
  sectionHeader,
  icons,
}: IconMarqueeProps) {
  return (
    <div className="wrapper py-fluid-xs">
      {sectionHeader && <SectionHeader {...sectionHeader} />}
      <Marquee autoFill className="!overflow-visible">
        {icons &&
          icons.length > 0 &&
          icons.map((icon) => {
            return (
              <div className="mx-2 h-fluid-lg rounded aspect-landscape bg-nav-bar-background/20 flex items-center justify-center transition-all duration-500">
                <SanityImage
                  src={icon}
                  height={100}
                  className={twMerge(
                    "transition-all duration-500 h-fluid-sm w-auto",
                  )}
                />
              </div>
            );
          })}
      </Marquee>
    </div>
  );
}
