"use client";

import { useRouter } from "next/navigation";
import { RichText } from "@/components/richtext";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { LinkReferenceType } from "@/lib/sanity/queries/link";
import { cn } from "@/lib/utils";

export function ProjectsHeader({
  description,
  solutions,
  loading = false,
}: {
  description: string;
  solutions: LinkReferenceType[];
  loading?: boolean;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  const handleClearTags = () => {
    params.delete("tags");
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  const handleClick = (solution: LinkReferenceType) => {
    params.has("tags", solution.slug)
      ? params.delete("tags", solution.slug)
      : params.append("tags", solution.slug);
    params.delete("page");
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="lg:min-h-p-section mb-fluid-lg">
      <div className="wrapper flex flex-col lg:flex-row gap-fluid-sm justify-between py-fluid-xs">
        <RichText richText={description} className="max-w-p" />
        <div className="flex gap-2 max-w-xl flex-wrap lg:justify-end">
          {solutions &&
            solutions.map((solution: LinkReferenceType) => {
              const { title, _id } = solution;
              return (
                <Button
                  key={_id}
                  onClick={() => handleClick(solution)}
                  disabled={loading}
                  className={cn(
                    "text-xs bg-nav-bar-background/20 p-4 rounded-lg text-text hover:bg-nav-bar-background/50",
                    params.has("tags", solution.slug) &&
                      "bg-nav-bar-background/50",
                    params.get("tags") === solution.slug &&
                      "bg-nav-bar-background/50",
                    loading && "animate-pulse",
                  )}
                >
                  {title}
                </Button>
              );
            })}
        </div>
      </div>
    </section>
  );
}
