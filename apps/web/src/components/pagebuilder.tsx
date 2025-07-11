"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { createDataAttribute } from "next-sanity";
import { type ComponentType, type FC } from "react";

import { dataset, projectId, studioUrl } from "@/lib/sanity/api";

import { CTABlock } from "./sections/cta";
import { AwardsSection } from "./sections/awards";
import { HeroBlock } from "./sections/hero";
import { ImageLinkCards } from "./sections/image-link-cards";
import ParagraphSection from "./sections/paragraph";
import FeaturedProjectsSection from "./sections/featured-projects";
import IconMarqueeSection from "./sections/icon-marquee";
import TestimoniesSection from "./sections/testimonies";
import FeaturedPostsSection from "./sections/featured-posts";
import { ImageBannerSection } from "./sections/image-banner";
import Team from "./sections/team";
import TwoColumnContentSection from "./sections/two-column-content";
import ImageMarqueeSection from "./sections/image-marquee";
import Process from "./sections/process";
import SolutionsGridSection from "./sections/solutions-grid";
import VerticalProcess from "./sections/VerticalProcess";
import { FAQsAccordion } from "./sections/FaqsAccordion";
import Quote from "./sections/Quote";
import SectionWrapper from "./sections/SectionWrapper";
import SocialMedia from "./sections/SocialMedia";
import Contact from "./sections/Contact";
import VideoSection from "./sections/Video";
import PageHeader from "./sections/PageHeader";
import PartnersRollover from "./sections/PartnersRollover";
import HotspotImageCarousel from "./sections/HotspotImageCarousel";
import Grid from "./sections/Grid";

const SECTION_COMPONENTS: Record<string, FC<any>> = {
  cta: CTABlock,
  awardsAccordion: AwardsSection,
  hero: HeroBlock,
  imageLinkCards: ImageLinkCards,
  paragraph: ParagraphSection,
  featuredProjects: FeaturedProjectsSection,
  iconMarquee: IconMarqueeSection,
  testimonies: TestimoniesSection,
  featuredPosts: FeaturedPostsSection,
  imageBanner: ImageBannerSection,
  team: Team,
  twoColumnContent: TwoColumnContentSection,
  imageMarquee: ImageMarqueeSection,
  process: Process,
  solutionsGrid: SolutionsGridSection,
  verticalProcess: VerticalProcess,
  faqsAccordion: FAQsAccordion,
  quote: Quote,
  socialMedia: SocialMedia,
  contact: Contact,
  video: VideoSection,
  pageHeader: PageHeader,
  partnersRollover: PartnersRollover,
  hotspotImageCarousel: HotspotImageCarousel,
  grid: Grid,
} as const;

type SectionType = keyof typeof SECTION_COMPONENTS;

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
      data-sanity={createDataAttribute({
        id: id,
        baseUrl: studioUrl,
        projectId: projectId,
        dataset: dataset,
        type: type,
        path: "pageBuilder",
      }).toString()}
    >
      {pageBuilder.map((block: any) => {
        const Component = SECTION_COMPONENTS[
          block._type
        ] as ComponentType<SectionType>;

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
          <SectionWrapper
            key={`${block._type}-${block._key}`}
            type={block._type}
            _key={block._key}
            removeMarginTop={block.removeMarginTop}
            removeMarginBottom={block.removeMarginBottom}
            colorScheme={block.colorScheme}
            hideOn={block.hideOn}
            dataSanity={createDataAttribute({
              id: id,
              baseUrl: studioUrl,
              projectId: projectId,
              dataset: dataset,
              type: type,
              path: `pageBuilder[_key=="${block._key}"]`,
            }).toString()}
          >
            <Component {...block} />
          </SectionWrapper>
        );
      })}
    </main>
  );
}
