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
		orderByName: (state, action) => {
			action.payload === "A-Z"
				? state.products.sort((a, b) => {
						if (a.title > b.title) {
							return 1;
						}
						if (b.title > a.title) {
							return -1;
						}
						return 0;
				  })
				: state.products.sort((a, b) => {
						if (a.title > b.title) {
							return -1;
						}
						if (b.title > a.title) {
							return 1;
						}
						return 0;
				  });
		},
		orderByPrice: (state, action) => {
			action.payload === "-price"
				? state.countries.sort((a, b) => {
						return a.price - b.price;
				  })
				: state.products.sort();
		},
	},
});

export const { getAllProducts, getProductsDetail, orderByName, orderByPrice } =
	productsSlice.actions;

export default productsSlice.reducer;
