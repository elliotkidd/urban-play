import { RichText } from "../richtext";
import { FAQAccordionProps } from "@/lib/sanity/queries/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { Fragment } from "react";

export function FAQsAccordion({
  title,
  faqs,
  smallWrapper,
}: FAQAccordionProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge("wrapper", smallWrapper && "wrapper--small")}
    >
      <div className="flex justify-between prose mb-fluid-sm">
        <h2 className="h2">{title}</h2>
      </div>
      <Accordion
        type="single"
        collapsible
        className="lg:w-full bg-[#F3F3F3] rounded-lg overflow-hidden -mx-fluid-xs w-screen lg:mx-0"
      >
        {faqs?.map((faq, index: number) => {
          return (
            <Fragment key={`AccordionItem-${faq._id}-${index}`}>
              <AccordionItem value={faq._id}>
                <AccordionTrigger className="">{faq.title}</AccordionTrigger>
                <AccordionContent className="">
                  {faq.answer && (
                    <RichText
                      richText={faq.answer}
                      className="prose-white lg:mt-fluid-md max-w-2xl"
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
              {index !== faqs.length - 1 && (
                <div className="px-fluid-xs lg:hidden opacity-10">
                  <div className="h-px bg-text w-full" />
                </div>
              )}
            </Fragment>
          );
        })}
      </Accordion>
    </motion.div>
  );
}
