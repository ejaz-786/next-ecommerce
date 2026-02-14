"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/ui/components";
import type { CategoryResponse } from "@/domain/types";
import { Suspense } from "react";

interface ProductFiltersProps {
  categories: CategoryResponse[];
}

function ProductFiltersContent({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sortBy") || "title";
  const currentOrder = searchParams.get("order") || "asc";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sortBy: string, order: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortBy);
    params.set("order", order);
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <button
            onClick={() => handleCategoryChange("")}
            className={`block w-full text-left px-4 py-2 rounded transition-colors ${
              !currentCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                currentCategory === category.slug
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Sort By</h3>
        <div className="space-y-2">
          {["title", "price", "rating"].map((sort) => (
            <div key={sort} className="flex gap-2">
              {["asc", "desc"].map((order) => (
                <Button
                  key={`${sort}-${order}`}
                  variant={
                    currentSort === sort && currentOrder === order
                      ? "primary"
                      : "secondary"
                  }
                  size="sm"
                  onClick={() => handleSortChange(sort, order)}
                  className="flex-1"
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}{" "}
                  {order === "asc" ? "↑" : "↓"}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  return (
    <Suspense
      fallback={<div className="text-gray-400">Loading filters...</div>}
    >
      <ProductFiltersContent categories={categories} />
    </Suspense>
  );
}
