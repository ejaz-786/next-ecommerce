"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Button } from "./Button";
import { useState } from "react";
import { authService } from "@/services";

export function Header() {
  const router = useRouter();
  const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-800 border-b border-gray-700 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/products"
          className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <img
            src="/favicon.svg"
            alt="Emart"
            className="w-10 h-10 md:w-8 md:h-8"
          />
          <span className="text-2xl font-bold text-blue-500 hidden sm:inline">
            Emart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/products"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="relative text-gray-300 hover:text-white transition-colors"
          >
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            href="/profile"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Profile
          </Link>

          <Button
            variant="danger"
            size="sm"
            isLoading={isLoggingOut}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-300 transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-300 transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-300 transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 border-t border-gray-600">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/products"
              className="text-gray-300 hover:text-white transition-colors block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-300 hover:text-white transition-colors block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
              {cartItemCount > 0 && (
                <span className="inline-block ml-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 text-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link
              href="/profile"
              className="text-gray-300 hover:text-white transition-colors block py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>

            <Button
              variant="danger"
              size="sm"
              isLoading={isLoggingOut}
              onClick={handleLogout}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
