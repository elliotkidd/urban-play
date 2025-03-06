import { FeaturedProjectsProps } from "@/lib/sanity/queries/sections";
import SectionHeader from "../section-header";
import SanityImage from "../sanity-image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "../link";
import processUrl from "@/utils/processUrl";
import { TileType } from "@/lib/sanity/queries/fragments";
import ProjectTile from "../project-tile";

export default function FeaturedProjectsSection({
  sectionHeader,
  projects,
}: FeaturedProjectsProps) {
  return (
    <div className="wrapper py-fluid-xs space-y-fluid-lg overflow-hidden">
      <SectionHeader {...sectionHeader} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {projects[0] && (
          <Link href={processUrl(projects[0])} className="col-span-1">
            <div className="relative mb-2 aspect-square rounded-xl overflow-hidden">
              <span className="absolute bg-nav-bar-background/20 backdrop-blur text-nav-bar-text top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg">
                {projects[0].solutions
                  .map(({ title }: { title: string }) => title)
                  .join(", ")}
              </span>
              <SanityImage
                src={projects[0].image}
                className="object-cover inset-0 w-full h-full"
              />
            </div>
            <h3 className="h3 mb-4">{projects[0].title}</h3>
            <p className="max-w-p text-balance">{projects[0].description}</p>
          </Link>
        )}
        {projects[1] && (
          <Link href={processUrl(projects[1])} className="col-span-2">
            <div className="relative mb-2 aspect-landscape rounded-xl overflow-hidden">
              <span className="absolute bg-nav-bar-background/20 backdrop-blur text-nav-bar-text top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg">
                {projects[1].solutions
                  .map(({ title }: { title: string }) => title)
                  .join(", ")}
              </span>
              <SanityImage
                src={projects[1].image}
                className="object-cover inset-0 w-full h-full"
              />
            </div>
            <h3 className="h3 mb-4">{projects[1].title}</h3>
            <p className="max-w-p text-balance">{projects[1].description}</p>
          </Link>
        )}
      </div>
      {projects && projects.length > 2 && (
        <Swiper
          slidesPerView={1.2}
          spaceBetween={24}
          breakpoints={{
            768: {
              slidesPerView: 4.2,
            },
          }}
          className="overflow-visible featured-projects-swiper"
        >
          {projects.slice(2).map((project: TileType, i) => {
            return (
              <SwiperSlide key={project._id + i}>
                <ProjectTile project={project} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
