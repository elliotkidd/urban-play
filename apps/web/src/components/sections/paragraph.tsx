import { twMerge } from "tailwind-merge";
import { RichText } from "../richtext";
import SectionHeader from "../section-header";
import { ParagraphProps } from "@/lib/sanity/queries/sections";

export default function ParagraphSection({
  richText,
  sectionHeader,
  annotations,
  smallWrapper,
}: ParagraphProps) {
  return (
    <div
      className={twMerge(
        "wrapper py-fluid-xs min-h-p-section",
        smallWrapper && "wrapper--small",
        sectionHeader &&
          richText &&
          annotations &&
          "flex flex-col justify-between",
      )}
    >
      {sectionHeader && <SectionHeader {...sectionHeader} />}
      {sectionHeader && annotations && (
        <ul className="flex gap-4 my-8">
          {annotations.map(({ top, bottom, _key }) => (
            <li key={_key} className="leading-none">
              <span className="block">{top}</span>
              <span className="block opacity-40">{bottom}</span>
            </li>
          ))}
        </ul>
      )}
      {sectionHeader && richText && (
        <RichText richText={richText} className="max-w-p-lg" />
      )}
      {!sectionHeader && (
        <div className="flex flex-col lg:flex-row gap-fluid-sm w-full justify-between items-start">
          <RichText richText={richText} className="max-w-p-lg" />
          {annotations && (
            <ul className="space-y-fluid-sm min-w-[360px]">
              {annotations.map(({ top, bottom, _key }) => (
                <li key={_key} className="leading-none">
                  <span className="block">{top}</span>
                  <span className="block opacity-40">{bottom}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
