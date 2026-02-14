"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { Button, Card } from "@/ui/components";
import { CartItemComponent } from "@/ui/components/CartItem";
import type { RootState, AppDispatch } from "@/store";
import { useEffect, useState } from "react";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const [notification, setNotification] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = localStorage.getItem("cartNotification");
    if (!stored) {
      return null;
    }

    try {
      const { message } = JSON.parse(stored) as { message?: string };
      localStorage.removeItem("cartNotification");
      return message ?? null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + shipping;

  return (
    <>
      <div className="max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {notification && (
          <div className="mb-6 p-4 bg-green-900 border border-green-700 rounded text-green-200 animation-fadeIn">
            {notification}
          </div>
        )}

        {cart.items.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-400 text-lg mb-6">Your cart is empty</p>
            <Link href="/products" className="inline-block">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <CartItemComponent key={item.productId} item={item} />
                ))}
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearCart}
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <Card className="h-fit sticky top-4">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">
                    Total:
                  </span>
                  <span className="text-3xl font-bold text-green-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" variant="primary" size="lg">
                  Proceed to Checkout
                </Button>
                <Link href="/products" className="block">
                  <Button className="w-full" variant="secondary" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Cart Info */}
              <Card className="mt-6 bg-blue-900 border-blue-700">
                <p className="text-blue-200 text-sm">
                  <strong>Items:</strong> {cart.itemCount}
                </p>
              </Card>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
