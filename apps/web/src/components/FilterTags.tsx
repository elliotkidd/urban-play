import { useIsMobile } from "@/hooks/use-is-mobile";
import { LinkReferenceType } from "@/lib/sanity/queries/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Button } from "./ui/Button";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

function MobileFilters({
  items,
  basePath,
  loading = false,
  setLoading,
}: {
  items: LinkReferenceType[];
  basePath: string;
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  const handleClick = (item: LinkReferenceType) => {
    setLoading(true);
    params.has("tags", item.slug)
      ? params.delete("tags", item.slug)
      : params.append("tags", item.slug);
    params.delete("page");
    router.push(`${basePath}?${params.toString()}`, { scroll: false });
    setLoading(false);
  };

  return (
    <div className="flex gap-2 max-w-xl flex-wrap items-center lg:justify-end">
      <Button
        className={cn(
          "text-xs bg-nav-bar-background/20 p-4 rounded-lg text-text hover:bg-nav-bar-background/20",
          loading && "animate-pulse",
        )}
      >
        Filters
      </Button>
      {isOpen && (
        <Fragment>
          {items &&
            items.map((item: LinkReferenceType) => {
              const { title, _id } = item;
              return (
                <Button
                  key={_id}
                  onClick={() => handleClick(item)}
                  disabled={loading}
                  className={cn(
                    "text-xs bg-nav-bar-background/20 p-4 rounded-lg text-text hover:bg-nav-bar-background/50",
                    params.has("tags", item.slug) && "bg-nav-bar-background/50",
                    params.get("tags") === item.slug && "bg-nav-bar-background/50",
                    loading && "animate-pulse",
                  )}
                >
                  {title}
                </Button>
              );
            })}
        </Fragment>
      )}
      <button
        className={cn(
          "text-xs bg-nav-bar-background/20 h-10 w-10 flex items-center justify-center text-text hover:bg-nav-bar-background/50 rounded-full aspect-square",
          loading && "animate-pulse",
          isOpen && "transform rotate-45",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        +
      </button>
    </div>
  );
}

function DesktopFilters({
  items,
  basePath,
  loading = false,
  setLoading,
}: {
  items: LinkReferenceType[];
  basePath: string;
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  const handleClick = (item: LinkReferenceType) => {
    setLoading(true);
    params.has("tags", item.slug)
      ? params.delete("tags", item.slug)
      : params.append("tags", item.slug);
    params.delete("page");
    router.push(`${basePath}?${params.toString()}`, { scroll: false });
    setLoading(false);
  };
  return (
    <div className="flex gap-2 max-w-xl flex-wrap lg:justify-end">
      {items &&
        items.map((item: LinkReferenceType) => {
          const { title, _id } = item;
          return (
            <Button
              key={_id}
              onClick={() => handleClick(item)}
              disabled={loading}
              className={cn(
                "text-xs bg-nav-bar-background/20 p-4 rounded-lg text-text hover:bg-nav-bar-background/50",
                params.has("tags", item.slug) && "bg-nav-bar-background/50",
                params.get("tags") === item.slug && "bg-nav-bar-background/50",
                loading && "animate-pulse",
              )}
            >
              {title}
            </Button>
          );
        })}
    </div>
  );
}

export default function FilterTags({
  items,
  basePath = "/projects",
}: {
  items: LinkReferenceType[];
  basePath?: string;
  loading?: boolean;
}) {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      {isMobile ? (
        <MobileFilters
          items={items}
          basePath={basePath}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <DesktopFilters
          items={items}
          basePath={basePath}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </Fragment>
  );
}
