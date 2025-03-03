import { TypeFromSelection } from "groqd";
import React from "react";
import { twMerge } from "tailwind-merge";

import { RICH_TEXT_MODULE_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof RICH_TEXT_MODULE_FRAGMENT>;

export default function RichTextModule({
  settings,
  richText,
  centerText,
}: Props) {
  return (
    <ModuleWrapper settings={settings}>
      <div className="wrapper">
        <div
          className={twMerge("mx-auto max-w-4xl", centerText && "text-center")}
        >
          <RichText value={richText} />
        </div>
      </div>
    </ModuleWrapper>
  );
}
