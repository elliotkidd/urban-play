import { SectionHeaderProps } from "@/lib/sanity/queries/sections";
import { SanityButtons } from "./sanity-buttons";
import { twMerge } from "tailwind-merge";

export default function SectionHeader({
  title,
  buttons,
  className,
}: SectionHeaderProps & { className?: string }) {
  return (
    <div
      className={twMerge(
        "flex flex-col w-full lg:flex-row lg:justify-between items-start prose gap-fluid-sm",
        className,
      )}
    >
      {title && (
        <h2
          className="text-balance mb-0"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {buttons && (
        <SanityButtons
          buttons={buttons}
          buttonSize="default"
          className="flex items-center gap-2"
        />
      )}
    </div>
  );
}
