// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === productId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
