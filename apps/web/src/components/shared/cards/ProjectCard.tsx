import { stegaClean } from "@sanity/client/stega";
import { twMerge } from "tailwind-merge";

import processUrl from "@/utils/processUrl";

import SanityImage from "../SanityImage";
import { Link } from "../navigation/Link";

interface Props {
  project: any;
}

export default function ProjectCard({ project }: Props) {
  const { title, mainVideo, mainImage, attribution } = project;
  return (
    <Link
      href={processUrl(project)}
      className="group relative flex flex-col justify-between gap-2 duration-500"
    >
      <div
        className={twMerge("relative aspect-square overflow-hidden rounded")}
      >
        {mainImage && (
          <SanityImage
            src={mainImage}
            className="absolute inset-0 h-full w-full rounded-sm object-cover"
          />
        )}
        {project.categories && (
          <div className="absolute inset-4">
            <ul className="flex flex-wrap">
              {project.categories.map((category: any, i: number) => (
                <li
                  key={i}
                  className="text-label inline-block rounded-full border border-contrast/20 bg-contrast/10 px-2.5 py-1 uppercase text-contrast backdrop-blur"
                >
                  {category.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-3 space-y-2">
        <div className={`space-y-2`}>
          <h3 className="text-md leading-tight">
            {title}
            {attribution && (
              <span className="block opacity-40 md:inline"> {attribution}</span>
            )}
          </h3>
        </div>
      </div>
    </Link>
  );
}
