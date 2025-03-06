"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { createDataAttribute } from "next-sanity";
import { type ComponentType, type FC } from "react";

import { dataset, projectId, studioUrl } from "@/lib/sanity/api";

import { CTABlock } from "./sections/cta";
import { FaqAccordion } from "./sections/faq-accordion";
import { HeroBlock } from "./sections/hero";
import { ImageLinkCards } from "./sections/image-link-cards";
import ParagraphSection from "./sections/paragraph";
import { ColorSchemeFragment } from "@/lib/sanity/queries/sections";
import SolutionsCarouselSection from "./sections/solutions-carousel";
import FeaturedProjectsSection from "./sections/featured-projects";
import IconMarqueeSection from "./sections/icon-marquee";
import { twMerge } from "tailwind-merge";
import TestimoniesSection from "./sections/testimonies";
import FeaturedPostsSection from "./sections/featured-posts";

const BLOCK_COMPONENTS: Record<string, FC<any>> = {
  cta: CTABlock,
  faqAccordion: FaqAccordion,
  hero: HeroBlock,
  imageLinkCards: ImageLinkCards,
  paragraph: ParagraphSection,
  solutionsCarousel: SolutionsCarouselSection,
  featuredProjects: FeaturedProjectsSection,
  iconMarquee: IconMarqueeSection,
  testimonies: TestimoniesSection,
  featuredPosts: FeaturedPostsSection,
} as const;

const getColorSchemeStyle = (colorScheme: ColorSchemeFragment | null) => {
  if (!colorScheme) return {};

  if (
    !colorScheme?.background?.rgb ||
    !colorScheme?.text?.rgb ||
    !colorScheme?.primaryButton?.rgb ||
    !colorScheme?.secondaryButton?.rgb ||
    !colorScheme?.navBarBackground?.rgb ||
    !colorScheme?.navBarText?.rgb
  )
    return {};

  return {
    "--colour-background": `${colorScheme.background.rgb.r}, ${colorScheme.background.rgb.g}, ${colorScheme.background.rgb.b}`,
    "--colour-text": `${colorScheme.text.rgb.r}, ${colorScheme.text.rgb.g}, ${colorScheme.text.rgb.b}`,
    "--colour-primary-button": `${colorScheme.primaryButton.rgb.r}, ${colorScheme.primaryButton.rgb.g}, ${colorScheme.primaryButton.rgb.b}`,
    "--colour-secondary-button": `${colorScheme.secondaryButton.rgb.r}, ${colorScheme.secondaryButton.rgb.g}, ${colorScheme.secondaryButton.rgb.b}`,
    "--colour-nav-bar-background": `${colorScheme.navBarBackground.rgb.r}, ${colorScheme.navBarBackground.rgb.g}, ${colorScheme.navBarBackground.rgb.b}`,
    "--colour-nav-bar-text": `${colorScheme.navBarText.rgb.r}, ${colorScheme.navBarText.rgb.g}, ${colorScheme.navBarText.rgb.b}`,
  } as React.CSSProperties;
};

type BlockType = keyof typeof BLOCK_COMPONENTS;

export function PageBuilder({
  pageBuilder: initialPageBuilder = [],
  id,
  type,
}: {
  pageBuilder: any[];
  id: string;
  type: string;
}) {
  const pageBuilder = useOptimistic<any>(
    initialPageBuilder,
    (currentPageBuilder, action) => {
      if (action.id === id && action.document.pageBuilder) {
        return action.document.pageBuilder;
      }

      return currentPageBuilder;
    },
  );

  return (
    <main
      className="mx-auto bg-background"
      // data-sanity={createDataAttribute({
      //   id: id,
      //   baseUrl: studioUrl,
      //   projectId: projectId,
      //   dataset: dataset,
      //   type: type,
      //   path: "pageBuilder",
      // }).toString()}
    >
      {pageBuilder.map((block: any) => {
        const Component = BLOCK_COMPONENTS[
          block._type
        ] as ComponentType<BlockType>;

        if (!Component) {
          return (
            <div
              key={`${block._type}-${block._key}`}
              className="flex items-center justify-center p-8 text-center text-red-700 bg-red-500/10 rounded-lg"
            >
              Component not found for block type: <code>{block._type}</code>
            </div>
          );
        }

        return (
          <section
            key={`${block._type}-${block._key}`}
            id={`${block._type}-${block._key}`}
            style={getColorSchemeStyle(block.colorScheme)}
            className={twMerge(
              "relative bg-background text-text overflow-hidden",
              !block.removeMarginTop && "mt-fluid",
              !block.removeMarginBottom && "mb-fluid",
              block._type === "cta" && "h-screen",
            )}
          >
            <Component {...block} />
          </section>
        );
      })}
    </main>
  );
}
