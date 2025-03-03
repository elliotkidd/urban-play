import { TypeFromSelection } from "groqd";
import React from "react";
import { twMerge } from "tailwind-merge";

import { TEXT_AND_MEDIA_FRAGMENT } from "@/sanity/lib/queries/sections";

import RichText from "../RichText";
import SanityImage from "../SanityImage";
import ButtonGroup from "../navigation/ButtonGroup";
import ModuleWrapper from "./ModuleWrapper";

type Props = TypeFromSelection<typeof TEXT_AND_MEDIA_FRAGMENT>;

export default function TextAndMedia({
  settings,
  richText,
  flipOrder,
  buttons,
  image,
}: Props) {
  return (
    <ModuleWrapper settings={settings}>
      <div
        className={twMerge(
          "wrapper grid grid-cols-1 items-center gap-10 md:grid-cols-9 md:gap-20",
        )}
      >
        <div
          className={twMerge(
            `md:col-span-5`,
            flipOrder == true ? "order-last" : null,
          )}
        >
          <div className="max-w-xl">
            {richText ? <RichText value={richText} /> : null}
          </div>
          {buttons && (
            <ButtonGroup
              className="mt-8 flex flex-wrap items-center gap-2"
              buttons={buttons}
            />
          )}
        </div>
        <div
          className={twMerge(
            "md:col-span-4 order-first",
            flipOrder == true ? null : "md:order-last",
          )}
        >
          <div className="relative aspect-square rounded">
            {image && (
              <SanityImage
                src={image}
                height={800}
                width={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute aspect-square inset-0 h-full w-full object-cover"
              />
            )}
            d
          </div>
        </div>
      </div>
    </ModuleWrapper>
  );
}
