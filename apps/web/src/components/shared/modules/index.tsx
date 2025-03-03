import { type FC } from "react";
import React from "react";

import Accordion from "./Accordion";
import CallToAction from "./CallToAction";
import Contact from "./Contact";
import HomeHero from "./HomeHero";
import LatestPosts from "./LatestPosts";
import LineBreak from "./LineBreak";
import MarqueeLogos from "./MarqueeLogos";
import PageTitle from "./PageTitle";
import Paragraph from "./Paragraph";
import RichTextModule from "./RichTextModule";
import SectionHeader from "./SectionHeader";
import Team from "./Team";
import Testimonials from "./Testimonials";
import TextAndMedia from "./TextAndMedia";
import Values from "./Values";
import VerticalProcess from "./VerticalProcess";

// Update component mapping to use any to bypass strict typing
// We're already checking _type at runtime, so this is safe
const Components: Record<string, FC<any>> = {
  homeHero: HomeHero,
  pageTitle: PageTitle,
  callToAction: CallToAction,
  textAndMedia: TextAndMedia,
  richTextModule: RichTextModule,
  latestPosts: LatestPosts,
  team: Team,
  testimonials: Testimonials,
  paragraph: Paragraph,
  contact: Contact,
  lineBreak: LineBreak,
  marqueeLogos: MarqueeLogos,
  values: Values,
  sectionHeader: SectionHeader,
  verticalProcess: VerticalProcess,
  accordion: Accordion,
};

export default function Modules({ modules }: any) {
  return modules.map((module, index: number) => {
    const Component = Components[module._type];

    if (Component) {
      return <Component index={index} key={module._key} {...module} />;
    }

    // Extracted error component for better readability
    return (
      <MissingComponentError key={module._key} componentType={module._type} />
    );
  });
}

// Separate error component
function MissingComponentError({ componentType }: { componentType: string }) {
  return (
    <section className="py-fluid">
      <div className="wrapper">
        <div className="rounded border border-red-200 bg-red-50 p-12">
          <p className="text-center text-red-500">
            The component{" "}
            <code className="inline-block rounded bg-red-100 px-2 py-1 text-sm">
              {componentType}
            </code>{" "}
            has not been created yet.
          </p>
        </div>
      </div>
    </section>
  );
}
