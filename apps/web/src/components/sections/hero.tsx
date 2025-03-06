import { RichText } from "../richtext";
import SanityImage from "../sanity-image";
import { HeroProps } from "@/lib/sanity/queries/sections";

export function HeroBlock({ title, image, richText }: HeroProps) {
  return (
    <div id="hero" className="h-screen relative">
      {image && (
        <SanityImage
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="wrapper py-fluid-xs h-full flex flex-col justify-end relative z-[1]">
        <RichText richText={richText} className="max-w-p prose-white" />
        <h2 className="jumbo w-full font-semibold">{title}</h2>
      </div>
    </div>
  );
}
