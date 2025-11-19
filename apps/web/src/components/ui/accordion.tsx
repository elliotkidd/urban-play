"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "accordion-item transition-colors duration-500 lg:hover:text-white lg:data-[state=open]:text-white lg:hover:bg-bottle-green lg:data-[state=open]:bg-bottle-green group",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "accordion-trigger group group/trigger flex gap-4 flex-1 p-4 justify-between transition-all text-left [&[data-state=open]>svg]:rotate-180 text-[18px] not-prose font-normal leading-none hover:no-underline group items-start lg:items-center",
        className,
      )}
      {...props}
    >
      <h3 className="mb-0 transition-colors duration-500 text-text">
        {children}
      </h3>
      <span className="relative flex-shrink-0 h-[14px] w-[14px] lg:h-[20px] lg:w-[20px]">
        <span
          className="absolute w-full h-0.5 bg-text transition-[background-color,transform] duration-500 top-1/2 -translate-x-1/2 rotate-180 group-data-[state=open]/trigger:rotate-0 lg:group-data-[state=open]/trigger:bg-white lg:group-hover:bg-white"
          style={{ transition: "background-color 0.5s, transform 0.5s" }}
        ></span>
        <span
          className="absolute w-full h-0.5 bg-text transition-[background-color,transform] duration-500 top-1/2 -translate-x-1/2 rotate-[270deg] group-data-[state=open]/trigger:rotate-0 lg:group-data-[state=open]/trigger:bg-white lg:group-hover:bg-white"
          style={{ transition: "background-color 0.5s, transform 0.5s" }}
        ></span>
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down  "
    style={{
      transition: "height 0.3s ease-in-out",
    }}
    {...props}
  >
    <div className={cn("px-4 pb-fluid-sm lg:pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
