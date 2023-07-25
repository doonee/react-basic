import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toastSlice"; /* 임의의 이름을 사용해도 됨.(toastSlice.reducer -> toastReducer) */

export const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
});
