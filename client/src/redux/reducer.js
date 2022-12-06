import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		productsFilter: [],
		productsDetail: {},
	},
	reducers: {
		getAllProducts: (state, action) => {
			state.products = action.payload;
			state.productsFilter = action.payload;
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
			action.payload === "+price"
				? state.products.sort((a, b) => {
						return a.price - b.price;
				  })
				: state.products.sort((a, b) => {
						return b.price - a.price;
				  });
		},
		filterByCategories: (state, action) => {
			let categoryFilter =
				action.payload === "all"
					? state.productsFilter
					: state.productsFilter.filter(
							(c) => c.category.toLowerCase() === action.payload
					  );
			state.products = categoryFilter;
		},
	},
});

export const {
	getAllProducts,
	getProductsDetail,
	orderByName,
	orderByPrice,
	filterByCategories,
} = productsSlice.actions;

export default productsSlice.reducer;
