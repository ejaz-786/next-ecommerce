"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { Button } from "./Button";
import type { CartItem } from "@/domain/types";
import type { AppDispatch } from "@/store";

interface CartItemComponentProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      if (newQuantity <= 0) {
        dispatch(removeItem(item.productId));
      } else {
        dispatch(
          updateQuantity({ productId: item.productId, quantity: newQuantity }),
        );
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      dispatch(removeItem(item.productId));
    } finally {
      setIsUpdating(false);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex gap-4">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-700 rounded overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{item.category}</p>

        <div className="flex items-center gap-2">
          <span className="text-gray-300">Qty:</span>
          <div className="flex items-center border border-gray-600 rounded">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating}
              className="px-2 py-1 text-gray-300 hover:text-white disabled:opacity-50"
            >
              −
            </button>
            <span className="px-3 py-1 text-white min-w-10 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              className="px-2 py-1 text-gray-300 hover:text-white disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Pricing and Remove */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-gray-400 text-sm">${item.price.toFixed(2)} each</p>
          <p className="text-xl font-bold text-white">
            ${itemTotal.toFixed(2)}
          </p>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={handleRemove}
          disabled={isUpdating}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
