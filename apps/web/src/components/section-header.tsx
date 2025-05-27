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
        "flex flex-col w-full lg:flex-row lg:justify-between items-start prose gap-fluid-xs",
        className,
      )}
    >
      {title && <h2 className="max-w-section-heading text-balance">{title}</h2>}
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
