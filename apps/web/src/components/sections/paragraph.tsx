import { RichText } from "../richtext";
import SectionHeader from "../section-header";
import { ParagraphProps } from "@/lib/sanity/queries/sections";

export default function ParagraphSection({
  richText,
  sectionHeader,
  annotations,
}: ParagraphProps) {
  return (
    <div className="wrapper py-fluid-xs">
      {sectionHeader && <SectionHeader {...sectionHeader} />}
      {annotations && (
        <ul className="flex gap-4 my-8 lg:my-24">
          {annotations.map(
            (
              {
                top,
                bottom,
                _key,
              }: { top: string; bottom: string; _key: string },
              i: number,
            ) => (
              <li key={_key} className="leading-none">
                <span className="block">{top}</span>
                <span className="block opacity-40">{bottom}</span>
              </li>
            ),
          )}
        </ul>
      )}
      <RichText richText={richText} className="max-w-p-lg" />
    </div>
  );
}
