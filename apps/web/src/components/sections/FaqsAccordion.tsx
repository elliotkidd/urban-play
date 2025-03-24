import { RichText } from "../richtext";
import { FAQAccordionProps } from "@/lib/sanity/queries/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { twMerge } from "tailwind-merge";
import { accordionColors } from "@/utils/utils";

export function FAQsAccordion({
  title,
  faqs,
  smallWrapper,
}: FAQAccordionProps) {
  return (
    <div
      className={twMerge(
        "wrapper py-fluid-sm",
        smallWrapper && "wrapper--small",
      )}
    >
      <div className="flex justify-between prose mb-fluid-sm">
        <h2 className="">{title}</h2>
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
                "p-3 accordion-item transition-colors duration-500 hover:text-white data-[state=open]:text-white",
                accordionColors[index % accordionColors.length].hover,
                accordionColors[index % accordionColors.length].open,
              )}
            >
              <AccordionTrigger className="py-2 text-[15px] leading-none hover:no-underline group">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                {faq.answer && <RichText richText={faq.answer} />}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
