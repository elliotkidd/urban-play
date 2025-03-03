import { TypeFromSelection } from "groqd";

import { SECTION_HEADER_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof SECTION_HEADER_FRAGMENT> & {
  index: number;
};

export default function SectionHeader({
  title,
  leftText,
  rightText,
  settings,
  index,
}: Props) {
  return (
    <ModuleWrapper settings={settings} index={index}>
      <div className="wrapper">
        {title && (
          <span className="inline-block mb-4 text-sm uppercase font-medium relative text-accent">
            {title}
          </span>
        )}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {leftText && (
            <div className="max-w-[860px] lg:col-span-2 text-balance">
              <RichText value={leftText} />
            </div>
          )}
          {rightText && (
            <div className="">
              <RichText value={rightText} />
            </div>
          )}
        </div>
      </div>
    </ModuleWrapper>
  );
}
