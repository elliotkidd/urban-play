import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { CTAProps } from "@/lib/sanity/queries/sections";
import SanityImage from "../sanity-image";

export function CTABlock({ richText, title, buttons, image }: CTAProps) {
  return (
    <>
      <SanityImage
        src={image}
        className="h-screen w-full object-cover absolute inset-0"
        alt={title}
        width={1440}
        height={1024}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="wrapper pointer-events-none absolute grid lg:grid-cols-2 gap-fluid-sm prose py-fluid-sm">
        <h2 className="max-w-p mb-0">{title}</h2>
        <div className="">
          <RichText
            richText={richText}
            className="text-balance max-w-p-lg mb-fluid"
          />
          <SanityButtons
            buttons={buttons}
            buttonClassName="w-full sm:w-auto"
            className="w-full sm:w-fit grid gap-2 sm:grid-flow-col lg:justify-start mb-8 pointer-events-auto not-prose"
          />
        </div>
      </div>
    </>
  );
}
