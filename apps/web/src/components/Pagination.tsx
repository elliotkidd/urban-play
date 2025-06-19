"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Pagination({ total, perPage }: { total: number; perPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPage = parseInt(searchParams.get("page") || "1");

  const scrollToBlogGrid = () => {
    const blogGrid = document.getElementById("blog-grid");

    if (blogGrid) {
      window.scrollTo({ top: blogGrid.offsetTop - 128, behavior: "smooth" });
    }
  };

  const totalPages = Math.ceil(total / perPage);

  const handlePrevious = () => {
    params.set("page", (currentPage - 1).toString());
    router.push(`?${params.toString()}`, { scroll: false });
    scrollToBlogGrid();
  };

  const handleNext = () => {
    params.set("page", (currentPage + 1).toString());
    router.push(`?${params.toString()}`, { scroll: false });
    scrollToBlogGrid();
  };
  return (
    <div className="wrapper flex flex-col items-center justify-between gap-4 lg:flex-row">
      <div className="flex gap-2">
        <button
          className="btn--inline hover:opacity-70 transition-opacity duration-500 disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn--inline hover:opacity-70 transition-opacity duration-500 disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
      <p className="text-sm font-bold underline">
        {currentPage}/{totalPages}
      </p>
    </div>
  );
}
export default Pagination;
