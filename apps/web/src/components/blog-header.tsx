"use client";

import { LinkReferenceType } from "@/lib/sanity/queries/link";
import { Button } from "./ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function BlogHeader({
  title,
  solutions,
  loading = false,
}: {
  title: string | null;
  solutions: LinkReferenceType[];
  loading?: boolean;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  const handleClearTags = () => {
    params.delete("tags");
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const handleClick = (solution: LinkReferenceType) => {
    params.has("tags", solution.slug)
      ? params.delete("tags", solution.slug)
      : params.append("tags", solution.slug);
    params.delete("page");
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="wrapper flex flex-col lg:flex-row justify-between items-start prose mb-fluid-lg">
      <h2 className="h2">{title}</h2>
      <div className="flex gap-2 not-prose items-start flex-wrap lg:justify-end max-w-p">
        {solutions.map((solution: LinkReferenceType) => (
          <Button
            key={solution._id}
            onClick={() => handleClick(solution)}
            disabled={loading}
            className={cn(
              "text-xs bg-nav-bar-background/20 p-4 rounded-lg text-text hover:bg-nav-bar-background/50",
              params.has("tags", solution.slug) && "bg-nav-bar-background/50",
              params.get("tags") === solution.slug &&
                "bg-nav-bar-background/50",
              loading && "animate-pulse",
            )}
          >
            {solution.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
