import { RichText } from "../richtext";
import { AwardsAccordionProps } from "@/lib/sanity/queries/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { twMerge } from "tailwind-merge";
import { accordionColors } from "@/utils/utils";

export function AwardsAccordion({
  title,
  awards,
  smallWrapper,
}: AwardsAccordionProps) {
  const years = [...new Set(awards?.map((award) => award.year))];
  return (
    <div
      className={twMerge(
        "wrapper py-fluid-sm",
        smallWrapper && "wrapper--small",
      )}
    >
      <div className="flex justify-between prose mb-fluid-sm">
        <h2 className="">{title}</h2>
        {awards && awards.length > 0 && (
          <ul className="flex gap-8 list-none mr-8">
            <li className="leading-none">
              <span className="block opacity-40">Total Awards</span>
              <span className="block ">{awards.length} Awards Across</span>
            </li>
            <li className="leading-none">
              <span className="block opacity-40">Categories</span>
              <span className="block ">12</span>
            </li>
          </ul>
        )}
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-[#F3F3F3] rounded-lg overflow-hidden"
      >
        {years?.map((year: string, index: number) => {
          return (
            <AccordionItem
              value={year}
              key={`AccordionItem-${year}-${index}`}
              className={twMerge(
                "p-3 accordion-item transition-colors duration-500 hover:text-white data-[state=open]:text-white",
                accordionColors[index % accordionColors.length].hover,
                accordionColors[index % accordionColors.length].open,
              )}
            >
              <AccordionTrigger className="py-2 text-[15px] leading-none hover:no-underline group">
                {year}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <ul className="space-y-fluid-sm mt-fluid-sm">
                  {awards
                    ?.filter((award) => award.year === year)
                    .map((award) => (
                      <li key={award._id} className="lg:flex justify-between">
                        <h3 className="text-lg max-w-p">{award.title}</h3>
                        <p>{award.awardType}</p>
                      </li>
                    ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
