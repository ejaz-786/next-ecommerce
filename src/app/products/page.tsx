import { Suspense } from "react";
import type { Metadata } from "next";
import {
  Header,
  ProductFilters,
  ProductsGrid,
  Pagination,
} from "@/ui/components";
import { productsService } from "@/services";

interface SearchParams {
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: string;
}

export const metadata: Metadata = {
  title: "Products | Emart",
  description: "Browse our collection of products",
};

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

async function ProductsContent({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const pageSize = 12;
  const currentPage = parseInt(params.page || "1");
  const skip = (currentPage - 1) * pageSize;

  // Fetch categories and products in parallel
  const [categoriesData, productsData] = await Promise.all([
    productsService.getCategories(),
    productsService.fetchProducts({
      limit: pageSize,
      skip,
      category: params.category,
      sortBy: params.sortBy,
      order: params.order,
    }),
  ]);

  const hasNextPage = skip + pageSize < productsData.total;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="md:col-span-1">
            <div className="sticky top-4">
              <ProductFilters categories={categoriesData} />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-3">
            <ProductsGrid products={productsData.products} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              totalProducts={productsData.total}
              productsPerPage={pageSize}
            />

            {/* Results info */}
            <div className="text-center text-gray-400 text-sm mt-6">
              Showing {skip + 1} to{" "}
              {Math.min(skip + pageSize, productsData.total)} of{" "}
              {productsData.total} products
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <Suspense
      fallback={<div className="text-center py-12">Loading products...</div>}
    >
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}
