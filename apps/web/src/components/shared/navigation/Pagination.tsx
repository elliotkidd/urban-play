"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../../Button";
import { IconDoubleChevron } from "../../Icon";

export default function Pagination({ pageIndex, isFirstPage, isLastPage }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // Define functions for navigating to the next and previous pages
  // These functions update the page query parameter in the URL
  const handleNextPage = () => {
    params.set("page", (pageIndex + 1).toString());
    const query = params.toString();

    router.push(`?${query}`);
  };

  const handlePrevPage = () => {
    params.set("page", (pageIndex - 1).toString());
    const query = params.toString();

    router.push(`?${query}`);
  };

  return (
    <section>
      <div className="theme--dark flex items-center justify-center py-fluid">
        <nav className="flex gap-2" aria-label="Pagination">
          {!isFirstPage ? (
            <Button
              variant="outline"
              onClick={handlePrevPage}
              prependIcon={<IconDoubleChevron direction="left" />}
            >
              Previous
            </Button>
          ) : null}
          {!isLastPage ? (
            <Button
              variant="outline"
              onClick={handleNextPage}
              appendIcon={<IconDoubleChevron direction="right" />}
            >
              Next
            </Button>
          ) : null}
        </nav>
      </div>
    </section>
  );
}
