"use client";

import { useEffect, useRef } from "react";

import { Button } from "@/components/Button";
import Spinner from "@/components/Spinner";

interface LoadMoreProps {
  pageIndex: number;
  isLastPage: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onLoadMore: (pageIndex: number) => Promise<void>;
}

export default function LoadMore({
  pageIndex,
  isLastPage,
  isLoading,
  onLoadMore,
}: LoadMoreProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading && !isLastPage) {
          onLoadMore(pageIndex);
        }
      },
      { threshold: 0.1 },
    );

    const currentButton = buttonRef.current;
    if (currentButton) {
      observer.observe(currentButton);
    }

    return () => {
      if (currentButton) {
        observer.unobserve(currentButton);
      }
    };
  }, [isLoading, isLastPage, onLoadMore, pageIndex]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoading && !isLastPage) {
      await onLoadMore(pageIndex);
    }
  };

  if (!isLastPage)
    return (
      <div className="w-full flex justify-center py-8">
        {isLoading ? (
          <Spinner />
        ) : (
          <Button
            ref={buttonRef}
            variant="outline"
            disabled={isLoading || isLastPage}
            onClick={handleClick}
          >
            Load More
          </Button>
        )}
      </div>
    );
}
