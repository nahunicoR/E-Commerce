import products from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: { products },
});
