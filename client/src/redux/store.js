import products from "./reducer";
import user from "./user";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: { products, user },
});
