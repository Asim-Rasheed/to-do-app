import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice.js";
import authReducer from "./authSlice.js";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});

export default store;
