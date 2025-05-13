import { PageHeaderProps } from "@/lib/sanity/queries/sections";
import { RichText } from "../richtext";
import SanityImage from "../sanity-image";

export default function PageHeader({
  title,
  richText,
  image,
}: PageHeaderProps) {
  return (
    <>
      {image && (
        <SanityImage
          src={image}
          className="h-screen w-full object-cover absolute inset-0"
          alt={title}
        />
      )}
      <div className="absolute inset-0 bg-black/20" />
      <div className="wrapper grid lg:grid-cols-2 gap-fluid-sm relative z-[1] prose">
        <h2 className="">{title}</h2>
        <RichText richText={richText} />
      </div>
    </>
  );
}
