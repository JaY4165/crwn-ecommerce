import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./features/sign-up/signUpSlice";
import cartReducer from "./features/cart/cartSlice";
import signInReducer from "./features/sign-in/signInSlice";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    cart: cartReducer,
    signIn: signInReducer,
  },
});

export default store;
