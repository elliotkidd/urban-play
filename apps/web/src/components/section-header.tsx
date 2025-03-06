import { SectionHeaderProps } from "@/lib/sanity/queries/sections";
import { SanityButtons } from "./sanity-buttons";

export default function SectionHeader({ title, buttons }: SectionHeaderProps) {
  return (
    <div className="flex flex-col w-full lg:flex-row lg:justify-between items-start prose mb-12">
      {title && <h2 className="max-w-section-heading text-balance">{title}</h2>}
      {buttons && (
        <SanityButtons buttons={buttons} className="flex items-center gap-2" />
      )}
    </div>
  );
}
