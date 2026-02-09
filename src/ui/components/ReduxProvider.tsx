"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadCart } from "@/store/cartSlice";

function HydrationProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        dispatch(loadCart(JSON.parse(savedCart)));
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }

    setIsHydrated(true);
  }, [dispatch]);

  // Don't render children until hydration is complete
  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <HydrationProvider>{children}</HydrationProvider>
    </Provider>
  );
}
