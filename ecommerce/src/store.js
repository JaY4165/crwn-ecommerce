import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./features/sign-up/signUpSlice";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});

export default store;
