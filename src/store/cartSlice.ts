"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Cart } from "@/domain/types";

const emptyCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

const getInitialCart = (): Cart => {
  if (typeof window === "undefined") {
    return emptyCart;
  }

  const stored = localStorage.getItem("cart");
  if (!stored) {
    return emptyCart;
  }

  try {
    const parsed = JSON.parse(stored) as Cart;
    if (!Array.isArray(parsed.items)) {
      return emptyCart;
    }
    return parsed;
  } catch {
    return emptyCart;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    // Add item to cart
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Update totals
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    // Remove item from cart
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );

      // Update totals
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    // Update item quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.productId !== action.payload.productId,
          );
        } else {
          item.quantity = action.payload.quantity;
        }

        // Update totals
        state.itemCount = state.items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },

    // Load cart from localStorage
    loadCart: (state, action: PayloadAction<Cart>) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.itemCount = action.payload.itemCount;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, loadCart } =
  cartSlice.actions;
export default cartSlice.reducer;
