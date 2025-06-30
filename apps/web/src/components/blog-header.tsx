"use client";

import { LinkReferenceType } from "@/lib/sanity/queries/link";
import { Button } from "./ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import FilterTags from "./FilterTags";

export function BlogHeader({
  title,
  solutions,
  loading = false,
}: {
  title: string | null;
  solutions: LinkReferenceType[];
  loading?: boolean;
}) {
  return (
    <div className="wrapper flex flex-col lg:flex-row justify-between items-start prose mb-fluid-lg">
      <h2 className="h2">{title}</h2>
      <FilterTags solutions={solutions} />
    </div>
  );
}
