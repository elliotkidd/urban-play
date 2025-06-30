"use client";

import FilterTags from "@/components/FilterTags";
import { RichText } from "@/components/richtext";
import { LinkReferenceType } from "@/lib/sanity/queries/link";

export function ProjectsHeader({
  description,
  solutions,
}: {
  description: string;
  solutions: LinkReferenceType[];
}) {
  return (
    <section className="lg:min-h-p-section mb-fluid-lg">
      <div className="wrapper flex flex-col lg:flex-row gap-fluid-sm justify-between py-fluid-xs">
        <RichText richText={description} className="max-w-p" />
        <FilterTags solutions={solutions} />
      </div>
    </section>
  );
}
