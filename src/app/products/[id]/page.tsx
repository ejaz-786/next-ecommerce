import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Card } from "@/ui/components";
import { ProductDetails } from "@/ui/components/ProductDetails";
import { productsService } from "@/services";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await productsService.getProductById(parseInt(id));
    return {
      title: `${product.title} | Emart`,
      description: product.description.substring(0, 160),
    };
  } catch {
    return {
      title: "Product | Emart",
    };
  }
}

async function ProductContent({ productId }: { productId: number }) {
  const product = await productsService.getProductById(productId);

  return (
    <>
      <div className="max-w-6xl mx-auto w-full px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm text-gray-400">
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </nav>

        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <Card className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-700 pb-6 last:border-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">
                      {review.reviewerName}
                    </h3>
                    <span className="text-yellow-500 font-semibold">
                      ⭐ {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    {review.reviewerEmail}
                  </p>
                  <p className="text-gray-300">{review.comment}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* More Details */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                Dimensions
              </h3>
              <p className="text-gray-400">
                {product.dimensions.width}W × {product.dimensions.height}H ×{" "}
                {product.dimensions.depth}D
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                Weight
              </h3>
              <p className="text-gray-400">{product.weight} kg</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                Availability
              </h3>
              <p className="text-gray-400">{product.availabilityStatus}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                Return Policy
              </h3>
              <p className="text-gray-400">{product.returnPolicy}</p>
            </div>
            {product.tags && product.tags.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-300 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={<div className="text-center py-12">Loading product...</div>}
    >
      <ProductContent productId={parseInt(id)} />
    </Suspense>
  );
}
