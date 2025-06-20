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

export function FAQsAccordion({
  title,
  faqs,
  smallWrapper,
}: FAQAccordionProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-sm",
        smallWrapper && "wrapper--small",
      )}
    >
      <div className="flex justify-between prose mb-fluid-sm">
        <h2 className="h2">{title}</h2>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-[#F3F3F3] rounded-lg overflow-hidden"
      >
        {faqs?.map((faq, index: number) => {
          return (
            <AccordionItem
              value={faq._id}
              key={`AccordionItem-${faq._id}-${index}`}
              className={twMerge(
                "accordion-item transition-colors duration-500 hover:text-white data-[state=open]:text-white hover:bg-bottle-green data-[state=open]:bg-bottle-green",
              )}
            >
              <AccordionTrigger className="text-[15px] leading-none hover:no-underline group">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="">
                {faq.answer && (
                  <RichText
                    richText={faq.answer}
                    className="prose-white mt-fluid max-w-2xl"
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
}
