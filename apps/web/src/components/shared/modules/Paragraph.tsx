import { TypeFromSelection } from "groqd";

import { PARAGRAPH_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof PARAGRAPH_FRAGMENT>;

export default function RichTextModule({
  settings,
  leadParagraph,
  text,
  index,
}: Props) {
  return (
    <ModuleWrapper settings={settings} className="min-h-[50vh]">
      <div className="wrapper space-y-fluid-md">
        <div className="max-w-7xl">
          <p className="relative text-balance font-heading text-3xl uppercase">
            <span className="absolute left-0 top-0 text-lg">
              {index && `(${index < 10 ? "0" : ""}${index})`}
            </span>
            <span className="pl-16 md:pl-24 lg:pl-32">{leadParagraph}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="max-w-md md:col-start-2">
            <RichText value={text} />
          </div>
        </div>
      </div>
    </ModuleWrapper>
  );
}
