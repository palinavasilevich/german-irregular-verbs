import { configureStore } from "@reduxjs/toolkit";
import verbSlice from "./features/verb.slice";

export const store = configureStore({
  reducer: {
    verb: verbSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
