import { configureStore } from "@reduxjs/toolkit";
import memoReducer from "./Features/memoSlice";
import inputReducer from "./Features/inputSlice";
export const store = configureStore({
    reducer: {
        memo: memoReducer,
        input: inputReducer
    }
})