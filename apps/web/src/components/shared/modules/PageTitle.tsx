import { TypeFromSelection } from "groqd";

import { PAGE_TITLE_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import ButtonGroup from "../navigation/ButtonGroup";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof PAGE_TITLE_FRAGMENT>;

export default function PageTitle({
  richText,
  buttons,
  settings,
  index,
}: Props & { index: number }) {
  return (
    <ModuleWrapper settings={settings} index={index}>
      <div className="wrapper">
        <div className="text-center prose mx-auto">
          {richText ? <RichText value={richText} /> : null}
          {buttons ? (
            <ButtonGroup
              className="mt-8 flex flex-wrap items-center gap-2"
              buttons={buttons}
            />
          ) : null}
        </div>
      </div>
    </ModuleWrapper>
  );
}
