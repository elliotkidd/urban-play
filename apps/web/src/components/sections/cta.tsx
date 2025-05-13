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
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="wrapper pointer-events-none absolute grid lg:grid-cols-2 gap-fluid-sm prose py-fluid-sm">
        <h2 className="max-w-p">{title}</h2>
        <div className="text-lg text-muted-foreground">
          <RichText
            richText={richText}
            className="text-balance max-w-p-lg mb-fluid-lg"
          />
          <SanityButtons
            buttons={buttons}
            buttonClassName="w-full sm:w-auto"
            className="w-full sm:w-fit grid gap-2 sm:grid-flow-col lg:justify-start mb-8 pointer-events-auto"
          />
        </div>
      </div>
    </>
  );
}
