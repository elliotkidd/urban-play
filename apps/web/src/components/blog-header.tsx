"use client";

import { LinkReferenceType } from "@/lib/sanity/queries/link";
import FilterTags from "./FilterTags";

export function BlogHeader({
  title,
  categories,
}: {
  title: string | null;
  categories: LinkReferenceType[];
}) {
  return (
    <div className="wrapper flex flex-col lg:flex-row justify-between items-start prose mb-fluid-lg">
      <h2 className="h2">{title}</h2>
      <FilterTags items={categories} basePath="/blog" />
    </div>
  );
}
