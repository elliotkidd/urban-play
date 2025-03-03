"use client";

import { TypeFromSelection } from "groqd";

import { CONTACT_FRAGMENT } from "@/sanity/lib/queries/sections";

import SanityImage from "../SanityImage";
import SanityLink from "../navigation/SanityLink";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof CONTACT_FRAGMENT>;

export default function Contact({ blocks, settings }: Props) {
  return (
    <ModuleWrapper settings={settings}>
      <div className="wrapper grid gap-fluid-sm justify-items-center lg:grid-cols-3">
        {blocks.map(({ _key, heading, image, link }) => (
          <SanityLink
            link={link}
            key={_key}
            className="group relative border border-accent items-center p-fluid-xs flex w-full gap-fluid-xs justify-center lg:justify-start hover:bg-accent/5 transition-all duration-500"
          >
            {image && (
              <SanityImage
                src={image}
                className="flex-none w-16 h-16 mb-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6"
              />
            )}
            <h3
              className="text-lg text-contrast lg:text-xl group-hover:text-accent transition-all duration-500"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </SanityLink>
        ))}
      </div>
    </ModuleWrapper>
  );
}
