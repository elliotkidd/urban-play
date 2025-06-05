import {
  AccordionBlockProps,
  ImageBlockProps,
  RichTextContentProps,
  TextBetweenBlockProps,
  TwoColumnContentProps,
} from "@/lib/sanity/queries/sections";

import SanityImage from "../sanity-image";
import { RichText } from "../richtext";
import { ComponentType, FC } from "react";
import { twMerge } from "tailwind-merge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { accordionColors } from "@/utils/utils";
import { sectionAnimationConfig } from "@/lib/motion";
import { motion } from "motion/react";

function MissingBlock({
  block,
  className,
}: {
  block: any;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "bg-red-500/20 text-red-500 p-4 rounded-lg",
        className,
      )}
    >
      Error! Block type: {block._type} not found
    </div>
  );
}

function AccordionBlock({ title, items }: AccordionBlockProps) {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <RichText richText={title} />
      <Accordion
        type="single"
        collapsible
        className="w-full bg-[#F3F3F3] rounded-lg overflow-hidden"
        style={{ maxWidth: "577px" }}
      >
        {items?.map((item, index) => {
          return (
            <AccordionItem
              value={item._key}
              key={`AccordionItem-${item._key}-${index}`}
              className={twMerge(
                "p-3 accordion-item transition-colors duration-500 hover:text-white data-[state=open]:text-white hover:bg-text data-[state=open]:bg-text",
                // accordionColors[index % accordionColors.length].hover,
                // accordionColors[index % accordionColors.length].open,
              )}
            >
              <AccordionTrigger className="py-2 text-lg leading-none no-underline group font-bold h3">
                {item.heading}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                {item.content && (
                  <RichText
                    richText={item.content}
                    className="prose-white mt-4 lg:mt-fluid-lg"
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

function ImageBlock({
  image,
  aspectRatio,
  className,
}: ImageBlockProps & { className?: string }) {
  return (
    <div
      className={twMerge(
        "relative overflow-hidden rounded-lg mb-4",
        aspectRatio === "portrait" && "aspect-portrait",
        aspectRatio === "landscape" && "aspect-landscape",
        aspectRatio === "square" && "aspect-square",
        className,
      )}
    >
      <SanityImage
        src={image}
        className="object-cover absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function RichTextBlock({
  richText,
  className,
}: RichTextContentProps & { className?: string }) {
  return (
    <RichText
      richText={richText}
      className={twMerge("prose-headings:scroll-m-24 max-w-p", className)}
    />
  );
}

function TextBetweenBlock({ title, text }: TextBetweenBlockProps) {
  return (
    <div className="prose flex flex-col gap-4 justify-between py-fluid">
      <div className="flex-1 relative">
        <RichText richText={title} className="sticky top-24" />
      </div>
      <RichText richText={text} />
    </div>
  );
}

const BLOCK_COMPONENTS: Record<string, FC<any>> = {
  imageBlock: ImageBlock,
  richTextBlock: RichTextBlock,
  accordion: AccordionBlock,
  textBetweenBlock: TextBetweenBlock,
};

export default function TwoColumnContentSection({
  left,
  right,
  smallWrapper,
  columnRatio,
  alignCentre,
  padding,
  gap,
}: TwoColumnContentProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper grid gap-fluid-xs",
        gap === "xs" && "gap-fluid-xs",
        gap === "sm" && "gap-fluid-sm",
        gap === "md" && "gap-fluid-md",
        gap === "lg" && "gap-fluid-lg",
        gap === "xl" && "gap-fluid-xl",
        smallWrapper && "wrapper--small",
        columnRatio === "5050" && "grid-cols-1 lg:grid-cols-2",
        (columnRatio === "2575" || columnRatio === "7525") &&
          "grid-cols-1 lg:grid-cols-3",
        alignCentre && "items-center",
        padding === "md" && "py-fluid-md",
        padding === "lg" && "py-fluid-lg",
        padding !== "md" && padding !== "lg" && "py-fluid-xs",
      )}
    >
      {left &&
        left.map((block) => {
          const Component = BLOCK_COMPONENTS[block._type] as ComponentType<any>;

          if (!Component)
            return (
              <MissingBlock
                block={block}
                className={twMerge(columnRatio === "7525" && "lg:col-span-2")}
              />
            );

          return (
            <Component
              key={block._key}
              {...block}
              className={twMerge(columnRatio === "7525" && "lg:col-span-2")}
            />
          );
        })}
      {right &&
        right.map((block) => {
          const Component = BLOCK_COMPONENTS[block._type] as ComponentType<any>;

          if (!Component)
            return (
              <MissingBlock
                block={block}
                className={twMerge(columnRatio === "2575" && "lg:col-span-2")}
              />
            );

          return (
            <Component
              key={block._key}
              {...block}
              className={twMerge(columnRatio === "2575" && "lg:col-span-2")}
            />
          );
        })}
    </motion.div>
  );
}
