"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { createDataAttribute } from "next-sanity";
import dynamic from "next/dynamic";
import { type ComponentType } from "react";

import { dataset, projectId, studioUrl } from "@/lib/sanity/api";

import { HeroBlock } from "./sections/hero";
import SectionWrapper from "./sections/SectionWrapper";
import PageHeader from "./sections/PageHeader";

// Hero and PageHeader open almost every page, so they stay in the main bundle.
// Every other section is its own chunk and only downloads on pages that use it
// (Swiper, the forms and reCAPTCHA, video players etc. are heavy).
const SECTION_COMPONENTS: Record<string, ComponentType<any>> = {
  cta: dynamic(() => import("./sections/cta").then((m) => m.CTABlock)),
  divider: dynamic(() => import("./sections/Divider").then((m) => m.Divider)),
  awardsAccordion: dynamic(() =>
    import("./sections/awards").then((m) => m.AwardsSection),
  ),
  hero: HeroBlock,
  imageLinkCards: dynamic(() =>
    import("./sections/image-link-cards").then((m) => m.ImageLinkCards),
  ),
  paragraph: dynamic(() => import("./sections/paragraph")),
  featuredProjects: dynamic(() => import("./sections/featured-projects")),
  iconMarquee: dynamic(() => import("./sections/icon-marquee")),
  testimonies: dynamic(() => import("./sections/testimonies")),
  featuredPosts: dynamic(() => import("./sections/featured-posts")),
  imageBanner: dynamic(() =>
    import("./sections/image-banner").then((m) => m.ImageBannerSection),
  ),
  team: dynamic(() => import("./sections/team")),
  twoColumnContent: dynamic(() => import("./sections/two-column-content")),
  imageMarquee: dynamic(() => import("./sections/image-marquee")),
  process: dynamic(() => import("./sections/process")),
  solutionsGrid: dynamic(() => import("./sections/solutions-grid")),
  verticalProcess: dynamic(() => import("./sections/VerticalProcess")),
  faqsAccordion: dynamic(() =>
    import("./sections/FaqsAccordion").then((m) => m.FAQsAccordion),
  ),
  quote: dynamic(() => import("./sections/Quote")),
  socialMedia: dynamic(() => import("./sections/SocialMedia")),
  contact: dynamic(() => import("./sections/Contact")),
  video: dynamic(() => import("./sections/Video")),
  pageHeader: PageHeader,
  partnersRollover: dynamic(() => import("./sections/PartnersRollover")),
  hotspotImageCarousel: dynamic(
    () => import("./sections/HotspotImageCarousel"),
  ),
  grid: dynamic(() => import("./sections/Grid")),
};

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
            {...block}
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
