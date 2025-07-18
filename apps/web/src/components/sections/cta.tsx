import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { CTAProps } from "@/lib/sanity/queries/sections";
import SanityImage from "../sanity-image";
import { VimeoVideo } from "../VimeoVideo";
import { extractVimeoId } from "@/utils/utils";

export function CTABlock({
  richText,
  title,
  buttons,
  image,
  video,
  vimeoUrl,
  mediaType,
}: CTAProps) {
  return (
    <>
      {mediaType === "image" && image && (
        <SanityImage
          src={image}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {mediaType === "video" && vimeoUrl ? (
        <VimeoVideo videoId={extractVimeoId(vimeoUrl) || ""} />
      ) : (
        video && (
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      )}
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
