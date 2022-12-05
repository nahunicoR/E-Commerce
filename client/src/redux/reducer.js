import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		productsDetail: {},
	},
	reducers: {
		getAllProducts: (state, action) => {
			state.products = action.payload;
		},
		getProductsDetail: (state, action) => {
			state.productsDetail = action.payload;
		},
	},
});

export const { getAllProducts, getProductsDetail } = productsSlice.actions;

export default productsSlice.reducer;
