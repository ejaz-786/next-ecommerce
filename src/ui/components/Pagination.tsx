"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  totalProducts: number;
  productsPerPage: number;
}

export function Pagination({
  currentPage,
  hasNextPage,
  totalProducts,
  productsPerPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "primary" : "secondary"}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              className="w-10 h-10 p-0"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </div>
  );
}
