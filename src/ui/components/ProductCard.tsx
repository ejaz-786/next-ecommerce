"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { Button, Card } from "@/ui/components";
import type { Product } from "@/domain/types";
import type { AppDispatch } from "@/store";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isAdding, setIsAdding] = useState(false);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      dispatch(
        addItem({
          id: product.id,
          productId: product.id,
          title: product.title,
          price: discountedPrice,
          quantity: 1,
          thumbnail: product.thumbnail,
          category: product.category,
        }),
      );

      // Show success message
      localStorage.setItem(
        "cartNotification",
        JSON.stringify({
          id: product.id, // added id for better tracking
          message: `${product.title} added to cart`,
          timestamp: Date.now(),
        }),
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="relative w-full h-40 bg-gray-700 overflow-hidden group">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discountPercentage}%
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-4">
        <Link
          href={`/products/${product.id}`}
          className="hover:text-blue-400 transition-colors"
        >
          <h3 className="font-semibold text-white line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-end justify-between mb-4">
          <div>
            {product.discountPercentage > 0 ? (
              <>
                <p className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-lg font-bold text-green-400">
                  ${discountedPrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-lg font-bold text-white">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
            ⭐ {product.rating.toFixed(1)}
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          className="w-full"
          isLoading={isAdding}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
}
