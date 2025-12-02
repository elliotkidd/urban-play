import {
  AccordionBlockProps,
  ImageBlockProps,
  RichTextContentProps,
  TextBetweenBlockProps,
  TwoColumnContentProps,
} from "@/lib/sanity/queries/sections";

import SanityImage from "../sanity-image";
import { RichText } from "../richtext";
import { ComponentType, FC, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { sectionAnimationConfig } from "@/lib/motion";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
    <div className="">
      {title && <RichText richText={title} className="accordion-title" />}
      <Accordion
        type="single"
        collapsible
        className={cn(
          "lg:w-full bg-[#F3F3F3] rounded-lg overflow-hidden -mx-fluid-xs w-screen lg:mx-0",
          title && "mt-fluid-sm",
        )}
        style={{ maxWidth: "577px" }}
      >
        {items?.map((item, index) => {
          return (
            <Fragment key={`AccordionItem-${item._key}-${index}`}>
              <AccordionItem value={item._key}>
                <AccordionTrigger className="">{item.heading}</AccordionTrigger>
                <AccordionContent className="">
                  {item.content && (
                    <RichText
                      richText={item.content}
                      className="prose-white mt-4 lg:mt-fluid-lg"
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
              {index !== items.length - 1 && (
                <div className="px-4 lg:hidden opacity-10">
                  <div className="h-px bg-text w-full" />
                </div>
              )}
            </Fragment>
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
        "relative overflow-hidden rounded-lg",
        aspectRatio === "portrait" && "aspect-portrait",
        aspectRatio === "landscape" && "aspect-landscape",
        aspectRatio === "square" && "aspect-square",
        className,
      )}
    >
      <SanityImage
        src={image}
        className="object-cover absolute inset-0 h-full w-full"
        sizes="(max-width: 768px) 100vw, 50vw"
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
  gap,
}: TwoColumnContentProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={cn(
        "wrapper grid gap-fluid",
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
      )}
    >
      <div
        className={twMerge(
          `space-y-fluid-sm`,
          columnRatio === "7525" && "lg:col-span-2",
        )}
      >
        {left &&
          left.map((block) => {
            const Component = BLOCK_COMPONENTS[
              block._type
            ] as ComponentType<any>;

            if (!Component) return <MissingBlock block={block} />;

            return <Component key={block._key} {...block} />;
          })}
      </div>
      <div
        className={twMerge(
          `space-y-fluid-sm`,
          columnRatio === "2575" && "lg:col-span-2",
        )}
      >
        {right &&
          right.map((block) => {
            const Component = BLOCK_COMPONENTS[
              block._type
            ] as ComponentType<any>;

            if (!Component) return <MissingBlock block={block} />;

            return <Component key={block._key} {...block} />;
          })}
      </div>
    </motion.div>
  );
}
