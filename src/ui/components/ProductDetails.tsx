"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { Button } from "@/ui/components";
import type { Product } from "@/domain/types";
import type { AppDispatch } from "@/store";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
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
          quantity,
          thumbnail: product.thumbnail,
          category: product.category,
        }),
      );

      // Show success notification
      localStorage.setItem(
        "cartNotification",
        JSON.stringify({
          message: `${product.title} added to cart`,
          timestamp: Date.now(),
        }),
      );

      // Reset quantity
      setQuantity(1);
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + change));
    setQuantity(newQuantity);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="flex items-center justify-center bg-gray-700 rounded-lg overflow-hidden">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : product.thumbnail
          }
          alt={product.title}
          className="w-full h-full object-contain max-h-96"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {product.title}
              </h1>
              <p className="text-gray-400 mb-4">{product.category}</p>
            </div>
            {product.discountPercentage > 0 && (
              <div className="bg-red-600 text-white px-3 py-1 rounded font-semibold">
                -{product.discountPercentage}%
              </div>
            )}
          </div>

          <p className="text-gray-300 text-lg mb-6">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded">
              ⭐ {product.rating.toFixed(1)}
            </div>
            <span className="text-gray-400 text-sm">
              {product.reviews && product.reviews.length > 0
                ? `${product.reviews.length} reviews`
                : "No reviews yet"}
            </span>
          </div>

          {/* Brand and SKU */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <p className="text-gray-400">Brand</p>
              <p className="text-white font-semibold">{product.brand}</p>
            </div>
            <div>
              <p className="text-gray-400">SKU</p>
              <p className="text-white font-semibold">{product.sku}</p>
            </div>
            <div>
              <p className="text-gray-400">Warranty</p>
              <p className="text-white font-semibold">
                {product.warrantyInformation}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Shipping</p>
              <p className="text-white font-semibold line-clamp-1">
                {product.shippingInformation}
              </p>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <p
              className={`text-sm font-semibold ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>

        {/* Pricing and Purchase */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              {product.discountPercentage > 0 ? (
                <>
                  <p className="text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-4xl font-bold text-green-400">
                    ${discountedPrice.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-4xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-300">Quantity:</span>
              <div className="flex items-center border border-gray-600 rounded">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity === 1}
                  className="px-3 py-2 text-gray-300 hover:text-white disabled:opacity-50"
                >
                  −
                </button>
                <span className="px-4 py-2 text-white min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity === product.stock}
                  className="px-3 py-2 text-gray-300 hover:text-white disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            size="lg"
            isLoading={isAdding}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
