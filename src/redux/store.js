import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import BlogSlice from "./features/Blog/BlogSlice";
export let store = configureStore({
  reducer: {
    auth: authSlice,
    Blog:BlogSlice
  },
});
