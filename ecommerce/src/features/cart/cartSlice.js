import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const cartItemToAdd = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === cartItemToAdd.id
      );

      if (existingCartItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.cartItems.push({ ...cartItemToAdd, quantity: 1 });
      }
    },
    clearItem(state, action) {
      const cartItemToClear = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === cartItemToClear.id
      );

      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== cartItemToClear.id
        );
      } else {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === cartItemToClear.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    },
    removeItem(state, action) {
      const cartItemToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== cartItemToRemove.id
      );
    },
  },
});

export const { addItemToCart, clearItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
