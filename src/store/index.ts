import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Subscribe to store changes and save cart to localStorage
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    try {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
